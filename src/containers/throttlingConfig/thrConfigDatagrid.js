import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import CheckIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CheckIcon';
import {setDeleteAlertState,setActiveState,setDialogType,setDialogState,setCurrentThrConfigDataOnEdit} from '../../actions/throttlingconfig';
import {setErrorOnCall,deleteThrConfig,activateOrInactivateConfig} from '../../actions/throttlingconfig/commonservices';
import "../../styles/messageFilter/ReDataGrid.css";
import rulesData from '../../actions/throttlingconfig/throttlingConfigGridData.json';
let _ = require('underscore');

let srv;
class ThrConfigDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedThrConfigNameToDelete:"",
            stateName : "",
            stateValue : true
        }
    }

    columnDefs = () => {
        let innerFieldArray = [];
        !!rulesData && rulesData.Fields.forEach( value => {
            if(value.gridDisplay === true) {
                if (value.hasInnerFields === true) {
                    value.innerFields.forEach((valueInner) => {
                        innerFieldArray.push(valueInner);
                    });
                }
                else {
                    innerFieldArray.push(value);
                }
            }
        });
       let finalArray= innerFieldArray.map(function (data, id) {
           return {headerName:data.label, field: data.name,width:data.width,filter:'agTextColumnFilter'}
       });
       return finalArray;
    }

    gridOptions={
        columnDefs:this.columnDefs()
    }

    EditFunc=(ConfigName)=>{
        srv.props.setDialogType('edit');
        this.props.setCurrentThrConfigDataOnEdit(ConfigName)
        this.props.setDialogState(true);
    }

    onActive(data){
        const checkStatus = data.state === 'ACTIVE'?true:false
        this.setState({stateName:data.name,stateValue:checkStatus},()=>{
            this.props.setActiveState(true)
        })
    }

    deleteFunc=(ConfigName)=>{
        this.setState({selectedThrConfigNameToDelete:ConfigName},()=>{
            srv.props.setDeleteAlertState(true);
        })
    }

    onErrorClose = () =>{
        srv.props.setErrorOnCall(false);
    }

    alertErrorPopup = ( ) => {
        if (!srv.props.apiError) {
            return <div></div>
        }
        else {
            return (<ErrorDialogCCFK 
                title={srv.props.apiError.mainTitle} 
                variant="ERROR" 
                message={srv.props.apiError.description} 
                detailsText={srv.props.apiError.moreDetails} 
                onClose={srv.onErrorClose}/>)
        }
    }

    onClose = ( ) => {
        srv.props.setDeleteAlertState(false);
    }

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="nfConfig_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.name)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="mf_active" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
            tooltip={e.data.state === "ACTIVE"?"DEACTIVATE":"ACTIVATE"}>
                <IconButton size="large" onClick={() => this.onActive(e.data)} >
                    <CheckIcon/>
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.name)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            
            ]
    }

    returnRowActionColumn=()=>{
        return {
            type: 'actionColumn',
            pinned: 'right',
            cellRendererParams: {
                getInlineRowActions:this.getInlineRowActions,
                alwaysShow:true
            }
        }
    }

    alertConfirmationPopup = (title,confirmationText ) => {
        return (<ErrorDialogCCFK 
            title={title} 
            variant="CONFIRM" 
            message={confirmationText}
            confirmationButtonLabel="DELETE"
            onClose={srv.onClose}
            onConfirm={srv.onConfirm}
        />)
    }

    onActClose = ( ) => {
        srv.props.setActiveState(false)
    }

    alertActivatePopup = () => {
        return (<ErrorDialogCCFK 
            title={`${this.state.stateValue?'DEACTIVATE':'ACTIVATE'}`} 
            variant="CONFIRM" 
            message={"Please Select Confirm To proceed"}
            confirmationButtonLabel="CONFIRM"
            onClose={srv.onActClose}
            onConfirm={srv.onActConfirm}
        />)
    }
    onActConfirm = () => {
        this.props.activateOrInactivateConfig(this.state.stateName,!(this.state.stateValue))
        srv.props.setActiveState(false);
    }

    onConfirm = () => {
        srv.props.deleteThrConfig(this.state.selectedThrConfigNameToDelete);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertState(false);
        srv.props.setActiveState(false)
    }

    render(){

        return (
            <div style={{height: '595px'}}>
                <DataGridCCFK 
                    gridOption={this.gridOptions} 
                    returnRowActionColumn={this.returnRowActionColumn} 
                    gridData={this.props.rowData ? this.props.rowData.slice() : []}
                    defaultGridActionsPosition="right"
                />
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Throttling Configuration", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
                {srv.props.dataGrid.showActive && srv.alertActivatePopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.thcdataGrid.rowData,
        dataGrid : state.thcdataGrid,
        apiError: state.thcdataGrid.apiError,
        dataDataArray:state.thcnewEditDialog.forEditData
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentThrConfigDataOnEdit,
        deleteThrConfig,
        activateOrInactivateConfig,
        setActiveState
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(ThrConfigDataGrid);
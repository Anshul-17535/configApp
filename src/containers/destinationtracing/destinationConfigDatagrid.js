import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import VisibilityIcon from '@nokia-csf-uxr/ccfk-assets/legacy/VisibilityIcon';
import {setDeleteAlertState,setDialogType,setDialogState,setCurrentDSTProfileDataOnEdit,setCurrentDSTProfileDataOnView} from '../../actions/destinationprofile';
import {setErrorOnCall,deleteThrConfig} from '../../actions/destinationprofile/commonservices';
import "../../styles/messageFilter/ReDataGrid.css";
import rulesData from '../../actions/destinationprofile/destinationConfigGridData.json';
let _ = require('underscore');
let sendData={

    tracingDestinationDetailsConfigs: {
    
    tracingDestinationDetailsConfig: [{
    
        destinationName: ""
    
    }]
    
    }
    
    }

let srv;
class DestinationConfigDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedThrConfigNameToDelete:""
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
           return {headerName:data.label,field: data.name,width:data.width,filter:'agTextColumnFilter'}
       });
       return finalArray;
    }

    gridOptions={
        columnDefs:this.columnDefs()
    }

    EditFunc=(ConfigName)=>{
        srv.props.setDialogType('edit');
        this.props.setCurrentDSTProfileDataOnEdit(ConfigName)
        this.props.setDialogState(true);
    }

    viewFunc=(ConfigName)=>{
        srv.props.setDialogType('view');
        this.props.setCurrentDSTProfileDataOnView(ConfigName)
        this.props.setDialogState(true);
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
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.destinationName)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>, 
            <Tooltip key="rulesEngine_view" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="View">
            <IconButton size="large" aria-label="view" onClick={()=>this.viewFunc(e.data.destinationName)}>
                <VisibilityIcon />
            </IconButton>
            </Tooltip>,
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.destinationName)}>
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

    onConfirm = () => {
        sendData.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName=this.state.selectedThrConfigNameToDelete
        srv.props.deleteThrConfig(sendData.tracingDestinationDetailsConfigs.tracingDestinationDetailsConfig[0].destinationName);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertState(false);
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
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Tracing Destination", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.dstpdataGrid.rowData,
        dataGrid : state.dstpdataGrid,
        apiError: state.dstpdataGrid.apiError,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentDSTProfileDataOnEdit,
        setCurrentDSTProfileDataOnView,
        deleteThrConfig,
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationConfigDataGrid);
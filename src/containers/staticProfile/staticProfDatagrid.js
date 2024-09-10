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
import ExportIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ExportIcon';
import {setDeleteAlertState,setDialogType,setDialogState,setCurrentStatProfOnEdit,setExportDialog} from '../../actions/staticProfile';
import {setErrorOnCall,deleteStatProfConfig,setimportOnCall,exportOne} from '../../actions/staticProfile/commonservices';
import "../../styles/messageFilter/ReDataGrid.css";
import ExportBox from './exportBox'
import rulesData from '../../actions/staticProfile/StaticProfileGridData.json';
let _ = require('underscore');

let srv;
class StaticProfDataGrid extends Component {
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
           return {headerName:data.label, field: data.name,width:data.width,filter:'agTextColumnFilter'}
       });
       return finalArray;
    }

    gridOptions={
        columnDefs:this.columnDefs()
    }

    componentWillMount=()=>{
        srv.props.setExportDialog(false);
    }

    EditFunc=(ConfigName)=>{
        srv.props.setDialogType('edit');
        this.props.setCurrentStatProfOnEdit(ConfigName.nfInstanceId)
        this.props.setDialogState(true);
    }

    viewFunc=(ConfigName)=>{
        srv.props.setDialogType('view');
        this.props.setCurrentStatProfOnEdit(ConfigName.nfInstanceId)
        this.props.setDialogState(true);
    }

    deleteFunc=(ConfigName)=>{
        this.setState({selectedThrConfigNameToDelete:ConfigName.nfInstanceId},()=>{
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

    ExportPopup = () => {
        return (
            <ExportBox/>
            )
    }

    onExport(ConfigName){
        this.props.exportOne(ConfigName.nfInstanceId);
        this.props.setExportDialog(true);
    }


    onClose = ( ) => {
        srv.props.setDeleteAlertState(false);
    }

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="nfConfig_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton  size="large"  aria-label="delete" onClick={()=>this.deleteFunc(e.data)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="rulesEngine_view" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="View">
            <IconButton  size="large"  aria-label="view" onClick={()=>this.viewFunc(e.data)}>
                <VisibilityIcon />
            </IconButton>
            </Tooltip>,
                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                    tooltip="Export">
                <IconButton  size="large"  onClick={() => this.onExport(e.data)} >
                            <ExportIcon />
                </IconButton> 
            </Tooltip>,
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton  size="large"  aria-label="edit" onClick={()=>this.EditFunc(e.data)}>
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
        srv.props.deleteStatProfConfig(this.state.selectedThrConfigNameToDelete);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertState(false);
    }

    onImpConfirm=()=>{
        const element = document.createElement('a');
        const file = new Blob ([JSON.stringify(srv.props.apiError.mainTitle)],{type:"text/plain"});
        element.href =URL.createObjectURL(file);
        element.download = "ERROR.txt";
        document.body.appendChild(element);
        element.click();
        this.props.setimportOnCall(false)
    }

    onImpErrorClose=()=>{
        this.props.setimportOnCall(false)
    }

    importErrorPopup = () => {
        if (!srv.props.apiError) {
            return <div></div>
        }
        else {
            return (<ErrorDialogCCFK
                title={srv.props.apiError.mainTitle}
                variant="CONFIRM"
                confirmationButtonLabel="DOWNLOAD ERROR"
                message={srv.props.apiError.description}
                detailsText={srv.props.apiError.moreDetails}
                onConfirm={srv.onImpConfirm}
                onClose={srv.onImpErrorClose} />)
        }
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
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Static Profile", "Are you sure , you wish to delete the Profile ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
                {srv.props.exportstate && srv.ExportPopup()}
                {srv.props.dataGrid.importerrorstate && srv.importErrorPopup()}

            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.statprofdataGrid.rowData,
        dataGrid : state.statprofdataGrid,
        apiError: state.statprofdataGrid.apiError,
        importerrorstate: state.statprofdataGrid.importerrorstate,
        exportstate: state.statprofnewEditDialog.exportdialog
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentStatProfOnEdit,
        deleteStatProfConfig,
        setimportOnCall,
        setExportDialog,
        exportOne
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(StaticProfDataGrid);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import VisibilityIcon from '@nokia-csf-uxr/ccfk-assets/legacy/VisibilityIcon';
import CopyIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CopyIcon';
import { gridOptions } from '../../actions/rulesengine/gridOptionsData';
import { editDialogLabels, setDialogState, setDeleteAlertState, RuleIndex, ViewMode, DeleteRulesDatagrid, updateRecordData, setDialogType, RsvOnSaveBtnClick } from '../../actions/rulesengine';
import { getAllData,ExportAllData, deleteRecord, setErrorOnCall,setimportOnCall, editRecord,exportOne, viewRecord } from '../../actions/rulesengine/commonServices';
import ExportIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ExportIcon';
import { setExportDialog } from '../../actions/rulesengine';
import { setCloneDialog } from '../../actions/rulesengine';
import ExportBox from './ExportBox';
import Clone from './Clone'
import "../../styles/rulesEngine/ReDataGrid.css";
import {nfType} from '../splitScreenForm';

let srv;
class ReDatagrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedRsvNameToDelete:"",
            selectedRsvIdToDelete:0
        }
    }
    componentWillMount() {
        srv.props.ExportAllData();
        srv.props.getAllData();
        srv.props.setExportDialog(false);
}     

    deleteFunc = (i, rsvName) => {
        this.setState({selectedRsvNameToDelete:rsvName,selectedRsvIdToDelete:i},()=>{
            this.props.setDeleteAlertState(true)
        })
    }
    viewFunc = (i, rsvName) => {
        srv.props.setDialogType('view');
        srv.props.RuleIndex(i);
        srv.props.ViewMode(true);
        // srv.props.setDialogState(true);
        srv.props.RsvOnSaveBtnClick(true);
        srv.props.viewRecord(rsvName);
        // srv.props.viewRecord(srv.props.rules[i].rsvName);
    }
    EditFunc = (i, rsvName) => {
        srv.props.setDialogType('edit');
        srv.props.RuleIndex(i);
        srv.props.ViewMode(false);
        srv.props.editRecord(rsvName);
        // srv.props.editRecord(srv.props.rules[i].rsvName);
        // srv.props.setDialogState(true);
        srv.props.RsvOnSaveBtnClick(true);
    }
    CloneFunc=(rsvName)=>{
        this.props.exportOne(rsvName);
        this.props.setCloneDialog(true);
    }

    onErrorClose = () => {
        srv.props.setErrorOnCall(false);
    }
    alertErrorPopup = () => {
        if (!srv.props.apiError) {
            return <div></div>
        }
        else {
            return (<ErrorDialogCCFK
                title={srv.props.apiError.mainTitle}
                variant="ERROR"
                message={srv.props.apiError.description}
                detailsText={srv.props.apiError.moreDetails}
                onClose={srv.onErrorClose} />)
        }
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

    onClose = () => {
        srv.props.setDeleteAlertState(false);
    }

    alertConfirmationPopup = (title, confirmationText) => {
        return (
            <ErrorDialogCCFK
                title={title}
                variant="CONFIRM"
                message={confirmationText}
                confirmationButtonLabel="DELETE"
                onClose={srv.onClose}
                onConfirm={srv.onConfirm}
            />)
    }

    ExportPopup = () => {
        return (
            <ExportBox/>
            )
    }
    ClonePopup = () => {
        return (
            <Clone/>
            )
    }
    
    onExport(name){
        this.props.exportOne(name);
        this.props.setExportDialog(true);
        }

    getInlineRowActions = (e) => {
        return [
            <Tooltip key="rulesEngine_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={() => this.EditFunc(e.rowIndex, e.data.rsvName)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="rulesEngine_view" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="View">
                <IconButton size="large" aria-label="view" onClick={() => this.viewFunc(e.rowIndex, e.data.rsvName)}>
                    <VisibilityIcon />
                </IconButton>
                </Tooltip>,
                <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Export">
               {nfType==="nrfp"?false:<><IconButton size="large" onClick={() => this.onExport(e.data.rsvName)} >
                        <ExportIcon />
            </IconButton> </>}
                </Tooltip>,
            <Tooltip key="rulesEngine_clone" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                 tooltip="Clone">
                 <IconButton size="large" aria-label="clone" onClick={()=>this.CloneFunc(e.data.rsvName)}>
                     <CopyIcon />
                 </IconButton>
             </Tooltip>,
            <Tooltip key="rulesEngine_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={() => this.deleteFunc(e.rowIndex, e.data.rsvName)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        ]
    }

    returnRowActionColumn = () => {
        return {
            type: 'actionColumn',
            pinned: 'right',
            cellRendererParams: {
                getInlineRowActions: this.getInlineRowActions,
                alwaysShow: true
            }
        }
    }

    onConfirm = ( ) => {
        srv.props.deleteRecord(this.state.selectedRsvNameToDelete);
        srv.props.DeleteRulesDatagrid(this.state.selectedRsvIdToDelete);
        srv.props.setDeleteAlertState(false);
    }

    componentDidMount() {
        srv.props.setDeleteAlertState(false);
    }

    render() {
        return (
            <div style={{ height: 'auto' }}>
                <DataGridCCFK
                    gridOption={gridOptions}
                    returnRowActionColumn={this.returnRowActionColumn}
                    gridData={this.props.rowData ? this.props.rowData.slice() : []}
                    defaultGridActionsPosition="right"
                />
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete This RSV", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
                {srv.props.exportstate && srv.ExportPopup()}
                {srv.props.clonestate && srv.ClonePopup()}
                {srv.props.dataGrid.importerrorstate && srv.importErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        rowData: state.redataGrid.rowData,
        rules: state.renewEditDialog.Rules,
        dataGrid: state.redataGrid,
        exportstate: state.renewEditDialog.exportdialog,
        clonestate: state.renewEditDialog.clonedialog,
        renewEditDialog: state.renewEditDialog,
        dialogType: state.renewEditDialog.dialogType,
        apiError: state.redataGrid.apiError
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllData,
        editDialogLabels,
        DeleteRulesDatagrid,
        setDialogState,
        setDeleteAlertState,
        deleteRecord,
        setErrorOnCall,
        RuleIndex,
        ViewMode,
        setDialogType,
        updateRecordData,
        RsvOnSaveBtnClick,
        editRecord,
        viewRecord,
        setimportOnCall,
        exportOne,
        setExportDialog,
        setCloneDialog,
        ExportAllData
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ReDatagrid);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import { setDeleteAlertState, setDialogType, setDialogState, setCurrentSlfLookUpOnEdit, enableKeyPairForm, setKeyMapGrid, setDeleteDialogType } from '../../actions/slflookup';
import { setErrorOnCall, deleteSlfLookUp } from '../../actions/slflookup/commonservices';
import { gridOptions } from '../../actions/slflookup/gridOptionsData';
import "../../styles/messageFilter/ReDataGrid.css";
let _ = require('underscore');

let srv;

class SlfLookUpDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state = {
            selectedSlfLookUpIdToDelete: ""
        };
    }

    EditFunc = (ConfigData) => {
        this.props.setCurrentSlfLookUpOnEdit(ConfigData);
        this.props.setDialogState(true);
    }

    deleteFunc = (ConfigId) => {
        srv.props.setDeleteAlertState(true);
        this.setState({ selectedSlfLookUpIdToDelete: ConfigId }, () => {
            srv.props.setDeleteAlertState(true);
        })
    }

    onErrorClose = () => {
        srv.props.setErrorOnCall(false);
    }

    alertErrorPopup = () => {
        if (!srv.props.apiError) {
            return <div></div>
        }
        else {
            return (
            <ErrorDialogCCFK
                title={srv.props.apiError.mainTitle}
                variant="ERROR"
                message={srv.props.apiError.description}
                detailsText={srv.props.apiError.moreDetails}
                onClose={srv.onErrorClose}
            />
        )
        }
    }

    onDelConfirm = () =>{
        srv.props.setDeleteDialogType(false)
    }

    alertDeletePopup = () => {

            return (
            <ErrorDialogCCFK
                title={'NOTIFICATION'}
                variant="MESSAGE"
                message={this.props.dataGrid.deleteMessage.message}
                confirmationButtonLabel="OK"
                onConfirm={srv.onDelConfirm}
            />
        )
    }


    onClose = () => {
        srv.props.setDeleteAlertState(false);
    }

    getInlineRowActions = (e) => {
        return [
            <Tooltip key="slfLookUp_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={() => {
                    srv.props.enableKeyPairForm(true);
                    srv.props.setKeyMapGrid([]);
                    srv.props.setDialogType('edit');
                    if (e.data.mapSetEnabled == null)
                        e.data.mapSetEnabled = "false";
                    this.EditFunc(e.data)
                }
                }>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="slfLookUp_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={() => {
                    this.deleteFunc(e.data.slfLookupId)
                }}>
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

    onConfirm = () => {
        srv.props.deleteSlfLookUp(this.state.selectedSlfLookUpIdToDelete);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount() {
        srv.props.setDeleteAlertState(false);
    }

    render() {
        return (
            <div style={{ height: '595px' }}>
                <DataGridCCFK
                    gridOption={gridOptions}
                    returnRowActionColumn={this.returnRowActionColumn}
                    gridData={this.props.rowData ? this.props.rowData.slice() : []}
                    defaultGridActionsPosition="right"
                />
                {srv.props.dataGrid.showDeleteAlertSlf && srv.alertConfirmationPopup("Delete SLF Look Up", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlertSlf && srv.alertErrorPopup()}
                {srv.props.dataGrid.deleteType && srv.alertDeletePopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.slfLookUpdataGrid.rowData,
        dataGrid : state.slfLookUpdataGrid,
        apiError: state.slfLookUpdataGrid.apiErrorSlf,
        slfLookUpData:state.slflookUpnewEditDialog.slfLookUpData
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentSlfLookUpOnEdit,
        deleteSlfLookUp,
        enableKeyPairForm,
        setKeyMapGrid,
        setDeleteDialogType
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfLookUpDataGrid);
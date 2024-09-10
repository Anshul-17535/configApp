import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import FloatingActionButtonCCFK from '../../ccfk-components/FloatingActionButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import SlfKeyPairForm from './slfKeyPairForm';
import { setDeleteAlertStateKeyPair, setDialogTypeKeyPair, setDialogStateKeyPair, setKeyPairOnEdit, addNewKeyPairData, setSlfLookupPairData, setDestinationIdOptions } from '../../actions/slflookup';
import { setErrorOnCall, deleteSlfKeyPair, getAllKeyPairData, setSuccessFlag } from '../../actions/slflookup/commonservices';
import { gridOptions } from '../../actions/slflookup/gridOptionsKeyPair';
import "../../styles/messageFilter/ReDataGrid.css";

let srv;
class SlfKeyPairsGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state = {
            selectedKeyPair: {}
        };
    }

    EditFunc = (ConfigData) => {
        srv.props.setDialogTypeKeyPair('edit');
        srv.props.setKeyPairOnEdit(ConfigData);
        srv.props.setDialogStateKeyPair(true);
    }

    deleteFunc = (keyPairData) => {
        srv.props.setDeleteAlertStateKeyPair(true);
        this.setState({ selectedKeyPair: keyPairData }, () => {
            srv.props.setDeleteAlertStateKeyPair(true);
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
    onClose = () => {
        srv.props.setDeleteAlertStateKeyPair(false);
    }

    getInlineRowActions = (e) => {
        return [
            <Tooltip key="slfKeyPairs_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={() => {
                    e.data.rank = (!!e.data.rank)?e.data.rank:"";
                    e.data.customTag1 = (!!e.data.customTag1)?e.data.customTag1:"";
                    e.data.customTag2 = (!!e.data.customTag2)?e.data.customTag2:"";
                    e.data.customTag3 = (!!e.data.customTag3)?e.data.customTag3:"";
                    if(e.data.destinationType==="NF_PROFILE"){
                        srv.props.setDestinationIdOptions(srv.props.slfNFProfileOptions);
                    }
                    else{
                        if (!!srv.props.slfDestinationData[e.data.destinationType]) {
                            srv.props.setDestinationIdOptions(srv.props.slfDestinationData[e.data.destinationType]);
                        }
                    }
                    this.EditFunc(e.data)}
                    }>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="slfKeyPairs_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={() => this.deleteFunc(e.data)}>
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
                    confirmationButtonLabel="DELETE"
                    message={confirmationText}
                    onClose={srv.onClose}
                    onConfirm={srv.onConfirm}
                />
        )
    }

    onConfirm = () => {
        srv.props.deleteSlfKeyPair(this.state.selectedKeyPair);
        srv.props.setDeleteAlertStateKeyPair(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertStateKeyPair(false);
        srv.props.setDestinationIdOptions([]);
    }

    onAddButtonClick() {
        srv.props.addNewKeyPairData();
        srv.props.setDialogTypeKeyPair('new');
        srv.props.setDialogStateKeyPair(true);
    }
    render() {
        const modalKeyPair = srv.props.newEditDialog.dialogStateKeyPair ? <SlfKeyPairForm /> : false;
        return (
            <div style={{ height: '595px' }}>

                <DataGridCCFK
                    gridOption={gridOptions}
                    returnRowActionColumn={this.returnRowActionColumn}
                    gridData={srv.props.rowKeyPairData ? srv.props.rowKeyPairData.slice() : []}
                    defaultGridActionsPosition="right"
                />
                <FloatingActionButtonCCFK style={{
                    position: "fixed", right: "24px", bottom:
                        "24px", background: "rgb(3, 208, 255)"
                }} onClick={srv.onAddButtonClick} />
                {srv.props.dataGrid.showDeleteAlertKeyPair && srv.alertConfirmationPopup("Delete SLF Key Pair", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
                {modalKeyPair}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowKeyPairData: state.slfLookUpdataGrid.rowKeyPairData,
        dataGrid : state.slfLookUpdataGrid,
        apiError: state.slfLookUpdataGrid.apiError,
        newEditDialog: state.slflookUpnewEditDialog,
        slfDestinationData:state.slflookUpnewEditDialog.slfDestinationData,
        slfLookUpData:state.slflookUpnewEditDialog.slfLookUpData,
        successFlag: state.slfLookUptoolbar.successFlag,
        slfDestinationIdOptions: state.slflookUpnewEditDialog.slfDestinationIdOptions,
        slfNFProfileOptions : state.slflookUpnewEditDialog.slfNFProfileOptions
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertStateKeyPair,
        setDialogTypeKeyPair,
        setDialogStateKeyPair,
        setErrorOnCall,
        getAllKeyPairData,
        addNewKeyPairData,
        setKeyPairOnEdit,
        deleteSlfKeyPair,
        setSlfLookupPairData,
        setDestinationIdOptions,
        setSuccessFlag
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfKeyPairsGrid);
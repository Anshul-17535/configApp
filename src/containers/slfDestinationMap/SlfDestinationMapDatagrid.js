/* eslint-disable */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import {setDeleteAlertState,setDialogType,setDialogState,setCurrentDestinationMapConfigOnEdit} from '../../actions/slfdestinationmap';
import {setErrorOnCall,deleteDestinationMapConfig} from '../../actions/slfdestinationmap/commonservices';
import {gridOptions} from '../../actions/slfdestinationmap/gridOptionsData';
import { returnMapName } from './helpers';
import "../../styles/messageFilter/ReDataGrid.css";
let _ = require('underscore');


let srv;
class SlfConfigDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedDestinationMapConfigDetails:{}
        }
    }

    EditFunc=(selectedDestinationRecord)=>{
        srv.props.setDialogType('edit');
        const {destinationId,mapPattern,mapData}=selectedDestinationRecord
        let modRecord={}
        modRecord.destinationId=destinationId
        modRecord.mapPattern=mapPattern
        modRecord[returnMapName(mapPattern)]=this.returnModifiedData(mapData)
        this.props.setCurrentDestinationMapConfigOnEdit(modRecord)
        this.props.setDialogState(true);
    }

    deleteFunc=(destinationId,mapPattern)=>{
        let detailsObj={destinationId,mapPattern}
        this.setState({selectedDestinationMapConfigDetails:detailsObj},()=>{
            srv.props.setDeleteAlertState(true);
        })

    }

    returnModifiedData=(mapData)=>{
        mapData.map(data=>data.isNew=false)
        return mapData
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
                        onClose={srv.onErrorClose}/>
                    )
        }
    }

    onClose = ( ) => {
        srv.props.setDeleteAlertState(false);
    }

    alertConfirmationPopup = (title,confirmationText ) => {
        return (
                <ErrorDialogCCFK 
                    title={title} 
                    variant="CONFIRM" 
                    message={confirmationText}
                    confirmationButtonLabel="DELETE"
                    onClose={srv.onClose}
                    onConfirm={srv.onConfirm}
                />
                )
    }

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="nfService_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfService_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.destinationId,e.data.mapPattern)}>
                    <DeleteIcon />
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

    onConfirm = () => {
        const {destinationId,mapPattern}=this.state.selectedDestinationMapConfigDetails
        srv.props.deleteDestinationMapConfig(destinationId,mapPattern);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertState(false);
    }

    render(){
        return (
            <div style={{height: '595px'}}>
                <DataGridCCFK 
                    gridOption={gridOptions} 
                    returnRowActionColumn={this.returnRowActionColumn} 
                    gridData={this.props.rowData ? this.props.rowData.slice() : []}
                    defaultGridActionsPosition="right"
                />
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete SLF Configuration", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.slfDestinationMapdataGrid.rowData,
        dataGrid : state.slfDestinationMapdataGrid,
        apiError: state.slfDestinationMapdataGrid.apiError,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentDestinationMapConfigOnEdit,
        deleteDestinationMapConfig
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfConfigDataGrid);
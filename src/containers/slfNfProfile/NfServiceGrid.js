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
import FloatingActionButtonCCFK from '../../ccfk-components/FloatingActionButtonCCFK';
import {setDeleteAlertState,setNfServiceTabType,setNfServiceTabState,setTabIndex,deleteNfService,setSelectedNfServiceConfig} from '../../actions/slfnfprofile';
import {setErrorOnCall} from '../../actions/slfnfprofile/commonservices';
import {gridOptions} from '../../actions/slfnfservice/gridOptionsData';
import "../../styles/slfnfprofile/nfServiceGrid.css";
let _ = require('underscore');


let srv;
class NfServiceGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
    }

    addNfService=()=>{
        this.props.setSelectedNfServiceConfig({})
        this.props.setNfServiceTabState(true);
        this.props.setTabIndex(3)
        this.props.setNfServiceTabType("new")
    }

    EditFunc=(nfServiceConfig)=>{
        this.props.setSelectedNfServiceConfig(nfServiceConfig)
        this.props.setTabIndex(3)
        this.props.setNfServiceTabState(true);
        this.props.setNfServiceTabType("edit")
    }

    returnNfServiceRowdata=()=>{
        const {nfServices}=this.props.slfNfProfileConfig
        let rowDataCopy=[]
        nfServices.map(nfService=>{
            const {serviceInstanceId,serviceName}=nfService
            rowDataCopy=[...rowDataCopy,{"serviceInstanceId":serviceInstanceId,"serviceName":serviceName,"SlfnfServiceData":nfService}]
        })
        return rowDataCopy
    }

    deleteFunc=(Id)=>{
        this.props.deleteNfService(Id)
        this.props.setSelectedNfServiceConfig({})
    }

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="nfProfile_nfService_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.SlfnfServiceData)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfProfile_nfService_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.serviceInstanceId)}>
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

    componentDidMount(){
        srv.props.setDeleteAlertState(false);
    }

    render(){
        return (
            <div className="nfservicegrid" style={{height: '352px'}}>
                <DataGridCCFK 
                    gridOption={gridOptions} 
                    returnRowActionColumn={this.returnRowActionColumn} 
                    gridData={this.returnNfServiceRowdata()}
                    defaultGridActionsPosition="right"
                />
                <FloatingActionButtonCCFK style={{position: "fixed", right: "24px", bottom:
                "24px",background: "rgb(3, 208, 255)"}} onClick={this.addNfService} />
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        apiError: state.slfNfProfiledataGrid.apiError,
        dataGrid : state.slfNfProfiledataGrid,
        slfNfProfileConfig:state.slfNfProfilenewEditDialog.currentSlfNfProfileConfig
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setErrorOnCall,
        setNfServiceTabType,
        setNfServiceTabState,
        setTabIndex,
        deleteNfService,
        setSelectedNfServiceConfig
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(NfServiceGrid);
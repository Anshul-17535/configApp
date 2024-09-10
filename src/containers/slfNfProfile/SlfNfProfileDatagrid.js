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
import {setDeleteAlertState,setDialogType,setDialogState,setCurrentNfProfileConfigOnEdit} from '../../actions/slfnfprofile';
import {setErrorOnCall,deleteSlfNfProfileConfig} from '../../actions/slfnfprofile/commonservices';
import {gridOptions} from '../../actions/slfnfprofile/gridOptionsData';
import "../../styles/messageFilter/ReDataGrid.css";
let _ = require('underscore');

let srv;
class SlfNfProfileDatagrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedSlfNfProfileConfigInstanceId:""
        }
    }

    removeSpecifiedKeysFromPlmnList=(List)=>{
        let resultList = List.map((plmnObj)=>{
            return _.omit(plmnObj, "mncIn3Digits");
        });
        return resultList
    }

    ModifiedNfProfileConfigOnEdit=(Config)=>{
        let ConfigCopy={...Config}
        let plmnListCopy=ConfigCopy.plmnList.slice()
        let nfServicesListCopy=ConfigCopy.nfServices.slice()
        let modifiedAllowedPlmns=nfServicesListCopy.map(nfservice=>{
            let allowedplmnsCopy=!!nfservice.allowedPlmns?nfservice.allowedPlmns.slice():[]
            allowedplmnsCopy=this.removeSpecifiedKeysFromPlmnList(allowedplmnsCopy)
            nfservice.allowedPlmns=allowedplmnsCopy
            return nfservice
        })
        ConfigCopy.nfServices=modifiedAllowedPlmns
        ConfigCopy.plmnList=this.removeSpecifiedKeysFromPlmnList(plmnListCopy)
        return ConfigCopy
    }

    EditFunc=(nfProfileConfig)=>{
        srv.props.setDialogType('edit');
        let emptyObj={
            "nfInstanceId":"",
            "nfType":"",
            "nfStatus":"",
			"fqdn":"",
			"udmInfo":{"groupId":""},
			"heartBeatTimer":0,
			"interPlmnFqdn":"",
            "priority":0,
            "capacity":0,
            "load":0,
			"ipv4Addresses":[],
            "ipv6Addresses":[],
			"nfSetIdList":[],
            "plmnList":[],
            "bsfInfo":{
                "dnnList":[],
                "ipDomainList":[],
                "ipv4AddressRanges":[],
                "ipv6PrefixRanges":[]
                },
            "nfServices":[]
        }
        let bsfInfoCopy=emptyObj.bsfInfo
        bsfInfoCopy=_.extend(bsfInfoCopy,nfProfileConfig.bsfInfo)
        let modNfProfileConfig=_.extend(emptyObj,nfProfileConfig)
        modNfProfileConfig.bsfInfo=bsfInfoCopy
        this.props.setCurrentNfProfileConfigOnEdit(this.ModifiedNfProfileConfigOnEdit(modNfProfileConfig))
        this.props.setDialogState(true);
    }

    deleteFunc=(ServiceInstanceId)=>{
        srv.props.setDeleteAlertState(true);
        this.setState({selectedSlfNfProfileConfigInstanceId:ServiceInstanceId},()=>{
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

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="nfService_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.nfProfileData)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfService_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.nfInstanceId)}>
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
    onConfirm = () => {
        const {selectedSlfNfProfileConfigInstanceId} = this.state
        this.props.deleteSlfNfProfileConfig(selectedSlfNfProfileConfigInstanceId)
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
        rowData: state.slfNfProfiledataGrid.rowData,
        dataGrid : state.slfNfProfiledataGrid,
        apiError: state.slfNfProfiledataGrid.apiError,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setErrorOnCall,
        deleteSlfNfProfileConfig,
        setDialogType,
        setDialogState,
        setCurrentNfProfileConfigOnEdit
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfNfProfileDatagrid);
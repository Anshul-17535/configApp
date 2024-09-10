import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import VisibilityIcon from '@nokia-csf-uxr/ccfk-assets/legacy/VisibilityIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import {setDeleteAlertState,setDialogType,setDialogState,editIPData,editEPData} from '../../actions/peerconfig';
import {setErrorOnCall,deletePeerConfig} from '../../actions/peerconfig/commonservices';
import {gridOptions} from '../../actions/peerconfig/gridOptionsData';


let srv;
class PeerConfigDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedDataDelete:""
        }
    }

    EditFunc=(data)=>{
        srv.props.setDialogType('edit');
        if(data.peerAddressType==="EGRESS_PEER"){
            this.props.editEPData(data.profileName)}
        else if(data.peerAddressType==="INGRESS_PEER")
        {
            this.props.editIPData(data.profileName)}
        this.props.setDialogState(true);
    }

    ViewFunc=(data)=>{
        srv.props.setDialogType('view');
        if(data.peerAddressType==="EGRESS_PEER"){
            this.props.editEPData(data.profileName)}
        else if(data.peerAddressType==="INGRESS_PEER")
        {
            this.props.editIPData(data.profileName)}
        this.props.setDialogState(true);
    }

    deleteFunc=(data)=>{
        this.setState({selectedDataDelete:data},()=>{
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
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="View">
                <IconButton size="large" aria-label="edit" onClick={()=>this.ViewFunc(e.data)}>
                <VisibilityIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data)}>
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
        if(this.state.selectedDataDelete.peerAddressType==="INGRESS_PEER"){
            const selectedData=this.props.deleteDataList.filter(config=>{
                return config.ingressProfileName === this.state.selectedDataDelete.profileName
            })
            delete (selectedData[0].id);
            srv.props.deletePeerConfig(selectedData[0]);
        }
        else if(this.state.selectedDataDelete.peerAddressType==="EGRESS_PEER"){
            const selectedData=this.props.deleteDataList.filter(config=>{
                return config.egressProfileName === this.state.selectedDataDelete.profileName
            })
            delete (selectedData[0].id);
            srv.props.deletePeerConfig(selectedData[0]);
        }
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
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Peer Configuration", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.peerdataGrid.rowData,
        dataGrid : state.peerdataGrid,
        apiError: state.peerdataGrid.apiError,
        deleteDataList : state.peernewEditDialog.peerEditData
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        editIPData,
        editEPData,
        deletePeerConfig
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(PeerConfigDataGrid);
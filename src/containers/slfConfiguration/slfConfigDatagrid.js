import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import {setDeleteAlertState,setDialogType,setDialogState,setCurrentSlfConfigDataOnEdit} from '../../actions/slfconfiguration';
import {setErrorOnCall,deleteSlfConfig} from '../../actions/slfconfiguration/commonservices';
import {gridOptions} from '../../actions/slfconfiguration/gridOptionsData';
import "../../styles/messageFilter/ReDataGrid.css";


let srv;
class SlfConfigDataGrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedSlfConfigNameToDelete:""
        }
    }

    EditFunc=(ConfigName)=>{
        srv.props.setDialogType('edit');
        this.props.setCurrentSlfConfigDataOnEdit(ConfigName)
        this.props.setDialogState(true);
    }

    deleteFunc=(ConfigName)=>{
        this.setState({selectedSlfConfigNameToDelete:ConfigName},()=>{
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
            <Tooltip key="nfConfig_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.serverConfigName)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="nfConfig_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.serverConfigName)}>
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
        const [selectedSlfConfig]=this.props.slfConfigs.filter(config=>{
            return config.slfServerConfigs.serverConfigName === this.state.selectedSlfConfigNameToDelete
        })
        const selectedSlfConfigId=selectedSlfConfig.slfConfigId
        srv.props.deleteSlfConfig(selectedSlfConfigId);
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
        rowData: state.slfConfigdataGrid.rowData,
        dataGrid : state.slfConfigdataGrid,
        apiError: state.slfConfigdataGrid.apiError,
        slfConfigs:state.slfConfignewEditDialog.slfConfigs
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDeleteAlertState,
        setDialogType,
        setDialogState,
        setErrorOnCall,
        setCurrentSlfConfigDataOnEdit,
        deleteSlfConfig
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfConfigDataGrid);
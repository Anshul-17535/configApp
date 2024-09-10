import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from "axios";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import {setDialogType,setDeleteAlertState,editTracingConfig,setDialogState,setContextDataOnEdit,setLoadingState} from '../../actions/throttling';
import {setErrorOnCall,deleteRecord,setListContextForAttributes,setListContextForActions,setContextData,activateOrInactivateConfig} from '../../actions/throttling/commonServices'
import "../../styles/throttling/ReDataGrid.css";
import StateToggleCellRenderer from './stateToggleCellRenderer'
import { gridOptions } from '../../actions/throttling/gridOptionsData';

let _ = require('underscore');


let srv;
class THDatagrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedConfigNameToDelete:""
        }
    }

    deleteFunc=(selectedConfigName)=>{
        this.setState({selectedConfigNameToDelete:selectedConfigName},()=>{
            this.props.setDeleteAlertState(true)
        })
    }
    EditFunc=(tracingConfigName)=>{
        srv.props.setDialogType('edit');
        const {tracingConfigsList}=this.props
        const tracingConfigIndex = tracingConfigsList.findIndex(item => item.name === tracingConfigName);
        this.props.editTracingConfig(tracingConfigIndex)
        this.props.setDialogState(true);
        this.props.setListContextForAttributes()
        this.props.setListContextForActions()

        let filterCriteriaList=[]
        let filterActionsList=[]

        tracingConfigsList[tracingConfigIndex].filterGroup.filters.map((filterObj)=>{
            filterObj.filterCriteria.map((criteriaObj)=>{
                filterCriteriaList=[...filterCriteriaList,criteriaObj.context]
            })
            filterObj.filterActions.map((actionObj)=>{
                filterActionsList=[...filterActionsList,actionObj.context]
            })
        })
        let CombinedList=_.union(filterCriteriaList,filterActionsList)
        this.props.setLoadingState(true)
        const promises = CombinedList.map(context => {
            const Url = `https://${window.location.host}/config/scp/v1/msgfilter/context?formname=Throttling&contextname=${encodeURIComponent(context)}&advancedview=false`;
            return axios.get(Url,{
                params: {context:context}})
        })
        Promise.all(promises).then(results => {
            results.map(res=>{
                this.props.setContextDataOnEdit(res.data,res.config.params.context)
            })
            this.props.setLoadingState(false)
        })
    }

    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="mf_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.name)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="mf_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.name)}>
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
        srv.props.deleteRecord(this.state.selectedConfigNameToDelete);
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
                    frameworkObj={{btnCellRenderer: StateToggleCellRenderer}}
                />
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Throttling", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.thdataGrid.rowData,
        dataGrid : state.thdataGrid,
        dialogType:state.thnewEditDialog.dialogType,
        apiError: state.thdataGrid.apiError,
        tracingConfigsList:state.thnewEditDialog.tracingConfigs
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogType,
        setDeleteAlertState,
        setErrorOnCall,
        deleteRecord,
        editTracingConfig,
        setDialogState,
        setListContextForAttributes,
        setListContextForActions,
        setContextData,
        activateOrInactivateConfig,
        setContextDataOnEdit,
        setLoadingState
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(THDatagrid);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from "axios";
import DataGridCCFK from '../../ccfk-components/DataGridCCFK';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import IconButton from "@nokia-csf-uxr/ccfk/IconButton";
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import ExportIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ExportIcon';
import VisibilityIcon from '@nokia-csf-uxr/ccfk-assets/legacy/VisibilityIcon';
import { setExportDialog } from '../../actions/messagefilter';
import ExportBox from './ExportBox';
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import CheckIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CheckIcon';
import {setDialogType,setDeleteAlertState,setActiveState,editTracingConfig,setDialogState,setContextDataOnEdit,setLoadingState} from '../../actions/messagefilter';
import {getAllData,setErrorOnCall,deleteRecord,setListContextForAttributes,exportOne,setListContextForActions,setContextData,activateOrInactivateConfig} from '../../actions/messagefilter/commonServices';
import "../../styles/messageFilter/ReDataGrid.css";

import rulesData from '../../actions/messagefilter/messageFilterGridData.json';
let _ = require('underscore');


let srv;
class MfDatagrid extends Component {
    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedConfigNameToDelete:"",
            stateName : "",
            stateValue : true
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
    componentWillMount() {
        srv.props.getAllData();
        srv.props.setExportDialog(false);
    }
    onActive(data){
        const checkStatus = data.state === 'ACTIVE'?true:false
        this.setState({stateName:data.name,stateValue:checkStatus},()=>{
            this.props.setActiveState(true)
        })
    }

    deleteFunc=(selectedConfigName)=>{
        this.setState({selectedConfigNameToDelete:selectedConfigName},()=>{
            this.props.setDeleteAlertState(true)
        })
    }
    viewFunc=(tracingConfigName)=>{
        srv.props.setDialogType('view');
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
            const Url = `https://${window.location.host}/config/scp/v1/msgfilter/context?formname=tracing&contextname=${encodeURIComponent(context)}&advancedview=false`;
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
            const Url = `https://${window.location.host}/config/scp/v1/msgfilter/context?formname=tracing&contextname=${encodeURIComponent(context)}&advancedview=false`;
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
    ExportPopup = () => {
        return (
            <ExportBox/>
            )
    }
    onExport(tracingConfigName){
        this.props.exportOne(tracingConfigName);
        this.props.setExportDialog(true);
        }

    
    getInlineRowActions=(e)=>{
        return [
            <Tooltip key="mf_edit" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Edit">
                <IconButton size="large" aria-label="edit" onClick={()=>this.EditFunc(e.data.name)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip key="mf_view" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="View">
            <IconButton size="large" aria-label="view" onClick={()=>this.viewFunc(e.data.name)}>
                <VisibilityIcon />
            </IconButton>
            </Tooltip>,
            <Tooltip key="mf_active" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
            tooltip={e.data.state === "ACTIVE"?"DEACTIVATE":"ACTIVATE"}>
                <IconButton size="large" onClick={() => this.onActive(e.data)} >
                    <CheckIcon/>
                </IconButton>
            </Tooltip>,
            <Tooltip key="mf_delete" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
            tooltip="Delete">
                <IconButton size="large" aria-label="delete" onClick={()=>this.deleteFunc(e.data.name)}>
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

    onActClose = ( ) => {
        srv.props.setActiveState(false)
    }

    alertActivatePopup = () => {
        return (<ErrorDialogCCFK 
            title={`${this.state.stateValue?'DEACTIVATE':'ACTIVATE'}`} 
            variant="CONFIRM" 
            message={"Please Select Confirm To proceed"}
            confirmationButtonLabel="CONFIRM"
            onClose={srv.onActClose}
            onConfirm={srv.onActConfirm}
        />)
    }
    onActConfirm = () => {
        this.props.activateOrInactivateConfig(this.state.stateName,!(this.state.stateValue))
        srv.props.setActiveState(false);
    }
    

    onConfirm = () => {
        srv.props.deleteRecord(this.state.selectedConfigNameToDelete);
        srv.props.setDeleteAlertState(false);
    }
    componentDidMount(){
        srv.props.setDeleteAlertState(false);
        srv.props.setActiveState(false)
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
                {srv.props.dataGrid.showDeleteAlert && srv.alertConfirmationPopup("Delete Tracing Configuration", "Are you sure , you wish to delete the configuration ? ")}
                {srv.props.dataGrid.showActive && srv.alertActivatePopup()}
                {srv.props.dataGrid.showErrorAlert && srv.alertErrorPopup()}
                {srv.props.exportstate && srv.ExportPopup()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        rowData: state.mfdataGrid.rowData,
        dataGrid : state.mfdataGrid,
        dialogType:state.mfnewEditDialog.dialogType,
        apiError: state.mfdataGrid.apiError,
        tracingConfigsList:state.mfnewEditDialog.tracingConfigs,
        exportstate: state.mfnewEditDialog.exportdialog
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
        setLoadingState,
        setExportDialog,
        exportOne,
        getAllData,
        setActiveState
    }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(MfDatagrid);
import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import {setDialogState} from "../../actions/throttling";
import {setErrorOnValidation} from '../../actions/throttling'
import {createTracingConfig,updateTracingConfig} from '../../actions/throttling/commonServices'
import MFNameState from './MFNameState'
import MFGroup from './MFGroup'
import {isTracingConfigNameEmpty,isFilterNameOrActionEmpty,isNumberOfFiltersZero,isContextOrNameEmptyInAction,isContextOrNameEmptyInCriteria,isValueMissingInAction,isValueMissingInCriteria,isMessageFilterNameNotUnique,isDuplicateActionsPresent} from './validationFunctions'
import ProgressIndicatorCircularCCFK from '../../ccfk-components/ProgressIndicatorCircularCCFK';
import "../../styles/throttling/AddEditDialog.css";

let _ = require('underscore');

class AddEditDialog extends Component{

    constructor(props){
        super(props)
        this.state={
            ValidationErrorMessage:""
        }
    }

    handleRenderFooterCancelClick=()=>{
        this.props.setDialogState(false)
    }

    modifiedTracingConfig=()=>{
        let tracingConfigCopy=this.props.tracingConfig
        let filterCopy=tracingConfigCopy.filterGroup.filters
        filterCopy.map((filterObj) => {
            let newfilterCriteria=filterObj.filterCriteria.map(({isOpen,id,...restCriteria})=>restCriteria)
            let newfilterActions=filterObj.filterActions.map(({isOpen,id,...restActions})=>restActions)
            filterObj.filterCriteria=newfilterCriteria
            filterObj.filterActions=newfilterActions
        })
        let newFilters = filterCopy.map(({ isOpen,id, ...rest }) =>rest )
        tracingConfigCopy.filterGroup.filters=newFilters
        return tracingConfigCopy
    }

    handleRenderFooterSaveClick=()=>{
        const {filters}=this.props.tracingConfig.filterGroup
        switch(true){
            case isTracingConfigNameEmpty(this.props.tracingConfig):
                this.setState({ValidationErrorMessage:"Empty Config name"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isNumberOfFiltersZero(filters):
                this.setState({ValidationErrorMessage:"Config must have atleast 1 Filter"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;   
            case isFilterNameOrActionEmpty(filters):
                this.setState({ValidationErrorMessage:"Empty Filter name and/or Action"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isContextOrNameEmptyInAction(filters):
                this.setState({ValidationErrorMessage:"Empty Context and/or Name in Action"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isContextOrNameEmptyInCriteria(filters):
                this.setState({ValidationErrorMessage:"Empty Context and/or Name in Criteria"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isValueMissingInAction(filters):
                this.setState({ValidationErrorMessage:"Values Missing in Action"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isValueMissingInCriteria(filters):
                this.setState({ValidationErrorMessage:"Values Missing in Criteria"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isMessageFilterNameNotUnique(filters):
                this.setState({ValidationErrorMessage:"Filter Names should be unique"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case this.props.tracingConfig.state==="ACTIVE":
                this.setState({ValidationErrorMessage:"Cannot Save Changes in Active Config"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isDuplicateActionsPresent(filters):
                this.setState({ValidationErrorMessage:"Duplicate Actions Not Allowed"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            default:
                if(this.props.dialogType==="edit"){
                    this.props.updateTracingConfig(this.modifiedTracingConfig(),this.props.tracingConfig.name)
                }else{
                    this.props.createTracingConfig(this.modifiedTracingConfig())
                }
                this.props.setDialogState(false)
                break;
        }
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" disabled={this.props.errorState.length>0} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    onErrorClose = () =>{
        this.props.setErrorOnValidation(false);
    }

    ValidationErrorPopup = () => {
        return (<ErrorDialogCCFK title={"Error!"} variant="ERROR" message={this.state.ValidationErrorMessage} detailsText={""} onClose={this.onErrorClose}/>)
    
    }

    render(){
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Throttling Profile`}
                onClose={this.handleRenderFooterCancelClick}
                renderFooter={this.renderFooter}
                dialogStyle={{
                    "content": {
                    "top":"1%",
                    "bottom":"1%",
                    "height": "98%",
                    "left": "1%",
                    "right": "1%",
                    "width": "98%"
                    }
                }}
                footerStyle={{"display":"flex","justifyContent":"center"}}
            >
                    {this.props.loading?<div style={{position: "absolute",top: "40%",left: "45%"}}><ProgressIndicatorCircularCCFK overlay={true} size="xxlarge"/></div>:
                    <>
                        <MFNameState/>
                        <MFGroup/>
                        {this.props.showValidationError && this.ValidationErrorPopup()}
                    </>
                    }

            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        mfnewEditDialog: state.thnewEditDialog,
        tracingConfig:state.thnewEditDialog.currentTracingConfig,
        configsList:state.thnewEditDialog.tracingConfigs,
        showValidationError:state.thnewEditDialog.showValidationError,
        dialogType:state.thnewEditDialog.dialogType,
        errorState:state.thnewEditDialog.errorState,
        loading:state.thnewEditDialog.loading
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        createTracingConfig,
        setErrorOnValidation,
        updateTracingConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
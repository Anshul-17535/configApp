import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import {setDialogState,setCurrentNfServiceConfigOnEdit,setErrorOnValidation} from '../../actions/slfnfservice';
import SlfNfServiceContainer from './SlfNfServiceContainer';
import {createNfServiceConfig,updateNfServiceConfig} from '../../actions/slfnfservice/commonservices';
import {bindActionCreators} from "redux";
import {missingMandatoryParameters,failedValidations} from './validationFunctions';
import '../../styles/slfnfservice/SlfNfServiceInputGroup.css';
let _ = require('underscore');


class AddEditDialog extends Component{

    constructor(props) {
        super(props);
        this.nfServiceRef = React.createRef();
        this.state={
            ValidationErrorMessage:""
        }
      }

    handleRenderFooterCancelClick=()=>{
        this.props.setDialogState(false)
        this.props.setCurrentNfServiceConfigOnEdit({})
    }

    handleRenderFooterSaveClick=()=>{
        const {state}=this.nfServiceRef.current
        const failedValidationObj=failedValidations(state)
        switch(true){
            case missingMandatoryParameters(state):
                this.setState({ValidationErrorMessage:"Mandatory Fields Empty"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case failedValidationObj[0]:
                this.setState({ValidationErrorMessage:failedValidationObj[1]},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            default:
                if(this.props.dialogType==="edit"){
                    this.props.updateNfServiceConfig(this.returnModifiedConfig(state))
                }else{
                    this.props.createNfServiceConfig(this.returnModifiedConfig(state))
                }
                break;
        }
    }

    returnModifiedConfig=(Config)=>{
        let NfServiceMapObj={}
        NfServiceMapObj=_.extend(NfServiceMapObj,Config.NFServiceMap,{"ipEndPoints":Config.ipEndPoints},{"allowedPlmns":Config.allowedPlmns},{"allowedNssais":Config.allowedNssais},{"versions":Config.versions},{"defaultNotificationSubscriptions":Config.defaultNotificationSubscriptions})
        if(NfServiceMapObj.interPlmnFqdn.trim()===""){
            NfServiceMapObj=_.omit(NfServiceMapObj,"interPlmnFqdn")
        }
        let result={"NFService":{"NFServiceMap":[NfServiceMapObj]}}
        return result
    }

    renderFooter=()=>{
        return <div className="nfServiceFooter">
            <ButtonCCFK text="SAVE" onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
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
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} SLF NFService`}
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
                <SlfNfServiceContainer ref={this.nfServiceRef} onSubmit={this.onSubmit}/>
                {this.props.showValidationError && this.ValidationErrorPopup()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfNfServicenewEditDialog.dialogType,
        showValidationError:state.slfNfServicenewEditDialog.showValidationError
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        createNfServiceConfig,
        updateNfServiceConfig,
        setCurrentNfServiceConfigOnEdit,
        setErrorOnValidation
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
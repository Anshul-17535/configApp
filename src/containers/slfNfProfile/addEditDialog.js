import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import {setDialogState,setErrorOnValidation,setTabIndex,setNfServiceTabState,updateNfService,setSelectedNfServiceConfig,createNfService} from '../../actions/slfnfprofile';
import {updateNfProfileConfig,createNfProfileConfig} from '../../actions/slfnfprofile/commonservices';
import NfProfileContainer from './NfProfileContainer';
import { missingMandatoryParameters,invalidServiceInstanceId,duplicateServiceInstanceId} from './NfService/validationFunctions';
import {failedValidations} from '../slfNfService/validationFunctions';
import {failedValidationsNfService} from './NfService/validationFunctions';
import {failedValidationsNfProfile} from './validationFunctions';
import {removeSpecifiedKeysFromPlmnList} from './NfService/helperFunctions';
import {bindActionCreators} from "redux";
import "../../styles/slfnfprofile/SlfNfProfileInputGroup.css";
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
        this.props.setTabIndex(0)
        this.props.setNfServiceTabState(false)
        this.props.setDialogState(false)
        this.props.setSelectedNfServiceConfig({})
    }

    returnModifiedNfServiceConfig=(Config)=>{
        let NfServiceMapObj={}
        NfServiceMapObj=_.extend(NfServiceMapObj,Config.NFServiceMap,{"ipEndPoints":Config.ipEndPoints},{"allowedPlmns":Config.allowedPlmns},{"allowedNssais":Config.allowedNssais},{"versions":Config.versions},{"defaultNotificationSubscriptions":Config.defaultNotificationSubscriptions})
        let allowedPlmnsCopy=NfServiceMapObj.allowedPlmns.slice();
        NfServiceMapObj.allowedPlmns=removeSpecifiedKeysFromPlmnList(allowedPlmnsCopy)
        if(NfServiceMapObj.interPlmnFqdn.trim()===""){
            NfServiceMapObj=_.omit(NfServiceMapObj,"interPlmnFqdn")
        }
        return NfServiceMapObj
    }

    returnModifiedNfProfileConfig=(Config)=>{
        let ConfigCopy={...Config}
        if(ConfigCopy.interPlmnFqdn.trim()===""){
            ConfigCopy=_.omit(ConfigCopy,"interPlmnFqdn")
        }
        if(ConfigCopy.udmInfo.groupId.trim()===""){
            ConfigCopy=_.omit(ConfigCopy,"udmInfo")
        }
        return {"NFProfile":{"NFMap":[ConfigCopy]}}
    }

    handleRenderFooterNfServiceSaveClick=()=>{
        const {state}=this.nfServiceRef.current
        const failedValidationObj=failedValidations(state)
        const failedValidationsNfServiceObj=failedValidationsNfService(state)
        switch(true){
            case missingMandatoryParameters(state):
                this.setState({ValidationErrorMessage:"Mandatory Fields Empty in Nf Service"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case invalidServiceInstanceId(state):
                this.setState({ValidationErrorMessage:"Invalid serviceInstanceId"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case duplicateServiceInstanceId(this.props.slfNfProfileConfig,state,this.props.nfserviceTabType):
                this.setState({ValidationErrorMessage:"Duplicate serviceInstanceId"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case failedValidationObj[0]:
                this.setState({ValidationErrorMessage:failedValidationObj[1]},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case failedValidationsNfServiceObj[0]:
                this.setState({ValidationErrorMessage:failedValidationsNfServiceObj[1]},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            default:
                this.props.setTabIndex(2)
                this.props.setNfServiceTabState(false)
                if(this.props.nfserviceTabType==="edit"){
                    this.props.updateNfService(this.returnModifiedNfServiceConfig(state),state.NFServiceMap.serviceInstanceId)
                }else{
                    this.props.createNfService(this.returnModifiedNfServiceConfig(state))
                }
                break;
        }
    }

    handleRenderFooterNfServiceCancelClick=()=>{
        this.props.setTabIndex(2)
        this.props.setNfServiceTabState(false)
        this.props.setSelectedNfServiceConfig({})
    }

    handleRenderFooterSaveClick=()=>{
        const {nfInstanceId,nfType,nfStatus,fqdn}=this.props.slfNfProfileConfig
        const failedValidationsNfProfileObj=failedValidationsNfProfile(this.props.slfNfProfileConfig)
        switch(true){
            case nfInstanceId===""||nfType===""||nfStatus===""||fqdn==="":
                this.setState({ValidationErrorMessage:"Mandatory Fields Empty in Nf Profile"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case failedValidationsNfProfileObj[0]:
                this.setState({ValidationErrorMessage:failedValidationsNfProfileObj[1]},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            default:
                if(this.props.dialogType==="edit"){
                    this.props.updateNfProfileConfig(this.returnModifiedNfProfileConfig(this.props.slfNfProfileConfig))
                }else{
                    this.props.createNfProfileConfig(this.returnModifiedNfProfileConfig(this.props.slfNfProfileConfig))
                }
                break;
        }
    }

    renderFooter=()=>{
        if(this.props.nfserviceTabState){
            return <div className="nfProfileFooter">
                <ButtonCCFK text="SAVE" onClick={this.handleRenderFooterNfServiceSaveClick} variant="call-to-action" />
                <ButtonCCFK text="CANCEL" onClick={this.handleRenderFooterNfServiceCancelClick}/>
            </div>
        }
        return <div className="nfProfileFooter">
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
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} SLF NFProfile`}
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
                <NfProfileContainer nfServiceRef={this.nfServiceRef}/>
                {this.props.showValidationError && this.ValidationErrorPopup()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfNfServicenewEditDialog.dialogType,
        showValidationError:state.mfnewEditDialog.showValidationError,
        nfserviceTabState:state.slfNfProfilenewEditDialog.nfserviceTabState,
        nfserviceTabType:state.slfNfProfilenewEditDialog.nfserviceTabType,
        slfNfProfileConfig:state.slfNfProfilenewEditDialog.currentSlfNfProfileConfig
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        setErrorOnValidation,
        setTabIndex,
        setNfServiceTabState,
        updateNfService,
        updateNfProfileConfig,
        createNfProfileConfig,
        setSelectedNfServiceConfig,
        createNfService
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
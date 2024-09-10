import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState} from '../../actions/staticProfile';
import PeerNFForm from './PeerNFForm';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import {bindActionCreators} from "redux";
import {getAllData,createStatProfConfig,updateStatProfConfig} from '../../actions/staticProfile/commonservices'
import {setNFErrorOnValidation} from '../../actions/staticProfile/index'
import { groupIdCheck } from './helperFunctions';
import {isNFServiceIpEndPointValueEmpty,isNFProfileValuesEmpty,isNFServiceIpEndPointEmpty,isNFServiceEmpty,isNFServiceValuesEmpty,isNFServiceVersionsEmpty,isNFServiceVersionsValueEmpty} from './validationFunction'

const nfTypeByGID = ['UDR','UDM','AUSF','PCF','CHF','HSS','UDSF','5G_EIR']

class AddEditDialog extends Component{

    constructor(props){
        super(props)
        this.state={
            ValidationErrorMessage:""
        }
    }

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    handleRenderFooterSaveClick=()=>{
        switch(true){
            case isNFProfileValuesEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"Required Values In Profiles Are Empty"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"There should be atleast one NF Service Added"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceValuesEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"Required Values in NF service is Empty"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceIpEndPointEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"FQDN or IPEndPoint atleast one should be filled at Profile or Service Level"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceIpEndPointValueEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"FQDN is Empty on Profile and Service Level So IPV4 or IPV6 Address in IPEndPoint should be filled"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceVersionsEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"There should be atleast one Versions added"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            case isNFServiceVersionsValueEmpty(this.props.currentStatProf):
                this.setState({ValidationErrorMessage:"Requred value in NF service Versions is Empty"},()=>{
                    this.props.setNFErrorOnValidation(true)
                })
                break;
            default:
                if(groupIdCheck(nfTypeByGID,this.props.currentStatProf.peerNfProfiles.peerNfProfile[0].nfType)){
                    delete this.props.currentStatProf.peerNfProfiles.peerNfProfile[0].groupId
                }
                if(this.props.dialogType==="edit"){
                    this.props.updateStatProfConfig(this.props.currentStatProf.peerNfProfiles.peerNfProfile[0])
                }else{
                    this.props.createStatProfConfig(this.props.currentStatProf.peerNfProfiles.peerNfProfile[0])
                }
                this.props.setDialogState(false)
                break;
        }
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" disabled={this.props.dialogType === "view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    onErrorClose = () =>{
        this.props.setNFErrorOnValidation(false);
    }

    ValidationErrorPopup = () => {
        return (<ErrorDialogCCFK title={"Error!"} variant="ERROR" message={this.state.ValidationErrorMessage} detailsText={""} onClose={this.onErrorClose}/>)
    
    }

    render(){
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Peer NF`}
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
                <PeerNFForm dialogType={this.props.dialogType} newData={this.props.currentStatProf}/>
                {this.props.showValidationError && this.ValidationErrorPopup()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.statprofnewEditDialog.dialogType,
        showValidationError:state.statprofnewEditDialog.showValidationError,
        currentStatProf:state.statprofnewEditDialog.currentStatProf
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        getAllData,
        setNFErrorOnValidation,
        createStatProfConfig,
        updateStatProfConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
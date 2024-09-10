import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {setDialogState} from '../../actions/fieldDefination';
import FieldProfileForm from './fieldProfileForm';
import {bindActionCreators} from "redux";
import {updateFdcConfig,createFdcConfig} from '../../actions/fieldDefination/commonservices'
import {setDestination,setSuffix,setFdcName,setFdcMessageType,setFdcFieldChange,setPrefix,setAddCheck} from '../../actions/fieldDefination/index';

// let showList=[]


class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.setDialogState(false)
    }



    handleRenderFooterSaveClick=()=>{
        
        const {THRdata,addCheck} = this.props
        if(addCheck === 'false'){
            delete THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns
        }
        if(addCheck === 'true' && THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.suffix === ''){
            delete THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.suffix
        }
        if(this.props.dialogType==="edit"){
            this.props.updateFdcConfig(THRdata)
        }else{
            this.props.createFdcConfig(THRdata)
        }
        this.props.setDialogState(false)
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" disabled={this.props.dialogType === "view" || this.props.THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].id === "" || this.props.THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].messageType === "" || this.props.THRdata.fieldDefinitionConfigs.fieldDefinitionCfg[0].fieldType === ""}  onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    handleNameChange=(value)=>{
        this.props.setFdcName(value)
    }

    handleMessageType=(value)=>{
        if(!!value){
        this.props.setFdcMessageType(value)
        }
    }

    handleFieldTypeChange=(value)=>{
        if(!!value){
            this.props.setFdcFieldChange(value)
            }
    }

    handleAddOns=(value)=>{
        this.props.setAddCheck(value)
    }

    handlePrefixChange=(value)=>{
        this.props.setPrefix(value)
    }

    handleSuffixChange=(value)=>{
        this.props.setSuffix(value)
    }

    handleDefination=(value)=>{
        this.props.setDestination(value)
    }

    render(){
        const newData=this.props.THRdata
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Field Defination Profile`}
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
                <FieldProfileForm newData={newData} handleSuffixChange={this.handleSuffixChange} handlePrefixChange={this.handlePrefixChange} handleNameChange={this.handleNameChange} handleMessageType={this.handleMessageType} handleFieldTypeChange={this.handleFieldTypeChange} handleAddOns={this.handleAddOns} handleDefination={this.handleDefination} />
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.fdcnewEditDialog.dialogType,
        THRdata:state.fdcnewEditDialog.currentFDCConfig,
        addCheck:state.fdcnewEditDialog.addCheck
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        // getAllData,
        updateFdcConfig,
        createFdcConfig,
        setFdcName,
        setFdcMessageType,
        setFdcFieldChange,
        setDestination,
        setPrefix,
        setAddCheck,
        setSuffix
        // setedrResponseFields
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
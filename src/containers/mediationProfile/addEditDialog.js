import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {setDialogState} from '../../actions/mediationProfile';
import MediationProfileForm from './mediationProfileForm';
import {bindActionCreators} from "redux";
import {updateMpcConfig,createMpcConfig} from '../../actions/mediationProfile/commonservices'
import {setDestination,setMpcName,setMpcProfileChange,setMpcSourceChange,setMpcSource,handleMpcPatternChange,setedrResponseFields} from '../../actions/mediationProfile/index';

let showList=[]


class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.setDialogState(false)
    }



    handleRenderFooterSaveClick=()=>{
        
        const {THRdata} = this.props
        if(THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'CONSTANT') {
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].patternData
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].timeData
        }
        if(THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'CURRENT_TIME') {
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].patternData
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].constantData
        }
        if(THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'BODY' || THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === 'HEADER') {
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].constantData
            delete THRdata.mediationProfileConfigs.mediationProfileCfg[0].timeData
        }
        if(this.props.dialogType==="edit"){
            this.props.updateMpcConfig(THRdata)
        }else{
            this.props.createMpcConfig(THRdata)
        }
        this.props.setDialogState(false)
    }

    renderFooter=()=>{
        const{sourceType,constantData,timeData,patternData}=this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0]
        switch(sourceType){
            case'HEADER':{
                return <div>
                              <ButtonCCFK text="SAVE" disabled={patternData.matchingGroups.length === 0 || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].source === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].id === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].messageType === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === "" || this.props.dialogType==="view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
                        </div>
            }
            case'BODY':{
                return <div>
                              <ButtonCCFK text="SAVE" disabled={patternData.matchingGroups.length === 0 || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].source === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].id === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].messageType === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === "" || this.props.dialogType==="view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
                        </div>
            }
            case'CONSTANT':{
                return <div>
                              <ButtonCCFK text="SAVE" disabled={constantData.matchingGroups.length === 0 || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].id === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].messageType === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === "" || this.props.dialogType==="view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
                        </div>
            }
            case'CURRENT_TIME':{
                return <div>
                              <ButtonCCFK text="SAVE" disabled={timeData.matchingGroups.length === 0 || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].id === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].messageType === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === "" || this.props.dialogType==="view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
                        </div>
            }
            default :{
                return <div>
                <ButtonCCFK text="SAVE" disabled={ this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].id === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].messageType === "" || this.props.THRdata.mediationProfileConfigs.mediationProfileCfg[0].sourceType === "" || this.props.dialogType==="view"} onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
                      </div>
            }
        }
        
    }

    handleNameChange=(value)=>{
        this.props.setMpcName(value)
    }

    handleProfileChange=(value)=>{
        if(!!value){
        this.props.setMpcProfileChange(value)
        }
    }

    handleSourceTypeChange=(value)=>{
        if(!!value){
            this.props.setMpcSourceChange(value)
            }
    }

    handlesource=(value)=>{
        this.props.setMpcSource(value)
    }


    

    handleResponseFields=(value)=>{
        this.props.setedrResponseFields(value)
    }

    handleDestinationName=(value)=>{
        this.props.setDestination(value)
    }

    render(){
        const newData=this.props.THRdata
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Mediation Profile`}
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
                <MediationProfileForm newData={newData}  handleNameChange={this.handleNameChange} handleProfileChange={this.handleProfileChange} handleSourceTypeChange={this.handleSourceTypeChange} handlesource={this.handlesource} handleDestinationName={this.handleDestinationName} />
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.mpcnewEditDialog.dialogType,
        THRdata:state.mpcnewEditDialog.currentMPCConfig,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        updateMpcConfig,
        createMpcConfig,
        setMpcName,
        setMpcProfileChange,
        setMpcSourceChange,
        setMpcSource,
        handleMpcPatternChange,
        setDestination,
        setedrResponseFields
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
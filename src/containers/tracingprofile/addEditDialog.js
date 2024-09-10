import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {setDialogState} from '../../actions/tracingprofile';
import TracingProfileForm from './tracingProfileForm';
import {bindActionCreators} from "redux";
import {updateThrConfig,createThrConfig} from '../../actions/tracingprofile/commonservices'
import {setDestination,setName,setProfileChange,setSR,setOutputFormat,setOutputDestination,setedrRequestFields,setedrResponseFields} from '../../actions/tracingprofile/index';

let showList=[]


class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.setDialogState(false)
    }



    handleRenderFooterSaveClick=()=>{
        
        const {THRdata} = this.props
        if( THRdata.tracingProfileConfigs.tracingProfileConfig[0].profileType === "HEP3" || THRdata.tracingProfileConfigs.tracingProfileConfig[0].profileType ===  "MIRROR"){
            delete THRdata.tracingProfileConfigs.tracingProfileConfig[0].outputFormat
            if( THRdata.tracingProfileConfigs.tracingProfileConfig[0].profileType === "HEP3" && THRdata.tracingProfileConfigs.tracingProfileConfig[0].hepInterface === 'vTAP' ){
                THRdata.tracingProfileConfigs.tracingProfileConfig[0].hepInterface = 'VTAP'
            }
        }
        if(THRdata.tracingProfileConfigs.tracingProfileConfig[0].profileType !== 'HEP3'){
            delete THRdata.tracingProfileConfigs.tracingProfileConfig[0].hepInterface
        }
        
        if(this.props.dialogType==="edit"){
            this.props.updateThrConfig(THRdata)
        }else{
            this.props.createThrConfig(THRdata)
        }
        this.props.setDialogState(false)
    }

    renderFooter=()=>{
        const {destinationName,outputDestination,outputFormat,profileType,name,hepInterface} = this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0]
        return <div>
            <ButtonCCFK text="SAVE" disabled={this.props.dialogType==="view" || destinationName === '' || outputDestination === '' || outputFormat === '' || profileType === '' || name === '' || (profileType === 'HEP3' && (hepInterface === '' || hepInterface === null))}  onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    handleNameChange=(value)=>{
        this.props.setName(value)
    }

    handleProfileChange=(value)=>{
        if(!!value){
        this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0].destinationName=""
        this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0].outputDestination=""
        this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0].hepInterface=""
        this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0].requestFields=""
        this.props.THRdata.tracingProfileConfigs.tracingProfileConfig[0].responseFields=""
        this.props.setProfileChange(value)
        }
    }
    handleSR=(value)=>{
        this.props.setSR(value)
    }

    handleOutputFormat=(value)=>{
        if(!!value){
        this.props.setOutputFormat(value)
        }
    }

    handleSend=(value)=>{
        switch(value){
            case 'HTTP SERVER':{
                return this.props.namehttp
            }
            case 'KAFKA':{
                return this.props.namekafka
            }
            case 'REMOTE FILE':{
                return this.props.namerm
            }
            case 'HEP3 Server':{
                return this.props.namehep3
            }
            case 'Mirror Server':{
                return this.props.namemirror
            }
            default:{
                return []
            }
        }
    }

    componentWillMount=()=>{
    const {THRdata,dialogType} = this.props
        if(dialogType === 'edit' || dialogType === 'view'){
            switch(THRdata.tracingProfileConfigs.tracingProfileConfig[0].outputDestination){
                case 'HTTP SERVER':{
                    showList= this.props.namehttp
                }
                case 'KAFKA':{
                    showList= this.props.namekafka
                }
                case 'REMOTE FILE':{
                    showList= this.props.namerm
                }
                case 'HEP3 Server':{
                    showList= this.props.namehep3
                }
                case 'Mirror Server':{
                    showList= this.props.namemirror
                }
                default:{
                    showList= []
                }
        }}
    }

    handleOutputDestination=(value)=>{
        if(!!value){this.props.setOutputDestination(value)
        showList=this.handleSend(value)
    }
    }

    edrRequestFields=(value)=>{
        this.props.setedrRequestFields(value)
    }

    handleResponseFields=(value)=>{
        this.props.setedrResponseFields(value)
    }

    handleDestinationName=(value)=>{
        if(!!value){this.props.setDestination(value)}
    }

    render(){
        const newData=this.props.THRdata
        const dataList= this.props.data3
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Tracing Profile`}
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
                {/* <MultiSelectCCFK dataList={this.props.request} title='REQUEST FIELDS'/> */}
                <TracingProfileForm handleMulti={this.handleMulti} handleMulti2={this.handleMulti2} showList={showList} newData={newData} dataList={dataList} handleNameChange={this.handleNameChange} handleProfileChange={this.handleProfileChange} handleSR={this.handleSR} handleOutputFormat={this.handleOutputFormat} handleOutputDestination={this.handleOutputDestination} handleDestinationName={this.handleDestinationName} />
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.tcpnewEditDialog.dialogType,
        THRdata:state.tcpnewEditDialog.currentTHRCConfig,
        data3:state.tcptoolbar.inboundpofile,
        namehttp:state.tcpnewEditDialog.name1,
        namekafka:state.tcpnewEditDialog.name2,
        namerm:state.tcpnewEditDialog.name3,
        namehep3:state.tcpnewEditDialog.name4,
        namemirror:state.tcpnewEditDialog.name5,
        request:state.tcpnewEditDialog.dataBundle1,
        response:state.tcpnewEditDialog.dataBundle2
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        // getAllData,
        updateThrConfig,
        createThrConfig,
        setName,
        setProfileChange,
        setSR,
        setOutputFormat,
        setOutputDestination,
        setDestination,
        setedrRequestFields,
        setedrResponseFields
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
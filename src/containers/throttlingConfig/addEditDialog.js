import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {setDialogState} from '../../actions/throttlingconfig';
import ThrottingConfigForm from './throttlingConfigForm';
import {bindActionCreators} from "redux";
import {getAllData,updateThrConfig,createThrConfig} from '../../actions/throttlingconfig/commonservices'
import {setName,setProfileChange,setAlarm,setCTIBAChange} from '../../actions/throttlingconfig/index';


class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    handleRenderFooterSaveClick=()=>{
        const {THRdata} = this.props
        if(this.props.dialogType==="edit"){
            this.props.updateThrConfig(THRdata,THRdata.name)
        }else{
            this.props.createThrConfig(THRdata)
        }
        this.props.setDialogState(false)
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" disabled={this.props.THRdata.inboundProfileName === "" || this.props.THRdata.alarmsEnabled === null}  onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    handleNameChange=(value)=>{
        this.props.setName(value)
    }

    handleProfileChange=(value)=>{
        if(!!value){
        this.props.setProfileChange(value)
        }
    }

    handleAlarmChange=(value)=>{
        this.props.setAlarm(value)
    }

    handleCTIBA=(value)=>{
        this.props.setCTIBAChange(value)
    }

    render(){
        const newData=this.props.THRdata
        const dataList= this.props.data3
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} Throttling Config`}
                onClose={this.handleRenderFooterCancelClick}
                renderFooter={this.renderFooter}
                dialogStyle={{
                    "content": {
                    "top":"15%",
                    "bottom":"1%",
                    "height": "70%",
                    "left": "11%",
                    "right": "1%",
                    "width": "78%"
                    }
                }}
                footerStyle={{"display":"flex","justifyContent":"center"}}
            >
                <ThrottingConfigForm newData={newData} dataList={dataList} handleNameChange={this.handleNameChange} handleProfileChange={this.handleProfileChange} handleAlarmChange={this.handleAlarmChange} handleCTIBA={this.handleCTIBA}/>
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.thcnewEditDialog.dialogType,
        THRdata:state.thcnewEditDialog.currentTHRCConfig,
        data3:state.thctoolbar.inboundpofile
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        getAllData,
        updateThrConfig,
        createThrConfig,
        setName,
        setProfileChange,
        setAlarm,
        setCTIBAChange
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);
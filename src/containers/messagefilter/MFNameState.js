import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import {setTracingConfigName,setTracingConfigType} from "../../actions/messagefilter";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';


import "../../styles/messageFilter/MFNameState.css";

const abc=["Entry","Exit"]

class MFNameState extends Component{

    handleNameChange=(value)=>{
        this.props.setTracingConfigName(value)
    }

    handleTagChange=(value)=>{
        if(!!value){
        this.props.setTracingConfigType(value)
        }
    }

    render(){

        const {tracingConfigName,tracingConfigType,dialogType}=this.props

        return(
            <div className="MFNew">
            <div className="MFNameState">
                <TextInputCCFK
                    id="MFNameInput"
                    label="NAME"
                    required={true}
                    disabled={dialogType==="edit" || dialogType==="view"}
                    errorMsg="Tracing Config Name Already Exists"
                    error={false}
                    value={tracingConfigName}
                    placeholder="Tracing Config Name"
                    onChange={this.handleNameChange}
                />
                    
            </div>
                <SelectInputCCFK
                    label="Tracing Tag"
                    required={true}
                    data={abc}
                    disabled={dialogType==="view"}
                    value={tracingConfigType}
                    onChange={this.handleTagChange}
                    onChangeArgs={["tracingConfigType"]}
                />
        </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        mfnewEditDialog: state.mfnewEditDialog,
        tracingConfig:state.mfnewEditDialog.currentTracingConfig,
        tracingConfigName:state.mfnewEditDialog.currentTracingConfig.name,
        tracingConfigType:state.mfnewEditDialog.currentTracingConfig.filterGroup.msgFilterType,
        tracingConfigState:state.mfnewEditDialog.currentTracingConfig.state,
        dialogType:state.mfnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setTracingConfigName,
        setTracingConfigType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MFNameState);
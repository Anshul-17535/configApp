import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setTracingConfigName,setFGName,setFGType} from "../../actions/throttling";

import "../../styles/throttling/MFNameState.css";

const ThrottlingList = ['INBOUND', 'INGRESS_PEER', 'EGRESS_PEER']

class MFNameState extends Component{

    handleNameChange=(value)=>{
        this.props.setTracingConfigName(value)
    }

    handleFGNameChange=(value)=>{
        this.props.setFGName(value)
    }

    handleFGTypeChange=(value)=>{
        if(!!value){
        this.props.setFGType(value)
        }
    }

    render(){

        const {fgName,fgType,tracingConfigName,dialogType}=this.props

        return(
            <div className="MFNameState">
                    <TextInputCCFK
                        id="THNameInput"
                        label="NAME"
                        required={true}
                        disabled={dialogType==="edit"}
                        errorMsg="Throttling Name Already Exists"
                        error={false}
                        value={tracingConfigName}
                        placeholder="Throttling Name"
                        onChange={this.handleNameChange}
                    />
                    <TextInputCCFK
                        id="THFilterGroupName"
                        label="Filter Group Name"
                        required={true}
                        disabled={dialogType==="edit"}
                        errorMsg="Filter Group Name Already Exists"
                        error={false}
                        value={fgName}
                        placeholder="Filter Group Name"
                        onChange={this.handleFGNameChange}
                    />
                    <SelectInputCCFK
                            id="THFilterGroupName"
                            label="Filter Group Type"
                            required={true}
                            data={ThrottlingList}
                            disabled={dialogType === "edit"}
                            value={fgType}
                            onChange={this.handleFGTypeChange}
                            onChangeArgs={["fgType"]}
                        />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        tracingConfigName:state.thnewEditDialog.currentTracingConfig.name,
        tracingConfigState:state.thnewEditDialog.currentTracingConfig.state,
        fgName:state.thnewEditDialog.currentTracingConfig.filterGroup.name,
        fgType:state.thnewEditDialog.currentTracingConfig.filterGroup.type,
        dialogType:state.thnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setTracingConfigName,
        setFGName,
        setFGType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(MFNameState);
/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../../ccfk-components/SelectInputCCFK';
import TextInputCCFK from "../../../ccfk-components/TextInputCCFK";
import SpinnerCCFK from '../../../ccfk-components/SpinnerCCFK';
import ProgressIndicatorCircularCCFK from '../../../ccfk-components/ProgressIndicatorCircularCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import {setSlfIpListIpAddress,setSlfIpListScheme,setSlfIpListApiPrefix,setSlfIpListPort,setSlfIpListWeight,setSlfIpListPriority,setMapLoadingState,deleteSlfIpListConfig} from '../../../actions/slfdestinationmap';
import {deleteIndividualMapConfig} from '../../../actions/slfdestinationmap/commonservices';
import {returnSchemeDropdownOptions,returnDeleteIndividualMapPayload,singleMapConfigPresent} from '../helpers';
import '../../../styles/slfdestinationmap/SlfIpList.css';

class SlfIpListInputGroup extends Component{

    handleIpAddressChange=(value)=>{
        this.props.setSlfIpListIpAddress(value,this.props.Index)
    }

    handleSlfSchemeChange=(value)=>{
        if(!!value){
            this.props.setSlfIpListScheme(value,this.props.Index)
        }
    }

    handleSlfApiPrefixChange=(value)=>{
        this.props.setSlfIpListApiPrefix(value,this.props.Index)
    }

    handleSlfPortChange=(value)=>{
        this.props.setSlfIpListPort(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handleSlfWeightChange=(value)=>{
        this.props.setSlfIpListWeight(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handleSlfPriorityChange=(value)=>{
        this.props.setSlfIpListPriority(Number(value),this.props.Index)
         this.forceUpdate()
    }
    deleteSlfIpList=()=>{
        if(this.props.dialogType==="edit"){
            if(this.props.slfIplistMapObj.isNew){
                this.props.deleteSlfIpListConfig(this.props.Index)
            }else{
                this.props.setMapLoadingState(this.props.Index,"edit")
                const deletePayload=returnDeleteIndividualMapPayload(this.props.DestinationMapObj,this.props.slfIpListMapArray,this.props.Index,"ipListMap")
                this.props.deleteIndividualMapConfig(deletePayload,this.props.Index)
            }
        }else{
            this.props.deleteSlfIpListConfig(this.props.Index)
        }
    }

    render(){
        const {slfIplistMapObj,slfIpListMapArray,Index}=this.props
        return (
            <div className="slfiplistInputgroup">
                        <TextInputCCFK
                            id={`ipaddress${Index}`}
                            label="Ip Address"
                            required={true}
                            disabled={!slfIplistMapObj.isNew}
                            value={slfIplistMapObj.ipAddress}
                            placeholder="Ip Address"
                            onChange={this.handleIpAddressChange}
                        />
                        <SelectInputCCFK
                            label="Scheme"
                            data={returnSchemeDropdownOptions()}
                            required
                            value={slfIplistMapObj.scheme}
                            onChange={this.handleSlfSchemeChange}
                        />
                        <TextInputCCFK
                            id={`apiPrefix${Index}`}
                            label="Api Prefix"
                            value={slfIplistMapObj.apiPrefix}
                            placeholder="Api Prefix"
                            onChange={this.handleSlfApiPrefixChange}
                        />
                        <SpinnerCCFK
                            label="Port"
                            min={0}
                            required
                            max={65535}
                            disabled={!slfIplistMapObj.isNew}
                            value={slfIplistMapObj.port}
                            step={1}
                            onChange={this.handleSlfPortChange}
                        />
                        <SpinnerCCFK
                            label="Weight"
                            min={1}
                            required
                            max={200000000}
                            value={slfIplistMapObj.weight}
                            step={1}
                            onChange={this.handleSlfWeightChange}
                        />
                        <SpinnerCCFK
                            label="Priority"
                            min={1}
                            required
                            max={200000000}
                            value={slfIplistMapObj.priority}
                            step={1}
                            onChange={this.handleSlfPriorityChange}
                        />
                        {slfIpListMapArray.length>1&&!this.props.mapLoadingState[Index]&&singleMapConfigPresent(slfIpListMapArray,slfIplistMapObj)?<IconButtonCCFK 
                        onClick={this.deleteSlfIpList}>
                        <DeleteIcon/>
                    </IconButtonCCFK>:<></>}
                        {this.props.mapLoadingState[Index]&&<ProgressIndicatorCircularCCFK overlay={false} size="small"/>}
                        
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        mapLoadingState:state.slfDestinationMapnewEditDialog.mapLoadingState,
        dialogType:state.slfDestinationMapnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSlfIpListIpAddress,
        setSlfIpListScheme,
        setSlfIpListApiPrefix,
        setSlfIpListPort,
        setSlfIpListWeight,
        setSlfIpListPriority,
        deleteIndividualMapConfig,
        setMapLoadingState,
        deleteSlfIpListConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfIpListInputGroup);
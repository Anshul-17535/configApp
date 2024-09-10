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
import {setSlfFqdnFqdn,setSlfFqdnScheme,setSlfFqdnApiPrefix,setSlfFqdnPort,setSlfFqdnWeight,setSlfFqdnPriority,setMapLoadingState,deleteSlfFqdnConfig} from '../../../actions/slfdestinationmap';
import {deleteIndividualMapConfig} from '../../../actions/slfdestinationmap/commonservices';
import {returnSchemeDropdownOptions,returnDeleteIndividualMapPayload,singleMapConfigPresent} from '../helpers';
import '../../../styles/slfdestinationmap/SlfFqdn.css';

class SlfFqdnInputGroup extends Component{

    handleSlfFqdnChange=(value)=>{
        this.props.setSlfFqdnFqdn(value,this.props.Index)
    }

    handleSlfSchemeChange=(value)=>{
        if(!!value){
            this.props.setSlfFqdnScheme(value,this.props.Index)
        }
    }

    handleSlfApiPrefixChange=(value)=>{
        this.props.setSlfFqdnApiPrefix(value,this.props.Index)
    }

    handleSlfFqdnPort=(value)=>{
        this.props.setSlfFqdnPort(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handleSlfFqdnWeight=(value)=>{
        this.props.setSlfFqdnWeight(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handleSlfFqdnPriority=(value)=>{
        this.props.setSlfFqdnPriority(Number(value),this.props.Index)
         this.forceUpdate()
    }
    deleteSlfFqdn=()=>{
        if(this.props.dialogType==="edit"){
            if(this.props.FqdnMapObj.isNew){
                this.props.deleteSlfFqdnConfig(this.props.Index)
            }else{
                this.props.setMapLoadingState(this.props.Index,"edit")
                const deletePayload=returnDeleteIndividualMapPayload(this.props.DestinationMapObj,this.props.slfFqdnMapArray,this.props.Index,"fqdnMap")
                this.props.deleteIndividualMapConfig(deletePayload,this.props.Index)
            } 
        }else{
            this.props.deleteSlfFqdnConfig(this.props.Index)
        }
    }

    render(){
        const {FqdnMapObj,slfFqdnMapArray,Index}=this.props
        return (
            <div className="slffqdnInputgroup">
                        <TextInputCCFK
                            id={`fqdn${Index}`}
                            label="Fqdn"
                            required={true}
                            disabled={!FqdnMapObj.isNew}
                            value={FqdnMapObj.fqdn}
                            placeholder="Fqdn"
                            onChange={this.handleSlfFqdnChange}
                        />
                        <SelectInputCCFK
                            label="Scheme"
                            data={returnSchemeDropdownOptions()}
                            required
                            value={FqdnMapObj.scheme}
                            onChange={this.handleSlfSchemeChange}
                        />
                        <TextInputCCFK
                            id={`apiPrefix${Index}`}
                            label="Api Prefix"
                            value={FqdnMapObj.apiPrefix}
                            placeholder="Api Prefix"
                            onChange={this.handleSlfApiPrefixChange}
                        />
                        <SpinnerCCFK
                            label="Port"
                            min={0}
                            required
                            max={65535}
                            value={FqdnMapObj.port}
                            step={1}
                            onChange={this.handleSlfFqdnPort}
                        />
                        <SpinnerCCFK
                            label="Weight"
                            min={1}
                            required
                            max={200000000}
                            value={FqdnMapObj.weight}
                            step={1}
                            onChange={this.handleSlfFqdnWeight}
                        />
                        <SpinnerCCFK
                            label="Priority"
                            min={1}
                            required
                            max={200000000}
                            value={FqdnMapObj.priority}
                            step={1}
                            onChange={this.handleSlfFqdnPriority}
                        />
                        {slfFqdnMapArray.length>1&&!this.props.mapLoadingState[Index]&&singleMapConfigPresent(slfFqdnMapArray,FqdnMapObj)?<IconButtonCCFK 
                        onClick={this.deleteSlfFqdn}>
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
        setSlfFqdnFqdn,
        setSlfFqdnScheme,
        setSlfFqdnApiPrefix,
        setSlfFqdnPort,
        setSlfFqdnWeight,
        setSlfFqdnPriority,
        deleteIndividualMapConfig,
        setMapLoadingState,
        deleteSlfFqdnConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfFqdnInputGroup);
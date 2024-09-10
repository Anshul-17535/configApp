/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../../ccfk-components/SelectInputCCFK';
import SpinnerCCFK from '../../../ccfk-components/SpinnerCCFK';
import ProgressIndicatorCircularCCFK from '../../../ccfk-components/ProgressIndicatorCircularCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import {longestStringLengthInArray,returnDeleteIndividualMapPayload,singleMapConfigPresent} from '../helpers';
import {setServiceInstanceIdNfInstance,setWeightNfInstance,setPriorityNfInstance,setMapLoadingState,deleteDestinationNfServiceInstanceConfig} from '../../../actions/slfdestinationmap';
import {deleteIndividualMapConfig} from '../../../actions/slfdestinationmap/commonservices';
import '../../../styles/slfdestinationmap/DestinationNFServiceInstance.css'

class DestinationNfServiceInstanceInputGroup extends Component{

    handleSvcInstIdChange=(value)=>{
        if(!!value){
            this.props.setServiceInstanceIdNfInstance(value,this.props.Index)
        }
    }

    handleWeightChange=(value)=>{
        this.props.setWeightNfInstance(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handlePriorityChange=(value)=>{
        this.props.setPriorityNfInstance(Number(value),this.props.Index)
         this.forceUpdate()
    }

    deleteDestinationNfServiceinstance=()=>{
        if(this.props.dialogType==="edit"){
            if(this.props.nfserviceMapObj.isNew){
                this.props.deleteDestinationNfServiceInstanceConfig(this.props.Index)
            }else{
                this.props.setMapLoadingState(this.props.Index,"edit")
                const deletePayload=returnDeleteIndividualMapPayload(this.props.DestinationMapObj,this.props.nfserviceMapArray,this.props.Index,"nfServiceMap")
                this.props.deleteIndividualMapConfig(deletePayload,this.props.Index)
            }
        }else{
            this.props.deleteDestinationNfServiceInstanceConfig(this.props.Index)
        }
    }

    render(){
        const {nfserviceMapObj,nfserviceMapArray,Index,nfserviceSetIdListNfServiceObj,destinationId}=this.props
        let dropDownList=nfserviceSetIdListNfServiceObj[destinationId]
        return (
                    <div className="destinationnfserviceinstanceinputgroup">
                        <div style={{width:(5*longestStringLengthInArray(dropDownList)) + 150}}>
                        <SelectInputCCFK
                            label="Service Instance Id"
                            data={dropDownList}
                            required
                            disabled={!nfserviceMapObj.isNew}
                            value={nfserviceMapObj.srvcInstncId}
                            onChange={this.handleSvcInstIdChange}
                        />
                        </div>
                        <SpinnerCCFK
                            label="Weight"
                            min={1}
                            required
                            max={200000000}
                            value={nfserviceMapObj.weight}
                            step={1}
                            onChange={this.handleWeightChange}
                        />
                        <SpinnerCCFK
                            label="Priority"
                            min={1}
                            required
                            max={200000000}
                            value={nfserviceMapObj.priority}
                            step={1}
                            onChange={this.handlePriorityChange}
                        />
                        {nfserviceMapArray.length>1&&!this.props.mapLoadingState[Index]&&singleMapConfigPresent(nfserviceMapArray,nfserviceMapObj)?<IconButtonCCFK 
                        onClick={this.deleteDestinationNfServiceinstance}>
                        <DeleteIcon/>
                    </IconButtonCCFK>:<></>}
                        {this.props.mapLoadingState[Index]&&<ProgressIndicatorCircularCCFK overlay={false} size="small"/>}
                        <div></div>
                    </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        nfserviceSetIdListNfServiceObj:state.slfDestinationMapnewEditDialog.nfserviceSetIdListNfServiceObj,
        mapLoadingState:state.slfDestinationMapnewEditDialog.mapLoadingState,
        dialogType:state.slfDestinationMapnewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setServiceInstanceIdNfInstance,
        setWeightNfInstance,
        setPriorityNfInstance,
        deleteIndividualMapConfig,
        setMapLoadingState,
        deleteDestinationNfServiceInstanceConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationNfServiceInstanceInputGroup);
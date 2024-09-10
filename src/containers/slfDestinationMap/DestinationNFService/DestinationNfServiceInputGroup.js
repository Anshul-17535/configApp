/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../../ccfk-components/SelectInputCCFK';
import SpinnerCCFK from '../../../ccfk-components/SpinnerCCFK';
import ProgressIndicatorCircularCCFK from '../../../ccfk-components/ProgressIndicatorCircularCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import {setNfInstanceIdNfService,setWeightNfService,setPriorityNfService,setMapLoadingState,deleteDestinationNfServiceConfig} from '../../../actions/slfdestinationmap';
import {deleteIndividualMapConfig} from '../../../actions/slfdestinationmap/commonservices';
import {longestStringLengthInArray,returnDeleteIndividualMapPayload,returnDestinationObjBasedOnMapPattern,singleMapConfigPresent} from '../helpers';
import '../../../styles/slfdestinationmap/SlfDestinationNfService.css';

class DestinationNfServiceInputGroup extends Component{

    handleNfInstIdChange=(value)=>{
        if(!!value){
            this.props.setNfInstanceIdNfService(value,this.props.Index)
        }
    }

    handleWeightChange=(value)=>{
        this.props.setWeightNfService(Number(value),this.props.Index)
         this.forceUpdate()
    }

    handlePriorityChange=(value)=>{
        this.props.setPriorityNfService(Number(value),this.props.Index)
         this.forceUpdate()
    }

    deleteDestinationNfService=()=>{
        if(this.props.dialogType==="edit"){
            if(this.props.nfProfileMapObj.isNew){
                this.props.deleteDestinationNfServiceConfig(this.props.Index)
            }else{
                this.props.setMapLoadingState(this.props.Index,"edit")
                const deletePayload=returnDeleteIndividualMapPayload(this.props.DestinationMapObj,this.props.nfProfileMapArray,this.props.Index,"nfProfileMap")
                this.props.deleteIndividualMapConfig(deletePayload,this.props.Index)
            }
        }else{
            this.props.deleteDestinationNfServiceConfig(this.props.Index)
        }
    }

    render(){
        const {nfProfileMapObj,nfProfileMapArray,Index,slfDestinationMapnewEditDialog,destinationId,mapPattern}=this.props
        let dropDownList=slfDestinationMapnewEditDialog[returnDestinationObjBasedOnMapPattern(mapPattern)][destinationId]
        return (
                    <div className="destinationnfserviceinputgroup">
                        <div style={{width:(5*longestStringLengthInArray(dropDownList)) + 150}}>
                        <SelectInputCCFK
                            label="Nf Instance Id"
                            data={dropDownList}
                            required
                            disabled={!nfProfileMapObj.isNew}
                            value={nfProfileMapObj.nfInstanceID}
                            onChange={this.handleNfInstIdChange}
                        />
                        </div>
                        <SpinnerCCFK
                            label="Weight"
                            min={1}
                            required
                            max={200000000}
                            value={nfProfileMapObj.weight}
                            step={1}
                            onChange={this.handleWeightChange}
                        />
                        <SpinnerCCFK
                            label="Priority"
                            min={1}
                            required
                            max={200000000}
                            value={nfProfileMapObj.priority}
                            step={1}
                            onChange={this.handlePriorityChange}
                        />
                        {nfProfileMapArray.length>1&&!this.props.mapLoadingState[Index]&&singleMapConfigPresent(nfProfileMapArray,nfProfileMapObj)?<IconButtonCCFK 
                        onClick={this.deleteDestinationNfService}>
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
        nfInstanceIdListNfProfile:state.slfDestinationMapnewEditDialog.nfInstanceIdListNfProfile,
        mapLoadingState:state.slfDestinationMapnewEditDialog.mapLoadingState,
        dialogType:state.slfDestinationMapnewEditDialog.dialogType,
        slfDestinationMapnewEditDialog:state.slfDestinationMapnewEditDialog
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setNfInstanceIdNfService,
        setWeightNfService,
        setPriorityNfService,
        deleteIndividualMapConfig,
        setMapLoadingState,
        deleteDestinationNfServiceConfig
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationNfServiceInputGroup);
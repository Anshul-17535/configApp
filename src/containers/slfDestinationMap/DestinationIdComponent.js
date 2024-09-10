/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setDestinationId} from '../../actions/slfdestinationmap';
import { v4 as uuidv4 } from 'uuid';


class DestinationIdComponent extends Component{

    handleDestinationIdChange=(value)=>{
      if(!!value){
        this.props.setDestinationId(value)
        }
    }

    returnDestinationIdDropdown=()=>{
        let mapPattern=this.props.slfDestinationMapData.destinationMap.DestMapList[0].mapPattern
        switch(mapPattern){
            case 'NF_SERVICE':
                return Object.keys(this.props.nfserviceSetIdListNfProfileObj)
            case 'NF_GROUP':
                return Object.keys(this.props.udmInfoListObj)
            case 'NF_INSTANCE':
                return Object.keys(this.props.nfserviceSetIdListNfServiceObj)
            case 'NF_SET':
                return Object.keys(this.props.nfSetIdListObj)
            case 'NFSET_SCP':
                return Object.keys(this.props.nfSetIdListObj)
            case 'NFSET_SEPP':
                return Object.keys(this.props.nfSetIdListObj)
            default:
                return []
        }
    }

    returnDestinationInput=()=>{
        let mapPattern=this.props.slfDestinationMapData.destinationMap.DestMapList[0].mapPattern
        if(mapPattern==="FQDN"||mapPattern==="IP_ADDRESS"||mapPattern==="IPADDRESS_SCP"||mapPattern==="FQDN_SCP"||mapPattern==="IPADDRESS_SEPP"||mapPattern==="FQDN_SEPP"){
            return (
                <TextInputCCFK
                    id={uuidv4()}
                    label="Destination Id"
                    required={true}
                    disabled={this.props.dialogType==="edit"}
                    value={this.props.slfDestinationMapData.destinationMap.DestMapList[0].destinationId}
                    placeholder="Destination Id"
                    onChange={this.handleDestinationIdChange}
                />
            )
        }else if(mapPattern==="NF_SERVICE"||mapPattern==="NF_GROUP" ||mapPattern==="NF_INSTANCE" ||mapPattern==="NF_SET"||mapPattern==="NFSET_SCP"||mapPattern==="NFSET_SEPP")
        {
            return (
                <SelectInputCCFK
                    label="Destination ID"
                    required={true}
                    disabled={this.props.dialogType==="edit"}
                    data={this.returnDestinationIdDropdown()}
                    value={!!this.props.slfDestinationMapData.destinationMap.DestMapList[0].destinationId?this.props.slfDestinationMapData.destinationMap.DestMapList[0].destinationId:""}
                    onChange={this.handleDestinationIdChange}
                />
            )
        }else{
            return null
        }
    }

    render(){

        return (
                this.returnDestinationInput()
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfDestinationMapnewEditDialog.dialogType,
        slfDestinationMapData:state.slfDestinationMapnewEditDialog.currentSlfDestinationMapConfig,
        nfserviceSetIdListNfServiceObj:state.slfDestinationMapnewEditDialog.nfserviceSetIdListNfServiceObj,
        nfserviceSetIdListNfProfileObj:state.slfDestinationMapnewEditDialog.nfserviceSetIdListNfProfileObj,
        udmInfoListObj:state.slfDestinationMapnewEditDialog.udmInfoListObj,
        nfSetIdListObj:state.slfDestinationMapnewEditDialog.nfSetIdListObj
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDestinationId
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationIdComponent);
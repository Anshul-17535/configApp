/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setMapPattern,setDestinationId} from '../../actions/slfdestinationmap'
import DestinationIdComponent from './DestinationIdComponent';
import {returnDestinationObject} from './helpers';
import '../../styles/slfdestinationmap/DestinationMapPattern.css'

const returnMapPatternOptions=["NF_SERVICE","NF_GROUP","NF_INSTANCE","IP_ADDRESS","FQDN","NF_SET","IPADDRESS_SCP","FQDN_SCP","NFSET_SCP","NFSET_SEPP","FQDN_SEPP","IPADDRESS_SEPP"]

class DestinationMapPattern extends Component{

    handleMapPatternChange=(value)=>{
        if(!!value&&this.props.dialogType!=="edit"){
            this.props.setMapPattern(value,returnDestinationObject(value))
        }
    }

    render(){
        return (
            <div className="DestinationMapCommonInputGroup">
                <SelectInputCCFK
                    label="Map Pattern"
                    required={true}
                    data={returnMapPatternOptions}
                    disabled={this.props.dialogType==="edit"}
                    value={this.props.slfDestinationMapData.destinationMap.DestMapList[0].mapPattern}
                    onChange={this.handleMapPatternChange}
                />
                <DestinationIdComponent/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfDestinationMapnewEditDialog.dialogType,
        slfDestinationMapData:state.slfDestinationMapnewEditDialog.currentSlfDestinationMapConfig,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setMapPattern,
        setDestinationId
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationMapPattern);
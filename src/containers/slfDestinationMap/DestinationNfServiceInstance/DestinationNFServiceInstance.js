/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {returnMapKey} from '../helpers';
import CardCCFK from "../../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {addDestinationNfServiceInstanceConfig,setMapLoadingState} from '../../../actions/slfdestinationmap';
import DestinationNfServiceInstanceInputGroup from './DestinationNfServiceInstanceInputGroup';
import '../../../styles/slfdestinationmap/DestinationNFServiceInstance.css'


class DestinationNFServiceInstance extends Component{

    addDestinationNfServiceInstance=()=>{
        const newObj={
                "srvcInstncId":"",
                "weight":1,
                "priority":1,
                "isNew":true
                }
        this.props.addDestinationNfServiceInstanceConfig(newObj)
        this.props.setMapLoadingState(1,"add")
    }

    render(){
        let DestinationMapObj=this.props.slfDestinationMapData.destinationMap.DestMapList[0]
        return (
            <div className="destinationNfServiceInstance">
                <CardCCFK
                        cardStyle={{height:"50vh",padding:"1rem",overflowY:"auto"}}
                    >
                            <div className="cardHeaderButtonGroup">
                                <h2>{returnMapKey(DestinationMapObj)}</h2>
                                <IconButtonCCFK 
                                    onClick={this.addDestinationNfServiceInstance}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {
                            DestinationMapObj.nfServiceMap.map((obj,Index)=>{
                                return <DestinationNfServiceInstanceInputGroup destinationId={DestinationMapObj.destinationId} DestinationMapObj={DestinationMapObj} nfserviceMapArray={DestinationMapObj.nfServiceMap} nfserviceMapObj={obj} key={`destNfsrvInstance_${Index}`} Index={Index}/>
                            })
                            }
                    </CardCCFK>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        slfDestinationMapData:state.slfDestinationMapnewEditDialog.currentSlfDestinationMapConfig
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addDestinationNfServiceInstanceConfig,
        setMapLoadingState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationNFServiceInstance);
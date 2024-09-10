/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {returnMapKey} from '../helpers';
import CardCCFK from "../../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {addDestinationNfServiceConfig,setMapLoadingState} from '../../../actions/slfdestinationmap';
import DestinationNFServiceInputGroup from './DestinationNfServiceInputGroup';
import '../../../styles/slfdestinationmap/SlfDestinationNfService.css';


class DestinationNFService extends Component{


    addDestinationNfService=()=>{
        const newObj={
                "nfInstanceID":"",            
                "weight":1,            
                "priority":1,
                "isNew":true
                }
        this.props.addDestinationNfServiceConfig(newObj)
        this.props.setMapLoadingState(1,"add")
    }


    render(){
        let DestinationMapObj=this.props.slfDestinationMapData.destinationMap.DestMapList[0]
        return (
            <div className="destinationNfService">
                <CardCCFK
                        cardStyle={{height:"50vh",padding:"1rem",overflowY:"auto"}}
                    >
                            <div className="cardHeaderButtonGroup">
                                <h2>{returnMapKey(DestinationMapObj)}</h2>
                                <IconButtonCCFK 
                                    onClick={this.addDestinationNfService}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {
                            DestinationMapObj.nfProfileMap.map((obj,Index)=>{
                                return <DestinationNFServiceInputGroup mapPattern={DestinationMapObj.mapPattern} destinationId={DestinationMapObj.destinationId} DestinationMapObj={DestinationMapObj} nfProfileMapArray={DestinationMapObj.nfProfileMap} nfProfileMapObj={obj} key={`destNfServiceGrp_${Index}`} Index={Index}/>
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
        addDestinationNfServiceConfig,
        setMapLoadingState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DestinationNFService);
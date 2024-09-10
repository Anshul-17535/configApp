/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import CardCCFK from "../../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import SlfFqdnInputGroup from './SlfFqdnInputGroup';
import {returnMapKey} from '../helpers';
import {addSlfFqdnConfig,setMapLoadingState} from '../../../actions/slfdestinationmap';
import '../../../styles/slfdestinationmap/SlfFqdn.css'


class SlfFqdn extends Component{

    addSlfFqdn=()=>{
        const newObj={
            "fqdn":"",
            "scheme":"",
            "port":0,
            "apiPrefix":"",
            "weight":1,
            "priority":1,
            "isNew":true
            }
        this.props.addSlfFqdnConfig(newObj)
        this.props.setMapLoadingState(1,"add")
    }

    render(){
        let DestinationMapObj=this.props.slfDestinationMapData.destinationMap.DestMapList[0]
        return (
            <div className="slffqdn">
            <CardCCFK
                        cardStyle={{height:"50vh",padding:"1rem",overflowY:"auto"}}
                    >
                            <div className="cardHeaderButtonGroup">
                                <h2>{returnMapKey(DestinationMapObj)}</h2>
                                <IconButtonCCFK 
                                    onClick={this.addSlfFqdn}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {
                            DestinationMapObj.fqdnMap.map((obj,Index)=>{
                                return <SlfFqdnInputGroup DestinationMapObj={DestinationMapObj} slfFqdnMapArray={DestinationMapObj.fqdnMap} FqdnMapObj={obj} key={`slfFQDN_${Index}`} Index={Index}/>
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
        addSlfFqdnConfig,
        setMapLoadingState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfFqdn);
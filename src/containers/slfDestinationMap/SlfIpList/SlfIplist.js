/* eslint-disable */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import CardCCFK from "../../../ccfk-components/CardCCFK";
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {bindActionCreators} from "redux";
import {returnMapKey} from '../helpers';
import {addSlfIpListConfig,setMapLoadingState} from '../../../actions/slfdestinationmap';
import SlfIpListInputGroup from '../SlfIpList/SlfIpListInputGroup';

class SlfIplist extends Component{


    addSlfIpList=()=>{
        const newObj={
            "ipAddress":"",
            "scheme":"",
            "port":0,
            "apiPrefix":"",
            "weight":1,
            "priority":1,
            "isNew":true
            }
        this.props.addSlfIpListConfig(newObj)
        this.props.setMapLoadingState(1,"add")
    }

    render(){
        let DestinationMapObj=this.props.slfDestinationMapData.destinationMap.DestMapList[0]
        return (
            <div className="slfiplist">
            <CardCCFK
                        cardStyle={{height:"50vh",padding:"1rem",overflowY:"auto"}}
                    >
                            <div className="cardHeaderButtonGroup">
                                <h2>{returnMapKey(DestinationMapObj)}</h2>
                                <IconButtonCCFK 
                                    onClick={this.addSlfIpList}>
                                    <AddIcon/>
                                </IconButtonCCFK>
                            </div>
                            {
                      DestinationMapObj.ipListMap.map((obj,Index)=>{
                        return <SlfIpListInputGroup DestinationMapObj={DestinationMapObj} slfIpListMapArray={DestinationMapObj.ipListMap} slfIplistMapObj={obj} key={`slfIpList_${Index}`} Index={Index}/>
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
        addSlfIpListConfig,
        setMapLoadingState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfIplist);
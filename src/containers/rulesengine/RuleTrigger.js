import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddCircleIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddCircleIcon';
import {assignRuleSetNames} from "../../actions/rulesengine/commonServices";
import {AddRsvClickState,RuleTriggerFormDisplayState,RuleGroupFromStateClickedState,RuleGroupFormDisplayState} from "../../actions/rulesengine";
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/RuleTrigger.css";


let srv;
class RuleTrigger extends Component {

    constructor(props) {
        super(props);
        srv = this;

    }
    displayRuleTriggerForm=()=>{
        // srv.props.RuleTriggerFormDisplayState(true);
        srv.props.RuleGroupFormDisplayState(false);
        srv.props.assignRuleSetNames(srv.props.rsvName);
        srv.props.AddRsvClickState(true);
        srv.props.handlePhChange("");


    }

    drawProfileTrigger = () =>{
        let triggerValue=!srv.props.RGDisplayConditionValue?"Select Trigger":
          (!!srv.props.ruleSetType[0]&&!srv.props.RuleTriggerFormDisplayStateValue&&srv.props.AddRsvClickStateVal)?srv.props.ruleSetType[0] : "Select Trigger"


        if(triggerValue==="Select Trigger"){
            return <div className = "baseProfileElement profileTrigger-add" onClick={srv.displayRuleTriggerForm}>
                <div className="selecttriggergroup">
                    <div className="icaddcircleicon">
                        <AddCircleIcon color="#000000"/>
                    </div>
                    <div>Select Trigger</div>
                </div>
            </div>
        }else{

            return <div className = "baseProfileElement profileTrigger">{srv.props.ruleSetType[0]}</div>
        }
    }


    render(){

        return (
            <div>
                <div className = "profileLayoutContainer">
                    <div className = "baseProfileContainer profileTriggerContainer">
                        <div className = "baseProfileElement profileTriggerHeader">Trigger</div>
                        {srv.drawProfileTrigger()}
                    </div>
                </div>
            </div>

        )

    }
}

function mapStateToProps(state) {
    return{
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        RuleTriggerFormDisplayStateValue: state.renewEditDialog.RuleTriggerFormDisplayState,
        RGDisplayConditionValue:state.renewEditDialog.RGDisplayCondition,
        AddRsvClickStateVal:state.renewEditDialog.AddRsvClickState,
        RuleGroupFromStateClickedStateVal:state.renewEditDialog.RuleGroupFromStateClickedState,
        rsvName: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].rsvName : "",





    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleTriggerFormDisplayState,
        AddRsvClickState,
        RuleGroupFormDisplayState,
        RuleGroupFromStateClickedState,
        assignRuleSetNames

    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleTrigger);
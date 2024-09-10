import React, {Component} from 'react';
import {connect} from 'react-redux';
import RuleGroup from "./RuleGroup";
import RuleTrigger from "./RuleTrigger";
import {DisplayConditionForRuleGroup} from "../../actions/rulesengine";
import {bindActionCreators} from "redux";
import ArrowLeftRight from "../../images/arrow-left-right.png";
import "../../styles/rulesEngine/RuleGraphRow.css";

let srv;
class RuleGraphRow extends Component {

    constructor(props) {
        super(props);
        srv = this;


    }
    drawBranchArrow = () =>{
        return <div className = "profileBranchArrow"><img src={ArrowLeftRight} alt="ArrowLeftRight" /></div>
    }


    render(){
        const DisplayCondition=srv.props.ruleSetType[0]!==undefined&&srv.props.ruleSetType[0]!==null&&!srv.props.RuleTriggerFormDisplayStateValue&&srv.props.RGDisplayConditionValue&&srv.props.AddRsvClickStateVal===true;
        return (
                <div>
                    <RuleTrigger handlePhChange={srv.props.handlePhChange}/>
                    {DisplayCondition?srv.drawBranchArrow():null}
                    {DisplayCondition?<div>
                        <RuleGroup/>
                    </div>:null}
                </div>
        )

    }
}

function mapStateToProps(state) {
    return{
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        RuleTriggerFormDisplayStateValue: state.renewEditDialog.RuleTriggerFormDisplayState,
        RuleGroupFormDisplayStateValue:state.renewEditDialog.RuleGroupFormDisplayState,
        RGDisplayConditionValue:state.renewEditDialog.RGDisplayCondition,
        RuleGroupFromStateClickedStateVal:state.renewEditDialog.RuleGroupFromStateClickedState,
        AddRsvClickStateVal:state.renewEditDialog.AddRsvClickState,



    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        DisplayConditionForRuleGroup
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleGraphRow);
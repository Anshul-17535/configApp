import React, {Component} from 'react';
import {connect} from 'react-redux';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {resultContextData,sourceContextData} from "../../actions/rulesengine/commonServices";
import {RuleSetType,RuleTriggerFormDisplayState,DisplayConditionForRuleGroup,ModifiedSourceContext,ModifiedResultContext} from '../../actions/rulesengine'
import "../../styles/rulesEngine/RuleTriggerForm.css";

let _ = require('underscore');

let srv;
class RuleTriggerForm extends Component {

    constructor(props) {
        super(props);
        srv = this;
    }


    FunctionToReturnArrayOfRulesettypes=(arr)=>{
        let ArrayResult=[];
        arr.map(element=>{
            ArrayResult.push(_.keys(element)[0])
        })
        return ArrayResult
    }
    returnModifiedArray=(arr)=>{
        const ModArray=[];
        !!arr&&arr.map((val)=>{
            if(val!==null &&!srv.FunctionToReturnArrayOfRulesettypes(srv.props.RsvDataObj).includes(val)){
                ModArray.push(val)
            }
        });
        return ModArray
    }
    onChangeOfSelectRuleTrigger=(value)=>{
        const triggerArray=srv.props.ruleSetNames
        const indexOfValue=triggerArray.indexOf(value)
        if(!!value){
            srv.props.RuleSetType(indexOfValue)
            srv.props.handlePhChange(srv.props.ruleSetNames[indexOfValue])
        }
    }

    HandleRuleTriggerSave=()=>{
        srv.props.RuleTriggerFormDisplayState(false);
        srv.props.DisplayConditionForRuleGroup(true);
        srv.props.savebtnstatehandlefunction(false);

    }
    HandleRuleTriggerCancel=()=>{
        srv.props.RuleTriggerFormDisplayState(false)
        srv.props.RuleSetType(undefined);
    }
    render(){
        return (
            <div className="addRuleTriggerContainer">
                    <div>
                        <h3 style={{"fontSize":"inherit"}}>Choose a trigger for your profile</h3>
                    </div>
                    <div style={{"padding":"2% 0%"}}>
                        <SelectInputCCFK
                            label="Select a trigger"
                            data={srv.returnModifiedArray(srv.props.ruleSetNames)}
                            value={srv.props.PhVal===""?"":srv.props.ruleSetType[0]}
                            onChange={(value)=>srv.onChangeOfSelectRuleTrigger(value)}
                            placeholder={srv.props.PhVal===""?"Select":srv.props.PhVal}
                        />
                    </div>
                    <div className='ruleTriggerFormFooter'>
                        <ButtonCCFK text="ADD" onClick={srv.HandleRuleTriggerSave} variant="call-to-action" />
                        <ButtonCCFK text="CANCEL" onClick={srv.HandleRuleTriggerCancel}/>
                    </div>
                </div>

        )

    }
}

function mapStateToProps(state) {
    return{
        ruleSetNames: (!!state.renewEditDialog.Rules&&!!state.renewEditDialog.Rules[0])?state.renewEditDialog.Rules[0].ruleSetNames : [],
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        RsvDataObj: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].RsvData: [],


    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleSetType,
        RuleTriggerFormDisplayState,
        DisplayConditionForRuleGroup,
        resultContextData,
        sourceContextData,
        ModifiedSourceContext,
        ModifiedResultContext
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleTriggerForm);
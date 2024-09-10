import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddCircleIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddCircleIcon';
import {resultContextData,sourceContextData} from "../../actions/rulesengine/commonServices";
import {EditResetTempRuleObj,RGclearTemporaryRsvData,RuleGroupFormDisplayState,ResetTempRuleObj,RuleTriggerFormDisplayState,TabStateObject,ModifiedSourceContext,ModifiedResultContext,RuleGroupBtnState} from "../../actions/rulesengine";
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/RuleGroup.css";


let srv;
class RuleGroup extends Component {

    constructor(props) {
        super(props);
        srv = this;

    }


    drawRuleGroupFooter = () =>{


        return  <div className="baseProfileElement profileTrigger-add" onClick={(e) => {

            srv.props.resultContextData({ "ruleSetTypes":srv.props.ruleSetType , "attributeType": "BASE_VALUE_TYPE"});
            srv.props.sourceContextData({ "ruleSetTypes":srv.props.ruleSetType , "attributeType": "BASE_VALUE_TYPE"});
            srv.props.RuleGroupFormDisplayState(true);
            srv.props.RuleTriggerFormDisplayState(false);
            srv.props.TabStateObject({isTabDisabled:true,selectedTabIndex:0});
            srv.props.RGclearTemporaryRsvData();
            srv.props.RuleGroupBtnState(true)
            if(srv.props.dialogTypeVal==="edit"){
                srv.props.EditResetTempRuleObj();
            }else{
                srv.props.ResetTempRuleObj();
            }



        }}>
            <div className="selecttriggergroup" >
                <div className="icaddcircleicon"><AddCircleIcon color="#000000"/></div>
                <div>Add Rule group</div>
            </div>

        </div>
    }

    render(){


        return (
            <div>
                <div className = "profileLayoutContainer">
                    <div className = "baseProfileContainer profileTriggerContainer">
                        <div className = "baseProfileElement profileRuleGroupHeader">Rule Group</div>
                        {srv.drawRuleGroupFooter()}
                    </div>
                </div>
            </div>

        )

    }
}

function mapStateToProps(state) {
    return{

        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        dialogTypeVal:state.renewEditDialog.dialogType



    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleGroupFormDisplayState,
        RGclearTemporaryRsvData,
        EditResetTempRuleObj,
        RuleTriggerFormDisplayState,
        TabStateObject,
        resultContextData,
        sourceContextData,
        ModifiedSourceContext,
        ModifiedResultContext,
        ResetTempRuleObj,
        RuleGroupBtnState,

    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleGroup);
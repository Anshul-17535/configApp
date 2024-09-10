import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import RuleDisplay from "./RuleDisplay"
import {resultContextData,sourceContextData,updateRuleTable,addNewRuleGroup,setnewgroup} from "../../actions/rulesengine/commonServices";
import {AddRsvClickState,SetReverseRuleParser,UpdateRulesToTempRsvData,ModifiedSourceContext,ModifiedResultContext,UpdateRulesFromTempRsvDataToRsvData,RuleGroupName,ResetTempRuleObj,TopLevelRuleGroup,RuleGroupFormDisplayState,TabStateObject,RuleGroupFromStateClickedState,AddRuleEditors,RuleGroupSave,clearTemporaryRsvData,DisplayConditionForRuleGroup,RuleGroupBtnState,RuleTagsState,ChangeRuleTag} from '../../actions/rulesengine'
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import ArrowBoldRightIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowBoldRightIcon';
import ArrowBoldLeftIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowBoldLeftIcon';
import MultiSelectwChipsCCFK from '../../ccfk-components/MultiSelectwChipsCCFK';
import TextAreaCCFK from "../../ccfk-components/TextAreaCCFK";
import CheckBoxCCFK from "../../ccfk-components/CheckBoxCCFK";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import TabGroupCCFK from "../../ccfk-components/TabGroupCCFK";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import AlertMessage from "@nokia-csf-uxr/ccfk/Alert/AlertMessage"


import "../../styles/rulesEngine/RuleGroupRulesForm.css";

const list = ['Entry','Exit','Entry,Exit']
const send = ['Entry','Exit']
let srv;
class RuleGroupRulesForm extends Component{
    constructor(props){
        super(props);
        srv=this;
        srv.state={
            SaveBtnDisabledState:false,
        }
        

    }

    componentDidMount(){
        this.props.ChangeRuleTag(this.props.RuleTagValue)
    }

    
  
    CheckSaveBtnDisabledState=()=>{
        let Rulestat=true;
        let ruleNameStat=true;
        let stat;
            if(srv.props.TemporaryRsvDataRules.length===0){
                Rulestat=false;
                ruleNameStat=false;
            }else{
                !!srv.props.TemporaryRsvDataRules&&srv.props.TemporaryRsvDataRules.map(e=>{
                    Rulestat=Rulestat&&e.status==="pass";
                })
                !!srv.props.TempRuleObjValue&&srv.props.TempRuleObjValue.map(e=>{
                    ruleNameStat=ruleNameStat&&e.name.trim().length>0;
                })
            }
            stat=Rulestat&&ruleNameStat;
            srv.setState({SaveBtnDisabledState:stat})
    }

    RuleGroupNameHandleChange=(value)=>{
        srv.props.RuleGroupName(value)
    }
    TopLevelRuleGroupHandleChange=(value)=>{
        srv.props.TopLevelRuleGroup(value)
    }
    HandleRuleGroupCancel=()=>{
        srv.props.RuleGroupFormDisplayState(false);
        srv.props.RuleGroupName("");
        srv.props.setnewgroup(false);
    }

    HandleAddRulesBtnClick=()=>{
        srv.props.AddRuleEditors();
        srv.CheckSaveBtnDisabledState();

        srv.forceUpdate();
    }
    HandledeleteFunction=()=>{
        srv.forceUpdate();

    }
    RulesSaveBtn=()=>{
        srv.props.RuleGroupSave(srv.props.TemporaryRsvDataObj);
        srv.props.AddRsvClickState(false);
        srv.props.RuleGroupFormDisplayState(false);
        srv.props.DisplayConditionForRuleGroup(false);
        srv.props.RuleGroupFromStateClickedState(false);
        srv.props.UpdateRulesToTempRsvData();
        // srv.props.UpdateRulesFromTempRsvDataToRsvData();
        // srv.props.clearTemporaryRsvData();
        // srv.props.ResetTempRuleObj();
        let updatedObj={};
        updatedObj.name=!!srv.props.TemporaryRsvDataObj&&srv.props.TemporaryRsvDataObj.name;
        updatedObj.rsvName=srv.props.TemporaryRsvDataObj.rsvName;
        updatedObj.topLevelTable=srv.props.TemporaryRsvDataObj.topLevelTable;
        updatedObj.rulePluginSequence=srv.props.TemporaryRsvDataObj.rulePluginSequence;
        updatedObj.ruleSetType=srv.props.TemporaryRsvDataObj.ruleSetType;
        updatedObj.ruleTableScheduleName=srv.props.TemporaryRsvDataObj.ruleTableScheduleName;
        updatedObj.rules=[];
        !!srv.props.TemporaryRsvDataObj.rules&&srv.props.TemporaryRsvDataObj.rules.map(element=>{
            let tempObj={};
            tempObj.name=!!element&&element.name;
            tempObj.description=element.description;
            tempObj.conditionContainer=element.conditionContainer;
            tempObj.enabled=element.enabled;
            tempObj.actions=element.actions;

            updatedObj.rules.push(tempObj)
        })
        srv.props.updateRuleTable(updatedObj,srv.props.rsvName,srv.props.TemporaryRsvDataObj.name)
        this.forceUpdate()


    }
    RulesCancelBtn=()=>{
        srv.props.setnewgroup(false);
        srv.props.RuleGroupFormDisplayState(false);
    }
    onTabsClick=async(value)=>{
        let disablevalue=srv.props.TabStateObjectValue.isTabDisabled;
        srv.props.TabStateObject({isTabDisabled:disablevalue,selectedTabIndex:value})
	    await srv.props.SetReverseRuleParser()
        srv.CheckSaveBtnDisabledState();
    }

    checkSaveBtnDisableState=()=>{
        let stat=true;
        if(srv.props.TemporaryRsvDataRules.length===0){
            return stat;
        }else{
            !!srv.props.TemporaryRsvDataRules&&srv.props.TemporaryRsvDataRules.map(e=>{
                stat=stat&&e.status==="pass";
            })
            return stat;

        }

    }

    handleRuleTagsChange=(value)=>{
        if(value==="")
        {
            this.props.RuleTagsState([])
        }
        if(value==='Entry')
        {
            this.props.RuleTagsState(['Entry'])
        }
        else if(value==='Exit')
        {
            this.props.RuleTagsState(['Exit'])
        }
        else if(value==='Entry,Exit')
        {
            this.props.RuleTagsState(send)
        }
    }

    RuleTagsArrayModifier=(Arr)=>{
        if(!Arr){
            return []
        }else{
            return Arr
        }
        
    }

    

    handleSaveClick=()=>{
        if(!srv.props.grouperror){srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:1});}
        
        if(srv.props.dialogTypeVal==="edit"){
            srv.HandleAddRulesBtnClick();
        }
        this.props.RuleGroupBtnState(false)
        srv.CheckSaveBtnDisabledState();
        let TemporaryRsvDatacopy={};
        TemporaryRsvDatacopy.name=srv.props.TemporaryRsvDataObj.name;
        TemporaryRsvDatacopy.topLevelTable=srv.props.TemporaryRsvDataObj.topLevelTable;
        TemporaryRsvDatacopy.rulePluginSequence=srv.props.TemporaryRsvDataObj.rulePluginSequence;
        TemporaryRsvDatacopy.ruleSetType=srv.props.TemporaryRsvDataObj.ruleSetType;
        srv.props.addNewRuleGroup(TemporaryRsvDatacopy,srv.props.rsvName);
        if(srv.props.grouperror){srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:0});}
    }

    handleNextClick=()=>{
        srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:1});
        srv.CheckSaveBtnDisabledState();
		srv.props.SetReverseRuleParser();
    }

    returnTabLabelArray=()=>{
        return [{"label":"RULE GROUP FORM","disabled":false},{"label":"RULES","disabled":srv.props.TabStateObjectValue.isTabDisabled}]
    }

    onTabsClick=async(value)=>{
        let disablevalue=srv.props.TabStateObjectValue.isTabDisabled;
        srv.props.TabStateObject({isTabDisabled:disablevalue,selectedTabIndex:value})
	    await srv.props.SetReverseRuleParser()
        srv.CheckSaveBtnDisabledState();
    }

    returnLeftTabContent=()=>{
        return (
            <div className="basicTab1">
                <div className="rowGroup">
                    <TextInputCCFK
                        id="rulegroup"
                        label="Rule Group"
                        value={srv.props.RuleGroupNameValue}
                        disabled={srv.props.viewmode===true}
                        placeholder="Rule Group"
                        onChange={srv.RuleGroupNameHandleChange}
                    />
                    <div className="toplevelrulegroup" >
                        <CheckBoxCCFK
                            value={srv.props.TopLevelRuleGroupValue}
                            label="Top Level Rule Group"
                            disabled={srv.props.viewmode===true}
                            onChange={srv.TopLevelRuleGroupHandleChange}
                            isHorizontal
                        />
                    </div>
                    <div className="RuleTagsSelect">
                        <SelectInputCCFK
                            label="Rule Tags"
                            placeholder="Rule Tags"
                            data={list}
                            disabled={srv.props.viewmode===true}
                            value={this.props.ChangeRule}
                            onChange={this.handleRuleTagsChange}
                            onChangeArgs={["this.props.ChangeRule"]}
                        />
                    </div>
                </div>
                <div className="triggerArea">
                    <TextAreaCCFK
                        textValue={srv.props.ruleSetType[0]}
                        labelContent="Triggers"
                        disabled={true}
                    />
                </div>
                <div className="footerbuttons">
                    {srv.props.viewmode!==true?<ButtonCCFK text="CANCEL" onClick={srv.HandleRuleGroupCancel}/>:null}
                    {srv.props.RuleGroupBtnStateVal && srv.props.viewmode!==true?<ButtonCCFK text="SAVE" disabled={srv.props.grouperror||srv.props.RuleGroupNameValue.trim().length===0 || srv.props.rsvState==="ACTIVE"} onClick={srv.handleSaveClick} variant="call-to-action" />:null}
                    {!srv.props.RuleGroupBtnStateVal||srv.props.viewmode===true?<ButtonCCFK text="NEXT" disabled={srv.props.grouperror||!!srv.props.RuleGroupNameValue&&srv.props.RuleGroupNameValue.length<1} iconDirection="right" Icon={<ArrowBoldRightIcon color="#ffffff"/>} onClick={srv.handleNextClick} variant="call-to-action"/>:null}

                </div>
            </div>
        )
    }

    returnRightTabContent=()=>{
        let lengthOfRules=!!this.props.TempRuleObjValue?this.props.TempRuleObjValue.length:0;

        return (
            <>
            <div className="RulesTabContainer">
                        <div className="RulesTab">
                            {!!srv.props.TempRuleObjValue&&srv.props.TempRuleObjValue.map((element, i) =>
                                <div className="RulesListRow" key={i}>
                                    <div className="conditions">
                                        {!!srv.props.TempRuleObjValue&&srv.props.TempRuleObjValue.length>1&&i!==0?"else":""}
                                    </div>

                                    <div>
                                        <RuleDisplay key={i} TempRuleObjValueProp={srv.props.TempRuleObjValue} CheckSaveBtnDisabledState={srv.CheckSaveBtnDisabledState} deleteCondition={lengthOfRules>1?true:false} index={i} RuleObject={element} HandledeleteFunction={srv.HandledeleteFunction}/>
                                    </div>
                                </div>
                            )}
                        </div>
                            <div>
                                <div className="addNewRuleButton">
                                    {srv.props.viewmode!==true?<IconButtonCCFK 
                                                onClick={srv.HandleAddRulesBtnClick}>
                                                <AddIcon/>
                                            </IconButtonCCFK>
                                            :null}
                                </div>
                            </div>
                         </div>   
                        
                        {srv.props.grouperror?<><AlertMessage variant="WARNING" message="Rule Group Name Already Exists" /> <ButtonCCFK text="CANCEL" onClick={srv.RulesCancelBtn} /></>:<div>{srv.props.viewmode!==true?<div className="RuleListSaveBtn">
                            <ButtonCCFK text="BACK" iconDirection="left" Icon={<ArrowBoldLeftIcon color="#ffffff"/>} onClick={()=>{srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:0})}} variant="call-to-action"/>
                            <ButtonCCFK text="SAVE" disabled={!srv.state.SaveBtnDisabledState || srv.props.rsvState==="ACTIVE"}  onClick={srv.RulesSaveBtn} variant="call-to-action" />
                            <ButtonCCFK text="CANCEL" onClick={srv.RulesCancelBtn} />
                        </div>:<div className="RuleListSaveBtn">
                            {srv.props.viewmode!==true?<ButtonCCFK text="SAVE"  onClick={srv.RulesSaveBtn} variant="call-to-action" />:<div></div>}
                            <ButtonCCFK text="BACK" iconDirection="left" Icon={<ArrowBoldLeftIcon color="#ffffff"/>} onClick={()=>{srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:0})}} variant="call-to-action"/>
                            {srv.props.viewmode!==true?<ButtonCCFK text="CANCEL"  onClick={srv.RulesCancelBtn} />:<div></div>}
                        </div>}</div>}
            </>
        )
    }
    
    returnTabContentArray=()=>{
        return [srv.returnLeftTabContent(),srv.returnRightTabContent()]
    }

    render(){
        
        return(
                <TabGroupCCFK
                    onChange={srv.onTabsClick}
                    tabsLabelArray={this.returnTabLabelArray()}
                    tabsAlignment='left'
                    tabContentArray={this.returnTabContentArray()}
                    selectedItem={srv.props.TabStateObjectValue.selectedTabIndex}
                />
        )
    }
}

function mapStateToProps(state) {
    return{
        rsvName: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].rsvName : "",
        rsvState: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].state :"",
        RuleGroupNameValue: state.renewEditDialog.TemporaryRsvData.name,
        RuleTagValue: state.renewEditDialog.TemporaryRsvData.rulePluginSequence,
        TemporaryRsvDataObj: state.renewEditDialog.TemporaryRsvData,
        TemporaryRsvDataRules: state.renewEditDialog.TemporaryRsvData.rules,
        TopLevelRuleGroupValue: state.renewEditDialog.TemporaryRsvData.topLevelTable,
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        rsvSaveState: state.renewEditDialog.RsvSaveState,
        SaveBtnDisabledStateVal: state.renewEditDialog.SaveBtnDisabledState,
        TabStateObjectValue: state.renewEditDialog.TabStateObject,
        TempRuleObjValue: state.renewEditDialog.TempRuleObj,
        viewmode: state.renewEditDialog.viewMode,
        RuleSaveBtnDisabledStateValue: state.renewEditDialog.RuleSaveBtnDisabledState,
        dialogTypeVal:state.renewEditDialog.dialogType,
        RuleGroupBtnStateVal:state.renewEditDialog.RuleGroupBtnState,
        RuleTagsArray:state.renewEditDialog.RuleTags,
        ChangeRule:state.renewEditDialog.SelectTagValue,
        grouperror:state.redataGrid.grouperrorstate
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleGroupName,
        TopLevelRuleGroup,
        RuleGroupFormDisplayState,
        RuleGroupSave,
        AddRuleEditors,
        RuleGroupFromStateClickedState,
        clearTemporaryRsvData,
        DisplayConditionForRuleGroup,
        TabStateObject,
        UpdateRulesFromTempRsvDataToRsvData,
        UpdateRulesToTempRsvData,
        AddRsvClickState,
        ResetTempRuleObj,
        addNewRuleGroup,
        updateRuleTable,
        resultContextData,
        sourceContextData,
        ModifiedSourceContext,
        ModifiedResultContext,
        RuleGroupBtnState,
        RuleTagsState,
        ChangeRuleTag,
	    SetReverseRuleParser,
        setnewgroup
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleGroupRulesForm);

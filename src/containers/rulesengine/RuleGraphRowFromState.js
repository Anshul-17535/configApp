import React, {Component} from 'react';
import {connect} from 'react-redux';
import RuleTriggerFromState from "./RuleTriggerFromState";
import {assignRuleSetNames,storingRulesInState,resultContextData,deleteRuleGroup,deleteTrigGroup,editRecord,sourceContextData,getAllData} from "../../actions/rulesengine/commonServices";
import {RuleSetType,AddRsvClickState,deleteRTalert,editRTalert,editClearTemporaryRsvData,EditResetTempRuleObj,ModifiedSourceContext,ModifiedResultContext,ResetTempRuleObj,RuleGroupFormDisplayState,TabStateObject,RuleGroupFromStateItemIndex,RuleGroupFromStateClickedState,AddRuleSetTypeForRuleGroupFromState,clearTemporaryRsvData,RuleTriggerFormDisplayState,RuleGroupBtnState,DisplayConditionForRuleGroup,ChangeRuleTag,deleteRGalert} from "../../actions/rulesengine";
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/RuleGraphRow.css";
import ArrowLeftRight from "../../images/arrow-left-right.png";
import AddCircleIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddCircleIcon';
import ErrorDialogCCFK from "../../ccfk-components/ErrorDialogCCFK";
import {RuleTagsColoursObj} from './RuleTagsColours'
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import ArrowGroupListComponent from './ArrowGroupListComponent';
let _ = require('underscore');


let RGname =""
let editArr=[]
let deleteArr=[]
let srv;
class RuleGraphRowFromState extends Component {

    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            selectedRsvGroupToDelete:""
        }
        // this.HandleDeleteRuleGroup = this.HandleDeleteRuleGroup.bind(this);


    }

    drawBranchArrow = () =>{
        return <div className = "profileBranchArrow"><img src={ArrowLeftRight} alt="ArrowLeftRight" /></div>
    }
    HandleFooterClick=(ele)=>{
        srv.props.RuleGroupFormDisplayState(true);
        srv.props.RuleTriggerFormDisplayState(false);
        srv.props.resultContextData({ "ruleSetTypes":[ele] , "attributeType": "BASE_VALUE_TYPE"});
        srv.props.sourceContextData({ "ruleSetTypes":[ele] , "attributeType": "BASE_VALUE_TYPE"});
        srv.props.RuleGroupFromStateClickedState(false);
        srv.props.RuleGroupBtnState(true)
        if(srv.props.dialogTypeVal==="edit"){
            srv.props.editClearTemporaryRsvData();
            srv.props.EditResetTempRuleObj();
        }else{
            srv.props.clearTemporaryRsvData();
            srv.props.ResetTempRuleObj();

        }
    }
   



    returnListofItems = (ele) => {
        const httpAnswerObj = this.props.RsvDataObj.find(obj => obj.hasOwnProperty(ele));
        if (httpAnswerObj) {
            const listofArray = httpAnswerObj[ele]
            return listofArray
        }
    }
    HandleRuleGroupListItemClick=(k,ele,name,rp)=>{
        srv.props.RuleGroupFromStateItemIndex(k);
        // srv.props.RuleGroupFormDisplayState(true);
        srv.props.RuleTriggerFormDisplayState(false);
        srv.props.RuleGroupBtnState(false)
	      srv.props.DisplayConditionForRuleGroup(false);
        srv.props.RuleGroupFromStateClickedState(true);
        srv.props.TabStateObject({isTabDisabled:false,selectedTabIndex:0})
        srv.props.resultContextData({ "ruleSetTypes":[ele] , "attributeType": "BASE_VALUE_TYPE"});
        srv.props.sourceContextData({ "ruleSetTypes":[ele], "attributeType": "BASE_VALUE_TYPE"});
        srv.props.storingRulesInState(srv.props.rsvName,name)
        this.props.ChangeRuleTag(rp)
    }

    onClose = () => {
        srv.props.deleteRGalert(false);
    }

    on2Close = () => {
        srv.props.deleteRTalert(false)
    }

    on3Close = () => {
        srv.props.editRTalert(false)
    }

    onConfirm = () => {
        srv.props.RuleGroupFormDisplayState(false);
        srv.props.DisplayConditionForRuleGroup(false);
        srv.props.RuleGroupFromStateClickedState(false);
        try {
            srv.props.deleteRuleGroup(
                RGname,
                srv.props.rsvName
            );
            setTimeout(() => {
            srv.props.editRecord(srv.props.rsvName);
            },2500)
        } catch (error) {
            console.log(error);
        }
        srv.props.deleteRGalert(false);
    }

    on2Confirm = () => {
        console.log(deleteArr)
        try {
            srv.props.deleteTrigGroup(deleteArr,srv.props.rsvName);         
            setTimeout(() => {
            srv.props.editRecord(srv.props.rsvName);
            },3500)
        } catch (error) {
            console.log(error);
        }
        srv.props.RuleTriggerFormDisplayState(false)
        srv.props.RuleSetType(undefined);
        srv.props.DisplayConditionForRuleGroup(false);
        srv.props.RuleGroupFormDisplayState(false)
        srv.props.deleteRTalert(false)
    }

    on3Confirm = () => {
        console.log(editArr)
        try {
            srv.props.deleteTrigGroup(editArr,srv.props.rsvName);
            setTimeout(() => {
            srv.props.editRecord(srv.props.rsvName);
            srv.props.assignRuleSetNames(srv.props.rsvName);
            },3500)
        } catch (error) {
            console.log(error);
        }

        srv.props.RuleGroupFormDisplayState(false);
        srv.props.AddRsvClickState(true);
        srv.props.handlePhChange("");
        srv.props.editRTalert(false)
    }

    HandleDeleteRuleGroup = (name) => {
            RGname=name
            this.props.deleteRGalert(true)
    };

    alertConfirmationPopup = (title, confirmationText) => {
        return (
            <ErrorDialogCCFK
                title={title}
                variant="CONFIRM"
                message={confirmationText}
                confirmationButtonLabel="DELETE"
                onClose={srv.onClose}
                onConfirm={srv.onConfirm}
            />)
    }

    alertTrigConfirmationPopup = (title, confirmationText) => {
        return (
            <ErrorDialogCCFK
                title={title}
                variant="CONFIRM"
                message={confirmationText}
                confirmationButtonLabel="DELETE"
                onClose={srv.on2Close}
                onConfirm={srv.on2Confirm}
            />)
    }

    alertEditTrigConfirmationPopup = (title, confirmationText) => {
        return (
            <ErrorDialogCCFK
                title={title}
                variant="CONFIRM"
                message={confirmationText}
                confirmationButtonLabel="EDIT"
                onClose={srv.on3Close}
                onConfirm={srv.on3Confirm}
            />)
    }

    HandleEditTrigger= (e,v)=>{
        console.log(e,v)
        let count = e[v].length
        let SaveArr =[]
        for(let i =0;i<count;i++){
            SaveArr.push(e[v][i].name)
        }
        editArr=SaveArr
        console.log(editArr)
        srv.props.editRTalert(true)
    }

    HandleDeleteTrigger = (e,v)=>{
        console.log(e,v)
        let count = e[v].length
        let SaveArr =[]
        for(let i =0;i<count;i++){
            SaveArr.push(e[v][i].name)
        }
        deleteArr=SaveArr
        console.log(deleteArr)
        srv.props.deleteRTalert(true)        
    }

    render(){
        return (
            <div>
                <RuleTriggerFromState HandleEditTrigger={this.HandleEditTrigger} HandleDeleteTrigger={this.HandleDeleteTrigger} element={this.props.element} ruletrigger={_.keys(this.props.element)[0]}/>
                {srv.drawBranchArrow()}
                <div>
                        <div className = "profileLayoutContainer">
                            <div className = "baseProfileContainer profileTriggerContainer">
                                <div className = "baseProfileElement profileRuleGroupHeader">Rule Group</div>
                                {!!_.values(this.props.element)[0]&&_.values(this.props.element)[0].map((element,key) =>
                                    <div key={key} onClick={()=>{
                                        srv.HandleRuleGroupListItemClick(key,_.keys(this.props.element)[0],element.name,element.rulePluginSequence);
                                    }
                                    }className = "baseProfileElement profileRuleGroup">
                                        {element.name}
                                    </div>
                                )
                                }
                                {srv.props.viewmode!==true?<div className="baseProfileElement profileTrigger-add" onClick={()=>{
                                    srv.HandleFooterClick(_.keys(this.props.element)[0]);
                                    srv.props.AddRuleSetTypeForRuleGroupFromState(_.keys(this.props.element)[0]);
                                    srv.props.TabStateObject({isTabDisabled:true,selectedTabIndex:0})
                                }
                                }>
                                    <div className="selecttriggergroup" >
                                        <div className="icaddcircleicon"><AddCircleIcon color="#000000"/></div>
                                        <div>Add Rule group</div>
                                    </div>
                                </div>:null}
                            </div>
                        </div>
                    </div>
                    {this.props.RuleTagListDisplayState?<div style={{width:"max-content",
                                display:"flex",
                                flexDirection:"column",
                                marginTop:"-5px",
                                marginLeft: "2px"}}>
                        <p style={{marginTop:"10px",fontSize:"14px"}}>Rule Tags</p>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            {!!_.values(this.props.element)[0]&&_.values(this.props.element)[0].map((element,key) =>
                                             <div style={{display:"flex",height:"25px"}}>
                                            {element.rulePluginSequence.map(ruleTag=>{
                                                 return <div style={{height:"13px",width:"13px",marginRight:"2px",marginBottom:"2px",marginTop:"-10px",backgroundColor:RuleTagsColoursObj[ruleTag]}}>                                              
                                         </div>           
                                            })}
                                            </div>
                                    )
                            }  
                        </div>
                    </div>:null}
                    <div style={{
                    width: "max-content",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {srv.props.rsvState === "INACTIVE" && !!_.values(this.props.element)[0] && _.values(this.props.element)[0].map((element, key) => (
                            <div style={{ display: "flex", height: "25px" }}>
                                <div key={key} style={{ height: "13px", width: "13px", marginleft: "-20px", marginTop: "15px" }}>
                                    <ArrowGroupListComponent InnerIndex={key} objectKey={_.keys(this.props.element)[0]} listofItems={srv.returnListofItems(_.keys(this.props.element)[0])}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                    <div style={{width:"max-content",
                                display:"flex",
                                flexDirection:"column",
                                }}>
                        <div style={{display:"flex",flexDirection:"column"}}>                     
                            {srv.props.rsvState === "INACTIVE" && !!_.values(this.props.element)[0]&&_.values(this.props.element)[0].map((element,key) =>
                                             <div style={{display:"flex",height:"25px"}}>
                                                <div key={key} style={{height:"13px",width:"13px",marginleft:"-20px",marginTop:"15px"}}>  
                                                <IconButtonCCFK  onClick={() => { srv.HandleDeleteRuleGroup(element.name)}}  >
                                                    <DeleteIcon />
                                                </IconButtonCCFK>                                                    
                                                 </div>
                                                 </div>   
                                    )
                            }                    
                        </div>
                    </div>
                    {srv.props.rgDelete && srv.alertConfirmationPopup("Delete This Rule Group", "Are you sure , You Wish to Delete this Rule group ? ")}
                    {srv.props.rtDelete && srv.alertTrigConfirmationPopup("Delete This Rule Trigger", "Are you sure ,You Wish to Delete this Rule Trigger ? NOTE: All related Rule Groups will be deleted")}
                    {srv.props.rtEdit && srv.alertEditTrigConfirmationPopup("Edit This Rule Trigger", "Are you sure ,You Wish to Edit this Rule Trigger ? NOTE: All related Rule Groups will be deleted")}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        rsvName: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].rsvName : "",
        rsvState: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].state :"",
        TempRuleObjValue: state.renewEditDialog.TempRuleObj,
        RuleTriggerFormDisplayStateValue: state.renewEditDialog.RuleTriggerFormDisplayState,
        viewmode: state.renewEditDialog.viewMode,
        dialogTypeVal:state.renewEditDialog.dialogType,
        TemporaryRsvDataObj: state.renewEditDialog.TemporaryRsvData,
        RsvDataObj: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].RsvData:[],
        rgDelete: state.renewEditDialog.rgDelete,
        rtDelete: state.renewEditDialog.rtDelete,
        rtEdit: state.renewEditDialog.rtEdit
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleGroupFormDisplayState,
        AddRuleSetTypeForRuleGroupFromState,
        clearTemporaryRsvData,
        RuleTriggerFormDisplayState,
        RuleGroupFromStateClickedState,
        storingRulesInState,
        RuleGroupFromStateItemIndex,
        TabStateObject,
        ModifiedSourceContext,
        editClearTemporaryRsvData,
        EditResetTempRuleObj,
        ModifiedResultContext,
        resultContextData,
        sourceContextData,
        ResetTempRuleObj,
        RuleGroupBtnState,
        ChangeRuleTag,
        deleteRuleGroup,
        editRecord,
        getAllData,
        deleteRGalert,
        deleteRTalert,
        editRTalert,
        RuleSetType,
        AddRsvClickState,
        assignRuleSetNames,
        deleteTrigGroup,
   	DisplayConditionForRuleGroup
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleGraphRowFromState);
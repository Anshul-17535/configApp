
import {ruleParser,ReverseRuleParser,ModifyCustomContextObj,getRelatedContext,isRequestContext,isResponseContext} from "../../containers/rulesengine/HelperFunctions"


const _ = require('underscore');

export default function (state={RGDisplayCondition:true,RuleGroupFromStateClickedState:false,RuleSaveBtnDisabledState:true,TabStateObject:{
        isTabDisabled:true,
        selectedTabIndex:0
    },AddRsvClickState:false,RsvNameErrState:false,TempRuleObj:[{"name":"",
        "rule":""}]}, action){
    switch(action.type) {
        case 'NEW_DIALOG_LABELS':
            return {...state, dialogData:action.payload}
        case 'EDIT_DIALOG_LABELS':
            return {...state, dialogData:action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'SET_IMPORT_STATE':
            return {...state,importdialog:action.payload}
        case 'SET_EXPORT_STATE':
            return {...state,exportdialog:action.payload}
        case 'SET_CLONE_STATE':
            return {...state,clonedialog:action.payload}    
        case 'SET_ALL_EXPORT_STATE':
            return {...state,exportAlldialog:action.payload}
        case 'NEW_RECORD_DATA':
            return {...state, recordData:action.payload}
        case 'SET_DIALOG_TYPE' : {
            return {...state, dialogType: action.payload}
        }
        case 'SET_RG_DELETE_STATE' : {
            return {...state, rgDelete: action.payload}
        }
        case 'SET_RT_EDIT_STATE' : {
            return {...state, rtEdit: action.payload}
        }
        case 'SET_RT_DELETE_STATE' : {
            return {...state, rtDelete: action.payload}
        }
        case 'RULE_POST_FLAG' : {
            return {...state, rulepostflag: action.payload}
        }
        case 'SET_SIDE_PROP' : {
            return {...state, sideProp:action.payload}
        }
        case 'SET_API_STATE' : {
            return {...state, apiState: action.payload}
        }
        case 'UPDATE_RECORD_DATA': {
            if (!state.recordData)
                state.recordData = {};
            return {...state, recordData:_.extend(state.recordData,action.payload)}
        }
        case 'SAVE_BUTTON_STATE': {
            return {...state, saveBtnState: action.payload}
        }
        /*Reducer for initialising state*/
        case 'ADD_NEW_RSV_DATA':{
            // let srcdata=state.sourcecontext;
            let RuleStr= {
                "name": "",
                "status":"fail",
                "description": "",
                "enabled": true,
                "conditionContainer": {
                    "conditions": [
                        {
                            "criteriaAdjustValue": [],
                            "adjustOperator": null,
                            "operator": "",
                            "value": null,
                            "criteriaAdjustOperator": null,
                            "adjustValue": [],
                            "valueArguments": [],
                            "criteriaArguments": [],
                            "criteria": {
                                "sourceContext": "",
                                "name": ""
                            }
                        }
                    ],
                    "operator": "AND",
                    "subContainers": []
                },
                "actions": [
                    {
                        "attributeInfoRequest": {
                            "resultContext": "",
                            "name": ""
                        },
                        "parameterRequests": [
                            {
                                "adjustOperatorRequest": null,
                                "attributeArgumentRequests": [],
                                "name": "Data",
                                "adjustDataRequest": [],
                                "data": {
                                    "type": "NO_VALUE",
                                    "value": ""
                                }
                            }
                        ]
                    }
                ]
            };
            let TemporaryRsvData={
                "name": "",
                "rsvName": "",
                "ruleTableScheduleName":null,
                "rules": [RuleStr],
                "topLevelTable": true,
                "ruleSetType": [],
                "rulePluginSequence": []
            }
            let updatedRules=state.Rules?state.Rules:[];
            updatedRules.unshift(action.payload)

            return {...state,Rules:updatedRules,TemporaryRsvData:TemporaryRsvData}
        }
        
        /*Reducer functions for Rsv name and state*/
        case 'ADD_RSV_NAME':{
            const RuleGroup=state.Rules;
            const TempRuleGroup=state.TemporaryRsvData;
            RuleGroup[0].rsvName=action.payload;
            TempRuleGroup.rsvName=action.payload;
            return {
                ...state, Rules: RuleGroup,TemporaryRsvData:TempRuleGroup
            }
        }

        case 'ADD_CLONE_RSV_NAME':{
            return {
                ...state, RsvCloneNameState: action.payload
            }
        }

        case 'ADD_RSV_STATE':{
            const RuleGroup=state.Rules;
            RuleGroup[0].state=action.payload;
            return {
                ...state, Rules: RuleGroup
            }
        }
        case 'RSV_SAVE_BTN_CLICK_STATE':{
            return {
                ...state, RsvSaveState:action.payload
            }
        }
        //for rule trigger
        case 'RULE_SET_TYPE_DATA':{
            const TempRuleGroup=state.TemporaryRsvData;
                if(!!state.Rules&&!!state.Rules[0]){
                    TempRuleGroup.ruleSetType[0]=state.Rules[0].ruleSetNames[action.payload]
                }
            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }
        }
        case 'RULE_TRIGGER_FORM_DISPLAY_STATE':{
            return {...state, RuleTriggerFormDisplayState: action.payload}

        }
        //For Rule Group Form
        case 'RULE_GROUP_NAME':{
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.name=action.payload;
            return {...state, TemporaryRsvData:TempRuleGroup}

        }
        //For Rule Tags
        case 'RULE_TAGS_STATE':{
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.rulePluginSequence=action.payload;
            return {...state, TemporaryRsvData:TempRuleGroup}
        }

        case 'CHANGE_RULE_TAG':{
            return {...state, SelectTagValue: action.payload}
        }
        case 'TOP_LEVEL_RULE_GROUP':{
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.topLevelTable=action.payload;
            return {...state, TemporaryRsvData:TempRuleGroup}

        }
        case 'RSV_NAME_ERROR_STATE':{
            return {...state, RsvNameErrState:action.payload}

        }
        case 'RULE_GROUP_FORM_DISPLAY_STATE':{
            return {
                ...state, RuleGroupFormDisplayState:action.payload
            }

        }
        //For adding RSV Data
        case 'ADD_RULE_EDITORS':{
            let RuleStr= {
                "name": "",
                "status":"fail",
                "description": "",
                "enabled": true,
                "conditionContainer": {
                    "conditions": [
                        {
                            "criteriaAdjustValue": [],
                            "adjustOperator": null,
                            "operator": "",
                            "value": null,
                            "criteriaAdjustOperator": null,
                            "adjustValue": [],
                            "valueArguments": [],
                            "criteriaArguments": [],
                            "criteria": {
                                "sourceContext": "",
                                "name": ""
                            }
                        }
                    ],
                    "operator": "AND",
                    "subContainers": []
                },
                "actions": [
                    {
                        "attributeInfoRequest": {
                            "resultContext": "",
                            "name": ""
                        },
                        "parameterRequests": [
                            {
                                "adjustOperatorRequest": null,
                                "attributeArgumentRequests": [],
                                "name": "Data",
                                "adjustDataRequest": [],
                                "data": {
                                    "type": "NO_VALUE",
                                    "value": ""
                                }
                            }
                        ]
                    }
                ]
            };
            let TempRule={"name":"",
            "rule":""}
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.rules.push(RuleStr)
            let TempRuleObjcopy=state.TempRuleObj;
            TempRuleObjcopy.push(TempRule);
            return {
                ...state, TemporaryRsvData:TempRuleGroup,TempRuleObj:TempRuleObjcopy
            }

        }
        //For checking rule status
        // case 'RULE_STATUS':{
        //     const TempRuleGroup=state.TemporaryRsvData;
        //     TempRuleGroup.rules[action.ind].RuleStatus=action.payload
        //
        //     return {
        //         ...state, TemporaryRsvData:TempRuleGroup
        //     }
        //
        // }
        //update rule editors
        case 'UPDATE_RULE_EDITOR':{
            const TempRuleGroup=state.TemporaryRsvData;
            let RuleStatusCopy=TempRuleGroup.rules[action.ind].RuleStatus;
            TempRuleGroup.rules[action.ind]=action.payload;
            TempRuleGroup.rules[action.ind].RuleStatus=RuleStatusCopy;

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        //update rule name
        case 'UPDATE_RULE_NAME':{
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.rules[action.ind].name=action.payload;

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        //for deleting rules
        case 'DELETE_RULES':{
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.rules.splice(action.ind,1)
            const TempRuleObjCopy=state.TempRuleObj;
            TempRuleObjCopy.splice(action.ind,1)
            return {
                ...state, TemporaryRsvData:TempRuleGroup, TempRuleObj: TempRuleObjCopy
            }

        }
        //clear temporary rsv data
        case 'CLEAR_TEMPORARY_RSV_DATA':{
            let rsvName=state.TemporaryRsvData.rsvName;
            let RuleStr= {
                "name": "",
                "status":"fail",
                "description": "",
                "enabled": true,
                "conditionContainer": {
                    "conditions": [
                        {
                            "criteriaAdjustValue": [],
                            "adjustOperator": null,
                            "operator": "",
                            "value": null,
                            "criteriaAdjustOperator": null,
                            "adjustValue": [],
                            "valueArguments": [],
                            "criteriaArguments": [],
                            "criteria": {
                                "sourceContext": "",
                                "name": ""
                            }
                        }
                    ],
                    "operator": "AND",
                    "subContainers": []
                },
                "actions": [
                    {
                        "attributeInfoRequest": {
                            "resultContext": "",
                            "name": ""
                        },
                        "parameterRequests": [
                            {
                                "adjustOperatorRequest": null,
                                "attributeArgumentRequests": [],
                                "name": "Data",
                                "adjustDataRequest": [],
                                "data": {
                                    "type": "NO_VALUE",
                                    "value": ""
                                }
                            }
                        ]
                    }
                ]
            };
            let TempRuleGroup={
                "name": "",
                "rsvName": "",
                "rules": [RuleStr],
                "topLevelTable": true,
                "ruleSetType": [],
                "rulePluginSequence": []
            }
            TempRuleGroup.rsvName=rsvName;

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        case 'EDIT_CLEAR_TEMPORARY_RSV_DATA':{
            let rsvName=state.TemporaryRsvData.rsvName;
            let TempRuleGroup={
                "name": "",
                "rsvName": "",
                "rules": [],
                "topLevelTable": true,
                "ruleSetType": [],
                "rulePluginSequence": []
            }
            TempRuleGroup.rsvName=rsvName;

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        case 'RG_CLEAR_TEMPORARY_RSV_DATA':{
            let rsvName=state.TemporaryRsvData.rsvName;
            let ruleSetType=state.TemporaryRsvData.ruleSetType;
            let TempRuleGroup;
            let RuleStr= {
                "name": "",
                "status":"fail",
                "description": "",
                "enabled": true,
                "conditionContainer": {
                    "conditions": [
                        {
                            "criteriaAdjustValue": [],
                            "adjustOperator": null,
                            "operator": "",
                            "value": null,
                            "criteriaAdjustOperator": null,
                            "adjustValue": [],
                            "valueArguments": [],
                            "criteriaArguments": [],
                            "criteria": {
                                "sourceContext": "",
                                "name": ""
                            }
                        }
                    ],
                    "operator": "AND",
                    "subContainers": []
                },
                "actions": [
                    {
                        "attributeInfoRequest": {
                            "resultContext": "",
                            "name": ""
                        },
                        "parameterRequests": [
                            {
                                "adjustOperatorRequest": null,
                                "attributeArgumentRequests": [],
                                "name": "Data",
                                "adjustDataRequest": [],
                                "data": {
                                    "type": "NO_VALUE",
                                    "value": ""
                                }
                            }
                        ]
                    }
                ]
            };
            if(state.dialogType=="edit"){
                TempRuleGroup={
                    "name": "",
                    "rsvName": "",
                    "rules": [],
                    "topLevelTable": true,
                    "ruleSetType": [],
                    "rulePluginSequence": []
                }
            }else{
                 TempRuleGroup={
                    "name": "",
                    "rsvName": "",
                    "rules": [RuleStr],
                    "topLevelTable": true,
                    "ruleSetType": [],
                    "rulePluginSequence": []
                }
            }

            TempRuleGroup.rsvName=rsvName;
            TempRuleGroup.ruleSetType=ruleSetType;

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        //for rulegroup save
        case 'RULE_GROUP_SAVE':{
            const RuleGroup=state.Rules;
            let obj={};
            let objk=action.payload.ruleSetType[0];
            let objv=[action.payload];
            obj[objk]=objv;
            let cond=RuleGroup[0].RsvData.find(element => (_.keys(element)[0] == action.payload.ruleSetType[0]));
            if(RuleGroup[0].RsvData.length==0||!cond){
                RuleGroup[0].RsvData.push(obj);

            }else{
                 if(state.RuleGroupFromStateClickedState==false){
                     _.values(cond)[0].push(action.payload)
                 }else{
                     _.values(cond)[0][state.RuleGroupFromStateItemIndex]=action.payload;
                 }
            }

            return {
                ...state, Rules: RuleGroup
            }

        }
        //Adding rulesetType for rulegroupFromState
        case 'ADD_RULESETTYPE_FOR_RULEGROUPFROMSTATE':{

            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.ruleSetType[0]=action.payload

            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }

        }
        //displaycondition for rulegroup

        case 'DISPLAY_CONDITION_FOR_RULEGROUP':{

            return {
                ...state, RGDisplayCondition:action.payload
            }

        }
        case 'ADD_RSV_CLICK_STATE':{

            return {
                ...state, AddRsvClickState:action.payload
            }

        }

        //click of RuleGroupFrom state item
        case 'RULEGROUP_FROM_STATE_CLICK_STATE':{
            return {
                ...state, RuleGroupFromStateClickedState:action.val
            }

        }
        //store the index of rulegroupfromstate item
        case 'RULEGROUP_FROM_STATE_ITEM_INDEX':{
            return {
                ...state, RuleGroupFromStateItemIndex:action.val
            }

        }

        //Tab state object
        case 'TAB_STATE_OBJECT':{
            let updatedTabStateObject={
                isTabDisabled:action.val.isTabDisabled,
                selectedTabIndex:action.val.selectedTabIndex
            }
            return {
                ...state, TabStateObject:updatedTabStateObject
            }

        }
        //deleting rules from grid
        case 'DELETE_RULES_DATAGRID':{
            let rulegroup = state.Rules;
            rulegroup && rulegroup.splice(action.index,1)
            return {...state,Rules:rulegroup}

        }
        //index of rules in grid
        case 'RULE_INDEX' : {
            return {...state, RuleIndex: action.payload}
        }
        //view mode tag
        case 'VIEW_MODE' : {
            return {...state, viewMode: action.payload}
        }
        //handling rule name update
        case 'RULE_NAME_UPDATE' : {
            const TempRuleObjCopy = state.TempRuleObj;
            const TemporaryRsvDataCopy=state.TemporaryRsvData;
            TempRuleObjCopy[action.index].name = action.payload;
            TemporaryRsvDataCopy.rules[action.index].name = action.payload;
            return {
                ...state, TempRuleObj: TempRuleObjCopy,TemporaryRsvData:TemporaryRsvDataCopy
            }
        }
        //handling rule content update
        case 'RULE_CONTENT_UPDATE' : {
            const TempRuleObjCopy=state.TempRuleObj;
            TempRuleObjCopy[action.index].rule=action.payload;
            return {
                ...state, TempRuleObj:TempRuleObjCopy
            }
        }
        //Rule save button disabled state
        case 'RULE_SAVE_BTN_DISABLED_STATE' : {


            return {
                ...state, RuleSaveBtnDisabledState:action.payload
            }
        }
        //Rule group btn state
        case 'RULE_GROUP_BTN_STATE':{
            return{
                ...state,RuleGroupBtnState:action.payload
            }
        }

        //New HttpHeaderData
        case 'GET_HTTP_HEADER':{
            return{
                ...state,Headersdata:action.payload
            }
        }

        //ALL Export data
        case 'EXPORT_ALL_DATA':{
            return{
                ...state,ExportAlldata:action.payload
            }
        }

        //ONE EXPORT data
        case 'EXPORT_ONE_DATA':{
            return{
                ...state,ExportOnedata:action.payload
            }
        }

        //Rule plugin sequence state
        case 'GET_PLUGIN_SEQUENCE':{
	    console.log("1729",state)
            return{
                ...state,RuleTags:!!action.payload?action.payload:[]
            }
        }

        //Update rules into temporary rsv data
        case 'UPDATE_RULES_TO_TEMP_RSV_DATA' : {

            const TempRuleObjval=state.TempRuleObj;
            const TemporaryRsvDataCopy=state.TemporaryRsvData
            let result=[];
            // ruleParser
            TempRuleObjval.map(element=>{
                result.push(ruleParser(element.name,element.rule,TemporaryRsvDataCopy.ruleSetType[0],state.sourcecontext[state.TemporaryRsvData.ruleSetType[0]],state.resultcontext[state.TemporaryRsvData.ruleSetType[0]],state.sourceContextKeys,state.resultContextKeys))
            })
            TemporaryRsvDataCopy.rules=result;
            return {
                ...state, TemporaryRsvData:TemporaryRsvDataCopy
            }
        }
        //update rule from temprsvdata to rsv data
        case 'UPDATE_RULES_FROM_TEMP_RSV_DATA_TO_RSV_DATA' : {
            const RuleGroup = state.Rules;
            let obj = {};
            let objk = !!state.TemporaryRsvData&&state.TemporaryRsvData.ruleSetType[0];
            let objv = [state.TemporaryRsvData];
            obj[objk] = objv;
            let cond = RuleGroup[0].RsvData.find(element => (_.keys(element)[0] == state.TemporaryRsvData.ruleSetType[0]));
            if(RuleGroup[0].RsvData.length==0||!cond){
                RuleGroup[0].RsvData.push(obj);

            }else{
                _.values(cond)[0][state.RuleGroupFromStateItemIndex] = state.TemporaryRsvData;
            }
            return {
                ...state,rules:RuleGroup,
            }
        }
        //handling rule status
        case 'RULE_STATUS' : {
            const TempRuleGroup=state.TemporaryRsvData;
            TempRuleGroup.rules[action.index].status=action.payload;
            return {
                ...state, TemporaryRsvData:TempRuleGroup
            }
        }
        // src context data save
        case 'GET_SOURCE_CONTEXT' : {
            let sourceContextKeys=_.keys(action.payload)
	    let RuleTriggerName=action.trigger
            let ModifiedSrcContextObject={}
	    let omittedObj=_.omit(action.payload,[RuleTriggerName,getRelatedContext(RuleTriggerName)]);
            ModifiedSrcContextObject[RuleTriggerName]=_.extend(action.payload[RuleTriggerName],ModifyCustomContextObj(omittedObj),sourceContextKeys.includes(getRelatedContext(RuleTriggerName))?action.payload[getRelatedContext(RuleTriggerName)]:{}) 
            //let omittedObj=_.omit(action.payload,RuleTriggerName);
            //ModifiedSrcContextObject[RuleTriggerName]=_.extend(action.payload[RuleTriggerName],ModifyCustomContextObj(omittedObj))
	          return {
                ...state,sourceContextKeys:sourceContextKeys,sourcecontext:ModifiedSrcContextObject
            }
        }
        //result context data save
        case 'GET_RESULT_CONTEXT' : {
            let resultContextKeys=_.keys(action.payload)
	    let RuleTriggerName=action.trigger
            let ModifiedResContextObject={}
            let omittedObj=_.omit(action.payload,RuleTriggerName)
            ModifiedResContextObject[RuleTriggerName]=_.extend(action.payload[RuleTriggerName],ModifyCustomContextObj(omittedObj))
            return {
                ...state,resultContextKeys:resultContextKeys,resultcontext:ModifiedResContextObject
            }
        }
        //STORE_RULE_DATA_IN_STORE
        case 'STORE_RULE_DATA_IN_STORE' : {
            // const TempRuleGroup=state.TemporaryRsvData;
            // TempRuleGroup.rules[action.index].status=action.payload;
            
            let Temp=action.payload;
            let TempPayload=[];
            !!action.payload.rules&&action.payload.rules.map(ele=>{
                ele.status="pass";
                TempPayload.push(ele);
            });
            Temp.rules=TempPayload;

            return {
                ...state, TemporaryRsvData:Temp,TempRuleObj:[]
            }
        }
        case 'REVERSE_RULE_PARSER':{
            let TempRuleObjCopy=[];
            !!state.TemporaryRsvData&&state.TemporaryRsvData.rules.map((element,i)=>{
                let obj={
                    "name":"",
                    "rule":""
                }
                obj["name"]=element.name;
                obj["rule"]=element.status==="pass"?ReverseRuleParser(element,state.TemporaryRsvData.ruleSetType[0],state.sourcecontext,state.resultcontext):state.TempRuleObj[i].rule
                TempRuleObjCopy.push(obj)
            })
            return {
                ...state,TempRuleObj:TempRuleObjCopy
            }
        }

        //STORE_DISPLAY_DATA
        case 'STORE_DISPLAY_DATA' : {
            let RuleStr= {
                "name": "",
                "status":"fail",
                "description": "",
                "enabled": true,
                "conditionContainer": {
                    "conditions": [
                        {
                            "criteriaAdjustValue": [],
                            "adjustOperator": null,
                            "operator": "",
                            "value": null,
                            "criteriaAdjustOperator": null,
                            "adjustValue": [],
                            "valueArguments": [],
                            "criteriaArguments": [],
                            "criteria": {
                                "sourceContext": "",
                                "name": ""
                            }
                        }
                    ],
                    "operator": "AND",
                    "subContainers": []
                },
                "actions": [
                    {
                        "attributeInfoRequest": {
                            "resultContext": "",
                            "name": ""
                        },
                        "parameterRequests": [
                            {
                                "adjustOperatorRequest": null,
                                "attributeArgumentRequests": [],
                                "name": "Data",
                                "adjustDataRequest": [],
                                "data": {
                                    "type": "NO_VALUE",
                                    "value": ""
                                }
                            }
                        ]
                    }
                ]
            };
            let TemporaryObj={
            "distributionList":[],
                "smProvState":"",
                "modifiedBy":"",
                "modifiedDate":"",
                "rsvName":"",
                "description":"",
                "state":"",
                "activateState":"",
                "lastChangeTimestamp":"",
                "activeList":[],
                "RsvData": [],
                "ruleSetNames":[]
            };
            let temprsvobj={
                "name": "",
                "rsvName": "",
                "ruleTableScheduleName":null,
                "rules": [RuleStr],
                "topLevelTable": true,
                "ruleSetType": [],
                "rulePluginSequence": []
            }
            TemporaryObj.rsvName=action.payload.rsvName;
            TemporaryObj.state=action.payload.state;
            temprsvobj.rsvName=action.payload.rsvName;
            action.payload.ruleSets.map(element=>{
                // tempArr.push(element.ruleTableName)
                let obj={};
                if(element.ruleTableNames.length>0){
                    !!TemporaryObj&&TemporaryObj.ruleSetNames.push(element.ruleSetName);
                    obj[element.ruleSetName]=[];
                    element.ruleTableNames.map(ele=>{
			let rulePluginSequenceArray=action.payload.ruleTables.filter(e=>e["ruleTableName"]===ele)
                        obj[element.ruleSetName].push({"name":ele,"rulePluginSequence":rulePluginSequenceArray[0]["rulePluginSequence"]})
                    });
                    TemporaryObj.RsvData.push(obj)

                    // temprsvobj.ruleSetType.push(element.ruleSetName)
                }

            })
            let RuleGroup=[TemporaryObj];
            return {
                ...state, Rules: RuleGroup , TemporaryRsvData:   temprsvobj       }
        }

        case 'VIEW_DISPLAY_DATA' : {
            let TemporaryObj={
            "distributionList":[],
                "smProvState":"",
                "modifiedBy":"",
                "modifiedDate":"",
                "rsvName":"",
                "description":"",
                "state":"",
                "activateState":"",
                "lastChangeTimestamp":"",
                "activeList":[],
                "RsvData": [],
                "ruleSetNames":["nbsf-management|/pcfBindings|post|request"]
            };
            let temprsvobj={
                "name": "",
                "rsvName": "",
                "ruleTableScheduleName":null,
                "rules": [],
                "topLevelTable": true,
                "ruleSetType": [],
                "rulePluginSequence": []
            }
            TemporaryObj.rsvName=action.payload.rsvName;
            TemporaryObj.state=action.payload.state;
            temprsvobj.rsvName=action.payload.rsvName;

            action.payload.ruleSets.map(element=>{
                // tempArr.push(element.ruleTableName)
                let obj={};
                if(element.ruleTableNames.length>0){
                    !!TemporaryObj&&TemporaryObj.ruleSetNames.push(element.ruleSetName);
                    obj[element.ruleSetName]=[];
                    element.ruleTableNames.map(ele=>{
			let rulePluginSequenceArray=action.payload.ruleTables.filter(e=>e["ruleTableName"]===ele)
                        obj[element.ruleSetName].push({"name":ele,"rulePluginSequence":rulePluginSequenceArray[0]["rulePluginSequence"]})
                    });
                    TemporaryObj.RsvData.push(obj)

                    temprsvobj.ruleSetType.push(element.ruleSetName)
                }

            })
            let RuleGroup=[TemporaryObj];
            return {
                ...state, Rules: RuleGroup , TemporaryRsvData:   temprsvobj       }
        }
        //result context data save
        case 'ASSIGN_RULE_SET_NAMES' : {
            const RuleGroup=state.Rules;

            RuleGroup[0].ruleSetNames=action.payload.ruleSetNames;
            return {
                ...state, Rules: RuleGroup
            }
        }
        //reset temp rule obj
        case 'RESET_TEMPRULE_OBJ' : {
            let TempRuleObjCopy=[{"name":"",
                "rule":""}]
            return {
                ...state, TempRuleObj: TempRuleObjCopy
            }
        }
        case 'EDIT_RESET_TEMPRULE_OBJ' : {
            let TempRuleObjCopy=[]
            return {
                ...state, TempRuleObj: TempRuleObjCopy
            }
        }
        //Arrow Button Click State
        case 'ARROW_BTN_CLICK_STATE':{
            return {
                ...state, ArrowGroupState:action.payload
            }
        }
        //RuleGroup Reorder
        case 'PERFORM_LIST_RULEGROUP_REORDER': {
            let currentRuleGroupCopy =state.Rules
            currentRuleGroupCopy[0].RsvData=action.RsvDataObjList
            return {...state, Rules:currentRuleGroupCopy}
                };
        //modified result context
        case 'MODIFIED_RESULT_CONTEXT' : {
            let modifiedResult={};
            let ResultContext=state.resultcontext;
            let triggerKeys=_.keys(ResultContext);
            let arrayofconditions=[];
            triggerKeys.map(element=>{
                let ifthen=[];
                modifiedResult[element]={};
                modifiedResult[element]["ifThen"]=ifthen;
                arrayofconditions=_.keys(ResultContext[element]);
                arrayofconditions.map((e)=>{
                    let i=0;
                    while(i<e.split(".").length){
                        if(i==0){
                            if(e.includes(".")==true){
                                modifiedResult[element]["ifThen"].push(e.split(".")[0]);
                                modifiedResult[element]["ifThen"]=_.uniq(modifiedResult[element]["ifThen"])
                            }else{
                                modifiedResult[element]["ifThen"].push(e)
                                modifiedResult[element]["ifThen"]=_.uniq(modifiedResult[element]["ifThen"])

                            }
                        }
                        else if(i==1){
                            modifiedResult[element]["ifThen"].map(ele=>{

                                if(modifiedResult[element][ele] === undefined || modifiedResult[element][ele] === null){
                                    modifiedResult[element][ele] = [];
                                }

                                modifiedResult[element][ele]=e.split(".")[i-1]==ele?[...modifiedResult[element][ele],e.split(".")[i]]:modifiedResult[element][ele];
                                modifiedResult[element][ele]=_.uniq(modifiedResult[element][ele]);
                            })
                        }
                        else{
                            if(modifiedResult[element][e.split(".")[i-1]]!=undefined){
                                modifiedResult[element][e.split(".")[i-1]]=modifiedResult[element][e.split(".")[i-1]]

                            }else{
                                modifiedResult[element][e.split(".")[i-1]]=[];
                            }

                            modifiedResult[element][e.split(".")[i-1]]=[...modifiedResult[element][e.split(".")[i-1]],e.split(".")[i]];
                            modifiedResult[element][e.split(".")[i-1]]=_.uniq(modifiedResult[element][e.split(".")[i-1]]);


                        }
                        i++;
                    }
                })

            })

            return {
                ...state, ModifiedResultContext: modifiedResult
            }
        }
        //Modified source context
        case 'MODIFIED_SOURCE_CONTEXT' : {

            let modifiedsrc={};
            let srcContext=state.sourcecontext;
            let triggerKeys=_.keys(srcContext);
            let arrayofconditions=[];
            triggerKeys.map(element=>{
                let ifthen=[];
                modifiedsrc[element]={};
                modifiedsrc[element]["ifThen"]=ifthen;
                arrayofconditions=_.keys(srcContext[element]);
                arrayofconditions.map((e)=>{
                    let i=0;
                    while(i<e.split(".").length){
                        if(i==0){
                            if(e.includes(".")==true){
                                modifiedsrc[element]["ifThen"].push(e.split(".")[0]);
                                modifiedsrc[element]["ifThen"]=_.uniq(modifiedsrc[element]["ifThen"])
                            }else{
                                modifiedsrc[element]["ifThen"].push(e)
                                modifiedsrc[element]["ifThen"]=_.uniq(modifiedsrc[element]["ifThen"])

                            }

                        }
                        else if(i==1){
                            modifiedsrc[element]["ifThen"].map(ele=>{

                                if(modifiedsrc[element][ele] === undefined || modifiedsrc[element][ele] === null){
                                    modifiedsrc[element][ele] = [];
                                }

                                modifiedsrc[element][ele]=e.split(".")[i-1]==ele?[...modifiedsrc[element][ele],e.split(".")[i]]:modifiedsrc[element][ele];
                                modifiedsrc[element][ele]=_.uniq(modifiedsrc[element][ele]);
                            })
                        }
                        else{
                            if(modifiedsrc[element][e.split(".")[i-1]]!=undefined){
                                modifiedsrc[element][e.split(".")[i-1]]=modifiedsrc[element][e.split(".")[i-1]]

                            }else{
                                modifiedsrc[element][e.split(".")[i-1]]=[];
                            }

                            modifiedsrc[element][e.split(".")[i-1]]=[...modifiedsrc[element][e.split(".")[i-1]],e.split(".")[i]];
                            modifiedsrc[element][e.split(".")[i-1]]=_.uniq(modifiedsrc[element][e.split(".")[i-1]]);


                        }
                        i++;
                    }
                })

            })
            return {
                ...state, ModifiedSrcContext: modifiedsrc
            }
        }




        default:
            return state;
    }
}
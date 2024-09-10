
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const onSideClick = (value) =>{
    return {
        type : 'SET_SIDE_PROP',
        payload:value
    }
}

export const newDialogLabels = () => {
    return {
        type : 'NEW_DIALOG_LABELS',
        payload:{DeleteRulesDatagrid,
            title: 'Add Rules Emgine Configuration',
            buttonCancelLabel:"Cancel",
            buttonApplyLabel:"Save",
        }
    }
}

export const deleteRGalert = (showDialog) =>{
    return {
        type : 'SET_RG_DELETE_STATE',
        payload:showDialog
    }
}

export const deleteRTalert = (showDialog) =>{
    return {
        type : 'SET_RT_DELETE_STATE',
        payload:showDialog
    }
}

export const editRTalert = (showDialog) =>{
    return {
        type : 'SET_RT_EDIT_STATE',
        payload:showDialog
    }
}

export const SetReverseRuleParser=()=>{
    return{
        type:"REVERSE_RULE_PARSER",
    }
}

export const editDialogLabels = () => {
    return {
        type : 'EDIT_DIALOG_LABELS',
        payload:{
            title: 'Edit Configuration',
            buttonCancelLabel:"Cancel",
            buttonApplyLabel:"Save",
        }
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE',
        payload:showDialog
    }
}


export const setImportDialog = (showDialog) => {
    return {
        type : 'SET_IMPORT_STATE',
        payload:showDialog
    }
}

export const setExportDialog = (showDialog) => {
    return {
        type : 'SET_EXPORT_STATE',
        payload:showDialog
    }
}

export const setCloneDialog = (showDialog) => {
    return {
        type : 'SET_CLONE_STATE',
        payload:showDialog
    }
}

export const setExportAllDialog = (showDialog) => {
    return {
        type : 'SET_ALL_EXPORT_STATE',
        payload:showDialog
    }
}


export const newRecordData = () => {
    return {
        type: 'NEW_RECORD_DATA',
        payload : {
            "FormName":"Rules Engine",
            "HasSubForms":"false",
            "Fields":[
                {
                    "label": "id",
                    "index": 0,
                    "mandatory": false,
                    "type": "number",
                    "fieldValue": "",
                    "placeholder": "",
                    "name": "id",
                    "tooltip": "",
                    "min": "",
                    "max": "",
                    "maxlength": "",
                    "autoFocus": "true",
                    "pattern": "",
                    "isArray":"false",
                    "arrayData":[],
                    "text": "",
                    "defaultValue":"",
                    "hasInnerFields":false,
                    "gridDisplay":false,
                    "formDisplay":false
                },
                {
                    "label": "RSV Name",
                    "mandatory": false,
                    "type": "text",
                    "fieldValue": "",
                    "placeholder": "Specify the RSV name",
                    "name": "rsvName",
                    "tooltip": "",
                    "min": "",
                    "max": "",
                    "maxlength": "",
                    "autoFocus": "",
                    "pattern": "",
                    "isArray":"false",
                    "arrayData":[],
                    "defaultValue":"",
                    "hasInnerFields":false,
                    "gridDisplay":true,
                    "formDisplay":true,
                    "error":false,
                    "errorMsg":""
                },
                {
                    "label": "RSV State",
                    "mandatory": false,
                    "type": "text",
                    "fieldValue": "",
                    "placeholder": "Specify the RSV state",
                    "name": "state",
                    "tooltip": "",
                    "min": "",
                    "max": "",
                    "maxlength": "",
                    "autoFocus": "",
                    "pattern": "",
                    "isArray":"false",
                    "arrayData":[],
                    "defaultValue":"",
                    "hasInnerFields":false,
                    "gridDisplay":true,
                    "formDisplay":true,
                    "error":false,
                    "errorMsg":""
                }
            ]
        }
    }
}


export const updateRecordData = (newValue) => {
    return {
        type: 'UPDATE_RECORD_DATA',
        payload :newValue
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_TYPE',
        payload :type
    }
}
export const setDeleteAlertState = (showAlertDialog) =>{
    return {
        type: 'SET_ALERTDIALOG_STATE',
        payload :showAlertDialog
    }
}

export const importAlertState = (importAlertDialog) =>{
    return {
        type: 'SET_IMPORT_ALERT_STATE',
        payload :importAlertDialog
    }
}

export const saveState = (data)=>{
    return {
        type: 'SAVE_STATE',
        payload :data
    }
}

export const setKeycloakDetails = (setValue) => {
    return {
        type: 'SET_KEYCLOAK_DATA',
        payload :setValue
    }
}
export const addNewRuleDialogState = (setValue) => {
    return {
        type: 'ADD_NEW_RULE_DIALOG_STATE',
        payload :setValue
    }
}
export const addNewRSVData=()=> {
    return {
        type: "ADD_NEW_RSV_DATA",
        payload: {
            "distributionList":[],
            "smProvState":"",
            "modifiedBy":"",
            "modifiedDate":"",
            "rsvName":"",
            "description":"",
            "state":"INACTIVE",
            "activateState":"",
            "lastChangeTimestamp":"",
            "activeList":[],
            "RsvData": [],
            "ruleSetNames":["nbsf-management|/pcfBindings|post|request"]

        }
    }

}
export const addRSVname = (setValue) => {
    return {
        type: 'ADD_RSV_NAME',
        payload :setValue
    }
}

export const addCloneRSVname = (setValue) => {
    return {
        type: 'ADD_CLONE_RSV_NAME',
        payload :setValue
    }
}

export const addRSVstate = (setValue) => {
    return {
        type: 'ADD_RSV_STATE',
        payload :setValue
    }
}
export const RsvOnSaveBtnClick = (setValue) => {
    return {
        type: 'RSV_SAVE_BTN_CLICK_STATE',
        payload :setValue
    }
}
export const RsvNameErrorState = (setValue) => {
    return {
        type: 'RSV_NAME_ERROR_STATE',
        payload :setValue
    }
}
//For rule triggers
export const RuleSetType = (setValue) => {
    return {
        type: 'RULE_SET_TYPE_DATA',
        payload :setValue
    }
}
export const RuleTriggerFormDisplayState = (setValue) => {
    return {
        type: 'RULE_TRIGGER_FORM_DISPLAY_STATE',
        payload :setValue
    }
}
//For Rule Group Form
export const RuleGroupName = (setValue) => {
    return {
        type: 'RULE_GROUP_NAME',
        payload :setValue
    }
}
//For Rule Tags state
export const RuleTagsState=(RuleTags)=>{
    return{
        type:'RULE_TAGS_STATE',
        payload:RuleTags
    }
}

export const ChangeRuleTag=(Rule)=>{
    return{
        type:'CHANGE_RULE_TAG',
        payload:Rule
    }
}

export const TopLevelRuleGroup = (setValue) => {
    return {
        type: 'TOP_LEVEL_RULE_GROUP',
        payload :setValue
    }
}
export const RuleGroupFormDisplayState = (setValue) => {
    return {
        type: 'RULE_GROUP_FORM_DISPLAY_STATE',
        payload :setValue
    }
}
//For Adding RSV data
export const AddRsvData = (setValue) => {
    return {
        type: 'ADD_RSV_DATA',
        payload :setValue
    }
}
//For Adding Rule Editors
export const AddRuleEditors = () => {
    return {
        type: 'ADD_RULE_EDITORS'
    }
}

//update Rule Editors
export const UpdateRuleEditor = (val,index) => {
    return {
        type: 'UPDATE_RULE_EDITOR',
        payload:val,
        ind:index
    }
}
//updating the rule name
export const UpdateRuleName = (val,index) => {
    return {
        type: 'UPDATE_RULE_NAME',
        payload:val,
        ind:index
    }
}
//for checking rule status
// export const RuleStatus = (val,index) => {
//     return {
//         type: 'RULE_STATUS',
//         payload:val,
//         ind:index
//     }
// }
//for deleting rules
export const DeleteRules = (index) => {
    return {
        type: 'DELETE_RULES',
        ind:index
    }
}
//saving temporaryrsvdata to rsvData
export const RuleGroupSave = (val) => {
    return {
        type: 'RULE_GROUP_SAVE',
         payload:val
    }
}
//clear temprsv data
export const clearTemporaryRsvData = () => {
    return {
        type: 'CLEAR_TEMPORARY_RSV_DATA',
    }
}
export const RGclearTemporaryRsvData = () => {
    return {
        type: 'RG_CLEAR_TEMPORARY_RSV_DATA',
    }
}
export const editClearTemporaryRsvData = () => {
    return {
        type: 'EDIT_CLEAR_TEMPORARY_RSV_DATA',
    }
}
export const AddRsvClickState = (val) => {
    return {
        type: 'ADD_RSV_CLICK_STATE',
        payload:val
    }
}


//Adding rulesetType for rulegroupFromState
export const AddRuleSetTypeForRuleGroupFromState = (val) => {
    return {
        type: 'ADD_RULESETTYPE_FOR_RULEGROUPFROMSTATE',
        payload:val
    }
}
//displaycondition for rulegroup
export const DisplayConditionForRuleGroup = (val) => {
    return {
        type: 'DISPLAY_CONDITION_FOR_RULEGROUP',
        payload:val
    }
}

//click of RuleGroupFrom state item
export const RuleGroupFromStateClickedState = (val) => {
    return {
        type: 'RULEGROUP_FROM_STATE_CLICK_STATE',
        val
    }
}
//store the index of rulegroupfromstate item
export const RuleGroupFromStateItemIndex = (val) => {
    return {
        type: 'RULEGROUP_FROM_STATE_ITEM_INDEX',
        val
    }
}
//Tab state object
export const TabStateObject = (val) => {
    return {
        type: 'TAB_STATE_OBJECT',
        val
    }
}
//deleting rules in grid
export const DeleteRulesDatagrid=(index)=> {
    return {
        type:"DELETE_RULES_DATAGRID",
        index:index
    }
}
//index of rsv in grid
export const RuleIndex=(val)=> {
    return {
        type:"RULE_INDEX",
        payload:val
    }
}
//view mode tag
export const ViewMode=(val)=> {
    return {
        type:"VIEW_MODE",
        payload:val
    }
}
//handling rule name update
export const RuleNameUpdate=(val,i)=> {
    return {
        type:"RULE_NAME_UPDATE",
        payload:val,
        index:i
    }
}
//handling rule content update
export const RuleContentUpdate=(val,i)=> {
    return {
        type:"RULE_CONTENT_UPDATE",
        payload:val,
        index:i
    }
}
//updating the rule status
export const RuleStatus=(val,i)=> {
    return {
        type:"RULE_STATUS",
        payload:val,
        index:i
    }
}
//updating the rulesetnames array
export const UpdateRuleSetNamesArray=()=> {
    return {
        type:"UPDATE_RULESETNAMES_ARRAY",
    }
}
//Modified source context
export const ModifiedSourceContext=()=> {
    return {
        type:"MODIFIED_SOURCE_CONTEXT"
    }
}
//Modified result context
export const ModifiedResultContext=()=> {
    return {
        type:"MODIFIED_RESULT_CONTEXT"
    }
}
//Rule save button disabled state
export const RuleSaveBtnDisabledState=(val)=> {
    return {
        type:"RULE_SAVE_BTN_DISABLED_STATE",
        payload:val
    }
}
//Update rules into temporary rsv data
export const UpdateRulesToTempRsvData=()=> {
    return {
        type:"UPDATE_RULES_TO_TEMP_RSV_DATA",
    }
}
// UpdateRulesFromTempRsvDataToRsvData
export const UpdateRulesFromTempRsvDataToRsvData=()=> {
    return {
        type:"UPDATE_RULES_FROM_TEMP_RSV_DATA_TO_RSV_DATA",
    }
}
// ResetTempRuleObj
export const ResetTempRuleObj=()=> {
    return {
        type:"RESET_TEMPRULE_OBJ",
    }
}
export const EditResetTempRuleObj=()=> {
    return {
        type:"EDIT_RESET_TEMPRULE_OBJ",
    }
}

//RuleGroup btn state
export const RuleGroupBtnState=(val)=>{
    return{
        type:"RULE_GROUP_BTN_STATE",
        payload:val
    }
}
//Arrow Button click state
export const ArrowGroupBtnClick = (setValue) => {
    return {
        type: 'ARROW_BTN_CLICK_STATE',
        payload :setValue
    }
}
//Reordering the RuleGroup
export const performListReOrder=(RsvDataObjList)=>{
    return {
        type:'PERFORM_LIST_RULEGROUP_REORDER',
        RsvDataObjList
    }
}
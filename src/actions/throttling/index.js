
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_THR_STATE',
        payload:showAlertDialog
    }
}

export const addNewTracingConfigData =()=>{
    return{
        type:'ADD_NEW_TRACING_CONFIG_THR_DATA',
        payload:{
            "name": "",
            "filterGroup": {
              "filters": []
            }
        }
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_THR_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_THR_STATE',
        payload:showDialog
    }
}

export const setTracingConfigName=(val)=>{
    return {
        type:'SET_TRACING_CONFIG_THR_NAME',
        payload:val
    }
}


export const setFGName=(val)=>{
    return {
        type:'SET_FG_THR_NAME',
        payload:val
    }
}

export const setFGType=(val)=>{
    return {
        type:'SET_FG_THR_TYPE',
        payload:val
    }
}

export const AddNewMessageFilter=(NewMessageFilterObject)=>{
    return {
        type:'ADD_NEW_MESSAGE_THR_FILTER',
        payload:NewMessageFilterObject
    }
}

export const UpdateMessageFiltersListWhenIsOpenChanges=(ModifiedMessageFiltersList)=>{
    return {
        type:'UPDATE_MESSAGE_FILTERS_LIST_WHEN_ISOPEN_THR_CHANGES',
        payload: ModifiedMessageFiltersList
    }
}

export const deleteMessageFilter=(filterId)=>{
    return{
        type:'DELETE_MESSAGE_THR_FILTER',
        payload:filterId
    }
}

export const setFilterName=(filterId,Val)=>{
    return {
        type:'SET_FILTER_THR_NAME',
        id:filterId,
        payload:Val
    }
}

export const setIntervalsize=(filterId,Val)=>{
    return {
        type:'SET_INTERVAL_THR_SIZE',
        id:filterId,
        payload:Val
    }
}

export const setMaxinterval=(filterId,Val)=>{
    return {
        type:'SET_MAX_THR_INTERVAL',
        id:filterId,
        payload:Val
    }
}

export const setFilterType=(filterId,Val)=>{
    return {
        type:'SET_FILTER_THR_TYPE',
        id:filterId,
        payload:Val
    }
}

export const addNewCriteriaObject=(filterId,criteriaObj)=>{
    return{
        type:'ADD_NEW_CRITERIA_THR_OBJECT',
        filterId:filterId,
        payload:criteriaObj
    }
}

export const addNewActionObject=(filterId,actionObj)=>{
    return{
        type:'ADD_NEW_ACTION_THR_OBJECT',
        filterId:filterId,
        payload:actionObj
    }
}

export const deleteCriteriaItem=(criteriaId,filterId)=>{
    return {
        type:'DELETE_CRITERIA_THR_ITEM',
        criteriaId:criteriaId,
        filterId:filterId
    }
}

export const deleteActionItem=(actionId,filterId)=>{
    return {
        type:'DELETE_ACTION_THR_ITEM',
        actionId:actionId,
        filterId:filterId
    }
}

export const setFilterCriteriaContext=(filterIndex,criteriaIndex,ContextValue)=>{
    return {
        type:'SET_FILTER_CRITERIA_THR_CONTEXT',
        filterIndex,
        criteriaIndex,
        ContextValue
    }
}

export const setFilterActionContext=(filterIndex,actionIndex,ContextValue)=>{
    return {
        type:'SET_FILTER_ACTION_THR_CONTEXT',
        filterIndex,
        actionIndex,
        ContextValue
    }
}

export const setFilterCriteriaName=(filterIndex,criteriaIndex,name)=>{
    return {
        type:'SET_FILTER_CRITERIA_THR_NAME',
        filterIndex,
        criteriaIndex,
        name
    }
}

export const setFilterActionName=(filterIndex,actionIndex,name)=>{
    return {
        type:'SET_FILTER_ACTION_THR_NAME',
        filterIndex,
        actionIndex,
        name
    }
}

export const setFilterCriteriaOperator=(filterIndex,criteriaIndex,operator)=>{
    return {
        type:'SET_FILTER_CRITERIA_THR_OPERATOR',
        filterIndex,
        criteriaIndex,
        operator
    }
}

export const setFilterCriteriaValuesArray=(filterIndex,criteriaIndex,valuesArray)=>{
    return {
        type:'SET_FILTER_CRITERIA_VALUES_THR_ARRAY',
        filterIndex,
        criteriaIndex,
        valuesArray
    }
}

export const updateparamNameAndValsForCriteria=(filterIndex,criteriaIndex,attributeName,value)=>{
    return {
        type:'UPDATE_PARAM_NAME_AND_VALS_FOR_THR_CRITERIA',
        filterIndex,criteriaIndex,attributeName,value
    }
}

export const updateparamNameAndValsForAction=(filterIndex,actionIndex,attributeName,value)=>{
    return {
        type:'UPDATE_PARAM_NAME_AND_VALS_FOR_THR_ACTION',
        filterIndex,actionIndex,attributeName,value
    }
}

export const setErrorOnValidation=(val)=>{
    return {
        type:'SET_ERROR_ON_THR_VALIDATION',
        payload:val
    }
}

export const editTracingConfig=(tracingConfigIndex)=>{
    return {
        type:'EDIT_TRACING_THR_CONFIG',
        payload:tracingConfigIndex
    }
}

export const ExpandAll=()=>{
    return {
        type:'EXPAND_THR_ALL'
    }
}

export const CloseAll=()=>{
    return {
        type:'CLOSE_THR_ALL'
    }
}

export const performListReOrder=(ReorderedArr,listType,filterIndex)=>{
    return {
        type:'PERFORM_LIST_THR_REORDER',
        ReorderedArr,listType,filterIndex
    }
}

export const updateErrorState=(ErrorObj)=>{
    return {
        type:'UPDATE_ERROR_THR_STATE',
        payload:ErrorObj
    }
}

export const setContextDataOnEdit=(Data,ContextName)=>{
    return {
        type:'SET_CONTEXT_DATA_ON_THR_EDIT',
        payload:Data,
        ContextName
    }
}

export const setLoadingState=(val)=>{
    return {
        type:'SET_LOADING_THR_STATE',
        payload:val
    }
}
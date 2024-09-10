/* eslint-disable */
import { v4 as uuidv4 } from 'uuid';
let _ = require('underscore');

export default function (state={
    tracingConfigs:[],currentTracingConfig:{},showValidationError:false,errorState:[],contextDataList:{},loading:false
}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'SET_ALL_TRACING_CONFIGS':
            return {...state,tracingConfigs:action.payload}
        case 'SET_EXPORT_STATE':
                return {...state,exportdialog:action.payload}
        case 'ADD_NEW_TRACING_CONFIG_DATA':
            return {...state,currentTracingConfig:action.payload}
        case 'SET_MY_TYPE': 
            return{...state,option:action.payload}
        case 'SET_TRACING_CONFIG_NAME':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.name=action.payload
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_TRACING_CONFIG_THR_TYPE':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.msgFilterType=action.payload
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_TRACING_CONFIG_STATE':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.state=action.payload
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'ADD_NEW_MESSAGE_FILTER':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters=[...currentTracingConfigCopy.filterGroup.filters,action.payload]
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'UPDATE_MESSAGE_FILTERS_LIST_WHEN_ISOPEN_CHANGES':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters=action.payload
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'DELETE_MESSAGE_FILTER':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const ModifiedFiltersList=currentTracingConfigCopy.filterGroup.filters.filter(filter=>filter.id!==action.payload)
            currentTracingConfigCopy.filterGroup.filters=ModifiedFiltersList
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }

        case 'ALL_DATA_EDR_1':{
            return {...state, name1:action.payload}
        }
        case 'ALL_DATA_MIRROR':{
            return {...state, name3:action.payload}
        }
        case 'ALL_DATA_HEP3_2':{
            return {...state, name2:action.payload}
        }

        case 'SET_FILTER_NAME':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const itemIndex = currentTracingConfigCopy.filterGroup.filters.findIndex(item => item.id === action.id);
            currentTracingConfigCopy.filterGroup.filters[itemIndex].name=action.payload
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'ADD_NEW_CRITERIA_OBJECT':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const itemIndex = currentTracingConfigCopy.filterGroup.filters.findIndex(item => item.id === action.filterId);
            currentTracingConfigCopy.filterGroup.filters[itemIndex].filterCriteria=[...currentTracingConfigCopy.filterGroup.filters[itemIndex].filterCriteria,action.payload]
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'ADD_NEW_ACTION_OBJECT':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const itemIndex = currentTracingConfigCopy.filterGroup.filters.findIndex(item => item.id === action.filterId);
            currentTracingConfigCopy.filterGroup.filters[itemIndex].filterActions=[...currentTracingConfigCopy.filterGroup.filters[itemIndex].filterActions,action.payload]
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'DELETE_CRITERIA_ITEM':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const filterIndex = currentTracingConfigCopy.filterGroup.filters.findIndex(item => item.id === action.filterId);
            const ModifiedCriteriaList=currentTracingConfigCopy.filterGroup.filters[filterIndex].filterCriteria.filter(filter=>filter.id!==action.criteriaId)
            currentTracingConfigCopy.filterGroup.filters[filterIndex].filterCriteria=ModifiedCriteriaList
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'DELETE_ACTION_ITEM':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            const filterIndex = currentTracingConfigCopy.filterGroup.filters.findIndex(item => item.id === action.filterId);
            const ModifiedActionList=currentTracingConfigCopy.filterGroup.filters[filterIndex].filterActions.filter(filter=>filter.id!==action.actionId)
            currentTracingConfigCopy.filterGroup.filters[filterIndex].filterActions=ModifiedActionList
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_LIST_CONTEXT_FOR_ATTRIBUTES':{
            return {...state,listcontextsforattrs:action.payload}
        }
        case 'SET_LIST_CONTEXT_FOR_ACTIONS':{
            return {...state,listcontextsforactions:action.payload}
        }
        case 'SET_CONTEXT_DATA':{
            const contextDataListCopy=JSON.parse(JSON.stringify(state.contextDataList))
            contextDataListCopy[action.ContextName]=action.payload
            return {...state,contextDataList:contextDataListCopy}
        }
        case 'SET_CONTEXT_DATA_ON_EDIT':{
            const contextDataListCopy=JSON.parse(JSON.stringify(state.contextDataList))
            contextDataListCopy[action.ContextName]=action.payload
            return {...state,contextDataList:contextDataListCopy}
        }
        case 'SET_FILTER_CRITERIA_CONTEXT':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].context=action.ContextValue
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].name=""
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].operator="PRESENT"
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_FILTER_ACTION_CONTEXT':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].context=action.ContextValue
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].name=""

            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_FILTER_CRITERIA_NAME':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            let updatedparameterNamesAndTypes={}
            let contextNameCopy=currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].context
            let contextDataCopy=state.contextDataList[contextNameCopy]
            contextDataCopy.attributes[action.name]["parameterNamesAndTypes"].map(attribute=>{updatedparameterNamesAndTypes[attribute.name]=""})
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].name=action.name
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].parameterNamesAndValues=updatedparameterNamesAndTypes

            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_FILTER_ACTION_NAME':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            let updatedparameterNamesAndTypes={}
            let contextNameCopy=currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].context
            let contextDataCopy=state.contextDataList[contextNameCopy]
            contextDataCopy.actions[action.name]["parameterNamesAndTypes"].map(attribute=>{updatedparameterNamesAndTypes[attribute.name]=""})
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].name=action.name
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].parameterNamesAndValues=updatedparameterNamesAndTypes

            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_FILTER_CRITERIA_OPERATOR':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].operator=action.operator            
            if(action.operator==="PRESENT"||action.operator==="NOT_PRESENT"){
                currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].values=[]
            }
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_FILTER_CRITERIA_VALUES_ARRAY':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].values=action.valuesArray
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'UPDATE_PARAM_NAME_AND_VALS_FOR_CRITERIA':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria[action.criteriaIndex].parameterNamesAndValues[action.attributeName]=action.value
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'UPDATE_PARAM_NAME_AND_VALS_FOR_ACTION':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions[action.actionIndex].parameterNamesAndValues[action.attributeName]=action.value
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'SET_ERROR_ON_VALIDATION':{
            return {...state, showValidationError: action.payload}
        }
        case 'EDIT_TRACING_CONFIG':{
            let selectedTracingConfig=_.omit(state.tracingConfigs[action.payload], 'schemaVersion','lastUpdateTime','siteName','version','description','id','subGroupsAsArray');
            let tracingTag = selectedTracingConfig.filterGroup.msgFilterType
            selectedTracingConfig.filterGroup.msgFilterType=tracingTag
            let modifiedFilterGroupObj=_.omit(selectedTracingConfig.filterGroup,'subGroupsAsArray');
            selectedTracingConfig.filterGroup=modifiedFilterGroupObj
            let selectedTracingConfigFilters=selectedTracingConfig.filterGroup.filters
            selectedTracingConfigFilters.map((filterObj) => {
                let newfilterCriteria=filterObj.filterCriteria.map((criteriaObj)=>_.extend(criteriaObj, {id: uuidv4(),isOpen:false}))
                let newfilterActions=filterObj.filterActions.map((actionObj)=>_.extend(actionObj, {id: uuidv4(),isOpen:false}))
                filterObj.filterCriteria=newfilterCriteria
                filterObj.filterActions=newfilterActions
            })
            let newFilters = selectedTracingConfigFilters.map((filterObj)=>_.extend(filterObj, {id: uuidv4(),isOpen:false}))
            selectedTracingConfigFilters=newFilters
            return {...state,currentTracingConfig:selectedTracingConfig}
        }
        case 'EXPAND_ALL':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            let selectedTracingConfigFilters=currentTracingConfigCopy.filterGroup.filters
            selectedTracingConfigFilters.map((filterObj) => {
                let newfilterCriteria=filterObj.filterCriteria.map((criteriaObj)=>_.extend(criteriaObj, {isOpen:true}))
                let newfilterActions=filterObj.filterActions.map((actionObj)=>_.extend(actionObj, {isOpen:true}))
                filterObj.filterCriteria=newfilterCriteria
                filterObj.filterActions=newfilterActions
            })
            let newFilters = selectedTracingConfigFilters.map((filterObj)=>_.extend(filterObj, {isOpen:true}))
            selectedTracingConfigFilters=newFilters
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'CLOSE_ALL':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            let selectedTracingConfigFilters=currentTracingConfigCopy.filterGroup.filters
            selectedTracingConfigFilters.map((filterObj) => {
                let newfilterCriteria=filterObj.filterCriteria.map((criteriaObj)=>_.extend(criteriaObj, {isOpen:false}))
                let newfilterActions=filterObj.filterActions.map((actionObj)=>_.extend(actionObj, {isOpen:false}))
                filterObj.filterCriteria=newfilterCriteria
                filterObj.filterActions=newfilterActions
            })
            let newFilters = selectedTracingConfigFilters.map((filterObj)=>_.extend(filterObj, {isOpen:false}))
            selectedTracingConfigFilters=newFilters
            return {...state,currentTracingConfig:currentTracingConfigCopy}
        }
        case 'PERFORM_LIST_REORDER':{
            const currentTracingConfigCopy=JSON.parse(JSON.stringify(state.currentTracingConfig))
            switch(action.listType){
                case 'filters':
                    currentTracingConfigCopy.filterGroup.filters=action.ReorderedArr
                    return {...state,currentTracingConfig:currentTracingConfigCopy}
                case 'action':
                    currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterActions=action.ReorderedArr
                    return {...state,currentTracingConfig:currentTracingConfigCopy}
                case 'criteria':
                    currentTracingConfigCopy.filterGroup.filters[action.filterIndex].filterCriteria=action.ReorderedArr
                    return {...state,currentTracingConfig:currentTracingConfigCopy}
                default:return
            }
        }
        //ONE EXPORT data
        case 'EXPORT_ONE_DATA':{
            return{
                ...state,ExportOnedata:action.payload
            }
        }
        case 'UPDATE_ERROR_STATE':{
            return {...state,errorState:action.payload}
        }
        case 'SET_LOADING_STATE':{
            return {...state,loading:action.payload}
        }
        default:
            return state;
    }
}

export default function (state={currentSlfNfProfileConfig:{},slfNfProfileConfigs:[],nfprofileTabIndex:0,selectedNfServiceConfig:{}}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'SET_ALL_SLF_NFPROFILE_DATA':{
            return {...state,slfNfProfileConfigs:action.payload}
        }
        case 'SET_NFSERVICE_TAB_TYPE' :
            return {...state, nfserviceTabType: action.payload}
        case 'SET_NFSERVICE_TAB_STATE':
            return {...state, nfserviceTabState:action.payload}
        case 'SET_ERROR_ON_VALIDATION':{
            return {...state, showValidationError: action.payload}
        }
        case 'SET_TAB_INDEX':{
            return {...state, nfprofileTabIndex: action.Index}
        }
        case 'ADD_NEW_SLF_NFPROFILE_CONFIG':{
            return {...state,currentSlfNfProfileConfig:action.payload}
        }
        case 'SET_CURRENT_NFPROFILE_CONFIG_ON_EDIT':{
            return {...state,currentSlfNfProfileConfig:action.nfProfileConfig}
        }
        case 'UPDATE_CURRENT_SLF_NFPROFILE_CONFIG':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            currentSlfNfProfileConfigCopy[action.name]=action.Val
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case 'UPDATE_ADDRESS_RANGES':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            currentSlfNfProfileConfigCopy.bsfInfo[action.Type][action.Index][action.Field]=action.Value
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case 'DELETE_ADDRESS_RANGES':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let addressRangesCopy=currentSlfNfProfileConfigCopy.bsfInfo[action.Type].slice()
            addressRangesCopy.splice(action.Index,1)
            currentSlfNfProfileConfigCopy.bsfInfo[action.Type]=addressRangesCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case 'ADD_ADDRESS_RANGE':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let addressRangesCopy=currentSlfNfProfileConfigCopy.bsfInfo[action.Type].slice()
            addressRangesCopy=[...addressRangesCopy,action.newObj]
            currentSlfNfProfileConfigCopy.bsfInfo[action.Type]=addressRangesCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "UPDATE_CHIPS_LIST":{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            currentSlfNfProfileConfigCopy.bsfInfo[action.Field]=action.Value
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case 'UPDATE_PLMN':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            currentSlfNfProfileConfigCopy.plmnList[action.Index][action.Field]=action.Value
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case 'DELETE_PLMN':{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let plmnListCopy=currentSlfNfProfileConfigCopy.plmnList.slice()
            plmnListCopy.splice(action.Index,1)
            currentSlfNfProfileConfigCopy.plmnList=plmnListCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "ADD_PLMN":{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let plmnListCopy=currentSlfNfProfileConfigCopy.plmnList.slice()
            plmnListCopy=[...plmnListCopy,action.newObj]
            currentSlfNfProfileConfigCopy.plmnList=plmnListCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "UPDATE_NF_SERVICE":{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let nfServicesCopy=currentSlfNfProfileConfigCopy.nfServices.slice()
            let updatedConfigIndex=nfServicesCopy.findIndex(config=>config.serviceInstanceId===action.serviceInstanceId)
            nfServicesCopy[updatedConfigIndex]=action.nfServiceData
            currentSlfNfProfileConfigCopy.nfServices=nfServicesCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "CREATE_NF_SERVICE":{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let nfServicesCopy=currentSlfNfProfileConfigCopy.nfServices.slice()
            nfServicesCopy=[...nfServicesCopy,action.nfServiceData]
            currentSlfNfProfileConfigCopy.nfServices=nfServicesCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "DELETE_NF_SERVICE":{
            let currentSlfNfProfileConfigCopy={...state.currentSlfNfProfileConfig}
            let nfServicesCopy=currentSlfNfProfileConfigCopy.nfServices.slice()
            const nfServiceIndex=nfServicesCopy.findIndex(nfService=>nfService.serviceInstanceId===action.Id)
            nfServicesCopy.splice(nfServiceIndex,1)
            currentSlfNfProfileConfigCopy.nfServices=nfServicesCopy
            return {...state,currentSlfNfProfileConfig:currentSlfNfProfileConfigCopy}
        }
        case "SET_SELECTED_NFSERVICE_CONFIG":{
            return {...state,selectedNfServiceConfig:action.config}
        }
        default:
            return state;
    }
}
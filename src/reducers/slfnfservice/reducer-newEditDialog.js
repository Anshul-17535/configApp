import {removeSpecifiedKeysFromPlmnList} from '../../containers/slfNfService/helperFunctions';
export default function (state={slfNfServiceConfigs:[],currentNfServiceConfig:{}}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'SET_ALL_SLF_NFSERVICE_DATA':{
            return {...state,slfNfServiceConfigs:action.payload}
        }
        case 'SET_CURRENT_NFSERVICE_CONFIG_ON_EDIT':{
            let currentNfServiceConfigCopy=action.payload
            let allowedPlmnsCopy=!!currentNfServiceConfigCopy.allowedPlmns?currentNfServiceConfigCopy.allowedPlmns.slice():[]
            allowedPlmnsCopy=removeSpecifiedKeysFromPlmnList(allowedPlmnsCopy)
            currentNfServiceConfigCopy.allowedPlmns=allowedPlmnsCopy
            return {...state,currentNfServiceConfig:currentNfServiceConfigCopy}
        }
        case 'SET_ERROR_ON_VALIDATION':{
            return {...state, showValidationError: action.payload}
        }
        default:
            return state;
    }
}
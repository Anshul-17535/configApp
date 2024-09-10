import {returnModifiedDropDownList} from '../../containers/slfConfiguration/helpers';
let _ = require('underscore');

export default function (state={currentSlfConfig:{},slfConfigs:[],slfLookupTables:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_SLF_CONFIG_DATA':{
            return {...state,currentSlfConfig:action.payload}
        }
        case 'SET_SLF_CONFIG_NAME':{
            const currentSlfConfigCopy={...state.currentSlfConfig}
            currentSlfConfigCopy.slfConfig.SLFConfiguration[0].slfServerConfigs.serverConfigName=action.payload
            return {...state,currentSlfConfig:currentSlfConfigCopy}
        }
        case 'SET_SLF_IDENTITY_ATTRIBUTE':{
            const currentSlfConfigCopy={...state.currentSlfConfig}
            currentSlfConfigCopy.slfConfig.SLFConfiguration[0].slfServerConfigs.identityAttr=[action.payload]
            return {...state,currentSlfConfig:currentSlfConfigCopy}
        }
        case 'SET_SLF_IDENTITY_LOCATION':{
            const currentSlfConfigCopy={...state.currentSlfConfig}
            currentSlfConfigCopy.slfConfig.SLFConfiguration[0].slfServerConfigs.identityLocation=action.payload
            return {...state,currentSlfConfig:currentSlfConfigCopy}
        }
        case 'SET_SLF_LOOKUP_TABLE_NAME':{
            const currentSlfConfigCopy={...state.currentSlfConfig}
            currentSlfConfigCopy.slfConfig.SLFConfiguration[0].slfServerConfigs.slfLookupTableName=action.payload
            return {...state,currentSlfConfig:currentSlfConfigCopy}
        }
        case 'SET_ALL_SLF_CONFIG_DATA':{
            return {...state,slfConfigs:action.payload}
        }
        case 'UPDATE_DESTINATION_TO_BE_SET':{
            const currentSlfConfigCopy={...state.currentSlfConfig}
            currentSlfConfigCopy.slfConfig.SLFConfiguration[0].slfServerConfigs.destinationToBeSet=action.payload
            return {...state,currentSlfConfig:currentSlfConfigCopy}
        }
        case 'SET_CURRENT_SLF_CONFIG_DATA_ON_EDIT':{
            const [selectSlfConfig]=state.slfConfigs.filter(config=>{
                return config.slfServerConfigs.serverConfigName === action.payload
            })

            let payloadObj={
                "slfConfig": {
                  "SLFConfiguration": [
                    {
                        "slfServerConfigs":selectSlfConfig.slfServerConfigs,
                        "slfConfigId":selectSlfConfig.slfConfigId
                    }
                  ]
                }
              }
            return {...state,currentSlfConfig:payloadObj}
        }
        case 'SET_SLF_LOOKUP_TABLE_LIST':{
            let slfLookupDropdownOptions=returnModifiedDropDownList(action.payload,"lookupTypeName")
            return {...state,slfLookupTables:slfLookupDropdownOptions}
        }
        default:
            return state;
    }
}
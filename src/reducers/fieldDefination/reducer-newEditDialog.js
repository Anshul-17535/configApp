import config from '../../utils/config';

let _ = require('underscore');

export default function (state={currentFDCConfig:{},currentTHRCConfig:{},forEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_FDC_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_FDC_STATE':
            return {...state, dialogState:action.payload}

        case 'ADD_NEW_FIELD_PROFILE_DATA':{
            return {...state,currentFDCConfig:action.payload}
        }
        case 'SET_ADD_VAL':{
            return {...state,addCheck:action.payload}
        }
        case 'SET_FDC_NAME':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].id=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        case 'SET_FDC_MT_CHANGE':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].messageType=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        
        case 'SET_FDC_FIELD':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].fieldType=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        case 'SET_FDC_DESTINATION':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].definition=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        case 'SET_FDC_PREFIX':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.prefix=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        case 'SET_FDC_SUFFIX':{
            const currentFDCConfigCopy={...state.currentFDCConfig}
            currentFDCConfigCopy.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns.suffix=action.payload
            return {...state,currentFDCConfig:currentFDCConfigCopy}
        }
        // SET_FDC_SUFFIX
        case 'SET_ALL_FDC_CONFIG_DATA':{
            return {...state,forEditData:action.payload}
        }
        case 'SET_CURRENT_FDC_EDIT':{
            let addCheckCopy = {...state.addCheck}
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.id === action.payload
            })
            let payloadObj=
            {
                
                "fieldDefinitionConfigs":{ 
                    "fieldDefinitionCfg":[{
                    "id":selectThrConfig.id,
                    "messageType":selectThrConfig.messageType,
                    "fieldType":selectThrConfig.fieldType,
                    "definition":selectThrConfig.definition,
                    "addOns":selectThrConfig.addOns
                }]
                }
           }
           let ifNull = {"prefix":"","suffix":""}
           if(selectThrConfig.addOns === null){
                payloadObj.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns=ifNull
                addCheckCopy = 'false'
            }
           else addCheckCopy = 'true'
            return {...state,currentFDCConfig:payloadObj,addCheck:addCheckCopy}
        }
        case 'SET_CURRENT_FDC_VIEW':{
            let addCheckCopy = {...state.addCheck}
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.id === action.payload
            })
            let payloadObj=
            {
                
                "fieldDefinitionConfigs":{ 
                    "fieldDefinitionCfg":[{
                    "id":selectThrConfig.id,
                    "messageType":selectThrConfig.messageType,
                    "fieldType":selectThrConfig.fieldType,
                    "definition":selectThrConfig.definition,
                    "addOns":selectThrConfig.addOns
                }]
                }
           }
           let ifNull = {"prefix":"","suffix":""}
           if(selectThrConfig.addOns === null){
                payloadObj.fieldDefinitionConfigs.fieldDefinitionCfg[0].addOns=ifNull
                addCheckCopy = 'false'
            }
           else addCheckCopy = 'true'
            return {...state,currentFDCConfig:payloadObj,addCheck:addCheckCopy}
        }
        default:
            return state;
    }
}
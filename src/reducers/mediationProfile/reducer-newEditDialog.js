import config from '../../utils/config';

let _ = require('underscore');

export default function (state={currentMPCConfig:{},currentTHRCConfig:{},forEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_MPC_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_MPC_STATE':
            return {...state, dialogState:action.payload}
            
        case 'SET_DIALOG_THRP2_STATE':
            return {...state, dialogState2:action.payload}
        
        case 'SET_DIALOG_THRP3_STATE':
            return {...state, dialogState3:action.payload}

        case 'ADD_NEW_MEDIATION_PROFILE_DATA':{
            return {...state,currentMPCConfig:action.payload}
        }
        case 'SET_MPC_NAME':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].id=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_PROFILE_MPC_CHANGE':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].messageType=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        
        case 'SET_MPC_SR':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].sourceType=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC_SOURCE':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].source=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC_PATTERN':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].patternData.pattern=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC2_PATTERN':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].constantData.value=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC3_PATTERN':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].timeData.format=action.payload
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC_MATCHING_GROUP':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].patternData[action.field]=action.value
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC2_MATCHING_GROUP':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].constantData[action.field]=action.value
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_MPC3_MATCHING_GROUP':{
            const currentMPCConfigCopy={...state.currentMPCConfig}
            currentMPCConfigCopy.mediationProfileConfigs.mediationProfileCfg[0].timeData[action.field]=action.value
            return {...state,currentMPCConfig:currentMPCConfigCopy}
        }
        case 'SET_ALL_MPC_CONFIG_DATA':{
            return {...state,forEditData:action.payload}
        }
        case 'SET_CURRENT_MPC_EDIT':{
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.id === action.payload
            })
            let payloadObj=
            {
                
                "mediationProfileConfigs":{ 
                    "mediationProfileCfg":[{
                    "id":selectThrConfig.id,
                    "messageType":selectThrConfig.messageType,
                    "sourceType":selectThrConfig.sourceType,
                    "source":selectThrConfig.source,
                    "timeData":selectThrConfig.timeData,
                    "constantData":selectThrConfig.constantData,
                    "patternData":selectThrConfig.patternData
                }]
                }
           }
           if(selectThrConfig.patternData===null){
                payloadObj.mediationProfileConfigs.mediationProfileCfg[0].patternData={
                    "pattern": "",
                    "matchingGroups": []
                }
           } 
           if(selectThrConfig.constantData===null){
            payloadObj.mediationProfileConfigs.mediationProfileCfg[0].constantData={
                "value": "",
                "matchingGroups": []
            }
            } 
            if(selectThrConfig.timeData===null){
                payloadObj.mediationProfileConfigs.mediationProfileCfg[0].timeData={
                    "format": "",
                    "matchingGroups": []
                    }
                } 
            return {...state,currentMPCConfig:payloadObj}
        }
        case 'SET_CURRENT_MPC_VIEW':{
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.id === action.payload
            })
            let payloadObj=
            {
                
                "mediationProfileConfigs":{ 
                    "mediationProfileCfg":[{
                    "id":selectThrConfig.id,
                    "messageType":selectThrConfig.messageType,
                    "sourceType":selectThrConfig.sourceType,
                    "source":selectThrConfig.source,
                    "timeData":selectThrConfig.timeData,
                    "constantData":selectThrConfig.constantData,
                    "patternData":selectThrConfig.patternData
                }]
                }
           }
            return {...state,currentMPCConfig:payloadObj}
        }
        default:
            return state;
    }
}
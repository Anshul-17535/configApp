let _ = require('underscore');

export default function (state={currentTHRConfig:{},currentTHRCConfig:{},forEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_THRC_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_THRC_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_THROTTLING_CONFIG_THRC_DATA':{
            return {...state,currentTHRCConfig:action.payload}
        }
        case 'SET_THRC_NAME':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.name=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_PROFILE_THRC_CHANGE':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.inboundProfileName=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_THRC_ALARM':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.alarmsEnabled=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_CTIBA_THRC_ALARM':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.consecutiveThrottledIntervalsBeforeAlarm=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_ALL_THR_CONFIG_DATA':{
            return {...state,forEditData:action.payload}
        }
        case 'SET_CURRENT_THR_CONFIG_DATA_ON_THRC_EDIT':{
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.name === action.payload
            })

            let payloadObj={
                    "name":selectThrConfig.name,
                    "consecutiveThrottledIntervalsBeforeAlarm":selectThrConfig.consecutiveThrottledIntervalsBeforeAlarm,
                    "alarmsEnabled":selectThrConfig.alarmsEnabled?"true":"false",
                    "inboundProfileName":selectThrConfig.inboundProfileName
              }
            return {...state,currentTHRCConfig:payloadObj}
        }
        default:
            return state;
    }
}
import config from '../../utils/config';

let _ = require('underscore');

export default function (state={currentTHRConfig:{},currentTHRCConfig:{},forEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_THRP_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_THRP_STATE':
            return {...state, dialogState:action.payload}
            
        case 'SET_DIALOG_THRP2_STATE':
            return {...state, dialogState2:action.payload}
        
        case 'SET_DIALOG_THRP3_STATE':
            return {...state, dialogState3:action.payload}

        case 'ADD_NEW_THROTTLING_PROFILE_DATA':{
            return {...state,currentTHRCConfig:action.payload}
        }
        case 'SET_THRP_NAME':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].name=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_PROFILE_THRP_CHANGE':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].profileType=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }

        case 'HEP3_INTERFACE':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].hepInterface=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        
        case 'SET_THRP_SR':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].samplingRate=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_OUTPUT_FORMAT':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].outputFormat=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_OUTPUT_DESTINATION':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].outputDestination=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_TCP_DESTINATION_NAME':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].destinationName=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_REQUEST_FIELDS':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].requestFields=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'SET_RESPONSE_FIELDS':{
            const currentTHRCConfigCopy={...state.currentTHRCConfig}
            currentTHRCConfigCopy.tracingProfileConfigs.tracingProfileConfig[0].responseFields=action.payload
            return {...state,currentTHRCConfig:currentTHRCConfigCopy}
        }
        case 'ALL_DATA_PROFILEAMES':{
            let abc=action.payload
            let sendRequest=[]
            let sendResponse=[]
            let responseCopy=abc.filter(config=>{
                return (config.messageType === 'BOTH'||config.messageType === 'RESPONSE')
            })
            let requestCopy=abc.filter(config=>{
                return (config.messageType === 'BOTH'||config.messageType === 'REQUEST')
            })
            sendRequest = requestCopy.map(({ attributeType, description, edrFieldName,messageType
            }) => ({
                id: edrFieldName,
                label: edrFieldName,
                subLabel: description,
                selected: false
              }));
              sendResponse = responseCopy.map(({ attributeType, description, edrFieldName,messageType
              }) => ({
                  id: edrFieldName,
                  label: edrFieldName,
                  subLabel: description,
                  selected: false
                }));
            return {...state, dataBundle1:sendRequest,dataBundle2:sendResponse}
        }
        case 'ALL_DATA_1':{
            //http
            return {...state, name1:action.payload}
        }
        case 'ALL_DATA_2':{
            //kafka
            return {...state, name2:action.payload}
        }
        case 'ALL_DATA_3':{
            //remotefile
            return {...state, name3:action.payload}
        }
        case 'ALL_DATA_4':{
            //hep3
            return {...state, name4:action.payload}
        }
        case 'ALL_DATA_5':{
            //hep3
            return {...state, name5:action.payload}
        }
        case 'SET_ALL_THRP_CONFIG_DATA':{
            return {...state,forEditData:action.payload}
        }
        case 'SET_CURRENT_THR_PROFILE_EDIT':{
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.name === action.payload
            })
            let sendRequestfield
            let sendResponsefield
            let payloadObj=
            {
                
                "tracingProfileConfigs":{ 
                    "tracingProfileConfig":[{
                    "name":selectThrConfig.name,
                    "profileType":selectThrConfig.profileType,
                    "samplingRate":selectThrConfig.samplingRate,
                    "outputFormat":selectThrConfig.outputFormat,
                    "destinationName":selectThrConfig.destinationName,
                    "outputDestination":selectThrConfig.outputDestination,
                    "requestFields":selectThrConfig.requestFields,
                    "responseFields":selectThrConfig.responseFields,
                    "hepInterface":selectThrConfig.hepInterface
                }]
                }
           }
            sendRequestfield=payloadObj.tracingProfileConfigs.tracingProfileConfig[0].requestFields
            sendResponsefield=payloadObj.tracingProfileConfigs.tracingProfileConfig[0].responseFields
            return {...state,currentTHRCConfig:payloadObj,requestValue:sendRequestfield,respondValue:sendResponsefield}
        }
        case 'SET_CURRENT_THR_PROFILE_VIEW':{
            const [selectThrConfig]=state.forEditData.filter(config=>{
                return config.name === action.payload
            })
            let sendRequestfield
            let sendResponsefield
            let payloadObj=
            {
                
                "tracingProfileConfigs":{ 
                    "tracingProfileConfig":[{
                    "name":selectThrConfig.name,
                    "profileType":selectThrConfig.profileType,
                    "samplingRate":selectThrConfig.samplingRate,
                    "outputFormat":selectThrConfig.outputFormat,
                    "destinationName":selectThrConfig.destinationName,
                    "outputDestination":selectThrConfig.outputDestination,
                    "requestFields":selectThrConfig.requestFields,
                    "responseFields":selectThrConfig.responseFields,
                    "hepInterface":selectThrConfig.hepInterface
                }]
                }
           }
            sendRequestfield=payloadObj.tracingProfileConfigs.tracingProfileConfig[0].requestFields
            sendResponsefield=payloadObj.tracingProfileConfigs.tracingProfileConfig[0].responseFields
            return {...state,currentTHRCConfig:payloadObj,requestValue:sendRequestfield,respondValue:sendResponsefield}
        }
        default:
            return state;
    }
}
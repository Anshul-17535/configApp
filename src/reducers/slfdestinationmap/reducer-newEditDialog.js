/* eslint-disable */

import {returnMapName,returnModifiedObject} from '../../containers/slfDestinationMap/helpers'
let _ = require('underscore');

export default function (state={currentSlfDestinationMapConfig:{},slfDestinationMapConfigs:[],nfserviceSetIdListNfServiceObj:[],nfserviceSetIdListNfProfileObj:[],udmInfoListObj:[],nfSetIdListObj:[],mapLoadingState:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STATE':
            return {...state, dialogState:action.payload}
        case 'SET_ALL_DESTINATION_MAP_DATA':{
            return {...state,slfDestinationMapConfigs:action.payload}
        }
        case 'SET_ERROR_ON_VALIDATION':{
            return {...state, showValidationError: action.payload}
        }
        case 'SET_MAP_LOADING_STATE':{
            let mapLoadingStateCopy=[...state.mapLoadingState]
            switch(action.operation){
                case "edit":{
                    mapLoadingStateCopy[action.payload] = true
                    break;
                }
                case "delete":{
                    mapLoadingStateCopy.splice(action.payload,1)
                    break;
                }
                case "add":{
                    mapLoadingStateCopy=Array(mapLoadingStateCopy.length+1).fill(false)
                    break;
                }
                default:break;
            }
            
            return {...state,mapLoadingState:mapLoadingStateCopy}
        }
        case 'RESET_MAP_LOADING_STATE':{
            const mapLoadingStateCopy={...state.mapLoadingState}
            return {...state,mapLoadingState:Array(mapLoadingStateCopy.length).fill(false)}
        }
        /* DESTINATION NF SERVICE INSTANCE STARTS*/
        case 'ADD_NEW_DESTINATION_MAP_CONFIG':
            return {...state,currentSlfDestinationMapConfig:action.payload}
        case 'SET_MAP_PATTERN':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            const [key,obj]=action.destinationObj
            let {destinationId,mapPattern,...rest} = DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapConfigCopy.destinationMap.DestMapList[0].mapPattern=action.pattern
            DestinationMapConfigCopy.destinationMap.DestMapList[0].destinationId=""
            if(_.isEmpty(rest)){
                DestinationMapConfigCopy.destinationMap.DestMapList[0][key]=obj
            }else{
                DestinationMapConfigCopy.destinationMap.DestMapList[0]=_.omit(DestinationMapConfigCopy.destinationMap.DestMapList[0], Object.keys(rest)[0]);
                DestinationMapConfigCopy.destinationMap.DestMapList[0][key]=obj
            }
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_DESTINATION_ID':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            DestinationMapConfigCopy.destinationMap.DestMapList[0].destinationId=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_MODIFIED_NFSERVICE_SET_ID_LIST':{
            const AllNfServiceData=action.payload
            const NfServiceMapList=AllNfServiceData.map(nfservice=>nfservice.nfService)            
            let ModifiedNfServiceSetIdList=returnModifiedObject(NfServiceMapList,"serviceInstanceId","nfServiceSetIdList")
            
            return {...state,nfserviceSetIdListNfServiceObj:ModifiedNfServiceSetIdList}
        }
        case 'SET_MODIFIED_RELATED_LISTS':{
            const AllNfProfileData=action.payload
            const NfProfileMapList=AllNfProfileData.map(nfprofile=>nfprofile.nfProfileCache)
            let ModifiedNfServiceSetIdListObj=returnModifiedObject(NfProfileMapList,"nfInstanceId","nfServices")
            let ModifiedGroupIdListObj=returnModifiedObject(NfProfileMapList,"nfInstanceId","udmInfo")
            let ModifiedNfSetIdListObj=returnModifiedObject(NfProfileMapList,"nfInstanceId","nfSetIdList")
            
            return {...state,nfserviceSetIdListNfProfileObj:ModifiedNfServiceSetIdListObj,
                udmInfoListObj:ModifiedGroupIdListObj,nfSetIdListObj:ModifiedNfSetIdListObj
            }
        }
        case 'SET_SERVICE_INSTANCE_ID_NF_INSTANCE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfServiceMap[action.Index].srvcInstncId=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_WEIGHT_NF_INSTANCE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfServiceMap[action.Index].weight=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_PRIORITY_NF_INSTANCE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfServiceMap[action.Index].priority=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'DELETE_DESTINATION_NFSERVICE_INSTANCE_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let nfServiceMapList=DestinationMapConfigCopy.destinationMap.DestMapList[0].nfServiceMap
            nfServiceMapList.splice(action.Index,1)
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'ADD_DESTINATION_NFSERVICE_INSTANCE_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            DestinationMapConfigCopy.destinationMap.DestMapList[0].nfServiceMap=[...DestinationMapConfigCopy.destinationMap.DestMapList[0].nfServiceMap,action.newObj]
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_CURRENT_DESTINATIONMAP_CONFIG_ON_EDIT':{
            let modifiedObj={
                "destinationMap":{
                    "DestMapList":[action.payload]
                }
            }
            let mapLength=action.payload[returnMapName(action.payload.mapPattern)].length
            return {...state,currentSlfDestinationMapConfig:modifiedObj,mapLoadingState:Array(mapLength).fill(false)}
        }

        /* SLF FQDN REDUCERS STARTS*/
        case 'ADD_SLF_FQDN_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            DestinationMapConfigCopy.destinationMap.DestMapList[0].fqdnMap=[...DestinationMapConfigCopy.destinationMap.DestMapList[0].fqdnMap,action.newObj]
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_FQDN':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].fqdn=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_SCHEME':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].scheme=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_API_PREFIX':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].apiPrefix=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_PORT':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].port=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_WEIGHT':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].weight=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_FQDN_PRIORITY':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.fqdnMap[action.Index].priority=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'DELETE_SLF_FQDN_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let fqdnMapList=DestinationMapConfigCopy.destinationMap.DestMapList[0].fqdnMap
            fqdnMapList.splice(action.Index,1)
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }

        /* SLF IPLIST REDUCERS STARTS */

        case 'ADD_SLF_IPLIST_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            DestinationMapConfigCopy.destinationMap.DestMapList[0].ipListMap=[...DestinationMapConfigCopy.destinationMap.DestMapList[0].ipListMap,action.newObj]
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_IPADDRESS':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].ipAddress=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_SCHEME':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].scheme=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_API_PREFIX':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].apiPrefix=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_PORT':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].port=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_WEIGHT':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].weight=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_SLF_IPLIST_PRIORITY':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.ipListMap[action.Index].priority=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'DELETE_SLF_IPLIST_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let SlfIpListMapList=DestinationMapConfigCopy.destinationMap.DestMapList[0].ipListMap
            SlfIpListMapList.splice(action.Index,1)
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }

        /* SLF DESTINATION NF SERVICE REDUCERS START*/

        case 'ADD_DESTINATION_NF_SERVICE_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            DestinationMapConfigCopy.destinationMap.DestMapList[0].nfProfileMap=[...DestinationMapConfigCopy.destinationMap.DestMapList[0].nfProfileMap,action.newObj]
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_NF_INSTANCE_ID_NF_SERVICE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfProfileMap[action.Index].nfInstanceID=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_WEIGHT_NF_SERVICE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfProfileMap[action.Index].weight=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'SET_PRIORITY_NF_SERVICE':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let DestinationMapObj=DestinationMapConfigCopy.destinationMap.DestMapList[0]
            DestinationMapObj.nfProfileMap[action.Index].priority=action.payload
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        case 'DELETE_DESTINATION_NF_SERVICE_CONFIG':{
            const DestinationMapConfigCopy={...state.currentSlfDestinationMapConfig}
            let nfProfileMapList=DestinationMapConfigCopy.destinationMap.DestMapList[0].nfProfileMap
            nfProfileMapList.splice(action.Index,1)
            return {...state,currentSlfDestinationMapConfig:DestinationMapConfigCopy}
        }
        default:
            return state;
    }
}
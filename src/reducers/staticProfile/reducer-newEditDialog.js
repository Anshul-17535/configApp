let _ = require('underscore');

export default function (state={currentStatProf:{},currentNfService:{},forEditData:[]}, action){
    switch(action.type) {
        case 'SET_DIALOG_STAT_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_STAT_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_STAT_PROF_DATA':{
            return {...state,currentStatProf:action.payload}
        }
        case 'SET_STAT_ERROR_ON_VALIDATION':{
            return {...state, showValidationError: action.payload}
        }
        case 'EXPORT_ALL_STAT_PROF':{
            return {...state,exportstatallstate:action.payload}
        }
        case 'SET_STAT_IMPORT_STATE':{
            return {...state,importdialog:action.payload}
        }
        case 'DELETE_ALL_STATIC_PROFILE':{
            return {...state,deleteAll:action.payload}
        }
        case 'EXPORT_STAT_ONE_DATA':{
            let dataChange = action.payload
            delete dataChange.id
            delete dataChange.schemaVersion
            delete dataChange.lastUpdateTime
            delete dataChange.siteName
            return {...state,exportOnedata:dataChange}
        }
        case 'SET_STAT_EXPORT_STATE':
            return {...state,exportdialog:action.payload}
        case 'SET_STAT_IMPORT_ALERT_STATE': {
            return {...state, importAlertDialog: action.payload}
        }
        case 'SAVE_STAT_STATE':{
            return {...state, saveState: action.payload}    
        }
        case 'EXPORT_ALL_STAT_ERROR':{
            return {...state, exportErrorMessage: action.payload}    
        }
        case 'EXPORT_ALL_STAT_DATA':{
            let dataCopy = action.payload
            dataCopy.map((value)=>{
                delete value.id
                delete value.schemaVersion
                delete value.lastUpdateTime
                delete value.siteName
            })
            return{...state,ExportAllStatdata:dataCopy}
        }
        case 'TYPE_SELECTED_STAT_PROF':{
            return {...state,typeSelect:action.payload}
        }
        case 'CHANGE_NF_TYPE_STAT_PROF':{
            return{...state,statNfType:action.payload}
        }
        case 'CHANGE_DELETE_NF_TYPE_STAT_PROF':{
            return{...state,deleteNfType:action.payload}
        }
        case 'ADD_STAT_NF_SERVICE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices.push(action.payload)
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_INSTANCE_ID':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfInstanceId=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_TYPE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfType=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_STATUS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfStatus=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_INSTANCE_NAME':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].groupId=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_FQDN':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].fqdn=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_PRIORITY':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].priority=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_LOAD':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].load=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_CAPACITY':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].capacity=action.payload
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_IPV4_CHANGE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0][action.field]=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_IPV6_CHANGE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0][action.field]=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_NF_SET_ID_CHANGE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0][action.field]=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_INSTANCE_ID':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].serviceInstanceId=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_NAME':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].serviceName=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_FQDN':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].fqdn=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_SCHEME':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].scheme=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_API_PREFIX':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].apiPrefix=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_STATUS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].nfServiceStatus=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_PRIORITY':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].priority=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_NFSERVICE_CAPACITY':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index].capacity=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_SET_ID_LIST':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.index][action.field]=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_IPV4_ADDRESS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].ipEndPoints[action.indexOfIp].ipv4Address=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_IP_TRANSPORT':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].ipEndPoints[action.indexOfIp].transport=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_IP_PORT':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].ipEndPoints[action.indexOfIp].port=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_IP_ENDPOINT':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].ipEndPoints[action.indexOfIp].ipv6Address=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_V_API_URL':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].versions[action.indexOfIp].apiVersionInUri=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_V_API_FULL_VERSION':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].versions[action.indexOfIp].apiFullVersion=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_SERVICE_V_EXPIRY':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indexOfNF].versions[action.indexOfIp].expiry=action.value
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'DELETE_STAT_NF_SERVICE':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices.splice(action.payload,1)
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'DELETE_STAT_IP_ENDPOINTS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indNFService].ipEndPoints.splice(action.indIP,1)
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'DELETE_STAT_VERSIONS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.indNFService].versions.splice(action.indIP,1)
            return {...state,currentStatProf:currentStatProfCopy}
        }
        case 'ADD_STAT_END_POINTS':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.Index].ipEndPoints.push(action.payload)
            return {...state,currentStatProf:currentStatProfCopy}
        }

        case 'ADD_STAT_VERSION':{
            const currentStatProfCopy={...state.currentStatProf}
            currentStatProfCopy.peerNfProfiles.peerNfProfile[0].nfServices[action.Index].versions.push(action.payload)
            return {...state,currentStatProf:currentStatProfCopy}
        }

        case 'SET_NF_IPV4_ERROR':{
            return {...state,ipv4Error:action.payload}
        }

        case 'SET_NF_IPV6_ERROR':{
            return {...state,ipv6Error:action.payload}
        }

        case 'SET_ALL_STAT_CONFIG_DATA':{
            return {...state,forEditData:action.payload}
        }

        case 'SET_CURRENT_STAT_PROF_ON_EDIT':{
            const [selectStatConfig]=state.forEditData.filter(config=>{
                return config.nfInstanceId === action.payload
            })
            let payloadObj={
                "peerNfProfiles": {
                "peerNfProfile": [{
                    "nfInstanceId":selectStatConfig.nfInstanceId,
                    "nfType":selectStatConfig.nfType,
                    "nfStatus":selectStatConfig.nfStatus,
                    "groupId":selectStatConfig.groupId,
                    "fqdn":selectStatConfig.fqdn,
                    "ipv4Addresses":selectStatConfig.ipv4Addresses,
                    "ipv6Addresses":selectStatConfig.ipv6Addresses,
                    "priority":selectStatConfig.priority,
                    "capacity":selectStatConfig.capacity,
                    "nfSetIdList":selectStatConfig.nfSetIdList,
                    "nfServices":selectStatConfig.nfServices
            }]
        }}
        return {...state,currentStatProf:payloadObj}
        }
        default:
            return state;
    }
}
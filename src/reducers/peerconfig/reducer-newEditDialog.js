import { object } from 'underscore';

let _ = require('underscore');

export default function (state={currentPeerIPConfig:{},currentPeerEPConfig:{},peerEditData:[],hostPart:{data:[]},regPart:{data:[]}}, action){
    switch(action.type) {
        case 'SET_DIALOG_PEER_TYPE' :
            return {...state, dialogType: action.payload}
        case 'SET_DIALOG_PEER_STATE':
            return {...state, dialogState:action.payload}
        case 'ADD_NEW_PEER_IP_PEER_DATA':{
            return {...state,currentPeerIPConfig:action.payload}
        }
        case 'ADD_NEW_PEER_EP_PEER_DATA':{
            return {...state,currentPeerEPConfig:action.payload}
        }
        case 'HOST_ALERT_ING':{
            return {...state,showHostAlert:action.payload}
        }
        case 'HOST_ALERT_EG':{
            return {...state,showEGHostAlert:action.payload}
        }
        case 'PEER_TYPE_PEER_CHANGE':{
            return {...state,peertype:action.payload}
        }
        case 'PEER_IP_PROFILE_PEER_NAME':{
            const currentPeerIPConfigCopy={...state.currentPeerIPConfig}
            currentPeerIPConfigCopy.ingressProfileName=action.payload
            return {...state,currentPeerIPConfig:currentPeerIPConfigCopy}
        }
        case 'PEER_IP_DEFAULT_PEER':{
            const currentPeerIPConfigCopy={...state.currentPeerIPConfig}
            currentPeerIPConfigCopy.defaultPeer=action.payload
            return {...state,currentPeerIPConfig:currentPeerIPConfigCopy}
        }
        case 'PEER_EP_PROFILE_PEER_NAME':{
            const currentPeerEPConfigCopy={...state.currentPeerEPConfig}
            currentPeerEPConfigCopy.egressProfileName=action.payload
            return {...state,currentPeerEPConfig:currentPeerEPConfigCopy}
        }
        case 'PEER_EP_DEFAULT_PEER':{
            const currentPeerEPConfigCopy={...state.currentPeerEPConfig}
            currentPeerEPConfigCopy.defaultPeer=action.payload
            return {...state,currentPeerEPConfig:currentPeerEPConfigCopy}
        }
        
        case 'ADD_NEW_IP_PEER_HOST':{
            const currentPeerIPConfigCopy={...state.currentPeerIPConfig}
            let hostcopy =currentPeerIPConfigCopy.peerAddress.address.slice()
            hostcopy=[...hostcopy,action.hostobj]
            currentPeerIPConfigCopy.peerAddress.address=hostcopy
            return {...state,currentPeerIPConfig:currentPeerIPConfigCopy}
        }
        case 'ADD_NEW_EP_PEER_HOST':{
            const hostPartCopy={...state.hostPart}
            let hostcopy =hostPartCopy.data.slice()
            hostcopy=[...hostcopy,action.hostobj]
            hostPartCopy.data=hostcopy
            return {...state,hostPart:hostPartCopy}
        }
        case 'SAVE_REG':{
            const currentPeerEPConfigCopy={...state.currentPeerEPConfig}
            let hostcopy=currentPeerEPConfigCopy.peerAddress.address.slice()
            let newHost=[].concat(hostcopy,action.payload)
            currentPeerEPConfigCopy.peerAddress.address=newHost
            return {...state,currentPeerEPConfig:currentPeerEPConfigCopy}
        }
        case 'SAVE_HOST':{
            const currentPeerEPConfigCopy={...state.currentPeerEPConfig}
            let hostcopy=currentPeerEPConfigCopy.peerAddress.address.slice()
            let newHost=[].concat(hostcopy,action.payload)
            currentPeerEPConfigCopy.peerAddress.address=newHost
            return {...state,currentPeerEPConfig:currentPeerEPConfigCopy}
        }
        case 'ADD_NEW_EP_PEER_REG':{
            const regPartCopy={...state.regPart}
            let hostcopy =regPartCopy.data.slice()
            hostcopy=[...hostcopy,action.payload]
            regPartCopy.data=hostcopy
            return {...state,regPart:regPartCopy}
        }
        case 'DELETE_IP_PEER_HOST':{
            const currentPeerIPConfigCopy={...state.currentPeerIPConfig}
            let hostcopy=currentPeerIPConfigCopy.peerAddress.address.slice()
            hostcopy.splice(action.Index,1)
            currentPeerIPConfigCopy.peerAddress.address=hostcopy
            return {...state,currentPeerIPConfig:currentPeerIPConfigCopy}
        }
        
        case 'UPDATE_IP_PEER_HOST':{
            const currentPeerIPConfigCopy={...state.currentPeerIPConfig}
            currentPeerIPConfigCopy.peerAddress.address[action.Index][action.Field]=action.Value
            return {...state,currentPeerIPConfig:currentPeerIPConfigCopy}
        }
        case 'DELETE_EP_PEER_HOST':{
            const hostPartCopy={...state.hostPart}
            let hostcopy=hostPartCopy.data.slice()
            hostcopy.splice(action.Index,1)
            hostPartCopy.data=hostcopy
            return {...state,hostPart:hostPartCopy}
        }
        case 'DELETE_EP_PEER_REG':{
            const regPartCopy={...state.regPart}
            let hostcopy=regPartCopy.data.slice()
            hostcopy.splice(action.Index,1)
            regPartCopy.data=hostcopy
            return {...state,regPart:regPartCopy}
        }
        case 'UPDATE_EP_PEER_HOST':{
            const hostPartCopy={...state.hostPart}
            hostPartCopy.data[action.Index][action.Field]=action.Value
            return {...state,hostPart:hostPartCopy}
        }
        case 'UPDATE_EP_PEER_REG':{
            const regPartCopy={...state.regPart}
            regPartCopy.data[action.Index][action.Field]=action.Value
            return {...state,regPart:regPartCopy}
        }
        
        case 'SET_ALL_PEER_DATA':{
            return {...state,peerEditData:action.payload}
        }
        case 'EDIT_EP_DATA':{
            let regPartCopy={...state.regPart}
            let hostPartCopy={...state.hostPart}
            let hostAddress
            let regAddress
            let newCopy=JSON.parse(JSON.stringify(state.peerEditData))  
            let EPEdit       
            if(!!newCopy)
            {
                let product=state.peerEditData.filter(config=>
                {
                    return config.peerAddress.peerAddressType === "EGRESS_PEER"
                })
                EPEdit=product.filter(config=>{
                    return config.egressProfileName === action.payload
                })
            let addresses=EPEdit[0].peerAddress.address.slice()
             hostAddress=addresses.filter(config=>{
                return config.host !== undefined
            })
             regAddress=addresses.filter(config=>{
                return config.regEx !== undefined
            })}
            EPEdit[0].defaultPeer=EPEdit[0].defaultPeer?"true":"false";
            regPartCopy.data=regAddress
            hostPartCopy.data=hostAddress
            let type = "EGRESS_PEER"
            return {...state,regPart:regPartCopy,hostPart:hostPartCopy,peertype:type,currentPeerEPConfig:EPEdit[0]}
        }
        case 'EDIT_IP_DATA':{
            let newCopy=JSON.parse(JSON.stringify(state.peerEditData))
            let IPEdit
            if(!!newCopy)
            {
                let product=newCopy.filter(config=>{
                return config.peerAddress.peerAddressType === "INGRESS_PEER"
            })
                IPEdit=product.filter(config=>{
                return config.ingressProfileName === action.payload
            })
            IPEdit[0].defaultPeer=IPEdit[0].defaultPeer?"true":"false";
            }
            let type = "INGRESS_PEER"
            return {...state,peertype:type,currentPeerIPConfig:IPEdit[0]}
        }
        default:
            return state;
    }
}
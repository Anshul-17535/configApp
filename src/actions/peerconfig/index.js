
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setType = (type)=> {
    return {
        type: "PEER_TYPE_PEER_CHANGE",
        payload:type
    }
}

export const setIngHostAlert = (type)=> {
    return {
        type: "HOST_ALERT_ING",
        payload:type
    }
}

export const setEgHostAlert = (type)=> {
    return {
        type: "HOST_ALERT_EG",
        payload:type
    }
}

export const setIPProfileName = (type)=> {
    return {
        type: "PEER_IP_PROFILE_PEER_NAME",
        payload:type
    }
}

export const deleteHost=(Index)=>{
    return {
        type:"DELETE_IP_PEER_HOST",
        Index
    }
}

export const updateHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_IP_PEER_HOST",
        Value,Field,Index
    }
}

export const deleteEPHost=(Index)=>{
    return {
        type:"DELETE_EP_PEER_HOST",
        Index
    }
}

export const updateEPHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_EP_PEER_HOST",
        Value,Field,Index
    }
}

export const deleteRegHost=(Index)=>{
    return {
        type:"DELETE_EP_PEER_REG",
        Index
    }
}

export const updateRegHost=(Value,Field,Index)=>{
    return {
        type:"UPDATE_EP_PEER_REG",
        Value,Field,Index
    }
}

export const saveRank=(data)=>{
    return {
        type:"SAVE_REG",
        payload:data
    }
}

export const saveHost=(data)=>{
    return {
        type:"SAVE_HOST",
        payload:data
    }
}

export const AddNewHost = (hostobj)=> {
    return {
        type: "ADD_NEW_IP_PEER_HOST",hostobj
    }
}

export const AddNewEPHost = (hostobj)=> {
    return {
        type: "ADD_NEW_EP_PEER_HOST",hostobj
    }
}

export const AddNewRegHost = (abc)=> {
    return {
        type: "ADD_NEW_EP_PEER_REG",
        payload:abc
    }
}

export const setIPDefaultPeer = (type)=> {
    return {
        type: "PEER_IP_DEFAULT_PEER",
        payload:type
    }
}

export const setEPProfileName = (type)=> {
    return {
        type: "PEER_EP_PROFILE_PEER_NAME",
        payload:type
    }
}

export const setEPHost = (type)=> {
    return {
        type: "PEER_EP_PEER_HOST",
        payload:type
    }
}

export const setEPPort = (type)=> {
    return {
        type: "PEER_EP_PEER_PORT",
        payload:type
    }
}

export const setEPDefaultPeer = (type)=> {
    return {
        type: "PEER_EP_DEFAULT_PEER",
        payload:type
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_PEER_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_PEER_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_PEER_STATE',
        payload:showAlertDialog
    }
}

export const addNewPeerIPData=()=>{
    return {
        type : 'ADD_NEW_PEER_IP_PEER_DATA',
        payload:{
            "peerAddress": 
            {
             "address":
               [],
               "peerAddressType": "INGRESS_PEER"
              },
            "ingressProfileName":"NONE",
            "defaultPeer": null
            }
        }
}

export const addNewPeerEPData=()=>{
    return {
        type : 'ADD_NEW_PEER_EP_PEER_DATA',
        payload:{
            "peerAddress": 
            {
             "address":
               [],
               "peerAddressType": "EGRESS_PEER"
              },
            "egressProfileName":"NONE",
            "defaultPeer": null
            }
        }
}

export const editIPData=(val)=>{
    return {
        type:"EDIT_IP_DATA",
        payload:val
    }
}

export const editEPData=(val)=>{  
    return {
        type:"EDIT_EP_DATA",
        payload:val
    }
}


export const setIngressValue=(Val)=>{
    return {
        type:'SET_INGRESS_PEER_VALUE',
        payload:Val
    }
}

export const setEgressValue=(Val)=>{
    return {
        type:"SET_EGRESS_PEER_VALUE",
        payload:Val
    }
}

export const setPTValue=(Val)=>{
    return {
        type:"SET_PT_PEER_VALUE",
        payload:Val
    }
}

export const setSlfLookupTableName=(Val)=>{
    return {
        type:"SET_SLF_LOOKUP_TABLE_PEER_NAME",
        payload:Val
    }
}

export const setCurrentThrScalarDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_SLF_CONFIG_DATA_ON_PEER_EDIT',
        payload:ConfigName
    }
}

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_PEER_SET",
        payload:Val
    }
}
/* eslint-disable */
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STATE',
        payload:showAlertDialog
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE',
        payload:showDialog
    }
}

export const setErrorOnValidation=(val)=>{
    return {
        type:'SET_ERROR_ON_VALIDATION',
        payload:val
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_TYPE',
        payload :type
    }
}

export const addNewDestinationMapConfig=()=>{
    return {
        type:'ADD_NEW_DESTINATION_MAP_CONFIG',
        payload:{
            "destinationMap": {
              "DestMapList": [
                {
                  "destinationId": "",
                  "mapPattern": ""
                }
              ]
            }
          }
    }
}

export const setMapLoadingState=(Index,operation)=>{
    return {
        type:'SET_MAP_LOADING_STATE',
        payload:Index,
        operation:operation
    }
}

/* DESTINATION NF SERVICE INSTANCE ACTIONS STARTS*/

export const setMapPattern=(pattern,destinationObj)=>{
    return {
        type:'SET_MAP_PATTERN',
        pattern,destinationObj
    }
}

export const setDestinationId=(Val)=>{
    return {
        type:'SET_DESTINATION_ID',
        payload:Val
    }
}

export const setServiceInstanceIdNfInstance=(Val,Index)=>{
    return {
        type:'SET_SERVICE_INSTANCE_ID_NF_INSTANCE',
        payload:Val,
        Index
    }
}

export const setWeightNfInstance=(Val,Index)=>{
    return {
        type:'SET_WEIGHT_NF_INSTANCE',
        payload:Val,
        Index
    }
}

export const setPriorityNfInstance=(Val,Index)=>{
    return {
        type:'SET_PRIORITY_NF_INSTANCE',
        payload:Val,
        Index
    }
}

export const deleteDestinationNfServiceInstanceConfig=(Index)=>{
    return {
        type:'DELETE_DESTINATION_NFSERVICE_INSTANCE_CONFIG',
        Index
    }
}

export const addDestinationNfServiceInstanceConfig=(newObj)=>{
    return {
        type:'ADD_DESTINATION_NFSERVICE_INSTANCE_CONFIG',
        newObj
    }
}

export const setCurrentDestinationMapConfigOnEdit=(selectedDestinationRecord)=>{
    return {
        type:'SET_CURRENT_DESTINATIONMAP_CONFIG_ON_EDIT',
        payload:selectedDestinationRecord
    }
}


/* SLF FQDN ACTIONS STARTS*/

export const addSlfFqdnConfig=(newObj)=>{
    return {
        type:'ADD_SLF_FQDN_CONFIG',
        newObj
    }
}

export const setSlfFqdnFqdn=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_FQDN',
        payload:Val,
        Index
    }
}

export const setSlfFqdnScheme=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_SCHEME',
        payload:Val,
        Index
    }
}

export const setSlfFqdnApiPrefix=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_API_PREFIX',
        payload:Val,
        Index
    }
}

export const setSlfFqdnPort=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_PORT',
        payload:Val,
        Index
    }
}

export const setSlfFqdnWeight=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_WEIGHT',
        payload:Val,
        Index
    }
}

export const setSlfFqdnPriority=(Val,Index)=>{
    return {
        type:'SET_SLF_FQDN_PRIORITY',
        payload:Val,
        Index
    }
}

export const deleteSlfFqdnConfig=(Index)=>{
    return {
        type:'DELETE_SLF_FQDN_CONFIG',
        Index
    }
}

/* SLF IPLIST ACTIONS START */

export const addSlfIpListConfig=(newObj)=>{
    return {
        type:'ADD_SLF_IPLIST_CONFIG',
        newObj
    }
}

export const setSlfIpListIpAddress=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_IPADDRESS',
        payload:Val,
        Index
    }
}

export const setSlfIpListScheme=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_SCHEME',
        payload:Val,
        Index
    }
}

export const setSlfIpListApiPrefix=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_API_PREFIX',
        payload:Val,
        Index
    }
}

export const setSlfIpListPort=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_PORT',
        payload:Val,
        Index
    }
}

export const setSlfIpListWeight=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_WEIGHT',
        payload:Val,
        Index
    }
}

export const setSlfIpListPriority=(Val,Index)=>{
    return {
        type:'SET_SLF_IPLIST_PRIORITY',
        payload:Val,
        Index
    }
}

export const deleteSlfIpListConfig=(Index)=>{
    return {
        type:'DELETE_SLF_IPLIST_CONFIG',
        Index
    }
}

/* SLF DESTINATION NF SERVICE ACTIONS START */

export const addDestinationNfServiceConfig=(newObj)=>{
    return {
        type:"ADD_DESTINATION_NF_SERVICE_CONFIG",
        newObj
    }
}

export const setNfInstanceIdNfService=(Val,Index)=>{
    return {
        type:'SET_NF_INSTANCE_ID_NF_SERVICE',
        payload:Val,
        Index
    }
}

export const setWeightNfService=(Val,Index)=>{
    return {
        type:"SET_WEIGHT_NF_SERVICE",
        payload:Val,
        Index
    }
}

export const setPriorityNfService=(Val,Index)=>{
    return {
        type:"SET_PRIORITY_NF_SERVICE",
        payload:Val,
        Index
    }
}

export const deleteDestinationNfServiceConfig=(Index)=>{
    return {
        type:"DELETE_DESTINATION_NF_SERVICE_CONFIG",
        Index
    }
}
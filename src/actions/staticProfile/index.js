
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_STAT_TYPE',
        payload :type
    }
}

export const setExportErrorDialog = (type) => {
    return {
        type:'EXPORT_ALL_STAT_ERROR',
        payload:type
    }    
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STAT_STATE',
        payload:showDialog
    }
}

export const setStatImportDialog = (showDialog) => {
    return {
        type : 'SET_STAT_IMPORT_STATE',
        payload:showDialog
    }
}

export const importAlertState = (importAlertDialog) =>{
    return {
        type: 'SET_STAT_IMPORT_ALERT_STATE',
        payload :importAlertDialog
    }
}

export const setExportDialog = (showDialog) => {
    return {
        type : 'SET_STAT_EXPORT_STATE',
        payload:showDialog
    }
}


export const saveState = (data)=>{
    return {
        type: 'SAVE_STAT_STATE',
        payload :data
    }
}


export const setExportStatAllDialog = (value) =>{
    return {
        type : 'EXPORT_ALL_STAT_PROF',
        payload:value
    }
}

export const handleStatNfTypeChange = (value) =>{
    return {
        type : 'CHANGE_NF_TYPE_STAT_PROF',
        payload:value
    }
}

export const handleStatDelNfTypeChange = (value) =>{
    return {
        type : 'CHANGE_DELETE_NF_TYPE_STAT_PROF',
        payload:value
    }
}

export const typeChanged = (value) =>{
    return {
        type : 'TYPE_SELECTED_STAT_PROF',
        payload:value
    }
}

export const setNFErrorOnValidation=(val)=>{
    return {
        type:'SET_STAT_ERROR_ON_VALIDATION',
        payload:val
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STAT_STATE',
        payload:showAlertDialog
    }
}

export const addNewStatProfData=()=>{
    return {
        type : 'ADD_NEW_STAT_PROF_DATA',
        payload:
        {
            "peerNfProfiles": {
            "peerNfProfile": [{
                    "nfInstanceId": "",
                    "nfType": "",
                    "nfStatus": "",
                    "groupId": "",
                    "fqdn": "",
                    "ipv4Addresses": [],
                    "ipv6Addresses": [],
                    "priority": 1,
                    "capacity":100,
                    "nfSetIdList":[],
                    "nfServices":[]
                }]
            }
        }
    }
}

export const deleteAllStatic=(Val)=>{
    return {
        type:'DELETE_ALL_STATIC_PROFILE',
        payload:Val
    }
}


export const addNFService=(Val)=>{
    return {
        type:'ADD_STAT_NF_SERVICE',
        payload:Val
    }
}

export const addNfInstanceId=(Val)=>{
    return {
        type:'ADD_STAT_NF_INSTANCE_ID',
        payload:Val
    }
}

export const addNfType=(Val)=>{
    return {
        type:'ADD_STAT_NF_TYPE',
        payload:Val
    }
}

export const addNfStatus=(Val)=>{
    return {
        type:'ADD_STAT_NF_STATUS',
        payload:Val
    }
}


export const addNfInstanceName=(Val)=>{
    return {
        type:'ADD_STAT_NF_INSTANCE_NAME',
        payload:Val
    }
}

export const addNfFQDN=(Val)=>{
    return {
        type:'ADD_STAT_FQDN',
        payload:Val
    }
}

export const addNfPriority=(Val)=>{
    return {
        type:'ADD_STAT_NF_PRIORITY',
        payload:Val
    }
}

export const addNfLoad=(Val)=>{
    return {
        type:'ADD_STAT_NF_LOAD',
        payload:Val
    }
}

export const addNfCapacity=(Val)=>{
    return {
        type:'ADD_STAT_CAPACITY',
        payload:Val
    }
}

export const ipv4Change=(value,field)=>{
    return {
        type:'ADD_STAT_IPV4_CHANGE',
        value:value,
        field:field
    }
}

export const ipv6Change=(value,field)=>{
    return {
        type:'ADD_STAT_IPV6_CHANGE',
        value:value,
        field:field
    }
}

export const addServiceInstanceId=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_INSTANCE_ID',
        value:value,
        index:index
    }
}

export const addServiceName=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_NAME',
        value:value,
        index:index
    }
}

export const addServiceFQDN=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_FQDN',
        value:value,
        index:index
    }
}


export const addServiceScheme=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_SCHEME',
        value:value,
        index:index
    }
}

export const addServiceApiPrefix=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_API_PREFIX',
        value:value,
        index:index
    }
}

export const addServiceStatus=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_STATUS',
        value:value,
        index:index
    }
}

export const addServicePriority=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_PRIORITY',
        value:value,
        index:index
    }
}

export const addServiceCapacity=(value,index)=>{
    return {
        type:'ADD_NFSERVICE_CAPACITY',
        value:value,
        index:index
    }
}

export const addServiceSetIdList=(value,field,index)=>{
    return {
        type:'ADD_SERVICE_SET_ID_LIST',
        value:value,
        field:field,
        index:index
    }
}

export const addServiceIpv4Address=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_IPV4_ADDRESS',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceIpTransport=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_IP_TRANSPORT',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceIpPort=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_IP_PORT',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceIpEndpoint=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_IP_ENDPOINT',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceVapiURL=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_V_API_URL',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceVapiFullVersion=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_V_API_FULL_VERSION',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}

export const addServiceVexpiry=(value,indexOfIp,indexOfNF)=>{
    return {
        type:'ADD_SERVICE_V_EXPIRY',
        value:value,
        indexOfIp:indexOfIp,
        indexOfNF:indexOfNF
    }
}


export const nfSetIdChange=(value,field)=>{
    return {
        type:'ADD_STAT_NF_SET_ID_CHANGE',
        value:value,
        field:field
    }
}

export const deleteNfService=(Val)=>{
    return {
        type:'DELETE_STAT_NF_SERVICE',
        payload:Val
    }
}

export const deleteIpEndPoints=(indIP,indNFService)=>{
    return {
        type:'DELETE_STAT_IP_ENDPOINTS',
        indIP:indIP,
        indNFService:indNFService
    }
}

export const deleteVersions=(indIP,indNFService)=>{
    return {
        type:'DELETE_STAT_VERSIONS',
        indIP:indIP,
        indNFService:indNFService
    }
}

export const addEndPoints=(Val,Ind)=>{
    return {
        type:'ADD_STAT_END_POINTS',
        payload:Val,
        Index:Ind
    }
}

export const addVersions=(Val,Ind)=>{
    return {
        type:'ADD_STAT_VERSION',
        payload:Val,
        Index:Ind
    }
}


export const setIpv4Error=(Val)=>{
    return {
        type:"SET_NF_IPV4_ERROR",
        payload:Val
    }
}

export const setIpv6Error=(Val)=>{
    return {
        type:"SET_NF_IPV6_ERROR",
        payload:Val
    }
}


export const setCurrentStatProfOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_STAT_PROF_ON_EDIT',
        payload:ConfigName
    }
}

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_THRC_SET",
        payload:Val
    }
}
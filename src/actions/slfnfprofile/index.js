
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
export const setNfServiceTabState = (showDialog) => {
    return {
        type : 'SET_NFSERVICE_TAB_STATE',
        payload:showDialog
    }
}
export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_TYPE',
        payload :type
    }
}
export const setNfServiceTabType = (type) => {
    return {
        type: 'SET_NFSERVICE_TAB_TYPE',
        payload :type
    }
}
export const setErrorOnValidation=(val)=>{
    return {
        type:'SET_ERROR_ON_VALIDATION',
        payload:val
    }
}

export const addNewSlfNfProfileConfig=()=>{
    return {
        type:'ADD_NEW_SLF_NFPROFILE_CONFIG',
        payload:{
            "nfInstanceId":"",
            "nfType":"",
            "nfStatus":"",
			"fqdn":"",
			"udmInfo":{"groupId":""},
			"heartBeatTimer":0,
			"interPlmnFqdn":"",
            "priority":0,
            "capacity":0,
            "load":0,
			"ipv4Addresses":[],
            "ipv6Addresses":[],
			"nfSetIdList":[],
            "plmnList":[],
            "bsfInfo":{
                "dnnList":[],
                "ipDomainList":[],
                "ipv4AddressRanges":[],
                "ipv6PrefixRanges":[]
                },
            "nfServices":[]
        }
    }
}

export const updateCurrentSlfNfProfileConfig=(Val,name)=>{
    return{
        type:"UPDATE_CURRENT_SLF_NFPROFILE_CONFIG",
        Val,name
    }
}

export const updateAddressRanges=(Value,Type,Field,Index)=>{
    return {
        type:'UPDATE_ADDRESS_RANGES',
        Value,Type,Field,Index
    }
}

export const deleteAddressRange=(Type,Index)=>{
    return {
        type:'DELETE_ADDRESS_RANGES',
        Type,Index
    }
}

export const addAddressRange=(Type,newObj)=>{
    return {
        type:"ADD_ADDRESS_RANGE",
        Type,newObj
    }
}

export const updateChipsList=(Value,Field)=>{
    return {
        type:"UPDATE_CHIPS_LIST",
        Value,Field
    }
}

export const updatePlmn=(Value,Field,Index)=>{
    return {
        type:"UPDATE_PLMN",
        Value,Field,Index
    }
}

export const deletePlmn=(Index)=>{
    return {
        type:"DELETE_PLMN",
        Index
    }
}

export const addPlmn=(newObj)=>{
    return {
        type:"ADD_PLMN",
        newObj
    }
}

export const setTabIndex=(Index)=>{
    return {
        type:"SET_TAB_INDEX",
        Index
    }
}

export const updateNfService=(nfServiceData,serviceInstanceId)=>{
    return {
        type:"UPDATE_NF_SERVICE",
        nfServiceData,serviceInstanceId
    }
}

export const createNfService=(nfServiceData)=>{
    return {
        type:"CREATE_NF_SERVICE",
        nfServiceData
    }
}

export const deleteNfService=(Id)=>{
    return {
        type:"DELETE_NF_SERVICE",
        Id
    }
}

export const setCurrentNfProfileConfigOnEdit=(nfProfileConfig)=>{
    return {
        type:"SET_CURRENT_NFPROFILE_CONFIG_ON_EDIT",
        nfProfileConfig
    }
}

export const setSelectedNfServiceConfig=(config)=>{
    return {
        type:"SET_SELECTED_NFSERVICE_CONFIG",
        config
    }
}
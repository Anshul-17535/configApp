
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
        type: 'SET_DIALOG_FDC_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_FDC_STATE',
        payload:showDialog
    }
}




export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_FDC_STATE',
        payload:showAlertDialog
    }
}


export const setAddCheck=(val)=>{
    return {
        type : 'SET_ADD_VAL',
        payload:val
    }
}

export const setPrefix=(val)=>{
    return {
        type : 'SET_FDC_PREFIX',
        payload:val
    }
}

export const setSuffix=(val)=>{
    return {
        type : 'SET_FDC_SUFFIX',
        payload:val
    }
}

// setPrefix

export const addNewFieldData=()=>{
    return {
        type : 'ADD_NEW_FIELD_PROFILE_DATA',
        payload:
        {
            "fieldDefinitionConfigs": {
                "fieldDefinitionCfg": [{
                    "id": "",
                    "messageType": "",
                    "fieldType": "",
                    "definition": "",
                    "addOns": {
                        "prefix": "",
                        "suffix": ""
                    }
                }]
            }
        }
        }
}

export const setFdcName=(Val)=>{
    return {
        type:'SET_FDC_NAME',
        payload:Val
    }
}

export const setFdcMessageType=(Val)=>{
    return {
        type:"SET_FDC_MT_CHANGE",
        payload:Val
    }
}

export const setFdcFieldChange=(Val)=>{
    return {
        type:"SET_FDC_FIELD",
        payload:Val
    }
}

export const setDestination=(Val)=>{
    return {
        type:"SET_FDC_DESTINATION",
        payload:Val
    }
}


export const setCurrentFDCDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_FDC_EDIT',
        payload:ConfigName
    }
}

export const setCurrentFDCDataOnView=(ConfigName)=>{
    return {
        type:'SET_CURRENT_FDC_VIEW',
        payload:ConfigName
    }
}


export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_THRC_SET",
        payload:Val
    }
}
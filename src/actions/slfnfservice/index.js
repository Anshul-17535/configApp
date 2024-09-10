
export const getToolBarData = (pageTitleDisplay) => {
    return {
        type : 'GET_TOOLBAR_DATA',
        payload:{
            pageTitle:pageTitleDisplay,
            subTitle:""
        }
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE',
        payload:showDialog
    }
}

export const setDialogType = (type) => {
    return {
        type: 'SET_DIALOG_TYPE',
        payload :type
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STATE',
        payload:showAlertDialog
    }
}

export const setCurrentNfServiceConfigOnEdit=(nfserviceConfig)=>{
    return {
        type:"SET_CURRENT_NFSERVICE_CONFIG_ON_EDIT",
        payload:nfserviceConfig
    }
}

export const setErrorOnValidation=(val)=>{
    return {
        type:'SET_ERROR_ON_VALIDATION',
        payload:val
    }
}
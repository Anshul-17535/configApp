
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
        type: 'SET_DIALOG_THRC_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_THRC_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_THRC_STATE',
        payload:showAlertDialog
    }
}

export const setActiveState=(showAlertDialog)=>{
    return {
        type : 'SET_THR_ACTIVE_STATE',
        payload:showAlertDialog
    }
}

export const addNewThrottlingData=()=>{
    return {
        type : 'ADD_NEW_THROTTLING_CONFIG_THRC_DATA',
        payload:
            {
                "name": "",
                "consecutiveThrottledIntervalsBeforeAlarm": 0,
                "alarmsEnabled": null,
                "inboundProfileName": ""
            }
            
        }
}

export const setName=(Val)=>{
    return {
        type:'SET_THRC_NAME',
        payload:Val
    }
}

export const setProfileChange=(Val)=>{
    return {
        type:"SET_PROFILE_THRC_CHANGE",
        payload:Val
    }
}

export const setAlarm=(Val)=>{
    return {
        type:"SET_THRC_ALARM",
        payload:Val
    }
}

export const setCTIBAChange=(Val)=>{
    return {
        type:"SET_CTIBA_THRC_ALARM",
        payload:Val
    }
}

export const setSlfLookupTableName=(Val)=>{
    return {
        type:"SET_SLF_LOOKUP_TABLE_THRC_NAME",
        payload:Val
    }
}

export const setCurrentThrConfigDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_THR_CONFIG_DATA_ON_THRC_EDIT',
        payload:ConfigName
    }
}

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_THRC_SET",
        payload:Val
    }
}
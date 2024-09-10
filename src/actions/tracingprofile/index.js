
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
        type: 'SET_DIALOG_THRP_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_THRP_STATE',
        payload:showDialog
    }
}

export const setDialogState2 = (showDialog) => {
    return {
        type : 'SET_DIALOG_THRP2_STATE',
        payload:showDialog
    }
}

export const setDialogState3 = (showDialog) => {
    return {
        type : 'SET_DIALOG_THRP3_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_THRP_STATE',
        payload:showAlertDialog
    }
}

export const setHepInterface = (type)=> {
    return {
        type: "HEP3_INTERFACE",
        payload:type
    }
}

export const setSSLShow=(setSSL)=>{
    return {
        type : 'SET_SSL_SHOW',
        payload:setSSL
    }
}

export const addNewThrottlingData=()=>{
    return {
        type : 'ADD_NEW_THROTTLING_PROFILE_DATA',
        payload:
        {
            "tracingProfileConfigs": {
                "tracingProfileConfig": [{
                    "id": "",
                    "name": "",
                    "profileType": "",
                    "samplingRate": 100,
                    "outputDestination": "",
                    "destinationName": "",
                    "outputFormat": "CSV",
                    "profileType": "",
                    "requestFields": "",
                    "responseFields": "",
                    "hepInterface":""
                }]
            }
        }
        }
}

export const setName=(Val)=>{
    return {
        type:'SET_THRP_NAME',
        payload:Val
    }
}

export const setProfileChange=(Val)=>{
    return {
        type:"SET_PROFILE_THRP_CHANGE",
        payload:Val
    }
}

export const setSR=(Val)=>{
    return {
        type:"SET_THRP_SR",
        payload:Val
    }
}

export const setOutputFormat=(Val)=>{
    return {
        type:"SET_OUTPUT_FORMAT",
        payload:Val
    }
}

export const setOutputDestination=(Val)=>{
    return {
        type:"SET_OUTPUT_DESTINATION",
        payload:Val
    }
}

export const setedrRequestFields=(Val)=>{
    return {
        type:"SET_REQUEST_FIELDS",
        payload:Val
    }
}

export const setedrResponseFields=(Val)=>{
    return {
        type:"SET_RESPONSE_FIELDS",
        payload:Val
    }
}

export const setDestination=(Val)=>{
    return {
        type:"SET_TCP_DESTINATION_NAME",
        payload:Val
    }
}

export const setSlfLookupTableName=(Val)=>{
    return {
        type:"SET_SLF_LOOKUP_TABLE_THRC_NAME",
        payload:Val
    }
}

export const setCurrentThrProfileDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_THR_PROFILE_EDIT',
        payload:ConfigName
    }
}

export const setCurrentThrProfileDataOnView=(ConfigName)=>{
    return {
        type:'SET_CURRENT_THR_PROFILE_VIEW',
        payload:ConfigName
    }
}

// setCurrentThrProfileDataOnView

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_THRC_SET",
        payload:Val
    }
}

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
        type: 'SET_DIALOG_MPC_TYPE',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_MPC_STATE',
        payload:showDialog
    }
}



export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_MPC_STATE',
        payload:showAlertDialog
    }
}

export const addNewMeditationData=()=>{
    return {
        type : 'ADD_NEW_MEDIATION_PROFILE_DATA',
        payload:
        {
            "mediationProfileConfigs": {
                "mediationProfileCfg": [{
                    "id": "",
                    "messageType": "",
                    "sourceType": "",
                    "source": "",
                    "patternData": {
                        "pattern": "",
                        "matchingGroups": []
                    },
                    "constantData": {
                        "value": "",
                        "matchingGroups": []
                    },
                    "timeData": {
                        "format": "",
                        "matchingGroups": []
                    }
                }]
            }
        }
        }
}

export const setMpcName=(Val)=>{
    return {
        type:'SET_MPC_NAME',
        payload:Val
    }
}

export const setMpcProfileChange=(Val)=>{
    return {
        type:"SET_PROFILE_MPC_CHANGE",
        payload:Val
    }
}

export const setMpcSourceChange=(Val)=>{
    return {
        type:"SET_MPC_SR",
        payload:Val
    }
}

export const setMpcSource=(Val)=>{
    return {
        type:"SET_MPC_SOURCE",
        payload:Val
    }
}

export const handleMpcPatternChange=(value)=>{
    return {
        type:"SET_MPC_PATTERN",
        payload:value
    }
}

export const handleMpc2PatternChange=(value)=>{
    return {
        type:"SET_MPC2_PATTERN",
        payload:value
    }
}


export const handleMpc3PatternChange=(value)=>{
    return {
        type:"SET_MPC3_PATTERN",
        payload:value
    }
}


export const MGchange=(value,field)=>{
    return {
        type:"SET_MPC_MATCHING_GROUP",
        value,field
    }
}

export const MG2change=(value,field)=>{
    return {
        type:"SET_MPC2_MATCHING_GROUP",
        value,field
    }
}

export const MG3change=(value,field)=>{
    return {
        type:"SET_MPC3_MATCHING_GROUP",
        value,field
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

export const setCurrentMPCDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_MPC_EDIT',
        payload:ConfigName
    }
}

export const setCurrentMPCDataOnView=(ConfigName)=>{
    return {
        type:'SET_CURRENT_MPC_VIEW',
        payload:ConfigName
    }
}

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_THRC_SET",
        payload:Val
    }
}
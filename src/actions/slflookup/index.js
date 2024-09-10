
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
        type: 'SET_DIALOG_TYPE',
        payload :type
    }
}

export const setDeleteDialogType = (type) =>{
    return {
        type: 'SET_SLF_LOOKUP_DELETE_BOX',
        payload :type
    }
}

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STATE_SLF',
        payload:showAlertDialog
    }
}

export const setDeleteAlertStateKeyPair=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STATE_KEYPAIR',
        payload:showAlertDialog
    }
}


export const setDialogTypeKeyPair = (type) => {
    return {
        type: 'SET_DIALOG_TYPE_KEYPAIR',
        payload :type
    }
}

export const setDialogStateKeyPair = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE_KEYPAIR',
        payload:showDialog
    }
}

export const addNewSlfLookUpData=()=>{
    addNewKeyPairData();
    return {
        type : 'ADD_NEW_SLF_LOOKUP_DATA',
        payload: {
                  "lookupTypeName": "",
                  "lookupType": "",
                  "mapSetEnabled":"false"
                }
        }
}

export const addNewKeyPairData=()=>{
    return {
        type : 'ADD_NEW_KEYPAIR_DATA',
        payload: {
            "destinationType":"",
            "pattern":"",
            "lookupTypeName":"",
            "slfLookUpType":"",
            "destinationId":"",
            "rank":1000,
            "customTag1":"",
            "customTag2":"",
            "customTag3":""
        }
    }
}

export const setSlfLookupPairData =(Val)=>{
    return {
        type:'SET_SLF_LOOKUP_KEYPAIR_DATA',
        payload:Val
    }
}

export const setSlfLookUpName =(Val)=>{
    return {
        type:'SET_SLF_LOOKUP_NAME',
        payload:Val
    }
}

export const setSlfLookUpType =(Val)=>{
    return {
        type:'SET_SLF_LOOKUP_TYPE',
        payload:Val
    }
}

export const setDestinationType =(Val)=>{
    return {
        type:'SET_KEYPAIR_DESTINATION_TYPE',
        payload:Val
    }
}

export const setSlfPattern = (Val) => {
    return {
        type:'SET_KEYPAIR_PATTERN',
        payload:Val
    }
}

export const setDestinationIdOptions = (Val) => {
    return {
        type:'SET_KEYPAIR_DESTINATION_ID_OPTIONS',
        payload:Val
    }
}

export const setDestinationId = (Val) => {
    return {
        type:'SET_KEYPAIR_DESTINATION_ID',
        payload:Val
    }
}

export const setRank =(Val)=>{
    return {
        type:'SET_KEYPAIR_RANK',
        payload:Val
    }
}

export const setCustomTag1 = (Val) => {
    return {
        type:'SET_KEYPAIR_TAG1',
        payload:Val
    }
}

export const setCustomTag2 = (Val) => {
    return {
        type:'SET_KEYPAIR_TAG2',
        payload:Val
    }
}

export const setCustomTag3 = (Val) => {
    return {
        type:'SET_KEYPAIR_TAG3',
        payload:Val
    }
}

export const setCurrentSlfLookUpOnEdit=(lookUpName)=>{
    addNewSlfLookUpData();
    return {
        type:'SET_CURRENT_SLF_LOOKUP_DATA_ON_EDIT',
        payload:lookUpName
    }
}

export const setKeyPairOnEdit=(keyPairData)=>{
    addNewKeyPairData();
    return {
        type:'SET_KEYPAIR_ON_EDIT',
        payload:keyPairData
    }
}

export const setSlfLookUpMapFlag =(Val)=>{
    return {
        type:'SET_SLF_LOOKUP_MAPFLAG',
        payload:Val
    }
}

export const enableKeyPairForm = (val) => {
    return {
        type: 'SET_KEYPAIR_ENABLE',
        payload :val
    }
}

export const setKeyMapGrid = (val) => {
    return {
        type: "GET_ALL_KEYPAIR_RECORDS",
        payload: val
    }
}


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

export const setDialogState = (showDialog) => {
    return {
        type : 'SET_DIALOG_STATE',
        payload:showDialog
    }
}

export const setDeleteAlertState=(showAlertDialog)=>{
    return {
        type : 'SET_ALERTDIALOG_STATE',
        payload:showAlertDialog
    }
}

export const addNewSlfConfigData=()=>{
    return {
        type : 'ADD_NEW_SLF_CONFIG_DATA',
        payload:{
            "slfConfig": {
              "SLFConfiguration": [
                {
                  "slfServerConfigs": {
                    "serverConfigName": "",
                    "identityAttr": [],
                    "identityLocation": "",
                    "slfLookupTableName": "",
                    "destinationToBeSet":false
                  }
                }
              ]
            }
          }
        }
}

export const setSlfConfigName=(Val)=>{
    return {
        type:'SET_SLF_CONFIG_NAME',
        payload:Val
    }
}

export const setSlfIdentityAttribute=(Val)=>{
    return {
        type:"SET_SLF_IDENTITY_ATTRIBUTE",
        payload:Val
    }
}

export const setSlfIdentityLocation=(Val)=>{
    return {
        type:"SET_SLF_IDENTITY_LOCATION",
        payload:Val
    }
}

export const setSlfLookupTableName=(Val)=>{
    return {
        type:"SET_SLF_LOOKUP_TABLE_NAME",
        payload:Val
    }
}

export const setCurrentSlfConfigDataOnEdit=(ConfigName)=>{
    return {
        type:'SET_CURRENT_SLF_CONFIG_DATA_ON_EDIT',
        payload:ConfigName
    }
}

export const updateDestinationToBeSet=(Val)=>{
    return {
        type:"UPDATE_DESTINATION_TO_BE_SET",
        payload:Val
    }
}
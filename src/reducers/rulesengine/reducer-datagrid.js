
export default function (state={}, action){
    switch(action.type) {
        case 'GET_ALL_RECORDS': {
            return {...state, rowData: action.payload}
        }
        case 'FETCH_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'SET_IMPORT_ERROR' : {
            return {...state, importerrorstate:action.payload}
        }
        case 'SAME_TYPE_RULE_GROUP' : {
            return {...state, grouperrorstate:action.payload}
        }
        case 'SET_IMPORT_ALERT_STATE': {
            return {...state, importAlertDialog: action.payload}
        }
        case 'SAVE_STATE':{
            return {...state, saveState: action.payload}    
        }
        default:
            return state;
    }
}
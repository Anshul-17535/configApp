const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_ERROR_SLF': {
            return {...state, apiErrorSlf: action.payload}
        }
        case 'SET_ERROR_DIALOG_SLF': {
            return {...state, showErrorAlertSlf: action.payload}
        }
        case 'SET_ALERTDIALOG_STATE_SLF': {
            return {...state, showDeleteAlertSlf: action.payload}
        }
        case 'SET_ALERTDIALOG_STATE_KEYPAIR': {
            return {...state, showDeleteAlertKeyPair: action.payload}
        }
        case 'GET_ALL_SLF_RECORDS': {
            return {...state, rowData: action.payload}
        }
        case 'GET_ALL_KEYPAIR_RECORDS': {
            return {...state, rowKeyPairData: action.payload}
        }
        case 'SET_KEYPAIR_ENABLE':{
            return {...state, enableKeyPair : action.payload}
        }
        case 'SET_SLF_LOOKUP_DELETE_MESSAGE':{
            return {...state, deleteMessage: action.payload}
        }
        case 'SET_SLF_LOOKUP_DELETE_BOX':{
            return {...state, deleteType: action.payload}
        }
        default:
            return state;
    }
}
const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_STAT_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_STAT_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_STAT_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'SET_STAT_IMPORT_ERROR' : {
            return {...state, importerrorstate:action.payload}
        }
        case 'GET_ALL_STAT_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {nfInstanceId,nfType,nfStatus}=data
                rowDataCopy=[...rowDataCopy,{"nfInstanceId":nfInstanceId,"nfType":nfType,"nfStatus":nfStatus}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
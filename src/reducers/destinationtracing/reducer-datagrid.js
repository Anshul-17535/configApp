const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_DESTC_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_DESTC_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_DESTC_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_DESTC_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {destinationName,destinationType}=data
                rowDataCopy=[...rowDataCopy,{"destinationName":destinationName,"destinationType":destinationType}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
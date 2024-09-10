const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_FDC_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_FDC_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_FDC_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_FDC_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {id,messageType,fieldType,definition}=data
                rowDataCopy=[...rowDataCopy,{"name":id,"messageType":messageType,"fieldType":fieldType,"definition":definition}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
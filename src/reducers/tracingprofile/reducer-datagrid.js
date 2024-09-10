const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_THRP_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_THRP_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_THRP_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_THRP_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {name,profileType}=data
                rowDataCopy=[...rowDataCopy,{"name":name,"profileType":profileType}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
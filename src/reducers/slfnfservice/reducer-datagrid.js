/* eslint-disable */
const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'SET_ALERTDIALOG_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'SET_ERROR_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'FETCH_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'GET_ALL_RECORDS_SLF_NFSERVICE': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {serviceInstanceId,serviceName}=data
                rowDataCopy=[...rowDataCopy,{"serviceInstanceId":serviceInstanceId,"serviceName":serviceName,"SlfnfServiceData":data}]
            })

            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
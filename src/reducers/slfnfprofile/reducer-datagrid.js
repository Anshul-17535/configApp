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
        case 'GET_ALL_RECORDS_SLF_NFPROFILE': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {nfInstanceId,nfType,nfStatus,fqdn}=data
                rowDataCopy=[...rowDataCopy,{"nfInstanceId":nfInstanceId,"nfType":nfType,"nfStatus":nfStatus,"fqdn":fqdn,"nfProfileData":data}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
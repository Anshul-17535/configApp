const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_MPC_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_MPC_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_MPC_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_MPC_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {id,sourceType,messageType}=data
                rowDataCopy=[...rowDataCopy,{"name":id,"sourceType":sourceType,"messageType":messageType}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
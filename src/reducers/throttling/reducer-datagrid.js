const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'GET_ALL_THR_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                const {filterGroup,name}=data
                rowDataCopy=[...rowDataCopy,{"name":name,"type":filterGroup.type}]
            })
            return {...state, rowData: rowDataCopy}
        }
        case 'FETCH_THR_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_THR_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_THR_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        default:
            return state;
    }
}
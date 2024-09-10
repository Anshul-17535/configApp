const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'GET_ALL_MSGFILTER_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                rowDataCopy=[...rowDataCopy,_.pick(data,"name","state")]
            })
            rowDataCopy.map(e=>e.state==="ACTIVE"?e.Active=true:e.Active=false)
            return {...state, rowData: rowDataCopy}
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
        case 'SET_MSG_ACTIVE_STATE': {
            return {...state, showActive: action.payload}
        }
        default:
            return state;
    }
}
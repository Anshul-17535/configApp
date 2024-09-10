const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_SLF_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                rowDataCopy=[...rowDataCopy,data.slfServerConfigs]
            })
            console.log("19",rowDataCopy)
            // rowDataCopy.map(e=>e.state==="ACTIVE"?e.state=true:e.state=false)
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
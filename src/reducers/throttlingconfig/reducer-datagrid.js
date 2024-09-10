import { act } from 'react-dom/test-utils';

const _ = require('underscore');

export default function (state={}, action){
    switch(action.type) {
        case 'FETCH_THRC_ERROR': {
            return {...state, apiError: action.payload}
        }
        case 'SET_ERROR_THRC_DIALOG': {
            return {...state, showErrorAlert: action.payload}
        }
        case 'SET_ALERTDIALOG_THRC_STATE': {
            return {...state, showDeleteAlert: action.payload}
        }
        case 'GET_ALL_THRC_RECORDS': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{
                 rowDataCopy=[...rowDataCopy,_.pick(data,"name","state")]
            })
            rowDataCopy.map(e=>e.state==="ACTIVE"?e.Active=true:e.Active=false)
            return {...state, rowData: rowDataCopy}
        }
        case 'SET_THR_ACTIVE_STATE': {
            return {...state, showActive: action.payload}
        }   
        default:
            return state;
    }
}
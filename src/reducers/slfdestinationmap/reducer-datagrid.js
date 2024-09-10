/* eslint-disable */
const _ = require('underscore');
import {returnMapName} from '../../containers/slfDestinationMap/helpers';

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
        case 'GET_ALL_RECORDS_DESTINATIONMAP': {
            let rowDataCopy=[]
            !!action.payload&&action.payload.map(data=>{

                const {mapPattern,destinationId}=data
                rowDataCopy=[...rowDataCopy,{"mapPattern":mapPattern,"destinationId":destinationId,"mapData":data[returnMapName(mapPattern)]}]
            })
            return {...state, rowData: rowDataCopy}
        }
        default:
            return state;
    }
}
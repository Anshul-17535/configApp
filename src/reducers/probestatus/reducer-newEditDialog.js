let _ = require('underscore');

export default function (state={currentData:{}}, action){
    switch(action.type) {
        case 'SET_DIALOG_FDC_TYPE' :
            return {...state, dialogType: action.payload}

        case 'SET_DIALOG_PBS_STATE':
            return {...state, dialogState:action.payload}
            
        default:
            return state;
    }
}
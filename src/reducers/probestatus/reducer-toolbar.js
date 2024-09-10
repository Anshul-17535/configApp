export default function (state={},action){
    switch(action.type){
        case 'SET_SUCCESS_PBS_FLAG' : {
            return {...state, successFlag: action.payload}
        }
        case 'SET_SUCCESS_PBS_MESSAGE' : {
            return {...state, successMessage: action.payload}
        }
        case 'GET_TOOLBAR_DATA': {
            return {...state, toolbarData: action.payload}
        }
        default:
            return state;
    }
}
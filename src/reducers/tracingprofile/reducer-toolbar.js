export default function (state={},action){
    switch(action.type){
        case 'SET_SUCCESS_THRP_FLAG' : {
            return {...state, successFlag: action.payload}
        }
        case 'SET_SUCCESS_THRP_MESSAGE' : {
            return {...state, successMessage: action.payload}
        }
        case 'GET_TOOLBAR_DATA': {
            return {...state, toolbarData: action.payload}
        }
        case 'ALL_INBOUND_PROFILEAMES':{
            return {...state, inboundpofile: action.payload}
        }
        default:
            return state;
    }
}
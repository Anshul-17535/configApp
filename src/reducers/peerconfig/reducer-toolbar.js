export default function (state={},action){
    switch(action.type){
        case 'SET_SUCCESS_PEER_FLAG' : {
            return {...state, successFlag: action.payload}
        }
        case 'SET_SUCCESS_PEER_MESSAGE' : {
            return {...state, successMessage: action.payload}
        }
        case 'GET_TOOLBAR_DATA': {
            return {...state, toolbarData: action.payload}
        }
        case 'ALL_EGRESS_PROFILEAMES':{
            return {...state,egreessprofilearray:action.payload}
        }
        case 'ALL_INGRESS_PROFILEAMES':{
            return {...state,ingreessprofilearray:action.payload}
        }
        default:
            return state;
    }
}
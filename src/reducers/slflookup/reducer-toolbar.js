export default function (state={enableKeyPair: true},action){
    switch(action.type){
        case 'SET_SUCCESS_FLAG_SLF' : {
            return {...state, successFlag: action.payload}
        }
        case 'SET_SUCCESS_MESSAGE_SLF' : {
            return {...state, successMessage: action.payload}
        }
        case 'GET_TOOLBAR_DATA': {
            return {...state, toolbarData: action.payload}
        }

        case 'SET_KEYPAIR_ENABLE': {
            return {...state, enableKeyPair: action.payload}
        }
        default:
            return state;
    }
}
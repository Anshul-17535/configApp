export default function (state={
    toolbarData: {
        pageTitle: 'SCP -> Rules Engine',
        subTitle: ''
      }
}, action){
    switch(action.type) {
        case 'GET_TOOLBAR_DATA': {
            return {...state, toolbarData: action.payload}
        }
        case 'SET_KEYCLOAK_DATA': {
            return {...state, keyCloakDetails: action.payload,authenticated: true}
        }
        case 'SET_SUCCESS_FLAG' : {
            return {...state, successFlag: action.payload}
        }
        case 'SET_SUCCESS_MESSAGE' : {
            return {...state, successMessage: action.payload}
        }
        default:
            return state;
    }
}
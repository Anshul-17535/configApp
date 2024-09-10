export default function (state={}, action){
    switch(action.type) {
        case 'GET_SPLITSCREEN_DATA': {
            return {...state, splitScreenData: action.payload}
        }
        case 'TOGGLE_SPLITSCREEN': {
            return {...state, toggleState: action.payload}
        }
        default:
            return state;
    }
}
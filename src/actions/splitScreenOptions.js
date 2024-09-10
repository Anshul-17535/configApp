import splitScreenData from '../actions/splitScreenData';

export const getData = () => {
    let splitScreenArray = [];
    splitScreenData.MenuItems.forEach( value => {
        splitScreenArray.push(value);
    });
    return splitScreenArray;
}

export const getSplitScreenData = () => {
    return {
        type : 'GET_SPLITSCREEN_DATA',
        payload: getData()
    }
}
export const toggleSplitScreen = (newValue) => {
    return {
        type: 'TOGGLE_SPLITSCREEN',
        payload :newValue
    }
}
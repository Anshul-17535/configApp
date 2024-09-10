import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk])

export const setupStore = (initialState) => {
    const store = mockStore({initialState})
    return store
}
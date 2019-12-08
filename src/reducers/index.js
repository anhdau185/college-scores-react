import { actionTypes } from '../actions';
import { combineReducers } from 'redux';

function testReducer(prevState = 0, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return prevState + 1;
        case actionTypes.DECREMENT:
            return prevState - 1;
        default:
            return prevState;
    }
}

const allReducers = combineReducers({
    test: testReducer
});

export default allReducers;
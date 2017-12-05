import * as types from '../actions/types';

export default function(state = [], action) {
    // console.log('eventsReducer action: ', action);
    switch(action.type) {
        case types.FETCH_EVENTS:
            return action.payload || false;
        case types.COMMIT_TO_EVENT:
            return action.payload || false;
        case types.UNCOMMIT_FROM_EVENT:
            return action.payload || false;
        case types.CHECK_ATTENDANCE:
            return action.payload || false;
        default:
            return state;
    }
};
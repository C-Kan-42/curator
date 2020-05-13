import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';
import { CLEAR_SESSION_ERRORS } from '../actions/errors_actions';

export default (oldState = [], action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case CLEAR_SESSION_ERRORS:
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return oldState;
    }
};
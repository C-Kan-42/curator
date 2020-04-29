import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import uiReducer from './ui_reducer';
import entitiesReducer from './entities_reducer';
import loadingReducer from './loading_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    loading: loadingReducer,
    ui: uiReducer
});

export default rootReducer;

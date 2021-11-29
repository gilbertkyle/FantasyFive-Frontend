import { combineReducers } from 'redux';
import authReducer from './auth';
import fflReducer from "./ffl";

export default combineReducers({
    auth: authReducer,
    ffl: fflReducer
});
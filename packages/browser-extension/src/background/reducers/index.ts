
import { combineReducers } from 'redux';
import tabs from './tabs';
import cameras from './cameras';

export const rootReducer = combineReducers({
	tabs,
	cameras
});

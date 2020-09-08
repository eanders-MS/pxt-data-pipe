import { wrapStore } from 'webext-redux';
import { createStore } from 'redux';
import { rootReducer } from '../reducers';

const store = (() => {
	const store = createStore(rootReducer);
	// Connect the store to the frontend/popup.
	wrapStore(store);
	return store;
})();

export default store;

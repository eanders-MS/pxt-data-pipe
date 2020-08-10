import { wrapStore } from 'webext-redux';
import { createStore } from 'redux';
import { rootReducer } from '../reducers';

const store = (() => {
	const store = createStore(rootReducer);
	// Connect the store to the frontend/popup.
	wrapStore(store);
	// Set initial logged-in status based on whether or not we have a persisted userId.
	//if (store.getState().configState.userId) {
	//	store.dispatch(AccountActions.setStatus('logged-in'));
	//}
	return store;
})();

export default store;

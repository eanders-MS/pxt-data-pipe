/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from './view/App';
import { store } from './store';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import './style.scss';

store.ready().then(() => {
	ReactDOM.render(
		// Must cast thru `any` because webext-redux type definitions are out of date with latest Redux.
		// https://github.com/tshaddix/webext-redux/issues/221 
		<Provider store={store as any as Store<IAppState>}>
			<App />
		</Provider>
		, document.getElementById('root'));
});

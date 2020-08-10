import { Store } from 'webext-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';

export const store = new Store<IAppState>();

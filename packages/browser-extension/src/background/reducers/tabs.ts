import { ITabState } from 'makecode-data-pipe-common/built/model/tab';
import { TabAction } from 'makecode-data-pipe-common/built/actions/tab';

const initialState: ITabState[] = [];

export default function reducer(state: ITabState[] = initialState, action: TabAction): ITabState[] {
    switch (action.type) {
        case 'register-tab': {
            state = [...state];
            const tab = state.find(item => item.tabId === action.tabId);
            if (tab) {
                tab.title = action.title;
            } else {
                state.push({
                    tabId: action.tabId,
                    title: action.title,
                    cameras: []
                });
            }
            return state;
        }
        case 'unregister-tab': {
            state = state.filter(item => item.tabId !== action.tabId);
            return state;
        }
        case 'enable-camera': {
            state = [...state];
            const tab = state.find(item => item.tabId === action.tabId);
            if (tab) {
                tab.cameras = tab.cameras.filter(item => item !== action.camera)
                if (action.enable) {
                    tab.cameras.push(action.camera);
                }
            }
            return state;
        }
        default:
            return [...state];
    }
}

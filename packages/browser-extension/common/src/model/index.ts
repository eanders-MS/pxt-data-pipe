import { ITabState } from './tab';
import { ICameraState } from './camera';

export type IAppState = {
	tabs: ITabState[];
	cameras: ICameraState[];
};

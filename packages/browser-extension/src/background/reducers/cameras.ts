import { ICameraState } from 'makecode-data-pipe-common/built/model/camera';
import { CameraAction } from 'makecode-data-pipe-common/built/actions/camera';

const initialState: ICameraState[] = [];

export default function reducer(state: ICameraState[] = initialState, action: CameraAction): ICameraState[] {
    switch (action.type) {
        case 'register-cameras': {
            state = action.cameras.map(camera => {
                return {
                    deviceId: camera.deviceId,
                    label: camera.label,
                    active: false
                }
            });
            return state;
        }
        case 'set-camera-state': {
            state = [...state];
            const camera = state.find(item => item.deviceId === action.deviceId);
            if (camera) {
                camera.active = action.active;
            }
            return state;
        }
        default:
            return [...state];
    }
}

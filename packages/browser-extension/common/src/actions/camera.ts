export type CameraDesc = {
    deviceId: string;
    label: string;
};

export type CameraAction_RegisterCameras = {
    type: 'register-cameras';
    cameras: CameraDesc[];
};

export type CameraAction_SetCameraState = {
    type: 'set-camera-state';
    deviceId: string;
    active: boolean;
}

export type CameraAction
    = CameraAction_RegisterCameras
    | CameraAction_SetCameraState
    ;

export const registerCameras = (cameras: CameraDesc[]): CameraAction => ({
    type: 'register-cameras',
    cameras
});

export const setCameraState = (deviceId: string, name: string, active: boolean): CameraAction => ({
    type: 'set-camera-state',
    deviceId,
    active
});

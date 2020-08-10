export type TabAction_RegisterTab = {
    type: 'register-tab';
    tabId: number;
    title: string;
};

export type TabAction_UnregisterTab = {
    type: 'unregister-tab';
    tabId: number;
};

export type TabAction_EnableCamera = {
    type: 'enable-camera';
    tabId: number;
    camera: string;
    enable: boolean;
}

export type TabAction
    = TabAction_RegisterTab
    | TabAction_UnregisterTab
    | TabAction_EnableCamera
    ;

export const registerTab = (tabId: number, title: string): TabAction => ({
    type: 'register-tab',
    tabId,
    title
});

export const unregisterTab = (tabId: number): TabAction => ({
    type: 'unregister-tab',
    tabId
});

export const enableCamera = (tabId: number, camera: string, enable: boolean): TabAction => ({
    type: 'enable-camera',
    tabId,
    camera,
    enable
});

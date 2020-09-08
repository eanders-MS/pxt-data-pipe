export type VideoFrameCommand = {
	type: 'video-frame';
	deviceId: string;
	name: string;
	width: number;
	height: number;
	pixels: number[];
	palette: number[];
	paletteName: string;
};

export type RegisterTabCommand = {
	type: 'register-tab';
};

export type UnregisterTabCommand = {
	type: 'unregister-tab';
};

export type ExtensionLoadedCommand = {
	type: 'extension-loaded';
};

export type Command
	= VideoFrameCommand
	| RegisterTabCommand
	| UnregisterTabCommand
	| ExtensionLoadedCommand
	;

export const videoFrame = (deviceId: string, name: string, width: number, height: number, pixels: number[], palette: number[], paletteName: string): Command => ({
	type: 'video-frame',
	deviceId,
	name,
	width,
	height,
	pixels,
	palette,
	paletteName
});

export const registerTab = (): Command => ({
	type: 'register-tab'
});

export const unregisterTab = (): Command => ({
	type: 'unregister-tab'
});

export const extensionLoaded = (): Command => ({
	type: 'extension-loaded'
});

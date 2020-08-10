export type VideoFrameCommand = {
	type: 'video-frame';
	deviceId: string;
	frame: string;
};

export type RegisterTabCommand = {
	type: 'register-tab';
};

export type UnregisterTabCommand = {
	type: 'unregister-tab';
};

export type Command
	= VideoFrameCommand
	| RegisterTabCommand
	| UnregisterTabCommand
	;

export const videoFrame = (deviceId: string, frame: string): Command => ({
	type: 'video-frame',
	deviceId,
	frame
});

export const registerTab = () => ({
	type: 'register-tab'
});

export const unregisterTab = () => ({
	type: 'unregister-tab'
});

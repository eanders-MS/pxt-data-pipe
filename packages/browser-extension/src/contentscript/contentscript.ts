import * as Commands from 'makecode-data-pipe-common/built/commands';

type SimulatorMessage = {
    type: string;
};

type SimulatorVideoMessage = SimulatorMessage & {
    type: 'video';
    subtype: string;
};

type SimulatorFrameMessage = SimulatorVideoMessage & {
    subtype: 'video-frame';
    deviceId: string;
    name: string;
    width: number;
    height: number;
    pixels: number[];
    palette: number[];
    paletteName: string
}

window.onload = () => {
    // Hacky: Allow time for the simulator's iframe to load.
    setTimeout(() => getSimulatorAndUpdateRegistration(), 500);
}

window.onbeforeunload = () => {
    chrome.runtime.sendMessage(Commands.unregisterTab());
}

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type && message.type.length) {
        switch (message.type) {
            case 'extension-loaded': {
                getSimulatorAndUpdateRegistration();
                break;
            }
            case 'video-frame': {
                handleVideoFrame(message);
                break;
            }
        }
    }
});

let registered = false;

function getSimulatorAndUpdateRegistration(): HTMLIFrameElement {
    const simulator = document.querySelector("iframe[id^='sim-frame']");
    if (simulator) {
        if (!registered) {
            chrome.runtime.sendMessage(Commands.registerTab());
            registered = true;
        }
    } else {
        if (registered) {
            chrome.runtime.sendMessage(Commands.unregisterTab());
            registered = false;
        }
    }
    return simulator as HTMLIFrameElement;
}

function handleVideoFrame(videoFrame: Commands.VideoFrameCommand) {
    const simulator = getSimulatorAndUpdateRegistration();
    if (simulator) {
        const msg: SimulatorFrameMessage = {
            type: 'video',
            subtype: 'video-frame',
            deviceId: videoFrame.deviceId,
            name: videoFrame.name,
            width: videoFrame.width,
            height: videoFrame.height,
            pixels: videoFrame.pixels,
            palette: videoFrame.palette,
            paletteName: videoFrame.paletteName
        };
        simulator.contentWindow.postMessage(msg, '*');
    }
}
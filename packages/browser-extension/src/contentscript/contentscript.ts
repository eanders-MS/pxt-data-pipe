import * as Commands from 'makecode-data-pipe-common/built/commands';

type SimulatorSerialMessage = {
    type: "serial";
    id: string;
    data: string;
    sim?: boolean;
    receivedTime?: number;
};

type SimulatorMessage
    = SimulatorSerialMessage
    ;

window.onload = () => {
    // Hacky: Allow time for the simulator's iframe to come into existence
    setTimeout(() => getSimulatorAndUpdateRegistration(), 500);
}

window.onbeforeunload = () => {
    chrome.runtime.sendMessage(Commands.unregisterTab());
}

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type && message.type.length) {
        switch (message.type) {
            case 'video-frame': {
                handleVideoFrame(message.deviceId, message.frame);
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

function handleVideoFrame(deviceId: string, frame: string) {
    const simulator = getSimulatorAndUpdateRegistration();
    if (simulator) {
        console.log("handleVideoFrame");
        const msg: SimulatorSerialMessage = {
            type: 'serial',
            id: Math.random().toFixed(36).substring(2, 10),
            data: frame
        };
        simulator.contentWindow.postMessage(msg, '*');
    }
}
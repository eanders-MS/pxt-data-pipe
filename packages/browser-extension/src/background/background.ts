console.log("MakeCode Data Pipe -- started");

import store from './store';
import * as TabActions from 'makecode-data-pipe-common/built/actions/tab';
import * as Commands from 'makecode-data-pipe-common/built/commands';

// id of the settings window, if open
let settingsWindowId: number = chrome.windows.WINDOW_ID_NONE;

// Popup settings page
chrome.browserAction.onClicked.addListener(() => {
    if (settingsWindowId === chrome.windows.WINDOW_ID_NONE) {
        chrome.windows.create({ url: 'popup/index.html', type: 'popup' }, (window) => {
            settingsWindowId = window.id;
            chrome.browserAction.setIcon({ path: 'assets/icon_32.png' });
        });
    } else {
        chrome.windows.update(settingsWindowId, { focused: true });
    }
});

// Clear settings window id on close
chrome.windows.onRemoved.addListener(windowId => {
    if (windowId === settingsWindowId) {
        settingsWindowId = chrome.windows.WINDOW_ID_NONE;
        chrome.browserAction.setIcon({ path: 'assets/icon_32_dormant.png' });
    }
});

// Handle messages from content scripts and settings page
chrome.runtime.onMessage.addListener((command: Commands.Command, sender: chrome.runtime.MessageSender) => {
    dispatchCommand(command, sender);
});

// Unregister tabs on close
chrome.tabs.onRemoved.addListener((tabId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
    unregisterTab(tabId);
});

chrome.tabs.query({}, tabs => {
    // This doesn't work due to https://bugs.chromium.org/p/chromium/issues/detail?id=168263
    // The reloaded extension is blocked from connecting to stale content scripts. ¯\_(ツ)_/¯
    const msg = Commands.extensionLoaded();
    for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, msg);
    }
});

// Update app state
function registerTab(tab: chrome.tabs.Tab) {
    console.log(`registering tab ${tab.id} ${tab.title}`);
    store.dispatch(TabActions.registerTab(tab.id, tab.title));
}

// Update app state
function unregisterTab(tabId: number) {
    console.log(`unregistering tab ${tabId}`)
    store.dispatch(TabActions.unregisterTab(tabId));
}

function dispatchCommand(command: Commands.Command, sender: chrome.runtime.MessageSender) {
    switch (command.type) {
        case 'video-frame': {
            handleVideoFrame(command);
            break;
        }
        case 'register-tab': {
            if (sender.tab) {
                registerTab(sender.tab);
            }
            break;
        }
        case 'unregister-tab': {
            if (sender.tab) {
                unregisterTab(sender.tab.id);
            }
        }
    }
}

function handleVideoFrame(msg: Commands.VideoFrameCommand) {
    const state = store.getState();
    state.tabs.filter(tab =>
        tab.cameras.includes(msg.deviceId)).forEach(tab =>
            chrome.tabs.sendMessage(tab.tabId, msg));
}

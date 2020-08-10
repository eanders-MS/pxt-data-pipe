console.log("MakeCode Data Pipe -- started");

import store from './store';
import * as TabActions from 'makecode-data-pipe-common/built/actions/tab';
import { Command } from 'makecode-data-pipe-common/built/commands';

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
chrome.runtime.onMessage.addListener((command: Command, sender: chrome.runtime.MessageSender) => {
    dispatchCommand(command, sender);
});

// Unregister tabs on close
chrome.tabs.onRemoved.addListener((tabId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
    unregisterTab(tabId);
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

function dispatchCommand(command: Command, sender: chrome.runtime.MessageSender) {
    switch (command.type) {
        case 'video-frame': {
            handleVideoFrame(command.deviceId, command.frame);
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

function handleVideoFrame(deviceId: string, frame: string) {
    const state = store.getState();
    state.tabs.filter(tab =>
        tab.cameras.includes(deviceId)).forEach(tab =>
            sendVideoFrame(tab.tabId, deviceId, frame));
}

function sendVideoFrame(tabId: number, deviceId: string, frame: string) {
    chrome.tabs.sendMessage(tabId, {
        type: 'video-frame',
        deviceId,
        frame
    });
}
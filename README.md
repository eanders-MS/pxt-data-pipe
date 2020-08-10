# MakeCode Data Pipe

Chrome browser extension to enable streaming of data to the MakeCode simulator's serial port.

## Install pre-built extension

1. Download athe latest `makecode-data-pipe.zip` from the releases page https://github.com/eanders-MS/pxt-data-pipe/releases.
2. Unzip the downloaded extension to a suitable location.
3. In Chrome, open the extension management page by navigating to `chrome://extensions`.
4. Enable developer mode if necessary by clicking the toggle switch next to **Developer mode**.
5. Uninstall the previous version, if it's installed.
6. Click the **LOAD UNPACKED** button and select the folder where you unzipped the extension.

## Build from source

### System Prerequisites

1. `NodeJS` & `NPM` installed (nodejs.org).
2. `yarn`, installed globally: `npm install -g yarn`

**IMPORTANT**: This repository uses `yarn` for dependency management. `npm` will not work! Running scripts with `npm` (e.g. `npm run build`) is safe (though `yarn` can do this too: `yarn build`).

### Installing dependencies

Run `yarn install` in the repo root to install dependencies for all projects.

### Building the extension

Project parts 1 and 2 above are individually webpacked, but are built in a single pass.

* Option 1: To make a development build that watches for changes and rebuilds on-the-fly: Run `yarn watch` in `packages/browser-extension` folder.
* Option 2: To make a production build: Run `yarn build` in `packages/browser-extension` folder.

**Special note**: These projects depend on two shared libraries:
* `packages/common`
* `packages/browser-extension/common`

When running `yarn watch`, code changes in these shared libraries *are not automatically picked up* and must be manually rebuilt by running `yarn build` in the respective folder. Once this is done, the active `yarn watch` process will pick up the changes.

### Installing in Chrome

1. In Chrome, open the extension management page by navigating to `chrome://extensions`.
2. Enable developer mode if necessary by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the `packages/browser-extension/dist` folder.
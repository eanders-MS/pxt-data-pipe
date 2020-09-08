# MakeCode Data Pipe

Chrome browser extension to enable streaming of video and data to MakeCode via the `libs/video` common package. To include this package in your Arcade project, add `"video": "*"` to `pxt.json`'s `dependencies` section.

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

The extension consists of multiple projects that get individually webpacked, but all are built in a single pass.

* Option 1: To make a development build that watches for changes and rebuilds on-the-fly: Run `yarn watch` in `packages/browser-extension` folder.
* Option 2: To make a production build: Run `yarn build` in `packages/browser-extension` folder.

**Special note**: These projects depend on a shared library:
* `packages/browser-extension/common`

When running `yarn watch`, code changes in shared libraries ***are not automatically picked up* and must be manually rebuilt**. There are two ways to do this:
        
1. Stop and restart `yarn watch`.
2. Run `yarn build` in the shared lib folder. Once this is done, the active `yarn watch` process will pick up the changes.

### Installing local build in Chrome

1. In Chrome, open the extension management page by navigating to `chrome://extensions`.
2. Enable developer mode if necessary by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the `packages/browser-extension/dist` folder.

**Note**: Whenever the extension is rebuilt, it must be reloaded in Chrome via the "reload" button.

**Note**: Whenever the extension is reloaded, its connection to existing MakeCode tabs is broken. This is a feature/limitation of Chrome with no straightforward workaround. Refresh these pages to reconnect them to the extension.

## Connecting to Arcade

Verify the browser extension is loaded. If you don't need to develop in the extension, installing the pre-built version is much simpler than building from source.

1. Follow the install steps above.
2. In Chrome, look for the extension with the MakeCode icon.
3. Click the icon. A window should appear enumerating your webcams.

On the Arcade side, video stream funtionality is in located in the `libs/packages/video` package. This package isn't shipped with production Arcade. It exists in the `eanders/video-streams` branch of the different repos the comprise MakeCode, which are:
* https://github.com/microsoft/pxt/ (master branch)
* https://github.com/microsoft/pxt-common-packages (eanders/video-streams branch)
* https://github.com/microsoft/pxt-arcade (eanders/video-streams branch)
* https://github.com/microsoft/pxt-arcade-sim (eanders/video-streams branch)

1. Sync these branches and symlink all the folders.
    1. In `pxt-common-packages/`:
        * `$> npm link ../pxt`

    2. In `pxt-arcade-sim/`:
        * `$> npm link ../pxt`
        * `$> npm link ../pxt-common-packages`

    3. In `pxt-arcade/`:
        * `$> npm link ../pxt`
        * `$> npm link ../pxt-common-packages`
        * `$> npm link ../pxt-arcade-sim`


2. In `pxt/`: run
    * `$> gulp watch`

3. In `pxt-arcade/`: run
    * `$> pxt service --rebundle`

4. Wait for Arcade to open in the browser.

5. Start a new project and add the `video` package to `pxt.json`'s dependencies. A new "Video" toolbox category should appear.

6. Write some code that uses the video blocks. Something like this is a good quick test:

    ```ts
    let frame: Image = null
    forever(function () {
        frame = video.getCurrentFrame(0)
        video.setPaletteFromStream(0)
        scene.setBackgroundImage(frame)
    })
    ```

7. Open the extension UI, if not already open. Your MakeCode tab should be listed. If not there, refresh the MakeCode page.

8. Start a camera.

9. Enable that camera for your MakeCode tab. You should see the video feed in the Arcade simulator.

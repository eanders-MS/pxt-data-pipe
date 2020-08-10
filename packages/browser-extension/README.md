# MakeCode Data Pipe - Browser Extension

## Developing

### Prerequisites

- git + GNU utilities (for grep/sed/cat, etc.)
- Node.js
- yarn (install globally: `npm -ig yarn`)
- Visual Studio Code (recommended)

### Build the extension

- `yarn build` makes a production build. **This will not run locally without a manual change to the manifest.** Downloaded releases have the fix and will run fine. Will correct this.
- `yarn watch` makes a development build, with continuous incremental hot-reload (best choice for developers).

#### Releasing a new production build

To make a production build and publish it to GitHub releases:
- Open a console to this folder.
- Make sure you have a GitHub [Personal Access Token](https://github.com/settings/tokens), with "repo" permissions, and assign it to the GITHUB_TOKEN environment variable.
- Make sure your repo is "clean", no local changes.
- CD to the `packages/browser-extension/ folder.
- `yarn build` -- builds the project, including the production version of the extension.
- `yarn zip` -- packages the extension: makecode-data-pipe.zip.
- `yarn release` -- increments the package version number and publishes to GitHub. This is an interactive process. It will ask how the version should be incremented, etc.

#### Testing the development build

- Load the extension into Chrome "unpacked", if not already done. [Instructions](https://www.google.com/search?q=chrome+extension+load+unpacked).

- TODO document this.

Developer Notes:
- Changes made in `./src/background` require a plugin reload to take effect.
- Changes in `./src/popup` are loaded the next time you click the extension's icon to open the UI.
- Changes in `packages/common` and `packages/browser-extension/common` require a manual rebuild (i.e. restart `yarn watch`).

## To generate a palette cubemap:

0. Download and install ImageMagick, if needed. https://imagemagick.org/script/download.php

1. Create a png for your new palette:
    1. Copy `grayscale-pal.png` --> `<palette-name>.png` and edit it to your palette's colors. Replace `<palette-name>` with the name of your new palette.
    
    > Note these palette files only have 15 colors. Index 0 - transparent - is excluded.

2. In a bash shell, use ImageMagick to generate a cubemap png for your palette:

    ```
    $ ./remap -m HSP cubemap.png <palette-name>-pal.png <palette-name>-hsp.png
    ```

3. Copy `<palette-name>-hsp.png` to the `/packages/browser-extension/src/popup/public/adjustments` folder. Leave a copy in the `/scripts/imagemagick` folder as well, for archiving.

4. Register the palette in `/packages/browser-extension/src/popup/src/palettes.ts`, making sure the color hex codes match.

5. Restart your `yarn watch` process to pick up the new cubemap png.

6. Reload the browser extension.

7. Reload any open MakeCode pages so they'll reconnect to the extension.

## TODO: Add a palette generator to the extension UI.
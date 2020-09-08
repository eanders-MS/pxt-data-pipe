export type PaletteColor = {
    r: number;
    g: number;
    b: number;
    rgb: number;
    hex: string;
    idx?: number;
};

export class Palette {
    colors: PaletteColor[] = [];
    // Indexed by rgb value
    dict: { [key: number]: PaletteColor } = {};
    // Array of rgb values, starting with transparent (which is not in the palette but Arcade's palette always starts with transparent)
    arr: number[] = [0];

    constructor(public name: string, public cube: string) {
    }

    addColor(color: PaletteColor): this {
        // This seems wrong, but stuff seems to be working. Hm...
        color.idx = this.colors.length + 1;
        this.colors.push(color);
        this.dict[color.rgb] = color;
        this.arr.push(color.rgb);
        return this;
    }
};

export function makePaletteColor(r: string, g: string, b: string): PaletteColor {
    const rb = toByte(r);
    const gb = toByte(g);
    const bb = toByte(b);
    return {
        r: rb, g: gb, b: bb,
        rgb: rgb(rb, gb, bb),
        hex: `${r}${g}${b}`
    };
}

export function rgb(r: number, g: number, b: number): number {
	return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

const hexmap: { [key: string]: number } = {
    '0': 0x00, '1': 0x01, '2': 0x02, '3': 0x03, '4': 0x04, '5': 0x05, '6': 0x06, '7': 0x07, '8': 0x08, '9': 0x09, 'A': 0x0A, 'B': 0x0B, 'C': 0x0C, 'D': 0x0D, 'E': 0x0E, 'F': 0x0F
};

function toByte(s: string) {
    if (s.length !== 2) return 0;
    const msn = hexmap[s.charAt(0).toUpperCase()] << 4;
    const lsn = hexmap[s.charAt(1).toUpperCase()];
    return msn | lsn;
}
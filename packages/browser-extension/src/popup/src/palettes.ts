import { Palette, makePaletteColor } from './palette';

const palettes: Palette[] = [];

export function addPalette(palette: Palette): void {
    palettes.push(palette);
}

export function getPalette(name: string): Palette {
    return palettes.filter(pal => pal.name === name).shift();
}

export function getPaletteNames(): string[] {
    return palettes.map(pal => pal.name);
}

const Arcade = new Palette("Default", "./adjustments/arcade-hsp.png");
Arcade.addColor(makePaletteColor('ff', 'ff', 'ff'));
Arcade.addColor(makePaletteColor('ff', '21', '21'));
Arcade.addColor(makePaletteColor('ff', '93', 'c4'));
Arcade.addColor(makePaletteColor('ff', '81', '35'));
Arcade.addColor(makePaletteColor('ff', 'f6', '09'));
Arcade.addColor(makePaletteColor('24', '9c', 'a3'));
Arcade.addColor(makePaletteColor('78', 'dc', '52'));
Arcade.addColor(makePaletteColor('00', '3f', 'ad'));
Arcade.addColor(makePaletteColor('87', 'f2', 'ff'));
Arcade.addColor(makePaletteColor('8e', '2e', 'c4'));
Arcade.addColor(makePaletteColor('a4', '83', '9f'));
Arcade.addColor(makePaletteColor('5c', '40', '6c'));
Arcade.addColor(makePaletteColor('e5', 'cd', 'c4'));
Arcade.addColor(makePaletteColor('91', '46', '3d'));
Arcade.addColor(makePaletteColor('00', '00', '00'));
addPalette(Arcade);

const AdaFruit = new Palette("AdaFruit", "./adjustments/adafruit-hsp.png");
AdaFruit.addColor(makePaletteColor('17', 'AB', 'FF'));
AdaFruit.addColor(makePaletteColor('DF', '29', '29'));
AdaFruit.addColor(makePaletteColor('C6', '00', 'FF'));
AdaFruit.addColor(makePaletteColor('FF', '00', '7D'));
AdaFruit.addColor(makePaletteColor('00', 'FF', '72'));
AdaFruit.addColor(makePaletteColor('E5', 'FF', '00'));
AdaFruit.addColor(makePaletteColor('00', '34', 'FF'));
AdaFruit.addColor(makePaletteColor('FF', 'FF', 'FF'));
AdaFruit.addColor(makePaletteColor('00', 'EF', 'FF'));
AdaFruit.addColor(makePaletteColor('FF', '00', '00'));
AdaFruit.addColor(makePaletteColor('74', '00', 'DB'));
AdaFruit.addColor(makePaletteColor('63', '63', '63'));
AdaFruit.addColor(makePaletteColor('FF', '7a', '00'));
AdaFruit.addColor(makePaletteColor('2D', '9F', '00'));
AdaFruit.addColor(makePaletteColor('00', '00', '00'));
addPalette(AdaFruit);

const Matte = new Palette("Matte", "./adjustments/matte-hsp.png");
Matte.addColor(makePaletteColor('1D', '2B', '53'));
Matte.addColor(makePaletteColor('7E', '25', '53'));
Matte.addColor(makePaletteColor('00', '87', '51'));
Matte.addColor(makePaletteColor('AB', '52', '36'));
Matte.addColor(makePaletteColor('5F', '57', '4F'));
Matte.addColor(makePaletteColor('C2', 'C3', 'C7'));
Matte.addColor(makePaletteColor('FF', 'F1', 'E8'));
Matte.addColor(makePaletteColor('FF', '00', '4D'));
Matte.addColor(makePaletteColor('FF', 'A3', '00'));
Matte.addColor(makePaletteColor('FF', 'EC', '27'));
Matte.addColor(makePaletteColor('00', 'E4', '36'));
Matte.addColor(makePaletteColor('29', 'AD', 'FF'));
Matte.addColor(makePaletteColor('83', '76', '9C'));
Matte.addColor(makePaletteColor('FF', '77', 'A8'));
Matte.addColor(makePaletteColor('FF', 'CC', 'AA'));
addPalette(Matte);

const GrayScale = new Palette("GrayScale", './adjustments/grayscale-hsp.png');
GrayScale.addColor(makePaletteColor('FF', 'FF', 'FF'));
GrayScale.addColor(makePaletteColor('ED', 'ED', 'ED'));
GrayScale.addColor(makePaletteColor('DB', 'DB', 'DB'));
GrayScale.addColor(makePaletteColor('C8', 'C8', 'C8'));
GrayScale.addColor(makePaletteColor('B6', 'B6', 'B6'));
GrayScale.addColor(makePaletteColor('A4', 'A4', 'A4'));
GrayScale.addColor(makePaletteColor('92', '92', '92'));
GrayScale.addColor(makePaletteColor('80', '80', '80'));
GrayScale.addColor(makePaletteColor('6D', '6D', '6D'));
GrayScale.addColor(makePaletteColor('5B', '5B', '5B'));
GrayScale.addColor(makePaletteColor('49', '49', '49'));
GrayScale.addColor(makePaletteColor('37', '37', '37'));
GrayScale.addColor(makePaletteColor('24', '24', '24'));
GrayScale.addColor(makePaletteColor('12', '12', '12'));
GrayScale.addColor(makePaletteColor('00', '00', '00'));
addPalette(GrayScale);

const Poke = new Palette("Poke", './adjustments/poke-hsp.png');
Poke.addColor(makePaletteColor('ff', 'ff', 'ff'));
Poke.addColor(makePaletteColor('e8', '95', '8b'));
Poke.addColor(makePaletteColor('d4', '53', '62'));
Poke.addColor(makePaletteColor('61', '24', '31'));
Poke.addColor(makePaletteColor('f5', 'dc', '8c'));
Poke.addColor(makePaletteColor('cc', '89', '45'));
Poke.addColor(makePaletteColor('8f', '3f', '29'));
Poke.addColor(makePaletteColor('c0', 'fa', 'c2'));
Poke.addColor(makePaletteColor('5d', 'd4', '8f'));
Poke.addColor(makePaletteColor('41', '7d', '53'));
Poke.addColor(makePaletteColor('6c', 'ad', 'eb'));
Poke.addColor(makePaletteColor('51', '62', 'c2'));
Poke.addColor(makePaletteColor('24', '32', '5e'));
Poke.addColor(makePaletteColor('1b', '12', '21'));
Poke.addColor(makePaletteColor('00', '00', '00'));
addPalette(Poke);


import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import * as Commands from 'makecode-data-pipe-common/built/commands';
import { Palette, PaletteColor, rgb } from '../palette';
import * as Palettes from '../palettes';

declare var Seriously: any;

const CanvasWidth = 160;
const CanvasHeight = 120;

type OwnProps = {
	deviceId: string;
	label: string;
	active: boolean;
};

type Props = OwnProps & {
	appState: IAppState;
	dispatch: Function;
};

type State = {
	stream?: MediaStream;
	active?: boolean;
	palette: Palette;
	selectedPalette: string;
};

type ColorMap = { [key: number]: PaletteColor };


// Rec. 601 luma coefficients
// https://en.wikipedia.org/wiki/Luma_(video)
const RCOF = 0.299;
const GCOF = 0.587;
const BCOF = 0.114;

class Camera extends React.Component<Props, State> {
	videoRef: HTMLVideoElement;
	canvasRef: HTMLCanvasElement;
	canvasContext: WebGLRenderingContext;
	colorCubeImageRef: HTMLImageElement;
	videoFrameTimer: any;
	colorMap: ColorMap;

	constructor(props: Props) {
		super(props);
		this.colorMap = {};
		this.state = {
			palette: Palettes.getPalette("Default"),
			selectedPalette: "Default"
		};
	}

	componentDidMount() {
		const seriously = new Seriously({
			width: CanvasWidth,
			height: CanvasHeight
		});
		let source = seriously.source(this.videoRef);
		const colorcube = seriously.effect("colorcube");
		colorcube.source = source;
		source = colorcube;
		colorcube.cube = this.colorCubeImageRef;
		const target = seriously.target(this.canvasRef);
		target.source = source;
		seriously.go();
	}

	setVideoRef(ref: HTMLVideoElement) {
		this.videoRef = ref;
	}

	setCanvasRef(ref: HTMLCanvasElement) {
		this.canvasRef = ref;
		this.canvasContext = ref ? ref.getContext('webgl', { preserveDrawingBuffer: true }) : null;
	}

	onFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {

	}

	onPaletteChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const paletteName = event.target.value;
		const palette = Palettes.getPalette(paletteName);
		if (palette) {
			this.setState({
				palette,
				selectedPalette: event.target.value
			});
		}
	}

	render() {
		return (
			<div className="Camera">
				<div key={1}>{this.props.label}</div>
				<div key={2}>{`${this.props.deviceId.substr(0, 5)}...`}</div>
				<button className="Button" onClick={() => this.toggleVideo()}>{this.state.active ? "Stop" : "Start"}</button>
				<div key={3}><video className="SourceVideo" width={CanvasWidth} height={CanvasHeight} ref={ref => this.setVideoRef(ref)}></video></div>
				<div key={4}><canvas className="SourceCanvas" width={CanvasWidth} height={CanvasHeight} ref={ref => this.setCanvasRef(ref)}></canvas></div>
				<img className="ColorCubeImage" alt="" src={this.state.palette.cube} ref={ref => this.colorCubeImageRef = ref} />
				<span>Palette</span>
				<select value={this.state.selectedPalette} onChange={(evt) => this.onPaletteChange(evt)}>
					{Palettes.getPaletteNames().map(name => {
						return (
							<option value={name}>{name}</option>
						)
					})}
				</select>
				<br />
			</div>
		);
	}

	toggleVideo() {
		if (this.state.active) {
			if (this.videoRef.srcObject) {
				clearInterval(this.videoFrameTimer);
				delete this.videoFrameTimer;
				const stream = (this.videoRef.srcObject as MediaStream);
				stream.getTracks().forEach(track => track.stop());
				this.videoRef.srcObject = null;
			}
			this.setState({
				...this.state,
				active: false
			});
		} else {
			const constraints = {
				audio: false,
				video: {
					aspectRatio: 4 / 3,
					deviceId: this.props.deviceId,
					width: { ideal: CanvasWidth },
					height: { ideal: CanvasHeight }
				}
			};
			navigator.mediaDevices.getUserMedia(constraints)
				.then(stream => {
					this.videoRef.srcObject = stream;
					this.videoRef.play();
					this.setState({
						...this.state,
						active: true
					});
					this.videoFrameTimer = setInterval(() => this.sendVideoFrame(), 1000 / 30);
				})
				.catch(e => console.log(e));
		}
	}

	sendVideoFrame() {
		if (this.canvasContext) {
			const pixels: number[] = [];
			pixels.length = CanvasWidth * CanvasHeight;
			const buffer = new Uint8Array(CanvasWidth * CanvasHeight * 4);
			this.canvasContext.readPixels(0, 0, CanvasWidth, CanvasHeight, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, buffer);
			for (let index = 0, y = 0; y < CanvasHeight; ++y) {
				const row = CanvasHeight - y - 1;
				for (let x = 0; x < CanvasWidth; ++x, ++index) {
					const col = x;
					const iPixel = row * CanvasWidth + col;
					const iBuf = index * 4;
					const r = buffer[iBuf + 0];
					const g = buffer[iBuf + 1];
					const b = buffer[iBuf + 2];
					const a = buffer[iBuf + 3];
					if (a !== 0xff) {
						pixels[iPixel] = 0;
					} else {
						// We should not need a color map here, but something in the
						// webgl + html5 cubemap filter chain is interpolating between
						// pixel colors. I suspect it is scaling the resolution somewhere.
						// Needs investigation. This should all work on the GPU.
						const color = rgb(r, g, b);
						if (this.state.palette.dict[color]) {
							pixels[iPixel] = this.state.palette.dict[color].idx;
						} else if (this.colorMap[color]) {
							pixels[iPixel] = this.colorMap[color].idx;
						} else {
							pixels[iPixel] = this.updateColorMap(r, g, b);
						}
					}
				}
			}
			chrome.runtime.sendMessage(Commands.videoFrame(
				this.props.deviceId,
				this.props.label,
				CanvasWidth,
				CanvasHeight,
				pixels,
				this.state.palette.arr,
				this.state.palette.name));
		}
	}

	// Using HSP color space
	// http://alienryderflex.com/hsp.html

	updateColorMap(r: number, g: number, b: number): number {
		// If a pixel color doesn't exist in the palette, find the nearest
		// matching color using the same algorithm used for generating the
		// cubemap. See `/scripts/imagemagick/README.md` for more info on
		// how that works.
		let min = Number.MAX_SAFE_INTEGER;
		let k: PaletteColor;
		this.state.palette.colors.forEach(color => {
			const rdiff = color.r - r;
			const gdiff = color.g - g;
			const bdiff = color.b - b;
			const hsp = RCOF * rdiff * rdiff + GCOF * gdiff * gdiff + BCOF * bdiff * bdiff;
			if (hsp < min) {
				min = hsp;
				k = color;
			}
		});
		if (k) {
			const c = rgb(r, g, b);
			this.colorMap[c] = k;
			return k.idx;
		}
		return 0;
	}
}

const mapStateToProps = (appState: IAppState, ownProps: OwnProps): Partial<Props> => {
	return {
		appState,
		...ownProps
	};
}

const mapDispatchToProps = (dispatch: Function): Partial<Props> => {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);

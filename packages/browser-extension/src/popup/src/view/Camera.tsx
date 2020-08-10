import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import * as Commands from 'makecode-data-pipe-common/built/commands';

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
}

class Camera extends React.Component<Props, State> {
	videoRef: HTMLVideoElement;
	canvasRef: HTMLCanvasElement;
	colorCubeImageRef: HTMLImageElement;
	videoFrameTimer: any;

	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const seriously = new Seriously();
		let source = seriously.source(this.videoRef);
		//const pixelate = seriously.effect("pixelate");
		const colorcube = seriously.effect("colorcube");
		//pixelate.source = source;
		//source = pixelate;
		colorcube.source = source;
		source = colorcube;
		colorcube.cube = this.colorCubeImageRef;
		const target = seriously.target(this.canvasRef);
		target.source = source;
		seriously.go();
	}

	render() {
		return (
			<div className="Camera">
				<div key={1}>{this.props.label}</div>
				<div key={2}>{`${this.props.deviceId.substr(0, 5)}...`}</div>
				<div key={3}><video className="SourceVideo" width={CanvasWidth} height={CanvasHeight} ref={ref => this.videoRef = ref}></video></div>
				<div key={4}><canvas className="SourceCanvas" width={CanvasWidth} height={CanvasHeight} ref={ref => this.canvasRef = ref}></canvas></div>
				<img className="ColorCubeImage" alt="" src="./adjustments/posterize-4-lab.png" ref={ref => this.colorCubeImageRef = ref} />
				<button className="Button" onClick={() => this.toggleVideo()}>{this.state.active ? "Stop" : "Start"}</button>
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
					this.videoFrameTimer = setInterval(() => this.sendVideoFrame(), 500);
				})
				.catch(e => console.log(e));
		}
	}

	sendVideoFrame() {
		const frame = '';
		chrome.runtime.sendMessage(Commands.videoFrame(this.props.deviceId, frame));
	}
}

const mapStateToProps = (appState: IAppState, props: OwnProps): Partial<Props> => {
	return {
		appState,
		...props
	};
}

const mapDispatchToProps = (dispatch: Function): Partial<Props> => {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import * as CameraActions from 'makecode-data-pipe-common/built/actions/camera';
import MainPanel from './MainPanel';
import '../style.scss';

type Props = {
	appState: IAppState;
	dispatch: Function;
};

class App extends React.Component<Props> {
	constructor(props: Readonly<Props>) {
		super(props);
		navigator.mediaDevices.getUserMedia({ audio: false, video: true })
			.then((stream) => {
				stream.getTracks().forEach(track => track.stop());
				navigator.mediaDevices.enumerateDevices()
					.then(devices => {
						const cameras = devices.filter(device => device.kind === "videoinput").map(device => {
							const match = device.label.match(/([^(]*)/);
							const label = match[1].trim();
							return {
								deviceId: device.deviceId,
								label
							}
						});
						props.dispatch(CameraActions.registerCameras(cameras));
					});
			});
	}
	render() {
		return (
			<MainPanel />
		);
	}
}

const mapStateToProps = (appState: IAppState): Partial<Props> => {
	return {
		appState
	};
}

const mapDispatchToProps = (dispatch: Function): Partial<Props> => {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
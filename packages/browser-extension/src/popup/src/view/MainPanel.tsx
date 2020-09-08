import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import Break from './Break';
import Tabs from './Tabs';
import Cameras from './Cameras';

type Props = {
	appState: IAppState;
	dispatch: Function;
};

class MainPanel extends React.Component<Props> {
	render() {
		return (
			<div className="MainPanel" >
				<div className="center">
					MakeCode Data Pipe
				</div>
				<Break height={10} />
				<div className="SectionTitle">Cameras</div>
				<Cameras />
				<Break height={10} />
				<div className="SectionTitle">Tabs</div>
				<Tabs />
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
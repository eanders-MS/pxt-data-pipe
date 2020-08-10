import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import Camera from './Camera';

type Props = {
    appState: IAppState;
    dispatch: Function;
};

class Cameras extends React.Component<Props> {
    render() {
        return (
            <div className="Cameras">
                {this.props.appState.cameras.map((camera, index) => <Camera key={index} {...camera} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cameras);
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import TabCamera from './TabCamera';
import '../style.scss';

type OwnProps = {
    tabId: number;
    title: string;
};

type Props = OwnProps & {
    appState: IAppState;
    dispatch: Function;
};

class Tab extends React.Component<Props> {
    render() {
        return (
            <>
                <div>{this.props.title}</div>
                {
                    this.props.appState.cameras.map((camera, index) => {
                        return (
                            <div key={index}>
                                <TabCamera tabId={this.props.tabId} deviceId={camera.deviceId} />
                                <br />
                            </div>);
                    })
                }
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
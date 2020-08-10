import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model';
import * as TabActions from 'makecode-data-pipe-common/built/actions/tab';
import '../style.scss';

type OwnProps = {
    tabId: number;
    deviceId: string;
};

type Props = OwnProps & {
    active: boolean;
    appState: IAppState;
    dispatch: Function;
};

class TabCamera extends React.Component<Props> {
    render() {
        const camera = this.props.appState.cameras.find(item => item.deviceId === this.props.deviceId);
        return (
            <>
                <input type="checkbox" checked={this.props.active} onChange={() => this.onChange()} />
                <label>{camera.label}</label>
            </>
        )
    }

    onChange() {
        const active = !this.props.active;
        this.props.dispatch(TabActions.enableCamera(this.props.tabId, this.props.deviceId, active));
    }
}

const mapStateToProps = (appState: IAppState, props: OwnProps): Partial<Props> => {
    const tab = appState.tabs.find(item => item.tabId === props.tabId);
    return {
        appState,
        active: tab.cameras.includes(props.deviceId),
        ...props
    };
}

const mapDispatchToProps = (dispatch: Function): Partial<Props> => {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabCamera);
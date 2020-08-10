import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'makecode-data-pipe-common/built/model/index';
import Tab from './Tab';

type Props = {
    appState: IAppState;
    dispatch: Function;
};

class Tabs extends React.Component<Props> {
    render() {
        return (
            <div className="Tabs">
                {this.props.appState.tabs.map((tab, index) => <Tab key={index} {...tab} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import apiWorker from './services/api';
// import { MyToast } from './containers/index';
import AppNavigator from './navigation/index';
import {Auth} from '../App';

class Router extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (!prevState.initialized) {
      const {token} = nextProps;
      if (token) {
        apiWorker.init({
          token,
        });
      }

      newState.initialized = true;
    }

    return Object.keys(newState).length ? newState : null;
  }

  componentDidMount() {
    Auth().onAuthStateChanged(info => {
      this.props.getInfoUser(info);
    });
    this.fetchCommonData();
  }

  fetchCommonData() {}

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <MyToast /> */}
        <AppNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // userInfo: state && state.user && state.user.user,
  // token: state && state.user && state.user.token,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {actions: UserActions} = require('./redux/UserRedux');

  const {token} = stateProps;
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getInfoUser: payload => {
      dispatch(UserActions.getInfoUser(payload));
    },
    // findAndSetReferral: () => dispatch(UserActions.findAndSetReferral()),
    // getFirebaseRegistrationToken: () => UserActions.getFirebaseRegistrationToken(dispatch),
    // registerFirebaseDevice: () => dispatch(UserActions.registerFirebaseDevice()),
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Router);

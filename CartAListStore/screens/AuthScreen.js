import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import AuthScreenView from '../components/AuthScreenView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class AuthScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AuthScreenView navigation={navigation} />
      </Provider>
    );
  }
}

export default AuthScreen;

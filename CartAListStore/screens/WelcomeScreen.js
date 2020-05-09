import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import WelcomeScreenView from '../components/WelcomeScreenView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class WelcomeScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <WelcomeScreenView navigation={navigation} />
      </Provider>
    );
  }
}

export default WelcomeScreen;

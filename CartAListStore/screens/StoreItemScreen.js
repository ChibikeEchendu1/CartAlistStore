import React, {Component} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import StoreItemScreenViewA from '../components/StoreItemScreenViewA';
import StoreItemScreenView from '../components/StoreItemScreenView';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class StoreItemScreen extends Component {
  render() {
    const {navigation} = this.props;

    const {route} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        {Platform.OS === 'ios' ? (
          <StoreItemScreenViewA route={route} navigation={navigation} />
        ) : (
          <StoreItemScreenView route={route} navigation={navigation} />
        )}
      </Provider>
    );
  }
}

export default StoreItemScreen;

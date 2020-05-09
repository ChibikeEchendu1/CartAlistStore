import React, {Component} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import AddItemScreenViewA from '../components/AddItemScreenViewA';
import AddItemScreenView from '../components/AddItemScreenView';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class AddItemScreen extends Component {
  render() {
    const {navigation} = this.props;

    const {route} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        {Platform.OS === 'ios' ? (
          <AddItemScreenViewA route={route} navigation={navigation} />
        ) : (
          <AddItemScreenView route={route} navigation={navigation} />
        )}
      </Provider>
    );
  }
}

export default AddItemScreen;

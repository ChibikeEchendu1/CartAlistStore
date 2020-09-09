import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import StoreItemScreenNBCView from '../components/StoreItemScreenNBCView';

import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class StoreItemScreenNBC extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <StoreItemScreenNBCView navigation={navigation} />
      </Provider>
    );
  }
}

export default StoreItemScreenNBC;

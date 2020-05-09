import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class BossHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Text>BossHome</Text>
      </Provider>
    );
  }
}

export default BossHome;

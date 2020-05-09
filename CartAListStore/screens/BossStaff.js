import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import BossStaffView from '../components/BossStaffView';

import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class BossStaff extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <BossStaffView navigation={navigation} />
      </Provider>
    );
  }
}

export default BossStaff;

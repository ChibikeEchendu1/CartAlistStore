import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import AddItemScreenNBCView from '../components/AddItemScreenNBCView';

import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class AddItemScreenNBC extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AddItemScreenNBCView navigation={navigation} />
      </Provider>
    );
  }
}

export default AddItemScreenNBC;

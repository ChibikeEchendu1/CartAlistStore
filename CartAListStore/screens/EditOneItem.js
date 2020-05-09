import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import EditOneItem from '../components/EditOneItem';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class ConfirmItemsScreen extends Component {
  render() {
    const {navigation} = this.props;
    const {route} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <EditOneItem route={route} navigation={navigation} />
      </Provider>
    );
  }
}

export default ConfirmItemsScreen;

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import ViewItem from '../components/ViewItem';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class ViewItemScreen extends Component {
  render() {
    const {navigation} = this.props;
    const {route} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ViewItem route={route} navigation={navigation} />
      </Provider>
    );
  }
}

export default ViewItemScreen;

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import ViewItemNCB from '../components/ViewItemNCB';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class ViewItemScreenNCB extends Component {
  render() {
    const {navigation} = this.props;
    const {route} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ViewItemNCB route={route} navigation={navigation} />
      </Provider>
    );
  }
}

export default ViewItemScreenNCB;

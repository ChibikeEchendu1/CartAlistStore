import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import _ from 'lodash';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import FindPosition from '../utils/FindPosition';

const barWidth = Dimensions.get('screen').width - 40;

class OptionBox extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          borderWidth: 0.4,
          padding: 4,
          width: '45%',
          backgroundColor: this.props.color,
          borderRadius: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginLeft: 7}}>
            <Text>{this.props.Option}</Text>
          </View>
          <Icon
            name={this.props.icon}
            color={VARIABLES.lightGray}
            size={24}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{marginLeft: 7, marginTop: 7}}>
          <Text>{this.props.descrtiption}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.9,
    //borderWidth:5,
    position: 'absolute',
    //flex:1,
    //marginBottom:20,
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: '15%',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
  };
};

export default connect(mapStateToProps)(OptionBox);

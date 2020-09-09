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

class ItemListNobcStore extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  componentDidMount() {
    console.log(this.props.item);
  }

  render() {
    return (
      <Card
        title={
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('View Item', {
                item: this.props.item,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>
              Name: {this.props.item.Name} {'\n'}Code:
              {this.props.item.SearchCode}
            </Text>
            <Icon
              name="chevron-right"
              color={VARIABLES.lightGray}
              size={24}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        }>
        <View
          style={{
            marginTop: 5,
            marginLeft: 7,
            borderBottomWidth: 0.4,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'row',
          }}></View>
      </Card>
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

export default connect(mapStateToProps)(ItemListNobcStore);

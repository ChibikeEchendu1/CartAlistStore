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

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <Card title={'Barcode: ' + this.props.item.Code}>
        <View
          style={{
            marginTop: 5,
            flex: 1,
            marginLeft: 7,
            borderBottomWidth: 0.4,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('EditOneItem', {
                item: this.props.item,
                items: this.props.items,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',

              width: '80%',
            }}>
            <View style={{marginLeft: 14}}>
              <Text>Quantity: {this.props.item.Quantity}</Text>
              <Text>Price: {this.props.item.Price}</Text>
            </View>
          </TouchableOpacity>
          <Icon
            name="chevron-right"
            color={VARIABLES.lightGray}
            size={24}
            style={{alignSelf: 'center'}}
          />
        </View>
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

export default connect(mapStateToProps)(ItemList);

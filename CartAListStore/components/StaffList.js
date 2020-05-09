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

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <Card title={this.props.item.Name}>
        <View
          style={{
            // marginTop: 25,
            flex: 1,
            marginLeft: 7,
            borderBottomWidth: 0.4,
            paddingBottom: 8,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('nave');

              this.props.navigation.navigate('MarketerHome', {
                Prospect: this.props.item,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',

              width: '100%',
            }}>
            {this.props.item.ImagePath ? (
              <Image
                resizeMode="cover"
                style={{
                  width: Normalize(50),
                  height: Normalize(50),
                  borderRadius: Normalize(25),
                }}
                source={{
                  uri: VARIABLES.IP + '/' + this.props.item.ImagePath,
                }}
              />
            ) : (
              <Icon
                name="user-circle"
                color={VARIABLES.lightGray}
                size={Normalize(50)}
                style={{alignSelf: 'center'}}
              />
            )}
            <View style={{marginLeft: 14}}>
              <Text>{FindPosition(this.props.item.Type)}</Text>
              <Text>{this.props.item.StoreName}</Text>
              <Text>{this.props.item.Code}</Text>
            </View>
          </TouchableOpacity>
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

export default connect(mapStateToProps)(StaffList);

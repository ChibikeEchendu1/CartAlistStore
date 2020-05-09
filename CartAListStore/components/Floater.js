import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';

const Floater = props => {
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => props.navigation.navigate('Addprofile', {Id: props.Id})}>
        <Icon
          name="plus-circle"
          color={'white'}
          size={30}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.8,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    width: 50,
    height: 50,
    backgroundColor: VARIABLES.Color,
  },
});

export {Floater};

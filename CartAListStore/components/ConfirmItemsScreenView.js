import React, {Component} from 'react';
import {
  View,
  Image,
  Animated,
  AsyncStorage,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import {Floater} from './Floater';
import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  AddStaffBoss,
  AddFullList,
} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import ItemList from './ItemList';
import {connect} from 'react-redux';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import {VARIABLES} from '../utils/Variables';
import RNPickerSelect from 'react-native-picker-select';

const SCREENWIDTH = Dimensions.get('window').width;
const placeholder = {
  label: 'Select a Position...',
  value: null,
  color: '#9EA0A4',
};
class ConfirmItemsScreenView extends Component {
  state = {
    visible: false,
    value: 0,
    isLoading: false,
    search: '',
    items: this.props.route.params.items,
  };

  onNameC(text) {
    this.setState({search: text});
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  Done() {
    if (this.props.Done) {
      this.props.navigation.navigate('Add-Item', {Clear: true});
    }
  }

  renderList() {
    return (
      <FlatList
        data={this.state.items.filter(items => {
          return (
            items.Code.toLowerCase().indexOf(
              this.state.search.toLowerCase(),
            ) !== -1
          );
        })}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderRow(item) {
    return (
      <ItemList
        navigation={this.props.navigation}
        items={this.state.items}
        item={item}
      />
    );
  }
  rednderAdd() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={styles.tab}
          color={VARIABLES.Color}
          size={'large'}
        />
      );
    }
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Done"
        type="outline"
        raised
        containerStyle={{
          marginTop: 5,
          alignSelf: 'flex-end',
          marginRight: 20,
          width: '40%',
        }}
        titleStyle={{color: 'white', marginRight: 10}}
        buttonStyle={{
          backgroundColor: VARIABLES.Color,
          borderColor: VARIABLES.Color,
          width: '100%',
        }}
        icon={<Icon name="check-circle" size={20} color="white" />}
        iconRight
      />
    );
  }

  onButtonPress() {
    //this.setState({Error: ''});
    this.props.AddFullList(this.state.items);
  }

  renderButton() {
    return (
      <View>
        <Input
          placeholder="...Search By Code"
          leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
          containerStyle={{width: '90%', marginTop: 15, alignSelf: 'center'}}
          value={this.props.name}
          onChangeText={this.onNameC.bind(this)}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          inputStyle={{marginLeft: 5}}
          errorMessage={this.props.NameError}
          inputContainerStyle={{width: '100%'}}
        />
        <View style={{height: '80%'}}>{this.renderList()}</View>
        {this.Done()}
        {this.rednderAdd()}
      </View>
    );
  }

  render() {
    return [this.renderButton()];
  }
}

const mapStateToProps = state => {
  return {
    logedin: state.auth.logedin,
    Code: state.auth.Code,
    Boss: state.auth.Boss,
    Loader: state.auth.Loader,
    staff: state.auth.staff,
    Done: state.auth.Done,
  };
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '90%',
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.8,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Platform.OS == 'ios' ? 25 : 50,
    flexDirection: 'row',
    width: 50,
    height: 50,
    backgroundColor: VARIABLES.Color,
  },
});

export default connect(
  mapStateToProps,
  {
    emailChanged,
    PasswordChanged,
    NameChanged,
    AddStaffBoss,
    AddFullList,
  },
)(ConfirmItemsScreenView);

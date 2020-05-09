/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import _ from 'lodash';
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  PasswordChanged,
  AddProspect,
} from '../actions';
import {connect} from 'react-redux';

const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
class EditOneItemNBCView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      item: this.props.route.params.item,
      items: this.props.route.params.items,
      checked: this.props.route.params.item.Code,
    };
  }

  onEmailC(text) {
    this.props.NameChanged(text);
  }

  Login() {
    if (this.props.logedin) {
      this.props.navigation.navigate('Main');
    }
  }

  onPasswordC(text) {
    this.props.AddressChanged(text);
  }

  onnameC(text) {
    this.props.PasswordChanged(text);
  }

  onTypeC(text) {
    this.props.TypeChanged(text);
  }

  onSummeryC(text) {
    this.props.emailChanged(text);
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('Searchprospect');
      this.props.navigation.navigate('ProfileScreen');
    }
  }

  onButtonPress() {
    const {password, name} = this.props;

    if (password == '' || name == '') {
      this.setState({Error: 'Enter All Feilds'});
    } else {
      this.setState({Error: ''});
      var newItems = this.state.items;

      // Find item index using _.findIndex (thanks @AJ Richardson for comment)
      var index = _.findIndex(newItems, {Name: this.state.item.Name});

      newItems.splice(index, 1, {
        Code: this.state.checked,
        Name: name,
        Price: password,
      });

      console.log(newItems);

      this.props.navigation.navigate('Add-ItemNBC', {
        items: newItems.reverse(),
      });
    }
  }

  renderButton() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    } else {
      return (
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Edit"
          type="outline"
          raised
          containerStyle={{
            marginTop: 20,
            alignSelf: 'flex-end',
            marginRight: 20,
            width: '50%',
          }}
          titleStyle={{color: 'white', marginRight: 10}}
          buttonStyle={{
            backgroundColor: VARIABLES.anotherGreen,
            borderColor: VARIABLES.anotherGreen,
            width: '100%',
          }}
          icon={<Icon name="check-circle" size={20} color="white" />}
          iconRight
        />
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 15,
            justifyContent: 'center',
          }}>
          <Card>
            <Text style={{fontWeight: 'bold'}}>
              Is the item prciced by weight or quantity{' '}
            </Text>
            <CheckBox
              title="Price/Weight(1kg)"
              onPress={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
              checked={this.state.checked}
            />

            <CheckBox
              title="Price/Quantity"
              onPress={() =>
                this.setState({
                  checked: !this.state.checked,
                })
              }
              checked={!this.state.checked}
            />
          </Card>
          <Card>
            <Text style={{fontWeight: 'bold'}}>Name and Price</Text>

            <Input
              placeholder={this.state.item.Name}
              value={this.props.name}
              onChangeText={this.onEmailC.bind(this)}
              inputStyle={{}}
              keyboardType="number-pad"
              errorStyle={{color: 'red'}}
              errorMessage={this.props.EmailError}
              inputContainerStyle={{width: '90%', alignSelf: 'center'}}
            />
            <Input
              placeholder={this.state.item.Price}
              value={this.props.password}
              onChangeText={this.onnameC.bind(this)}
              inputStyle={{}}
              keyboardType="number-pad"
              errorStyle={{color: 'red'}}
              errorMessage={this.props.EmailError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
              }}
            />
          </Card>
          <Text style={{color: 'red', alignSelf: 'center'}}>
            {this.state.Error} {this.props.PasswordError}
          </Text>

          {this.renderButton()}

          {this.added()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

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

const mapStateToProps = state => {
  return {
    name: state.auth.Name,
    tot: state.auth.tot,
    type: state.auth.type,
    email: state.auth.email,
    Added: state.auth.Added,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedin: state.auth.logedin,
    password: state.auth.password,
  };
};

export default connect(
  mapStateToProps,
  {
    NameChanged,
    AddressChanged,
    TypeChanged,
    emailChanged,
    PasswordChanged,
    AddProspect,
  },
)(EditOneItemNBCView);

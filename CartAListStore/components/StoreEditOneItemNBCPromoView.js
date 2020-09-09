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
import {Input, Button, Card, CheckBox, normalize} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  PasswordChanged,
  AddProspect,
  setPromoNBC,
} from '../actions';
import {connect} from 'react-redux';

const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
class StoreEditOneItemNBCView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      item: this.props.route.params.item,
      items: this.props.route.params.items,
      checked: this.props.route.params.item.Code,
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      Date: '',
      Error2: '',
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
      this.props.navigation.navigate('Add-ItemNBC');
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

  hideDatePicker() {
    this.setState({setDatePickerVisibility: false});
  }

  renderButton() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    } else {
      return (
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Change"
          type="outline"
          raised
          containerStyle={{
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
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: normalize(15),
                marginLeft: 20,
              }}>
              Promo Price{' '}
            </Text>

            <Input
              placeholder={'Promo Price'}
              value={this.props.email}
              onChangeText={this.onSummeryC.bind(this)}
              inputStyle={{}}
              keyboardType="number-pad"
              errorStyle={{color: 'red'}}
              errorMessage={this.props.EmailError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
            />
            <Text style={{alignSelf: 'center'}}>{this.state.Date}</Text>
            <Text style={{color: 'red', alignSelf: 'center'}}>
              {this.state.Error2}
            </Text>
            <Button
              title="End Date"
              raised
              containerStyle={{
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
              icon={<Icon name="calendar" size={20} color="white" />}
              iconRight
              onPress={() => {
                this.setState({
                  setDatePickerVisibility: true,
                  isDatePickerVisible: true,
                });
              }}
            />

            {this.props.Loader ? (
              <ActivityIndicator
                style={{alignSelf: 'center'}}
                color={VARIABLES.Color}
                size={'large'}
              />
            ) : (
              <Button
                title="Done"
                raised
                containerStyle={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  width: '50%',
                  marginTop: 10,
                }}
                titleStyle={{color: 'white', marginRight: 10}}
                buttonStyle={{
                  backgroundColor: VARIABLES.Color,
                  borderColor: VARIABLES.Color,
                  width: '100%',
                }}
                icon={<Icon name="check" size={20} color="white" />}
                iconRight
                onPress={() => {
                  if (this.props.email == '') {
                    this.setState({
                      Error2: 'Enter Price',
                    });
                  } else if (this.state.Date == '') {
                    this.setState({
                      Error2: 'Select Ending Day',
                      setDatePickerVisibility: true,
                      isDatePickerVisible: true,
                    });
                  } else {
                    console.log(this.state.Date);
                    this.setState({
                      Error2: '',
                    });
                    this.props.setPromoNBC(
                      this.props.email,
                      this.state.Date,
                      this.state.item,
                    );
                  }
                  this.setState({});
                }}
              />
            )}
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                var year = date.getFullYear();

                var month = date.getMonth() + 1;
                month = (month < 10 ? '0' : '') + month;

                var day = date.getDate();
                day = (day < 10 ? '0' : '') + day;

                this.setState({
                  setDatePickerVisibility: false,
                  isDatePickerVisible: false,
                  Date: month + '/' + day + '/' + year,
                });
              }}
              onCancel={() => {
                this.setState({
                  setDatePickerVisibility: false,
                  isDatePickerVisible: false,
                });
              }}
            />
          </Card>
          <Card>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: normalize(15),
                marginLeft: 20,
              }}>
              Permanent Change
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
              placeholder={
                this.state.item.promoPrice
                  ? 'promo (' +
                    this.state.item.Price +
                    ') Original (' +
                    this.state.item.promoPrice +
                    ')'
                  : this.state.item.Price
              }
              value={this.props.password}
              onChangeText={this.onnameC.bind(this)}
              inputStyle={{}}
              keyboardType="number-pad"
              errorStyle={{color: 'red'}}
              errorMessage={this.props.EmailError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
            />
            <Text style={{color: 'red', alignSelf: 'center'}}>
              {this.state.Error} {this.props.PasswordError}
            </Text>
            {this.renderButton()}
          </Card>

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
    setPromoNBC,
  },
)(StoreEditOneItemNBCView);

/*
when you press sumbit. check if there is network. to add item you need to be connected to network.
*/

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
  Linking,
} from 'react-native';
import Variables, {VARIABLES} from '../utils/Variables';
import _ from 'lodash';
import {Input, Button, Card, CheckBox, normalize} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OptionBox from './OptionBox';
import Modal, {ModalContent, BottomModal} from 'react-native-modals';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  PasswordChanged,
  AddProspect,
  setPromoNBC,
  ChangeNBC,
  CodeChanged,
  Delete,
  sendEmailBC,
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
      checked: this.props.route.params.item.Code,
      isDatePickerVisible: false,
      visible: false,
      whileOne: 0,
      setDatePickerVisibility: false,
      Date: '',
      Error2: '',
      reordererroe: '',
      WhatsAppOrEmail: false,
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

  onCodeC(text) {
    this.props.CodeChanged(text);
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
    const {password, type} = this.props;

    this.setState({Error: '', visible: false});
    this.props.ChangeNBC(
      this.props.password,
      this.props.type,
      this.state.item,
      this.state.checked,
    );
  }

  onButtonPress2() {
    this.setState({Error: '', visible: false});
    this.props.Delete(this.state.item);
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
          titleStyle={{color: 'black', marginRight: 10}}
          buttonStyle={{
            backgroundColor: VARIABLES.blue,
            borderColor: VARIABLES.blue,
            width: '100%',
          }}
          icon={<Icon name="check-circle" size={20} color="black" />}
          iconRight
        />
      );
    }
  }
  renderDelete() {
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
          onPress={this.onButtonPress2.bind(this)}
          title="Delete"
          type="outline"
          raised
          containerStyle={{
            alignSelf: 'flex-end',
            marginRight: 20,
            width: '50%',
          }}
          titleStyle={{color: 'black', marginRight: 10}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
          icon={<Icon name="trash" size={20} color="black" />}
          iconRight
        />
      );
    }
  }

  validate = email => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  sendOnWhatsApp = async () => {
    if (
      !this.props.name.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    ) {
      this.setState({reordererroe: 'Phone Number must be 11 digits'});
    } else {
      let token = await AsyncStorage.getItem('loginStaff'); // alow for both manager and clearck
      var Store = JSON.parse(token);
      var StoreAddress = Store.StoreAddress;
      var StoreName = Store.StoreName;

      let msg = this.props.Code; // this.state.msg;
      let mobile = this.props.name;
      if (mobile) {
        if (msg) {
          this.props.sendTextBC(msg, mobile, this.state.item);
        } else {
          this.setState({reordererroe: 'Please insert message to send'});
        }
      } else {
        this.setState({reordererroe: 'Please insert mobile no'});
      }
    }
  };

  sendEmail = () => {
    let msg = this.props.Code; // this.state.msg;
    let email = this.props.name;
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (expression.test(String(email).toLowerCase())) {
      if (msg) {
        this.props.sendEmailBC(msg, email, this.state.item);
      } else {
        this.setState({reordererroe: 'Please insert message to send'});
      }
    } else {
      this.setState({reordererroe: 'Not An Email'});
    }
  };

  renderInfo() {
    if (this.state.WhatsAppOrEmail) {
      return (
        <Input
          placeholder={'Email'}
          value={this.props.name}
          onChangeText={this.onEmailC.bind(this)}
          inputStyle={{}}
          errorStyle={{color: 'red'}}
          errorMessage={this.props.EmailError}
          inputContainerStyle={{
            width: '100%',
          }}
        />
      );
    }
    return (
      <Input
        placeholder={'Phone Number'}
        value={this.props.name}
        onChangeText={this.onEmailC.bind(this)}
        inputStyle={{}}
        keyboardType="numbers-and-punctuation"
        errorStyle={{color: 'red'}}
        errorMessage={this.props.EmailError}
        inputContainerStyle={{
          width: '100%',
        }}
      />
    );
  }

  renderReorder() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    } else {
      if (this.state.WhatsAppOrEmail) {
        return (
          <Button
            onPress={this.sendOnWhatsApp} //email
            title="Reorder"
            type="outline"
            raised
            containerStyle={{
              alignSelf: 'flex-end',
              marginRight: 20,
              width: '50%',
            }}
            titleStyle={{color: 'black', marginRight: 10}}
            buttonStyle={{
              backgroundColor: VARIABLES.oragne,
              borderColor: VARIABLES.oragne,
              width: '100%',
            }}
            icon={<Icon name="history" size={20} color="black" />}
            iconRight
          />
        );
      }
      return (
        <Button
          onPress={this.sendOnWhatsApp}
          title="Reorder"
          type="outline"
          raised
          containerStyle={{
            alignSelf: 'flex-end',
            marginRight: 20,
            width: '50%',
          }}
          titleStyle={{color: 'black', marginRight: 10}}
          buttonStyle={{
            backgroundColor: VARIABLES.oragne,
            borderColor: VARIABLES.oragne,
            width: '100%',
          }}
          icon={<Icon name="history" size={20} color="black" />}
          iconRight
        />
      );
    }
  }

  renderWhichOne() {
    if (this.state.whileOne == 1) {
      return (
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
            placeholder={
              this.state.item.promoPrice
                ? 'promo (' +
                  this.state.item.Price +
                  ') Original (' +
                  this.state.item.promoPrice +
                  ')'
                : this.state.item.Price + ' (Price)'
            }
            value={this.props.password}
            onChangeText={this.onnameC.bind(this)}
            inputStyle={{}}
            keyboardType="number-pad"
            errorStyle={{color: 'red'}}
            errorMessage={this.props.EmailError}
            inputContainerStyle={{
              width: '90%',
              marginTop: 5,
              alignSelf: 'center',
            }}
          />

          <Input
            keyboardType="number-pad"
            placeholder={this.state.item.Quantity + ' (Quantity)'}
            value={this.props.type}
            onChangeText={this.onTypeC.bind(this)}
            inputStyle={{}}
            errorStyle={{color: 'red'}}
            errorMessage={this.props.EmailError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 6,
            }}
          />
          <Text style={{color: 'red', alignSelf: 'center'}}>
            {this.state.Error} {this.props.PasswordError}
          </Text>
          {this.renderButton()}
        </Card>
      );
    } else if (this.state.whileOne == 2) {
      return (
        <Card>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: normalize(15),
              marginLeft: 20,
            }}>
            Add Promo Price{' '}
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
            titleStyle={{color: 'black', marginRight: 10}}
            buttonStyle={{
              backgroundColor: VARIABLES.anotherGreen,
              borderColor: VARIABLES.anotherGreen,
              width: '100%',
            }}
            icon={<Icon name="calendar" size={20} color="black" />}
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
              titleStyle={{color: 'black', marginRight: 10}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
              icon={<Icon name="check" size={20} color="black" />}
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
                this.setState({visible: false});
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
      );
    } else if (this.state.whileOne == 3) {
      return (
        <Card>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: normalize(15),
            }}>
            Reorder This Item{' '}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              title="Email"
              onPress={() =>
                this.setState({
                  WhatsAppOrEmail: !this.state.WhatsAppOrEmail,
                })
              }
              containerStyle={{
                width: '48%',
                backgroundColor: '#A0A9B7',
              }}
              checkedColor="black"
              checked={this.state.WhatsAppOrEmail}
            />
            <CheckBox
              title="Text"
              onPress={() =>
                this.setState({
                  WhatsAppOrEmail: !this.state.WhatsAppOrEmail,
                })
              }
              containerStyle={{
                width: '48%',
                backgroundColor: VARIABLES.anotherGreen,
              }}
              checkedColor="black"
              checked={!this.state.WhatsAppOrEmail}
            />
          </View>
          <View style={{marginBottom: 10}}>{this.renderInfo()}</View>
          <TextInput
            style={{
              textAlignVertical: 'top',
              height: 100,
              marginTop: 10,
              marginBottom: 10,
              width: '100%',
              alignSelf: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder={'Enter message here include quantity'}
            multiline={true}
            numberOfLines={20}
            onChangeText={this.onCodeC.bind(this)}
            value={this.props.Code}
          />
          <Text style={{color: 'red', alignSelf: 'center'}}>
            {this.state.reordererroe}
          </Text>
          {this.renderReorder()}
        </Card>
      );
    } else if (this.state.whileOne == 4) {
      return <Card>{this.renderDelete()}</Card>;
    }
  }

  hideDatePicker() {
    this.setState({setDatePickerVisibility: false});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 5,
            justifyContent: 'flex-start',
          }}>
          <Card>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: normalize(15),
                }}>
                Details{' '}
              </Text>

              <Text>Name:{this.state.item.Name}</Text>
              <Text>
                Price:
                {this.state.item.promoPrice
                  ? 'promo (' +
                    this.state.item.Price +
                    ') Original (' +
                    this.state.item.promoPrice +
                    ')'
                  : this.state.item.Price}
              </Text>
              <Text>Quantity:{this.state.item.Quantity}</Text>
            </View>
          </Card>
          <Card>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: normalize(15),
                marginLeft: 20,
              }}>
              Options
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <OptionBox
                item={this.state.item}
                onPress={() => {
                  this.setState({visible: true, whileOne: 1});
                }}
                navigation={this.props.navigation}
                Option={'Edit'}
                icon={'edit'}
                color={VARIABLES.blue}
                descrtiption={'Edit the Item  \nChange Name, Price'}
              />
              <OptionBox
                item={this.state.item}
                onPress={() => {
                  this.setState({visible: true, whileOne: 2});
                }}
                navigation={this.props.navigation}
                Option={'Promo'}
                icon={'tags'}
                color={VARIABLES.anotherGreen}
                descrtiption={'Set Promo Price  \nAdd End Date'}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
              }}>
              <OptionBox
                item={this.state.item}
                onPress={() => {
                  this.setState({visible: true, whileOne: 3});
                }}
                navigation={this.props.navigation}
                Option={'Reorder'}
                icon={'history'}
                color={VARIABLES.oragne}
                descrtiption={'Set Reorder Quantity \nAdd Contacts'}
              />
              <OptionBox
                item={this.state.item}
                onPress={() => {
                  this.setState({visible: true, whileOne: 4});
                }}
                navigation={this.props.navigation}
                Option={'Delete'}
                icon={'trash'}
                color={'red'}
                descrtiption={'Delete The Item\nRemove'}
              />
            </View>
          </Card>

          {this.added()}
          <BottomModal
            visible={this.state.visible}
            swipeDirection={['up', 'down']} // can be string or an array
            swipeThreshold={200} // default 100
            onSwipeOut={event => {
              this.setState({visible: false});
            }}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}>
            <ModalContent>
              <TouchableOpacity onPress={Keyboard.dismiss}>
                {this.renderWhichOne()}
              </TouchableOpacity>
            </ModalContent>
          </BottomModal>
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
    Code: state.auth.Code,
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
    ChangeNBC,
    CodeChanged,
    Delete,
    sendEmailBC,
  },
)(StoreEditOneItemNBCView);

/*
when you press sumbit. check if there is network. to add item you need to be connected to network.
*/

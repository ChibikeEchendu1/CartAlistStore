import React, {Component} from 'react';
import {
  View,
  Image,
  Animated,
  AsyncStorage,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {logincheck} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, CheckBox, Card, normalize} from 'react-native-elements';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import FindState from '../utils/FindState';
import FindStateNoBc from '../utils/FindStateNoBc';
import ItemListNobc from './ItemListNobc';
import FindStateAddNoBC from '../utils/FindStateAddNoBC';
import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  AddItemNoBarCode,
  ClearItemStore,
  SignUpUser,
  CodeChanged,
  addNoBCItems,
} from '../actions';
class AddItemScreenNBCView extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.ItemNames = [];

    this.state = {
      barcodeCodesFound: [],
      found: false,
      error: '',
      flash: false,
      Current: '',
      fadeAnim: new Animated.Value(0),
      splash: '',
      move: '',
      isLoading: false,
      checked: true,
      items: this.props.route ? this.props.route.params.items : [],
    };
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }

  onQuantityC(text) {
    this.props.emailChanged(text);
  }

  move() {
    if (this.props.new) {
      this.props.navigation.navigate('AuthScreen');
    }
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onAddPress() {
    this.setState({Current: '', found: false, error: ''});
    if (FindStateAddNoBC(this.props.Code, this.props.Name, this.props.email)) {
      this.setState({
        items: [
          ...this.state.items,
          {
            Code: this.state.checked,
            Name: this.props.Name,
            Price: this.props.Code,
            Quantity: this.props.email,
          },
        ],
      });
      this.props.AddItemNoBarCode(false, false, false);
    } else {
      this.setState({error: 'Fill In all the Options'});
    }
  }

  onSlideCompleteSign = () => {
    this.props.navigation.navigate('SignUpScreen');
  };
  /*   */

  renderList() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{
            marginTop: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    }
    return (
      <FlatList
        style={{flexGrow: 1}}
        data={this.props.itemsNoBC.reverse()}
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
      <ItemListNobc
        navigation={this.props.navigation}
        items={this.state.items}
        item={item}
      />
    );
  }

  renderInput() {
    if (this.state.checked) {
      return (
        <Input
          placeholder="Price/Weight "
          onChangeText={this.onCodeC.bind(this)}
          value={this.props.Code}
          inputStyle={{
            marginLeft: 7,
            color: 'black',
          }}
          placeholderTextColor="#000"
          keyboardType="number-pad"
          errorStyle={{color: 'red'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '100%',
            borderWidth: 0.3,
          }}
        />
      );
    }
    return (
      <Input
        placeholder="Price/Quantity"
        onChangeText={this.onCodeC.bind(this)}
        value={this.props.Code}
        inputStyle={{
          marginLeft: 7,
          color: 'black',
        }}
        placeholderTextColor="#000"
        keyboardType="number-pad"
        errorStyle={{color: 'red'}}
        errorMessage={this.props.CodeError}
        inputContainerStyle={{
          width: '100%',
          borderWidth: 0.3,
        }}
      />
    );
  }
  render() {
    return (
      <SafeAreaView>
        <View>
          <Card>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                By Weight or Quantity{' '}
              </Text>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Barcode');
                }}
                title=""
                type="outline"
                raised
                containerStyle={{
                  alignSelf: 'center',
                  marginLeft: 20,
                  marginRight: '5%',
                  width: '15%',
                }}
                titleStyle={{color: 'white', marginLeft: 10}}
                buttonStyle={{
                  backgroundColor: 'gray',
                  borderColor: 'gray',
                  width: '100%',
                }}
                icon={<Icon name="chevron-right" size={15} color="white" />}
                iconRight
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <CheckBox
                title="Weight(1kg)"
                onPress={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
                checked={this.state.checked}
                containerStyle={{width: '48%'}}
              />
              <CheckBox
                title="Quantity"
                onPress={() =>
                  this.setState({
                    checked: !this.state.checked,
                  })
                }
                checked={!this.state.checked}
                containerStyle={{width: '48%'}}
              />
            </View>
            <Input
              placeholder="Item Name"
              value={this.props.Name}
              onChangeText={this.onNameC.bind(this)}
              errorStyle={{color: 'red'}}
              inputStyle={{
                marginLeft: 7,
                color: 'black',
              }}
              placeholderTextColor="#000"
              errorMessage={this.props.NameError}
              inputContainerStyle={{
                width: '100%',
                borderWidth: 0.3,
                // marginTop: 30,
              }}
            />
            {this.renderInput()}
            <Input
              placeholder="Quantity In Stock"
              value={this.props.email}
              onChangeText={this.onQuantityC.bind(this)}
              errorStyle={{color: 'red'}}
              inputStyle={{
                marginLeft: 7,
                color: 'black',
              }}
              placeholderTextColor="#000"
              keyboardType="number-pad"
              errorMessage={this.props.NameError}
              inputContainerStyle={{
                width: '100%',
                borderWidth: 0.3,
                // marginTop: 30,
              }}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button
                onPress={this.onAddPress.bind(this)}
                title="ADD"
                type="outline"
                raised
                containerStyle={{
                  marginTop: 20,
                  alignSelf: 'center',
                  marginRight: 20,
                  width: '35%',
                }}
                titleStyle={{color: 'white', marginRight: 10}}
                buttonStyle={{
                  backgroundColor: FindStateNoBc(
                    this.props.Code,
                    this.props.Name,
                    this.props.email,
                  ),
                  borderColor: FindStateNoBc(
                    this.props.Code,
                    this.props.Name,
                    this.props.email,
                  ),
                  width: '100%',
                }}
                icon={<Icon name="plus-circle" size={20} color="white" />}
                iconRight
              />
              <Button
                onPress={() => {
                  if (this.state.items.length > 0) {
                    this.props.addNoBCItems(this.state.items);
                    this.setState({items: []});
                  }
                }}
                title="Submit"
                type="outline"
                raised
                containerStyle={{
                  marginTop: 20,
                  alignSelf: 'center',
                  marginRight: 20,
                  width: '35%',
                }}
                titleStyle={{color: 'white', marginRight: 10}}
                buttonStyle={{
                  backgroundColor:
                    this.state.items.length > 0
                      ? VARIABLES.green2
                      : VARIABLES.oragne,
                  borderColor:
                    this.state.items.length > 0
                      ? VARIABLES.green2
                      : VARIABLES.oragne,
                  width: '100%',
                }}
                icon={<Icon name="check-circle" size={20} color="white" />}
                iconRight
              />
            </View>
          </Card>
        </View>
        <View
          style={{
            flexGrow: 1,
            height: '30%',
            marginTop: 20,
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <FlatList
            style={{
              display: 'flex',
            }}
            data={this.state.items.reverse()}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={(item, index) => index}
            onRefresh={() => this.renderRefreshControl()}
            refreshing={this.props.Loader}
            initialNumToRender={8}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => {
  return {
    logedin: state.auth.logedin,
    new: state.auth.new,
    Boss: state.auth.Boss,
    Manager: state.auth.Manager,
    password: state.auth.password,
    email: state.auth.email,
    Name: state.auth.Name,
    Code: state.auth.Code,
    NameError: state.auth.NameError,
    CodeError: state.auth.CodeError,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    itemsNoBC: state.auth.itemsNoBC,
  };
};

export default connect(
  mapStateToProps,
  {
    logincheck,
    emailChanged,
    PasswordChanged,
    NameChanged,
    AddItemNoBarCode,
    ClearItemStore,
    SignUpUser,
    CodeChanged,
    addNoBCItems,
  },
)(AddItemScreenNBCView);

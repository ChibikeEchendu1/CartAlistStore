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
import ItemListNobcStore from './ItemListNobcStore';
import FindStateAddNoBC from '../utils/FindStateAddNoBC';
import {NavigationEvents} from 'react-navigation';

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
class StoreItemScreenNBCView extends Component {
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
      search: '',
      isLoading: false,
      checked: true,
      StoreItemsNBC: {},
      StoreItems: {},
    };
  }

  async componentDidMount() {
    let StoreItemsNBC = await AsyncStorage.getItem('StoreItemsNBC');
    StoreItemsNBC = JSON.parse(StoreItemsNBC);
    console.log(StoreItemsNBC);
    this.setState({StoreItemsNBC});
  }

  async componentDidUpdate(prevProps, prevState) {
    let StoreItemsNBC = await AsyncStorage.getItem('StoreItemsNBC');
    StoreItemsNBC = JSON.parse(StoreItemsNBC);
    console.log(StoreItemsNBC);
    this.setState({StoreItemsNBC});
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }

  move() {
    if (this.props.new) {
      this.props.navigation.navigate('AuthScreen');
    }
  }

  onNameC(text) {
    this.setState({search: text});
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onAddPress() {
    this.setState({Current: '', found: false, error: ''});
    if (FindStateAddNoBC(this.props.Code, this.props.Name)) {
      this.setState({
        items: [
          ...this.state.items,
          {
            Code: this.state.checked,
            Name: this.props.Name,
            Price: this.props.Code,
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
      <ItemListNobcStore
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Input
            placeholder="...Search By Code Or Name"
            leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
            containerStyle={{
              width: '70%',
              alignSelf: 'flex-start',
            }}
            value={this.props.name}
            onChangeText={this.onNameC.bind(this)}
            errorStyle={{color: 'red', marginLeft: '5%'}}
            inputStyle={{marginLeft: 5}}
            errorMessage={this.props.NameError}
            inputContainerStyle={{width: '100%'}}
          />
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
            flexGrow: 1,
            height: '80%',
            marginTop: 20,
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <FlatList
            style={{
              display: 'flex',
            }}
            data={Object.values(this.state.StoreItemsNBC || []).filter(
              items => {
                return (
                  items.Search.toLowerCase().indexOf(
                    this.state.search.toLowerCase(),
                  ) !== -1
                );
              },
            )}
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
)(StoreItemScreenNBCView);

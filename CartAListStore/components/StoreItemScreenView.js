import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Vibration,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import FindState from '../utils/FindState';
import FindStateAdd from '../utils/FindStateAdd';
import AsyncStorage from '@react-native-community/async-storage';

import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  AddItemStore,
  ClearItemStore,
  SignUpUser,
  CodeChanged,
} from '../actions';
import {connect} from 'react-redux';
import {Input, Button} from 'react-native-elements';
import BarcodeFinder from './BarcodeFinder';
const MIDHIGHT = Dimensions.get('window').height / 2;
const DURATION = 200;
class ProductScanRNCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off,
      },
      barcodeCodesFound: [],
      found: false,
      error: '',
      flash: false,
      Current: '',
      StoreItems: {},
    };
  }

  async componentDidMount() {
    const Check = this.props.route.params || false;
    if (Check) {
      this.props.ClearItemStore();
    }
    let StoreItems = await AsyncStorage.getItem('StoreItems');
    StoreItems = JSON.parse(StoreItems);
    console.log(StoreItems);

    this.setState({StoreItems});
  }

  async componentDidUpdate(prevProps, prevState) {
    const Check = this.props.route.params || false;
    if (Check) {
      this.props.ClearItemStore();
    }
    let StoreItems = await AsyncStorage.getItem('StoreItems');
    StoreItems = JSON.parse(StoreItems);
    console.log(StoreItems);

    this.setState({StoreItems});
  }

  async _handlePress() {
    if (this.state.flash) {
      this.setState({
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.off,
        },
        flash: false,
      });
    } else {
      this.setState({
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.torch,
        },
        flash: true,
      });
    }
  }

  onBarCodeRead(scanResult) {
    console.log('foundandroid');

    if (scanResult.data != null) {
      if (this.state.StoreItems[scanResult.data]) {
        console.log('moving');
        this.props.navigation.navigate('EditMe', {
          item: this.state.StoreItems[scanResult.data],
        });
      }
    }
    return;
  }

  async takePicture() {
    if (this.state.found) {
      if (this.camera) {
        const options = {quality: 0.5, base64: true};
        const data = await this.camera.takePictureAsync(options);
        this.setState({error: '', found: false, Current: ''});
        this.props.navigation.navigate('ItemInfo', {
          BARCODE: this.state.Current,
          PICTURE: data,
        });
      }
    } else {
      this.setState({error: 'NO BARCODE'});
    }
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }

  onAddPress() {
    this.setState({Current: '', found: false, error: ''});
    if (FindStateAdd(this.state.found, this.props.Code, this.props.Name)) {
      this.props.AddItemStore(
        this.state.Current,
        this.props.Code,
        this.props.Name,
      );
    } else {
      this.setState({error: 'Fill In all the Options'});
    }
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }
  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={Keyboard.dismiss} style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <BarcodeFinder
          width={280}
          height={220}
          borderColor="red"
          borderWidth={2}
        />

        <View
          style={[
            styles.overlay,
            styles.topOverlay,
            {display: 'flex', flexDirection: 'column'},
          ]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
          <Text style={{color: 'red'}}>{this.state.error}</Text>
          <Button
            onPress={this._handlePress.bind(this)}
            title="TORCH"
            type="outline"
            raised
            containerStyle={{
              marginTop: 20,
              alignSelf: 'center',
              marginRight: 20,
              width: '50%',
            }}
            titleStyle={{color: 'white', marginRight: 10}}
            buttonStyle={{
              backgroundColor: !this.state.flash
                ? VARIABLES.lightGray
                : VARIABLES.green2,
              borderColor: !this.state.flash
                ? VARIABLES.lightGray
                : VARIABLES.green2,
              width: '100%',
            }}
            icon={<Icon name="lightbulb-o" size={20} color="white" />}
            iconRight
          />
        </View>

        <View
          style={[
            styles.overlay,
            styles.bottomOverlay,
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('NoBarcode', {items: []});
              }}
              title=""
              type="outline"
              raised
              containerStyle={{
                alignSelf: 'center',
                marginRight: 20,
                width: '15%',
              }}
              titleStyle={{color: 'white', marginRight: 10}}
              buttonStyle={{
                backgroundColor: 'gray',
                borderColor: 'gray',
                width: '100%',
              }}
              icon={<Icon name="chevron-left" size={15} color="white" />}
              iconRight
            />
            <Text style={{color: 'white'}}>No barcode Item</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    email: state.auth.email,
    password: state.auth.password,
    Name: state.auth.Name,
    Code: state.auth.Code,
    NameError: state.auth.NameError,
    CodeError: state.auth.CodeError,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    Boss: state.auth.Boss,
    items: state.auth.items,
    Manager: state.auth.Manager,
  };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    PasswordChanged,
    NameChanged,
    AddItemStore,
    ClearItemStore,
    SignUpUser,
    CodeChanged,
  },
)(ProductScanRNCamera);

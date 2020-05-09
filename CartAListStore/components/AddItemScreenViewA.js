//This is an example code to Scan QR code//
import React, {Component} from 'react';
//import react in our code.
import {
  Text,
  View,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  Vibration,
  PermissionsAndroid,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';
import Torch from 'react-native-torch';
import FindState from '../utils/FindState';
import FindStateAdd from '../utils/FindStateAdd';

import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  ClearItemStore,
  AddItemStore,
  SignUpUser,
  CodeChanged,
} from '../actions';
import {connect} from 'react-redux';
import Normalize from '../utils/Normalize';
import {Input, Button} from 'react-native-elements';
// import all basic components
import {CameraKitCameraScreen, CameraKitCamera} from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
const DURATION = 1000;

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    this.state = {
      //variable to hold the qr value

      qrvalue: '',
      opneScanner: false,
      green: false,
      isTorchOn: false,
      found: false,
      error: '',
      flash: false,
      Current: '',
    };
  }
  onOpenlink() {
    //Function to open URL, If scanned
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }

  async _handlePress() {
    const {isTorchOn} = this.state;

    if (Platform.OS === 'ios') {
      Torch.switchState(!isTorchOn);
    } else {
      const cameraAllowed = await Torch.requestCameraPermission(
        'Camera Permissions', // dialog title
        'We require camera permissions to use the torch on the back of your phone.', // dialog body
      );

      if (cameraAllowed) {
        Torch.switchState(!isTorchOn);
      }
    }
    this.setState({isTorchOn: !isTorchOn});
  }
  onNameC(text) {
    this.props.NameChanged(text);
  }

  componentDidMount() {
    const Check = this.props.route.params || false;
    if (Check) {
      this.props.ClearItemStore();
    }
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }
  /*   onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

    this.setState({qrvalue: qrvalue, green: true});
    this.setState({opneScanner: false});
  } */

  onBarcodeScan(scanResult) {
    console.log('found');

    if (scanResult != null) {
      if (!this.barcodeCodes.includes(scanResult)) {
        Vibration.vibrate(DURATION);
        if (!this.state.found) {
          this.barcodeCodes.push(scanResult);
          this.setState({Current: scanResult, error: '', found: true});
          console.warn('onBarCodeRead call');
        } else {
          this.setState({error: 'ADD PRICE FOR OLD ITEM'});
        }
      } else {
        this.setState({error: 'Item Is Already Added'});
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.capture(true);

      console.log(data.uri);
    } else {
      console.log('lol');
    }
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

  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `${event.type} button pressed`,
      `${captureImages}`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  onOpneScanner() {
    var that = this;
    //To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App Camera Permission',
              message: 'CameraExample App needs access to your camera ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({qrvalue: ''});
            that.setState({opneScanner: true});
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    } else {
      that.setState({qrvalue: ''});
      that.setState({opneScanner: true});
    }
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view

    return (
      <TouchableOpacity onPress={Keyboard.dismiss} style={styles.container}>
        <CameraKitCameraScreen
          ref={cam => (this.camera = cam)}
          showFrame={true}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color

          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
          onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
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
              backgroundColor: !this.state.isTorchOn
                ? VARIABLES.lightGray
                : VARIABLES.green2,
              borderColor: !this.state.isTorchOn
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 30,
              alignSelf: 'flex-start',
              alignContent: 'space-between',
            }}>
            <View style={{flex: 1}}>
              <Input
                placeholder="Quantity"
                onChangeText={this.onCodeC.bind(this)}
                value={this.props.Code}
                inputStyle={{
                  marginLeft: 7,
                  color: 'white',
                }}
                placeholderTextColor="#FFF"
                keyboardType="number-pad"
                errorStyle={{color: 'red'}}
                errorMessage={this.props.CodeError}
                inputContainerStyle={{
                  width: '100%',
                  borderWidth: 0.3,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Input
                placeholder="Price"
                value={this.props.Name}
                onChangeText={this.onNameC.bind(this)}
                keyboardType="number-pad"
                errorStyle={{color: 'red'}}
                inputStyle={{
                  marginLeft: 7,
                  color: 'white',
                }}
                placeholderTextColor="#FFF"
                errorMessage={this.props.NameError}
                inputContainerStyle={{
                  width: '100%',
                  borderWidth: 0.3,
                  // marginTop: 30,
                }}
              />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              onPress={() => {
                this.barcodeCodes.pop();
                this.setState({Current: '', found: false, error: ''});
                this.props.NameChanged('');
                this.props.CodeChanged('');
              }}
              title=""
              type="outline"
              raised
              containerStyle={{
                marginTop: 20,
                alignSelf: 'center',
                marginRight: 20,
                width: '15%',
              }}
              titleStyle={{color: 'white', marginRight: 10}}
              buttonStyle={{
                backgroundColor: '#0379CC',
                borderColor: '#0379CC',
                width: '100%',
              }}
              icon={<Icon name="undo" size={20} color="white" />}
              iconRight
            />
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
                backgroundColor: FindState(
                  this.state.found,
                  this.props.Code,
                  this.props.Name,
                ),
                borderColor: FindState(
                  this.state.found,
                  this.props.Code,
                  this.props.Name,
                ),
                width: '100%',
              }}
              icon={<Icon name="plus-circle" size={20} color="white" />}
              iconRight
            />
            <Button
              onPress={() => {
                if (this.props.items.length > 0) {
                  this.props.navigation.navigate('ItemsConfirm', {
                    items: this.props.items,
                  });
                } else {
                  this.setState({error: 'Scan Items First'});
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
                  this.props.items.length > 0
                    ? VARIABLES.green2
                    : VARIABLES.oragne,
                borderColor:
                  this.props.items.length > 0
                    ? VARIABLES.green2
                    : VARIABLES.oragne,
                width: '100%',
              }}
              icon={<Icon name="check-circle" size={20} color="white" />}
              iconRight
            />
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
)(AddItem);

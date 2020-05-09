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
  CodeChanged,
  FetchStaff,
} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import StaffList from './StaffList';
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
class BossStaffView extends Component {
  state = {
    visible: false,
    value: 0,
    isLoading: false,
    search: '',
  };

  async componentDidMount() {
    this.props.FetchStaff();
  }

  onCodeC(text) {
    this.props.CodeChanged(text);
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <FlatList
        style={{height: '72%'}}
        data={this.props.staff.reverse().filter(items => {
          return (
            items.Name.toLowerCase().indexOf(
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

  onNameC(text) {
    this.setState({search: text});
  }

  renderRow(item) {
    return <StaffList navigation={this.props.navigation} item={item} />;
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
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => this.setState({visible: true})}>
          <Icon
            name="plus-circle"
            color={'white'}
            size={30}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderButton() {
    return (
      <View style={{flex: 1}}>
        <Input
          placeholder="...Search By Name"
          leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
          containerStyle={{width: '90%', marginTop: 15, alignSelf: 'center'}}
          value={this.props.name}
          onChangeText={this.onNameC.bind(this)}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          inputStyle={{marginLeft: 5}}
          errorMessage={this.props.NameError}
          inputContainerStyle={{width: '100%'}}
        />
        {this.renderList()}
        <Modal
          width={SCREENWIDTH - 40}
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          footer={
            <ModalFooter>
              <ModalButton
                textStyle={{color: VARIABLES.Color}}
                text="CANCEL"
                onPress={() => {
                  this.setState({visible: false});
                }}
              />
              <ModalButton
                textStyle={{color: VARIABLES.Color}}
                text="ADD"
                onPress={() => {
                  this.props.AddStaffBoss(this.props.Code, this.state.value),
                    this.setState({visible: false});
                }}
              />
            </ModalFooter>
          }>
          <ModalContent>
            <Text
              style={{display: 'flex', alignSelf: 'center', marginBottom: 20}}>
              New Staff
            </Text>
            <Input
              placeholder="Name"
              onChangeText={this.onCodeC.bind(this)}
              value={this.props.Code}
              inputStyle={{marginLeft: 7}}
              errorStyle={{color: 'red', marginLeft: '5%'}}
              errorMessage={this.props.CodeError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
            />
            <RNPickerSelect
              onValueChange={value => this.setState({value})}
              style={pickerSelectStyles}
              placeholder={placeholder}
              items={[
                {label: 'Cashier', value: 2},
                {label: 'Manager', value: 1},
                {label: 'Admin/Owner', value: 0},
              ]}
            />
          </ModalContent>
        </Modal>
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
    CodeChanged,
    FetchStaff,
  },
)(BossStaffView);

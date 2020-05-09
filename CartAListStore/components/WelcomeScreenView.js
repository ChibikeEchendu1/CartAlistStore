import React, {Component} from 'react';
import {
  View,
  Image,
  Animated,
  AsyncStorage,
  Text,
  SafeAreaView,
} from 'react-native';
import {logincheck} from '../actions';
import {connect} from 'react-redux';

class WelcomeScreenView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    splash: '',
    move: '',
  };

  async componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
      },
    ).start(() => {
      this.setState({fadeAnim: new Animated.Value(1)}, () => {
        Animated.timing(
          // Animate over time
          this.state.fadeAnim, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 3000, // 2000ms
          },
        ).start(() => {
          setTimeout(() => {
            this.setState({splash: 'done'});
            this.setState({move: 'done'});
          }, 100);
        });
      });
    });

    this.props.logincheck();
  }

  onSlideComplete = () => {
    this.props.navigation.navigate('AuthScreen');
  };

  Login() {
    if (this.props.Boss) {
      this.props.navigation.navigate('Boss');
    } else if (this.props.Manager) {
      this.props.navigation.navigate('Staff');
    }
  }

  move() {
    if (this.props.new) {
      this.props.navigation.navigate('AuthScreen');
    }
  }

  onSlideCompleteSign = () => {
    this.props.navigation.navigate('SignUpScreen');
  };
  /*   */

  renderButton() {
    let {fadeAnim} = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
          backgroundColor: 'white', // Bind opacity to animated value
        }}>
        <SafeAreaView style={{display: 'flex', justifyContent: 'center'}}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={require('../images/OOO.jpg')}
          />
        </SafeAreaView>
      </Animated.View>
    );
  }

  render() {
    return [this.renderButton(), this.Login(), this.move()];
  }
}

const mapStateToProps = state => {
  return {
    logedin: state.auth.logedin,
    new: state.auth.new,
    Boss: state.auth.Boss,
    Manager: state.auth.Manager,
    password: state.auth.password,
  };
};

export default connect(
  mapStateToProps,
  {logincheck},
)(WelcomeScreenView);

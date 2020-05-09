import {PixelRatio, Platform, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 360;

export default level => {
  if (level == 0) {
    return 'Admin/Owner';
  } else if (level == 1) {
    return 'Manager';
  } else if (level == 2) {
    return 'Cashier';
  } else {
    return 'Hmmmm';
  }
};

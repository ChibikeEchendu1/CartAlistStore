import {PixelRatio, Platform, Dimensions} from 'react-native';
import {VARIABLES} from './Variables';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 360;

export default (Quantity, Price) => {
  if (
    Quantity == '' ||
    typeof Quantity == 'undefined' ||
    typeof Price == 'undefined' ||
    Price == ''
  ) {
    return VARIABLES.oragne;
  } else {
    return VARIABLES.green2;
  }
};

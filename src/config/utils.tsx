import {Dimensions} from 'react-native';

export const getDeviceScreenInfo = () => {
  const {width, height} = Dimensions.get('screen');
  return [width, height];
};

import {Platform} from 'react-native'

export const getFontFamily = () => {
  return Platform.OS !== 'ios' ? 'Roboto-Regular' : 'SF Pro Display'
}

export const shadows = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}

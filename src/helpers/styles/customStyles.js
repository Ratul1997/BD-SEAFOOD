import {Platform} from 'react-native'

export const getFontFamily = () => {
  return Platform.OS !== 'ios' ? 'Roboto-Regular' : 'Academy Engraved LET'
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

import React from 'react'
import LottieView from 'lottie-react-native'
import {View} from 'react-native'

export default class Loading extends React.Component {
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../../assets/lottie/loader1.json')}
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    )
  }
}

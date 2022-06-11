import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'

export default class Logo extends Component {
  render () {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/logo/logo.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode='contain'
        />
      </View>
    )
  }
}

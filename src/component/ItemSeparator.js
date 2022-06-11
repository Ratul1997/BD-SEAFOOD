import {View, Text} from 'react-native'
import React from 'react'
import {Colors} from '../config/colors'

const ItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: Colors.black,
        opacity: 0.2,
      }}
    />
  )
}
export default ItemSeparator

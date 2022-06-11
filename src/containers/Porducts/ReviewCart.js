import {View, Text, Pressable} from 'react-native'
import React from 'react'
import CustomIcon from '../../component/CustomIcon'
import {RFValue} from 'react-native-responsive-fontsize'
import {Colors} from '../../config/colors'
import {getFontFamily} from '../../helpers/styles/customStyles'
import CustomButton from '../../component/CustomButton'

export default function ReviewCart ({itemTotal = 0, onPress}) {
  return (
    <Pressable
      style={{
        width: '90%',
        backgroundColor: Colors.lightBlue,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
      }}
      onPress={onPress}>
      <View style={{width: '20%', alignSelf: 'center'}}>
        <CustomIcon
          name='ic_shopping_bag'
          size={RFValue(25)}
          color={Colors.white}
        />
      </View>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: RFValue(18),
            fontFamily: getFontFamily(),
          }}>
          Review Order
        </Text>
        <CustomButton
          customStyle={{backgroundColor: '#2596be'}}
          width='30%'
          bordered
          title={itemTotal}
          borderRadius={15}
          filled
          onPress={onPress}
          fontWeight='bold'
        />
      </View>
    </Pressable>
  )
}

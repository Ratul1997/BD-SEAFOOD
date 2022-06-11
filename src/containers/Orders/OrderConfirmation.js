import React from 'react'
import LottieView from 'lottie-react-native'
import {Text, View} from 'react-native'
import {Colors, theme} from '../../config/colors'
import {RFValue} from 'react-native-responsive-fontsize'
import {getFontFamily} from '../../helpers/styles/customStyles'
import CustomButton from '../../component/CustomButton'

export default class OrderConfirmation extends React.Component {
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <LottieView
          source={require('../../assets/lottie/orderPlaced.json')}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            color: Colors.lightBlack,
            fontSize: RFValue(15),
            fontFamily: getFontFamily(),
          }}>
          Your order has been placed!
        </Text>
        <CustomButton
          width='90%'
          bordered
          title={'Go to home page'}
          borderRadius={8}
          customStyle={{marginVertical: 20, alignSelf: 'center'}}
          filled
          onPress={() =>
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'DrawerStack'}],
            })
          }
        />
      </View>
    )
  }
}

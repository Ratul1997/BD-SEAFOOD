import {View, Text, Animated, Button, Pressable, Image} from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer'
import {categoryOptions} from '../constants/constants'
import {Colors, theme} from '../config/colors'
import CustomIcon from './CustomIcon'
import {RFValue} from 'react-native-responsive-fontsize'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useDispatch, useSelector} from 'react-redux'
import {getFontFamily, shadows} from '../helpers/styles/customStyles'
import {clearUserInfos} from '../redux/actions/userActions'
import userServices from '../helpers/services/userServices'

export default function CustomDrawerNav (props) {
  const progress = useDrawerProgress()
  const userInfo = useSelector(state => state.userReducer.userInfo)
  const dispatch = useDispatch()
  return (
    <DrawerContentScrollView {...props}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: RFValue(10),
          backgroundColor: Colors.white,
          borderBottomColor: Colors.lightBlack,
          borderBottomWidth: 0.5,
          ...shadows,
        }}
        onPress={() => {
          props.navigation.navigate(!!userInfo?.uid ? 'Profile' : 'Login')
        }}>
        <View style={{width: '20%'}}>
          {/* <CustomIcon
            name='ic_profile'
            color={Colors.lightBlack}
            size={RFValue(30)}
          /> */}
          <Image
            source={require('../assets/logo/logo.png')}
            style={{width: 40, height: 40, borderRadius: 25}}
            resizeMode='contain'
          />
        </View>
        <View style={{width: '70%'}}>
          <Text
            numberOfLines={1}
            style={{
              color: theme.primaryColor,
              fontSize: RFValue(14),
              fontFamily: getFontFamily(),
            }}>
            {userInfo?.shopName ?? 'Login'}
          </Text>
        </View>
        {!!userInfo?.uid ? (
          <Pressable
            style={{width: '10%'}}
            onPress={() => {
              userServices.signOut()
              dispatch(clearUserInfos())
            }}>
            <CustomIcon
              name='ic_logout'
              color={theme.primaryColor}
              size={RFValue(20)}
            />
          </Pressable>
        ) : null}
      </Pressable>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

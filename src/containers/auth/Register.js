import {View, Text, Pressable} from 'react-native'
import React, {useState} from 'react'
import CustomView from '../../component/CustomView'
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from '../../component/CustomTextInput'
import CustomButton from '../../component/CustomButton'
import {useDispatch, useSelector} from 'react-redux'
import uuid from 'react-native-uuid'
import PromiseModules from '../../helpers/PromiseModules'
import {clearCart} from '../../redux/actionTypes/cartActions'
import CustomIcon from '../../component/CustomIcon'
import {storeUserInfos} from '../../redux/actions/userActions'
import userServices from '../../helpers/services/userServices'

const inputOptions = [
  {
    id: 1,
    key: 'shopName',
    label: 'Shop Name',
    secured: false,
  },
  {
    id: 1,
    key: 'address',
    label: 'Address',
    multiline: true,
    numOfLine: 5,
    secured: false,
  },
  {
    id: 1,
    key: 'phoneNo',
    label: 'Phone No',
    secured: false,
  },
  {
    id: 1,
    key: 'email',
    label: 'Email',
    secured: false,
  },

  {
    id: 1,
    key: 'password',
    label: 'Password',
    secured: true,
    icon: CustomIcon,
  },
]

export default function Register ({navigation}) {
  const dispatch = useDispatch()
  const initialState = {
    shopName: '',
    address: '',
    phoneNo: '',
    email: '',
    password: '',
    unSecurePassword: false,
  }
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const onChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  const onRegister = async () => {
    if (
      !state.shopName.trim() ||
      !state.address.trim() ||
      !state.phoneNo.trim() ||
      !state.email.trim() ||
      !state.password.trim()
    ) {
      return alert('Fields should not be empty!')
    }

    onSignup()
  }
  const onSignup = async () => {
    const {email, password} = state

    setIsLoading(true)
    try {
      const {user, additionalUserInfo} = await userServices.emailSignUp(
        email,
        password,
      )
      const signInData = {
        shopName: state.shopName,
        address: state.address,
        phoneNo: state.phoneNo,
        email: state.email,
        password: state.password,
        uid: user.uid,
      }

      storeUserInfo(signInData, user.uid)
    } catch (error) {
      console.log(error, 'SSS')

      alert(error?.msg ?? 'Something Went Wrong!')
      setIsLoading(false)
    }
  }
  const storeUserInfo = async (signInData, uid, isNewUser = false) => {
    console.log('here')
    try {
      await userServices.storeUserInfo({...signInData}, uid)

      setIsLoading(false)

      dispatch(storeUserInfos(signInData))

      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerStack'}],
      })
    } catch (error) {
      console.log(error)

      alert(error?.msg ?? 'Something Went Wrong!')
      setIsLoading(false)
    }
  }
  const renderItem = ({item, index}) => {
    const {unSecurePassword} = state

    return (
      <Pressable
        onPress={() => {
          if (item.key === 'password') {
            onChange('unSecurePassword', !unSecurePassword)
          }
        }}>
        <CustomTextInput
          placeholder='Type Here'
          value={state[item.key]}
          title={item.label}
          onChangeText={text => onChange(item.key, text)}
          numberOfLines={item.numOfLine}
          multiline={item?.multiline ?? false}
          securedText={
            item.key === 'password'
              ? !unSecurePassword
                ? true
                : false
              : item?.secured ?? false
          }
          Icon={item?.icon ?? null}
          iconName={
            item.key === 'password'
              ? unSecurePassword
                ? 'ic_unlock'
                : 'ic_lock'
              : null
          }
          size={20}
        />
      </Pressable>
    )
  }
  return (
    <CustomView>
      <KeyboardAwareFlatList
        data={inputOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        ListFooterComponent={() => (
          <CustomButton
            width='90%'
            bordered
            title={'Register'}
            borderRadius={8}
            customStyle={{marginVertical: 5, alignSelf: 'center'}}
            filled
            onPress={onRegister}
            isLoading={isLoading}
          />
        )}
        ListFooterComponentStyle={{
          marginVertical: 10,
        }}
      />
    </CustomView>
  )
}

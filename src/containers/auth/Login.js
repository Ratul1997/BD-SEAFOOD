import React, {useState} from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Logo from '../../component/Logo'
import CustomView from '../../component/CustomView'
import CustomTextInput from '../../component/CustomTextInput'
import CustomIcon from '../../component/CustomIcon'
import {getFontFamily} from '../../helpers/styles/customStyles'
import {Colors, theme} from '../../config/colors'
import CustomButton from '../../component/CustomButton'
import {getDeviceScreenInfo} from '../../config/utils'
import PromiseModules from '../../helpers/PromiseModules'
import {useDispatch} from 'react-redux'
import {storeUserInfos} from '../../redux/actions/userActions'
import userServices from '../../helpers/services/userServices'
const [WIDTH, HEIGHT] = getDeviceScreenInfo()
const Login = props => {
  const initialState = {
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    error: null,
    isChecked: true,
    isLoading: false,
    unSecurePassword: false,
  }
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const onChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  //signInMethod
  const onSignIn = async () => {
    const {email, password} = state
    onChange('isLoading', true)
    try {
      const {user, additionalUserInfo} = await userServices.emailSignIn(
        email,
        password,
      )

      fetchUserInfo(user.uid)
    } catch (error) {
      console.log(error)
      onChange('isLoading', false)

      alert(error?.msg ?? 'Something Went Wrong!')
    }
  }

  const fetchUserInfo = async uid => {
    console.log('Fetch')
    onChange('isLoading', true)
    try {
      const {userData} = await userServices.getUserInfo(uid)

      dispatch(storeUserInfos({...userData}))

      props.navigation.goBack()
    } catch (error) {
      onChange('isLoading', false)
      console.log(error)
      alert(error?.msg ?? 'Something Went Wrong!')
    }
  }

  return (
    <CustomView>
      <KeyboardAwareScrollView
        extraScrollHeight={30}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'>
        <View
          style={{
            marginVertical: 10,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: HEIGHT / 3,
          }}>
          <Image
            source={require('../../assets/logo/logo.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode='contain'
          />
        </View>

        <CustomTextInput
          Icon={null}
          title='E-mail'
          placeholder='john123@gmail.com'
          value={state.email}
          onChangeText={text => onChange('email', text)}
        />
        <View style={{marginVertical: 10}} />
        <Pressable
          onPress={() =>
            setState({...state, unSecurePassword: !state.unSecurePassword})
          }>
          <CustomTextInput
            Icon={CustomIcon}
            title='Password'
            placeholder='********'
            securedText={state.unSecurePassword ? false : true}
            value={state.password}
            size={20}
            iconName={state.unSecurePassword ? 'ic_unlock' : 'ic_lock'}
            onChangeText={text => onChange('password', text)}
          />
        </Pressable>
        <CustomButton
          title={'LOG IN'}
          isLoading={state.isLoading}
          onPress={state.isLoading ? null : onSignIn}
          width='90%'
          filled
          fontWeight={'bold'}
          fontSize={18}
          borderRadius={8}
          customStyle={{alignSelf: 'center', marginVertical: 5}}
        />

        <Text
          style={{
            textAlign: 'center',
            color: Colors.black,
            fontSize: 13,
            marginBottom: 5,
            textDecorationLine: 'underline',
            fontFamily: getFontFamily(),
          }}
          onPress={() => props.navigation.navigate('Register')}>
          Create New Account
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.black,
            fontSize: 13,
            marginBottom: 5,
            textDecorationLine: 'underline',
            fontFamily: getFontFamily(),
          }}
          onPress={() => props.navigation.navigate('Forget Password')}>
          Forget Password
        </Text>
      </KeyboardAwareScrollView>
    </CustomView>
  )
}

export default Login

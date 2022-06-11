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
const ForgetPassword = props => {
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

  const onVerificationSend = async () => {
    const {email} = state
    onChange('isLoading', true)
    try {
      await userServices.passwordReset(email)
      alert('Password reset email sent successfully. Please check your email')

      onChange('isLoading', true)
    } catch (error) {
      onChange('isLoading', false)
      alert(error.toString())
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
        <Text
          style={{
            color: 'black',
            fontSize: 13,
            textAlign: 'center',
            marginBottom: 25,
            textDecorationLine: 'underline',
            fontFamily: getFontFamily(),
          }}>
          Verification Link will be sent to your email address.
        </Text>
        <CustomTextInput
          Icon={null}
          title='E-mail'
          placeholder='john123@gmail.com'
          value={state.email}
          onChangeText={text => onChange('email', text)}
        />

        <CustomButton
          title={'Send'}
          isLoading={state.isLoading}
          onPress={state.isLoading ? null : onVerificationSend}
          width='90%'
          filled
          fontWeight={'bold'}
          fontSize={18}
          borderRadius={8}
          customStyle={{alignSelf: 'center', marginVertical: 5}}
        />
      </KeyboardAwareScrollView>
    </CustomView>
  )
}

export default ForgetPassword

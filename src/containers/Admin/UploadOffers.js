import {View, Text, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomView from '../../component/CustomView'
import CacheImageComponent from '../../component/CacheImageComponent'
import FastImage from 'react-native-fast-image'
import {getFontFamily} from '../../helpers/styles/customStyles'
import CustomButton from '../../component/CustomButton'
import {openImagePicker} from '../../helpers/helpers'
import {getDeviceScreenInfo} from '../../config/utils'
import adminServices from '../../services/adminServices'
import {Colors, theme} from '../../config/colors'

const [WIDTH, HEIGHT] = getDeviceScreenInfo()
export default function UploadOffers ({navigation}) {
  const initialState = {
    productName: '',
    productSubAmount: '',
    imageUrl: null,
    category: 1,
  }
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const onChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }
  const onOpenImagePicker = async () => {
    try {
      const images = await openImagePicker(false)
      onChange('imageUrl', images.path)
    } catch (error) {
      console.log(error)
    }
  }

  const onUpload = async () => {
    const uploadedData = {
      path: state.imageUrl,
    }
    setIsLoading(true)
    try {
      const res = await adminServices.uploadOffers(uploadedData)
      setIsLoading(false)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <CustomView>
      <Pressable
        style={{
          marginVertical: 10,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: HEIGHT / 3,
          backgroundColor: Colors.white,

          borderColor: Colors.black,
          borderWidth: 0.6,
        }}
        onPress={onOpenImagePicker}>
        {state?.imageUrl ? (
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            <CacheImageComponent
              url={state.imageUrl}
              resizeMode={FastImage.resizeMode.cover}
              styles={{width: '100%', height: '100%'}}
            />
          </View>
        ) : (
          <Text
            style={{
              fontFamily: getFontFamily(),
              fontSize: 15,
              color: theme.primaryColor,
            }}>
            Upload Image
          </Text>
        )}
      </Pressable>
      <CustomButton
        width='90%'
        bordered
        title={'Upload'}
        borderRadius={8}
        customStyle={{marginVertical: 5, alignSelf: 'center'}}
        filled
        isLoading={isLoading}
        onPress={() => {
          onUpload()
        }}
      />
    </CustomView>
  )
}

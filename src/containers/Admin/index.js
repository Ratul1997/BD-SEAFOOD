import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, {useState} from 'react'
import CustomView from '../../component/CustomView'
import {Colors} from '../../config/colors'
import {getFontFamily, shadows} from '../../helpers/styles/customStyles'
import {RFValue} from 'react-native-responsive-fontsize'
import CustomIcon from '../../component/CustomIcon'
import {useSelector} from 'react-redux'
import RenamePlaylistModal from '../../component/popUpModal/RenamePlaylistModal'
import PromiseModules from '../../helpers/PromiseModules'

export default function AdminPage ({navigation}) {
  const products = useSelector(state => state.uploadedProductReducer.products)
  const [isVisible, setIsVisible] = useState(false)
  const [helpCenterNumber, setNumber] = useState('')
  const [dockKey, setDockKey] = useState('')
  const uploadingCount = products?.length ?? 0

  const toggleVisible = () => setIsVisible(!isVisible)
  const onUpdateNumber = async () => {
    if (!helpCenterNumber.trim()) {
      return
    }
    try {
      const res = await PromiseModules.storeDataInCollection(
        'PhoneNumber',
        dockKey,
        {number: helpCenterNumber},
      )
      toggleVisible()
    } catch (error) {
      console.log(error)
    }
  }
  const onFetchData = async () => {
    try {
      const res = await PromiseModules.getDataByCollection(
        'PhoneNumber',
        null,
        null,
      )
      console.log(res)
      setNumber(res?.[0]?.number ?? '')
      setDockKey(res?.[0]?.id ?? '')
      toggleVisible()
    } catch (error) {
      alert('Something went wrong!')
      console.log(error)
    }
  }
  return (
    <CustomView style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Colors.white,
            margin: 10,
            ...shadows,
          }}
          onPress={() => navigation.navigate('Product Upload')}>
          <CustomIcon name='ic_upload' size={60} />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: getFontFamily(),
              fontSize: RFValue(15),
            }}
            numberOfLines={2}>
            Upload Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Colors.white,
            margin: 10,
            ...shadows,
          }}
          onPress={() => navigation.navigate('Orders')}>
          <CustomIcon name='ic_notepad' size={70} />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: getFontFamily(),
              fontSize: RFValue(15),
            }}
            numberOfLines={2}>
            View Orders
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Colors.white,
            margin: 10,
            ...shadows,
          }}
          onPress={() => navigation.navigate('Uploading')}>
          {uploadingCount > 0 ? (
            <View
              style={{
                backgroundColor: Colors.yellow,
                width: 30,
                height: 30,
                position: 'absolute',
                right: 0,
                top: -10,
                borderRadius: 30,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>{uploadingCount}</Text>
            </View>
          ) : null}
          <CustomIcon name='ic_transfer' size={60} />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: getFontFamily(),
              fontSize: RFValue(15),
            }}
            numberOfLines={2}>
            On Uploading
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Colors.white,
            margin: 10,
            ...shadows,
          }}
          onPress={() => navigation.navigate('Offer Upload')}>
          <CustomIcon name='ic_upload' size={60} />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: getFontFamily(),
              fontSize: RFValue(15),
            }}
            numberOfLines={2}>
            Upload Offers
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
            backgroundColor: Colors.white,
            margin: 10,
            ...shadows,
          }}
          onPress={() => {
            onFetchData()
          }}>
          <CustomIcon name='ic_help_center' size={60} />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontFamily: getFontFamily(),
              fontSize: RFValue(15),
            }}
            numberOfLines={2}>
            Update Number
          </Text>
        </TouchableOpacity>
      </View>
      <RenamePlaylistModal
        isVisible={isVisible}
        title={'Update Help Center Number'}
        onChangeText={text => setNumber(text)}
        value={helpCenterNumber}
        placeholder={'Type Here'}
        onCancelPress={toggleVisible}
        onOkPress={onUpdateNumber}
      />
    </CustomView>
  )
}

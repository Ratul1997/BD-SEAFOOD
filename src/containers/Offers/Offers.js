import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomView from '../../component/CustomView'
import PromiseModules from '../../helpers/PromiseModules'
import {getDeviceScreenInfo} from '../../config/utils'
import OfferItem from './OfferItem'
import Loading from '../../component/loader/Loading'
import {Colors} from '../../config/colors'
import {RFValue} from 'react-native-responsive-fontsize'
import {getFontFamily} from '../../helpers/styles/customStyles'
import {useSelector} from 'react-redux'

const [WIDTH, HEIGHT] = getDeviceScreenInfo()
export default function Offers ({navigation}) {
  const userInfo = useSelector(state => state.userReducer.userInfo)
  const [offerList, setOfferList] = useState([])
  const [loading, setLoading] = useState(true)
  const [onRefresh, setRefresh] = useState(false)
  useEffect(() => {
    loadOffers()
  }, [])
  const loadOffers = async () => {
    try {
      const res = await PromiseModules.getDataByCollection('Offers')
      setOfferList(
        [...res].sort((a, b) => {
          return a.createdAt > b.createdAt
        }),
      )
    } catch (error) {
    } finally {
      setLoading(false)
      setRefresh(false)
    }
  }

  const onDelete = (item, index) => async () => {
    try {
      const res = await PromiseModules.removeDocument('Offers', item.id)
      const prevState = [...offerList]
      prevState.splice(index, 1)
      setOfferList([...prevState])
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <OfferItem
        item={item}
        navigation={navigation}
        isAdmin={userInfo?.admin ?? false}
        onDelete={onDelete(item, index)}
        index={index}
      />
    )
  }
  return (
    <CustomView>
      {loading ? (
        <Loading />
      ) : offerList.length === 0 ? (
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: RFValue(15),
            fontFamily: getFontFamily(),
            color: Colors.black,
            marginVertical: 10,
          }}>
          No offers are available
        </Text>
      ) : (
        <FlatList
          data={offerList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + index}
          onRefresh={() => {
            setRefresh(true)
            loadOffers()
          }}
          refreshing={onRefresh}
        />
      )}
    </CustomView>
  )
}

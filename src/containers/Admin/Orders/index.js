import {View, Text, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomView from '../../../component/CustomView'
import PromiseModules from '../../../helpers/PromiseModules'
import ItemSeparator from '../../../component/ItemSeparator'
import {getFontFamily} from '../../../helpers/styles/customStyles'
import {Colors} from '../../../config/colors'

import {NavigationContainer, useIsFocused} from '@react-navigation/native'
import {
  convertSecondsToDate,
  formatDate,
  secondsToHms,
} from '../../../helpers/utils'
import {totalCartItem} from '../../Porducts'
import {RFValue} from 'react-native-responsive-fontsize'
import OrderItems from '../../Orders/OrderItems'
import Loading from '../../../component/loader/Loading'
import {useSelector} from 'react-redux'
export default function Orders ({navigation, route}) {
  const isFocused = useIsFocused()
  const [orderLists, setOrderList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userInfo = useSelector(state => state.userReducer.userInfo)
  useEffect(() => {
    loadOrderList()
  }, [isFocused])

  const loadOrderList = async () => {
    try {
      const res = await PromiseModules.getDataByCollection(
        'Orders',
        route.name === 'My Order' ? 'uid' : null,
        route.name === 'My Order' ? userInfo.uid : null,
      )
      setOrderList(
        [...res].sort((a, b) => {
          return a.orderedOn < b.orderedOn
        }),
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const renderItem = ({item, index}) => {
    return <OrderItems item={item} />
  }
  return (
    <CustomView>
      {isLoading ? (
        <Loading />
      ) : orderLists.length === 0 ? (
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: RFValue(15),
            fontFamily: getFontFamily(),
            color: Colors.black,
            marginVertical: 10,
          }}>
          No orders are available!
        </Text>
      ) : (
        <FlatList
          data={orderLists}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, indx) => item.id + indx}
        />
      )}
    </CustomView>
  )
}

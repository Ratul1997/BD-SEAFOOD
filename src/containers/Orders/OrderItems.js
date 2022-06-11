import {View, Text, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Colors} from '../../config/colors'
import {getFontFamily, shadows} from '../../helpers/styles/customStyles'
import {convertSecondsToDate, formatDate} from '../../helpers/utils'
import {totalCartItem} from '../Porducts'
import {RFValue} from 'react-native-responsive-fontsize'
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler'
import ProductCard from '../Porducts/ProductCard'
import CustomIcon from '../../component/CustomIcon'

export default function OrderItems ({item}) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const titleStyle = {
    color: Colors.black,
    width: '50%',
    paddingRight: 10,
    fontWeight: 'bold',
    fontFamily: getFontFamily(),
  }
  const valueSTyle = {
    color: Colors.black,
    width: '50%',
    fontFamily: getFontFamily(),
  }
  const rowStyle = {
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
  }
  const date = formatDate(convertSecondsToDate(item.orderedOn))
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const renderItem = ({item, index}) => {
    return (
      <ProductCard
        productName={item.productName}
        quantity={item.quantity}
        productQuantity={item.amountPerUnit}
        imageUrl={item.uri}
        onOrder={true}
      />
    )
  }
  return (
    <Pressable style={{margin: 10}} onPress={toggleCollapse}>
      <View style={[rowStyle, {alignItems: 'center'}]}>
        <Text style={titleStyle}>Total Order:</Text>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[{fontWeight: 'bold', fontSize: RFValue(20)}]}>
            {totalCartItem(item?.items ?? 0)}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.lightPurple,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={toggleCollapse}>
            <CustomIcon
              name={'ic_arrow_left'}
              size={RFValue(13)}
              color={Colors.blue}
              customStyle={{
                transform: [{rotate: `${isCollapsed ? '270' : '90'}deg`}],
                // position: 'absolute',
                // right: WIDTH / 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={rowStyle}>
        <Text style={titleStyle}>Shop Name:</Text>
        <Text style={valueSTyle}>{item.shopName}</Text>
      </View>
      <View style={rowStyle}>
        <Text style={titleStyle}>Ordered On:</Text>
        <Text style={valueSTyle}>{date}</Text>
      </View>
      {!isCollapsed ? (
        <>
          <View style={rowStyle}>
            <Text style={titleStyle}>Phone no:</Text>
            <Text style={valueSTyle}>{item.phoneNo}</Text>
          </View>
          <View style={rowStyle}>
            <Text style={titleStyle}>Address:</Text>
            <Text style={valueSTyle}>{item.address}</Text>
          </View>

          <FlatList
            data={item.items}
            style={{
              margin: 10,
              // borderColor: Colors.black,
              // borderWidth: 0.6,
              borderRadius: 5,
              alignSelf: 'center',
              ...shadows,
            }}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id + index}
          />
        </>
      ) : null}
    </Pressable>
  )
}

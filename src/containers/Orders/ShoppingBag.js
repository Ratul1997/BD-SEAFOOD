import {View, Text} from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CustomView from '../../component/CustomView'
import {FlatList} from 'react-native-gesture-handler'
import {findInArray} from '../../helpers/utils'
import ProductCard from '../Porducts/ProductCard'
import {
  addItemToCart,
  decrementCartItem,
  incrementCartItem,
  removeItemToCart,
} from '../../redux/actionTypes/cartActions'
import ItemSeparator from '../../component/ItemSeparator'
import {totalCartItem} from '../Porducts'
import CustomButton from '../../component/CustomButton'

export default function ShoppingBag ({navigation}) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cartReducer.products)
  useEffect(() => {
    if (totalCartItem(cartItems) === 0) {
      navigation.goBack()
    }
  }, [totalCartItem(cartItems)])
  const renderItem = ({item, index}) => {
    const cartItemIndex = findInArray(cartItems, item.id, 'id')
    const isInCart = cartItemIndex > -1 ? true : false
    const quantity = cartItems?.[cartItemIndex]?.quantity ?? 0
    return (
      <ProductCard
        productName={item.productName}
        productQuantity={item.amountPerUnit}
        imageUrl={item.uri}
        onIncrementPress={() => {
          isInCart
            ? dispatch(incrementCartItem(item.id))
            : dispatch(addItemToCart(item))
        }}
        onDecrementPress={() => {
          quantity === 1
            ? dispatch(removeItemToCart(item.id))
            : dispatch(decrementCartItem(item.id))
        }}
        quantity={quantity}
        onDeletePress={() => {
          dispatch(removeItemToCart(item.id))
        }}
      />
    )
  }
  return (
    <CustomView style={{justifyContent: 'space-between'}}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => item.id + index}
      />
      <CustomButton
        width='90%'
        bordered
        title={'Place Order'}
        borderRadius={8}
        customStyle={{marginVertical: 5, alignSelf: 'center'}}
        filled
        onPress={() => navigation.navigate('Order Information')}
      />
    </CustomView>
  )
}

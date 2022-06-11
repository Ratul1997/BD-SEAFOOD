import {View, Text, FlatList} from 'react-native'
import React from 'react'
import CustomView from '../../component/CustomView'
import {useSelector} from 'react-redux'
import ItemSeparator from '../../component/ItemSeparator'
import ProductCard from '../Porducts/ProductCard'
import {RFValue} from 'react-native-responsive-fontsize'
import {getFontFamily} from '../../helpers/styles/customStyles'
import {Colors} from '../../config/colors'

export default function OnUploading () {
  const products = useSelector(state => state.uploadedProductReducer.products)
  const renderItem = ({item, index}) => {
    return (
      <ProductCard
        productName={item.productName}
        productQuantity={item.amountPerUnit}
        imageUrl={item.path}
        onUploading={true}
      />
    )
  }
  return (
    <CustomView>
      {products.length === 0 ? (
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: RFValue(15),
            fontFamily: getFontFamily(),
            color: Colors.black,
            marginVertical: 10,
          }}>
          No Products are uploading
        </Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) => item.id + index}
        />
      )}
    </CustomView>
  )
}

import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import ItemSeparator from '../../component/ItemSeparator';
import CacheImageComponent from '../../component/CacheImageComponent';
import {Colors, theme} from '../../config/colors';
import PromiseModules from '../../helpers/PromiseModules';
import {RFValue} from 'react-native-responsive-fontsize';
import {getFontFamily} from '../../helpers/styles/customStyles';
import CustomButton from '../../component/CustomButton';
import CustomIcon from '../../component/CustomIcon';
import {findInArray} from '../../helpers/utils';
import Loading from '../../component/loader/Loading';
import {
  addItemToCart,
  decrementCartItem,
  incrementCartItem,
  removeItemToCart,
} from '../../redux/actionTypes/cartActions';
import ReviewCart from './ReviewCart';
import CustomView from '../../component/CustomView';
import {fetchAllProducts} from '../../redux/actions/productActions';

export const totalCartItem = (cartItem = []) => {
  return cartItem.reduce(function (acc, obj) {
    return acc + obj?.quantity ?? 0;
  }, 0);
};
export default function Products({navigation, route}) {
  const [productLists, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartReducer.products);

  const userInfo = useSelector(state => state.userReducer.userInfo);
  const productReducer = useSelector(state => state.productReducer);
  const [onRefresh, setRefresh] = useState(false);

  useEffect(() => {
    if (route?.params?.categoryId) {
      setProducts([
        ...getProductsByCategory(
          route?.params?.categoryId,
          productReducer?.products,
        ),
      ]);
    } else {
      setProducts([...formatedProductList(productReducer?.products)]);
    }
    if (productReducer?.isLoading === false) {
      setRefresh(false);
    }
  }, [productReducer?.products]);

  const getProductsByCategory = (categoryId, productLists = []) => {
    return productLists.filter(product => product?.category?.id === categoryId);
  };
  const onNavigate = () => {
    navigation.navigate('Shopping Bag');
  };
  const formatedProductList = (productList = []) => {
    let productBySection = [];
    productList.forEach(product => {
      if (!!product?.category) {
        const categoryIndex = findInArray(
          productBySection,
          product?.category?.id,
          'id',
        );

        if (categoryIndex > -1) {
          productBySection[categoryIndex] = {
            ...productBySection[categoryIndex],
            data: [...productBySection[categoryIndex].data, product],
          };
        } else {
          productBySection.push({
            title: product?.category?.title,
            id: product?.category?.id,
            data: [product],
          });
        }
      }
    });
    productBySection.sort((a, b) => {
      return a?.id >= b?.id;
    });
    return productBySection;
  };

  const onEditPress = item => () => {
    navigation.navigate('Edit Product', {
      item,
    });
  };
  const renderItem = ({item, index}) => {
    const cartItemIndex = findInArray(cartItems, item.id, 'id');
    const isInCart = cartItemIndex > -1 ? true : false;
    const quantity = cartItems?.[cartItemIndex]?.quantity ?? 0;

    return (
      <ProductCard
        productName={item.productName}
        productQuantity={item.amountPerUnit}
        imageUrl={item.uri}
        onIncrementPress={() => {
          isInCart
            ? dispatch(incrementCartItem(item.id))
            : dispatch(addItemToCart(item));
        }}
        onDecrementPress={() => {
          quantity === 1
            ? dispatch(removeItemToCart(item.id))
            : dispatch(decrementCartItem(item.id));
        }}
        quantity={quantity}
        onDeletePress={() => {
          dispatch(removeItemToCart(item.id));
        }}
        isAdmin={userInfo?.admin ?? false}
        onEditPress={onEditPress(item)}
      />
    );
  };
  const cartTotal = totalCartItem(cartItems);
  return (
    <CustomView>
      {productReducer?.isLoading && productLists.length === 0 ? (
        <Loading />
      ) : productReducer?.error ? (
        <Text>{productReducer.error}</Text>
      ) : route?.params?.categoryId ? (
        <FlatList
          data={productLists}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          onRefresh={() => {
            setRefresh(true);
            dispatch(fetchAllProducts());
          }}
          refreshing={onRefresh}
          keyExtractor={(item, index) => item.id + index + Date.now}
        />
      ) : (
        <SectionList
          sections={productLists}
          style={{backgroundColor: theme.backgroundColor}}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderItem}
          onRefresh={() => {
            setRefresh(true);
            dispatch(fetchAllProducts());
          }}
          refreshing={onRefresh}
          // stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={ItemSeparator}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                color: Colors.black,
                fontFamily: getFontFamily(),
                fontWeight: '700',
                fontSize: RFValue(15),
                backgroundColor: theme.backgroundColor,
              }}>
              {title}
            </Text>
          )}
        />
      )}
      {cartTotal !== 0 && (
        <ReviewCart itemTotal={cartTotal} onPress={onNavigate} />
      )}
    </CustomView>
  );
}

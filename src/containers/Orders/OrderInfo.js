import {View, Text} from 'react-native';
import React, {useState} from 'react';
import CustomView from '../../component/CustomView';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import PromiseModules from '../../helpers/PromiseModules';
import {clearCart} from '../../redux/actionTypes/cartActions';
import {storeUserInfos} from '../../redux/actions/userActions';
import {totalCartItem} from '../Porducts';

import axios from 'axios';

const inputOptions = [
  {
    id: 1,
    key: 'shopName',
    label: 'Shop Name',
    secured: false,
  },
  {
    id: 1,
    key: 'address',
    label: 'Address',
    secured: false,
  },
  {
    id: 1,
    key: 'phoneNo',
    label: 'Phone No',
    secured: false,
  },
  {
    id: 1,
    key: 'email',
    label: 'Email',
    secured: false,
  },

  {
    id: 1,
    key: 'notes',
    label: 'Notes (If any query)',
    secured: false,
    multiline: true,
    numOfLine: 5,
  },
];

const adminInputOptions = [
  {
    id: 1,
    key: 'shopName',
    label: 'Shop Name',
    secured: false,
  },
  {
    id: 1,
    key: 'address',
    label: 'Address',
    multiline: true,
    numOfLine: 5,
    secured: false,
  },
  {
    id: 1,
    key: 'phoneNo',
    label: 'Phone No',
    secured: false,
  },
];

export default function OrderInfo({navigation, route}) {
  const cartItems = useSelector(state => state.cartReducer.products);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const initialState = {
    shopName: '',
    address: '',
    phoneNo: '',
    email: '',
    notes: '',
  };
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  useState(() => {
    if (route.name === 'Profile' || !!userInfo?.uid) {
      setState({
        ...state,
        shopName: userInfo.shopName,
        address: userInfo.address,
        phoneNo: userInfo.phoneNo,
        email: userInfo.email,
      });
    }
  }, []);
  const onChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onOrder = async () => {
    const data = {
      shopName: state.shopName,
      address: state.address.trim(),
      phoneNo: state.phoneNo,
      email: state.email,
      items: [...cartItems],
      orderedOn: new Date(),
      uid: userInfo?.uid ?? null,
      notes: state.notes,
    };
    console.log(data.items);
    if (
      !state.shopName.trim() ||
      !state.address.trim() ||
      !state.phoneNo.trim() ||
      !state.email.trim()
    ) {
      return alert('Fields should not be empty!');
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const jsonData = {
      shopName: data.shopName,
      address: data.address.trim(),
      phoneNo: data.phoneNo,
      email: data.email,
      totalOrder: totalCartItem(data?.items ?? 0),
      orderedOn: data.orderedOn,
      orders: data.items.map(item => {
        return {
          productName: item.productName ?? '',
          quantity: item.quantity ?? '',
          amountPerUnit: item.amountPerUnit ?? '',
        };
      }),
    };
    try {
      setIsLoading(true);
      const res = await PromiseModules.storeDataInCollection(
        'Orders',
        null,
        data,
      );
      axios.post('http://tt.bdtrading.ie/', jsonData, headers);
      dispatch(clearCart());
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'OrderConfirm'}],
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdate = async () => {
    const data = {
      shopName: state.shopName,
      address: state.address.trim(),
      phoneNo: state.phoneNo,
      email: state.email,
    };
    setIsLoading(true);
    try {
      const res = await PromiseModules.updateDocumentsById(
        'Users',
        userInfo.uid,
        data,
      );
      dispatch(
        storeUserInfos({
          ...userInfo,
          ...data,
        }),
      );
      alert('Updated!');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <CustomTextInput
        placeholder="Type Here"
        value={state[item.key]}
        title={item.label}
        onChangeText={text => onChange(item.key, text)}
        numberOfLines={item.numOfLine}
        multiline={item?.multiline ?? false}
      />
    );
  };
  return (
    <CustomView>
      <KeyboardAwareFlatList
        data={route?.name === 'Profile' ? adminInputOptions : inputOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        ListFooterComponent={() => (
          <CustomButton
            width="90%"
            bordered
            title={route?.name === 'Profile' ? 'Update' : 'Order'}
            borderRadius={8}
            customStyle={{marginVertical: 5, alignSelf: 'center'}}
            filled
            onPress={route?.name === 'Profile' ? onUpdate : onOrder}
            isLoading={isLoading}
          />
        )}
        ListFooterComponentStyle={{
          marginVertical: 10,
        }}
      />
    </CustomView>
  );
}

import {Pressable, Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import CustomView from '../../component/CustomView';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import {getDeviceScreenInfo} from '../../config/utils';
import {Colors, theme} from '../../config/colors';
import {openImagePicker} from '../../helpers/helpers';
import {getFontFamily} from '../../helpers/styles/customStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../../component/CustomIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import CacheImageComponent from '../../component/CacheImageComponent';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import productServices from '../../services/productServices';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewItemToUpload,
  removeItemToUpload,
} from '../../redux/actions/productActions';
import {categoryOptions} from '../../constants/constants';
import PromiseModules from '../../helpers/PromiseModules';

const [WIDTH, HEIGHT] = getDeviceScreenInfo();
interface InitialStateObject {
  productName: string;
  imageUrl: string | null;
  productSubAmount: string;
  category: object;
  order: string;
}
export default function ProoductUpload({navigation, route}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const uploadedProducts = useSelector(
    state => state.uploadedProductReducer.products,
  );
  const initialState: InitialStateObject = {
    productName: '',
    productSubAmount: '',
    imageUrl: null,
    category: categoryOptions[0],
    order: '1',
  };
  const [state, setState] = useState(initialState);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    if (route?.params) {
      console.log(route.params);
      setData(route.params.item);
    }
  }, []);

  const setData = item => {
    setState({
      ...state,
      productName: item.productName,
      productSubAmount: item.amountPerUnit,
      category: item.category,
      imageUrl: item.uri,
      order: item?.order?.toString() ?? '0',
    });
  };
  const onChange = (key: string, value: string | number) => {
    setState({
      ...state,
      [key]: value,
    });
  };
  const onOpenImagePicker = async () => {
    try {
      const images = await openImagePicker(false);
      onChange('imageUrl', images.path);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async () => {
    const uploadedData = {
      path: state.imageUrl,
      productName: state.productName,
      amountPerUnit: state.productSubAmount,
      id: route.params.item.id,
      category: state.category,
      order: parseInt(state.order),
    };
    console.log(uploadedData, 'DATA');
    setIsLoading(true);
    try {
      const res = await productServices.updateProduct(
        uploadedData,
        uploadedData.id,
      );

      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
    }
  };
  const onUpload = async () => {
    const uploadedData = {
      path: state.imageUrl,
      productName: state.productName,
      amountPerUnit: state.productSubAmount,
      id: Date.now(),
      category: state.category,

      order: parseInt(state.order),
    };
    try {
      dispatch(addNewItemToUpload(uploadedData));
      const res = await productServices.uploadProduct(uploadedData);
      dispatch(removeItemToUpload(uploadedData.id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    setDeleteLoading(true);
    console.log('ONdelete');
    try {
      const res = await PromiseModules.removeDocument(
        'Products',
        route?.params?.item?.id,
      );
      setDeleteLoading(false);
      navigation.goBack();
    } catch (error) {
      setDeleteLoading(false);
    }
  };
  return (
    <CustomView>
      <KeyboardAwareScrollView
        extraScrollHeight={30}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <Pressable
          style={{
            marginVertical: 10,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: HEIGHT / 3,
            borderColor: Colors.black,
            borderWidth: 0.5,
          }}
          onPress={onOpenImagePicker}>
          {state?.imageUrl ? (
            <View style={{width: '100%', height: '100%'}}>
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

        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text
            style={{
              color: 'black',
              marginVertical: 5,
              fontFamily: getFontFamily(),
              width: '90%',
            }}>
            Category
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginVertical: 1,
            borderColor: Colors.black,
            borderWidth: 0.6,
            borderRadius: 5,
          }}>
          <Picker
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
            }}
            selectedValue={state.category}
            onValueChange={(itemValue, itemIndex) => {
              onChange('category', itemValue);
            }}>
            {categoryOptions.map((option, key) => {
              return (
                <Picker.Item
                  label={option.title}
                  value={option}
                  key={key}
                  style={{
                    color: 'black',
                    fontFamily: getFontFamily(),
                    backgroundColor: 'white',
                  }}
                />
              );
            })}
          </Picker>
        </View>
        <CustomTextInput
          Icon={null}
          title="Product Name"
          placeholder="Type Here"
          value={state.productName}
          onChangeText={text => onChange('productName', text)}
        />
        <CustomTextInput
          Icon={null}
          title="Box Size"
          placeholder="Type Here"
          value={state.productSubAmount}
          onChangeText={text => onChange('productSubAmount', text)}
        />
        <CustomTextInput
          Icon={null}
          title="Order"
          placeholder="Type Here"
          value={state.order}
          onChangeText={text => onChange('order', text)}
        />

        <CustomButton
          width="90%"
          bordered
          title={route?.params ? 'Update' : 'Upload'}
          borderRadius={8}
          customStyle={{marginVertical: 5, alignSelf: 'center'}}
          filled
          isLoading={isLoading}
          onPress={
            route?.params
              ? onUpdate
              : () => {
                  onUpload();
                  navigation.goBack();
                }
          }
        />
        {route?.params && (
          <CustomButton
            width="90%"
            bordered
            title={'Delete'}
            borderRadius={8}
            customStyle={{
              marginVertical: 5,
              alignSelf: 'center',
              backgroundColor: 'red',
            }}
            filled
            isLoading={isDeleteLoading}
            onPress={onDelete}
          />
        )}
      </KeyboardAwareScrollView>
    </CustomView>
  );
}

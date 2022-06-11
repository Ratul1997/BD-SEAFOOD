import React, {useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './Porducts';
import firestore from '@react-native-firebase/firestore';
import ProoductUpload from './Admin/ProoductUpload';
import ShoppingBag from './Orders/ShoppingBag';
import CustomDrawerNav from '../component/CustomDrawerNav';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {leftSideBarOptions} from '../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllProducts} from '../redux/actions/productActions';
import OrderInfo from './Orders/OrderInfo';
import AdminPage from './Admin';
import OnUploading from './Admin/OnUploading';
import Orders from './Admin/Orders';
import UploadOffers from './Admin/UploadOffers';
import Login from './auth/Login';
import Register from './auth/Register';
import {Colors} from '../config/colors';
import CustomIcon from '../component/CustomIcon';
import {shadows} from '../helpers/styles/customStyles';
import PromiseModules from '../helpers/PromiseModules';
import {platform} from 'os';
import OrderConfirmation from './Orders/OrderConfirmation';
import ForgetPassword from './auth/ForgetPassword';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminStack">
      <Stack.Screen
        name="AdminStack"
        component={AdminPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Products">
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );
};

function DrawerStack() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer.userInfo);

  const [helpCenterNumber, setNumber] = useState('');
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const onFetchData = async () => {
    try {
      const res = await PromiseModules.getDataByCollection(
        'PhoneNumber',
        null,
        null,
      );
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${res?.[0]?.number ?? ''}`;
      } else {
        phoneNumber = `telprompt:${res?.[0]?.number ?? ''}`;
      }

      Linking.openURL(phoneNumber);
      console.log(helpCenterNumber);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerNav {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: Colors.lightBlack,
        drawerInactiveTintColor: Colors.lightBlack,
      }}

      // drawerPosition="left"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerStyle: {
            elevation: 10,
            shadowOpacity: 1,
            shadowColor: Colors.black,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: Colors.white,
                marginRight: 10,
              }}
              onPress={() => {
                onFetchData();
              }}>
              <CustomIcon name="ic_help_center" size={30} />
            </TouchableOpacity>
          ),
        }}
      />
      {userInfo?.admin === true && (
        <Drawer.Screen
          name="Admin"
          component={AdminStack}
          options={{
            headerStyle: {
              elevation: 10,
              shadowOpacity: 1,
              shadowColor: Colors.black,
            },
          }}
        />
      )}
      {leftSideBarOptions.map(sideBar => {
        return sideBar?.authorized === true ? (
          userInfo?.uid ? (
            <Drawer.Screen
              name={sideBar.title}
              component={sideBar.component}
              key={sideBar.id}
              initialParams={{
                categoryId: sideBar.id,
                categoryTitle: sideBar.title,
              }}
              options={{
                headerStyle: {
                  elevation: 10,
                  shadowOpacity: 1,
                  shadowColor: Colors.black,
                },
              }}
            />
          ) : null
        ) : (
          <Drawer.Screen
            name={sideBar.title}
            component={sideBar.component}
            key={sideBar.id}
            initialParams={{
              categoryId: sideBar.id,
              categoryTitle: sideBar.title,
            }}
            options={{
              headerStyle: {
                elevation: 10,
                shadowOpacity: 1,
                shadowColor: Colors.black,
              },
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerStack">
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Order Information" component={OrderInfo} />
      <Stack.Screen name="Shopping Bag" component={ShoppingBag} />
      <Stack.Screen name="Product Upload" component={ProoductUpload} />
      <Stack.Screen name="Offer Upload" component={UploadOffers} />
      <Stack.Screen name="Edit Product" component={ProoductUpload} />
      <Stack.Screen name="Uploading" component={OnUploading} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={OrderInfo} />
      <Stack.Screen name="Forget Password" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

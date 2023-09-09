import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StatusBar }from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Account from './Account/Account';
import Home from './Home/Home';
import Products from './Products/Products';
import Res from './Account/Res';
import Id from './Account/Id';
import Bank from './Account/Bank';
import Designer from './Account/Designer';
import Signup from './Login/Signup';
import Login from './Login/Login';
import Forgot from './Login/Forgot';
import AuthLoading from './Login/Authloading';
import Items from './Home/Items';
import Views from './Home/Views';
import Approved from './Products/Approved';
import Pending from './Products/Pending';
import Rejected from './Products/Rejected';
import Item from './Products/Item';
import Orders from './Orders/Orders';
import ApprovedO from './Orders/Approved';
import PendingO from './Orders/Pending';
import RejectedO from './Orders/Rejected';
import Complete from './Orders/Complete';
import Sent from './Orders/Sent';
import Item_M from './Orders/Item/Item_M';
import Item_D from './Orders/Item/Item_D';
import Item_S from './Orders/Item/Item_S';
import Privacy from './Settings/Privacy';
import Customer from './Settings/Customer';
import Terms from './Settings/Terms';
import Refund from './Settings/Refund';
import Admin from './Admin/Admin';
import * as SecureStore from 'expo-secure-store';

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 200, resizeMode: 'contain' }}
      source={require ('./images/header.png')}
    />
  );
}

function LogoTitlee() {
  return (
    <Image
      style={{ width: 200, height: 200, resizeMode: 'contain' }}
      source={require ('./images/admin.png')}
    />
  );
}

const HomeStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const SentStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
      <HomeStack.Navigator screenOptions = {{ headerShown: false }}>
        <HomeStack.Screen name = "Home" component = {Home} />
        <HomeStack.Screen name = "Items" component = {Items} />
        <HomeStack.Screen name = "Views" component = {Views} />
      </HomeStack.Navigator>
    )
}

const ProductsStackScreen = () => {
  return (
      <ProductsStack.Navigator screenOptions = {{ headerShown: false }}>
        <ProductsStack.Screen name = "Products" component = {Products} />
        <ProductsStack.Screen name = "Approved" component = {Approved}/>
        <ProductsStack.Screen name = "Pending" component = {Pending} />
        <ProductsStack.Screen name = "Rejected" component = {Rejected} />
        <ProductsStack.Screen name = "Item" component = {Item} />
      </ProductsStack.Navigator>
  )
}

const AccountStackScreen = () => {
  return (
      <AccountStack.Navigator screenOptions = {{ headerShown: false }}>
          <AccountStack.Screen name = "Account" component = {Account}/>
          <AccountStack.Screen name = "Res" component = {Res} />
          <AccountStack.Screen name = "Id" component = {Id} />
          <AccountStack.Screen name = "Bank" component = {Bank} />
          <AccountStack.Screen name = "Designer" component = {Designer}/>
      </AccountStack.Navigator>
  )
}

const OrdersStackScreen = () => {
  return(
      <OrdersStack.Navigator screenOptions = {{ headerShown: false }}>
        <OrdersStack.Screen name = "Orders" component = {Orders}/>
        <OrdersStack.Screen name = "Approved" component = {ApprovedO}/>
        <OrdersStack.Screen name = "Pending" component = {PendingO}/>
        <OrdersStack.Screen name = "Rejected" component = {RejectedO}/>
        <OrdersStack.Screen name = "Complete" component = {Complete}/>
        <OrdersStack.Screen name = "Item_M" component = {Item_M}/>
        <OrdersStack.Screen name = "Item_D" component = {Item_D}/>
        <OrdersStack.Screen name = "Item_S" component = {Item_S}/>
      </OrdersStack.Navigator>
  )
}

const SettingsStackScreen = ({ route }) => {
  return (
      <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
        <SettingsStack.Screen name = "Customer" component = {Customer} />
        <SettingsStack.Screen name = "Privacy" component = {Privacy} />
        <SettingsStack.Screen name = "Refund" component = {Refund} />
        <SettingsStack.Screen name = "Terms" component = {Terms} />
      </SettingsStack.Navigator>

  )
}

const AdminStackScreen = () => {
  return (
    <AdminStack.Navigator screenOptions = {{ headerShown: false }}>
      <AdminStack.Screen name = "Admin" component = {Admin}/>
    </AdminStack.Navigator>
  )
}

const SentStackScreen = () => {
  return (
    <SentStack.Navigator screenOptions = {{ headerShown: false }}>
      <SentStack.Screen name = 'Sent' component = {Sent}/>
      <SentStack.Screen name = 'Item_D' component = {Item_D}/>
    </SentStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const MyTab = () => {
  return(
      <Tab.Navigator
        screenOptions = {({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') 
          {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }  
          else if (route.name === 'Account') 
          {
            iconName = focused 
            ? 'person' 
            : 'person-outline';
          }
          else if (route.name === 'Products') 
          {
            iconName = focused 
            ? 'layers' 
            : 'layers-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Products" 
        component={ProductsStackScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => { 
  const [id, setId] = useState('');

    useEffect(() => {
      const fetchid = async() => {
        const userid = await SecureStore.getItemAsync('supplier');
        setId(userid);
      };
        
      fetchid();
    
  }, []);

  if(id == 'mlangenisamu@gmail.com')
  {
    return (
      <Drawer.Navigator useLegacyImplementation
        screenOptions = {{drawerInactiveBackgroundColor: 'black' , drawerInactiveTintColor: '#e6c2bf', drawerActiveTintColor: 'black', drawerActiveBackgroundColor: '#e6c2bf', drawerStyle: {backgroundColor: '#e6c2bf'}}}>
        <Drawer.Screen name={ 'Home' } component={MyTab}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
        <Drawer.Screen name={ 'Orders' } component={OrdersStackScreen}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
          <Drawer.Screen name={ 'Sent/Delivered' } component={SentStackScreen}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
          <Drawer.Screen name={ 'Customer Service' } component={SettingsStackScreen} 
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
          <Drawer.Screen name={ 'Admin' } component={AdminStackScreen} 
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitlee {...props} />,
          headerTitleAlign: 'center',
          }}/>
      </Drawer.Navigator>
    );
  }
  else
  {
    return (
      <Drawer.Navigator useLegacyImplementation
        screenOptions = {{drawerInactiveBackgroundColor: 'black' , drawerInactiveTintColor: '#e6c2bf', drawerActiveTintColor: 'black', drawerActiveBackgroundColor: '#e6c2bf', drawerStyle: {backgroundColor: '#e6c2bf'}}}>
        <Drawer.Screen name={ 'Home' } component={MyTab}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
        <Drawer.Screen name={ 'Orders' } component={OrdersStackScreen}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
          <Drawer.Screen name={ 'Sent/Delivered' } component={Sent}
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          }}/>
          <Drawer.Screen name={ 'Customer Service' } component={SettingsStackScreen} 
          options={{ headerStyle: { height: 100},
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
         }}/>
      </Drawer.Navigator>
    );
  }
}

const LoginStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name = "Signup" component = {Signup} />
        <AuthStack.Screen name = "Login" component = {Login} />
        <AuthStack.Screen name = "Forgot" component = {Forgot} />
        <AuthStack.Screen name = "View" component = {MyDrawer} />
      </AuthStack.Navigator>
    )
}

const LoginStackScreen = () => {
  return (
      <LoginStack.Navigator screenOptions={{ headerShown: false }}>
        <LoginStack.Screen name = "Check" component = {AuthLoading} />
        <LoginStack.Screen name = "Auth" component = {AuthStackScreen} />
        <LoginStack.Screen name = "View" component = {MyDrawer} />
      </LoginStack.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={'white'}/>
          <LoginStackScreen/>
        </NavigationContainer>
    );
};

export default App;
import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home/Home';
import Approved from './Home/Approved';
import Pending from './Home/Pending';
import Rejected from './Home/Rejected';
import Item from './Home/Items/Item';
import Destination from './Details/Destination';
import Delivery from './Delivery/Delivery';
import ApprovedD from './Delivery/Approved';
import Received from './Delivery/Received';
import SentD from './Delivery/Sent';
import Item_D from './Delivery/Item/Item_D';
import Item_S from './Delivery/Item/Item_S';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz1NwWgjC9U4CU7nRcWtwVp6aBkOIhN_Q",
  authDomain: "malgre-business.firebaseapp.com",
  projectId: "malgre-business",
  storageBucket: "malgre-business.appspot.com",
  messagingSenderId: "9807951283",
  appId: "1:9807951283:web:b841f4d997e169da6e87c6",
  measurementId: "G-3JJFPCV0H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const DetailsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const DeliveryStack = createNativeStackNavigator();

const DetailsStackScreen = () => {
  return (
      <DetailsStack.Navigator screenOptions={{ headerShown: false }}>
          <DetailsStack.Screen name = "Destination" component = {Destination}/>
      </DetailsStack.Navigator>
  )
}

const HomeStackScreen = ({ route }) => {
  return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name = "Home" component = {Home} />
        <HomeStack.Screen name = "Approved" component = {Approved} />
        <HomeStack.Screen name = "Pending" component = {Pending} />
        <HomeStack.Screen name = "Rejected" component = {Rejected} />
        <HomeStack.Screen name = "Item" component = {Item} />
      </HomeStack.Navigator>
    )
}

const DeliveryStackScreen = ({route}) => {
  return (
      <DeliveryStack.Navigator screenOptions={{ headerShown: false }}>
        <DeliveryStack.Screen name = "Delivery" component = {Delivery} />
        <DeliveryStack.Screen name = "Approved" component = {ApprovedD} />
        <DeliveryStack.Screen name = "Received" component = {Received} />
        <DeliveryStack.Screen name = "Sent" component = {SentD} />
        <DeliveryStack.Screen name = "Item_D" component = {Item_D} />
        <DeliveryStack.Screen name = "Item_S" component = {Item_S} />
      </DeliveryStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const MyTab = ({ route }) => {
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
          else if (route.name === 'Delivery') 
          {
            iconName = focused 
            ? 'cube' 
            : 'cube-outline';
          }
          else if (route.name === 'Destination') 
          {
            iconName = focused 
            ? 'file-tray-full' 
            : 'file-tray-full-outline';
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
        name="Delivery" 
        component={DeliveryStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Destination" 
        component={DetailsStackScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Admin = () => {
    return (
      <MyTab/>
    );
};

export default Admin;
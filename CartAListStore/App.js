/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables, {VARIABLES} from './utils/Variables';

import AuthScreen from './screens/AuthScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import BossHome from './screens/BossHome';
import BossStaff from './screens/BossStaff';
import AddItemScreen from './screens/AddItemScreen';
import AddItemScreenNBC from './screens/AddItemScreenNBC';

import ConfirmItemsScreen from './screens/ConfirmItemsScreen';
import EditOneItem from './screens/EditOneItem';
import EditOneItemNBC from './screens/EditOneItemNBC';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const AddiStack = createStackNavigator();
const BossStack = createStackNavigator();
const NOBarAddiStack = createStackNavigator();

const BossTabStuff = createBottomTabNavigator();
const AddTabStuff = createBottomTabNavigator();

function BossHomeStack() {
  return (
    <BossStack.Navigator>
      <BossStack.Screen name="Home" component={BossHome} />
    </BossStack.Navigator>
  );
}

function AddItemStack() {
  return (
    <AddiStack.Navigator>
      <AddiStack.Screen
        options={{headerShown: false}}
        name="Add-Item"
        component={AddItemScreen}
      />
      <AddiStack.Screen
        options={{headerTitle: 'Confirm'}}
        name="ItemsConfirm"
        component={ConfirmItemsScreen}
      />
      <AddiStack.Screen
        options={{headerTitle: 'Edit'}}
        name="EditOneItem"
        component={EditOneItem}
      />
    </AddiStack.Navigator>
  );
}

function AddItemNOBCStack() {
  return (
    <NOBarAddiStack.Navigator>
      <NOBarAddiStack.Screen
        options={{headerShown: false}}
        name="Add-ItemNBC"
        component={AddItemScreenNBC}
      />
      <NOBarAddiStack.Screen
        options={{headerTitle: 'Edit'}}
        name="EditOneItemNBC"
        component={EditOneItemNBC}
      />
    </NOBarAddiStack.Navigator>
  );
}

function BossStaffStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Staff" component={BossStaff} />
    </Stack.Navigator>
  );
}

function BossTab() {
  return (
    <BossTabStuff.Navigator>
      <BossTabStuff.Screen name="Home" component={BossHomeStack} />
      <BossTabStuff.Screen name="Staff" component={BossStaffStack} />
    </BossTabStuff.Navigator>
  );
}

function StaffTab() {
  return (
    <BossTabStuff.Navigator>
      <BossTabStuff.Screen name="Store" component={BossStaffStack} />
      <BossTabStuff.Screen name="Check-Out" component={BossStaffStack} />
      <BossTabStuff.Screen name="Add-Item" component={AddItemStuff} />
      <BossTabStuff.Screen name="Returns" component={BossHomeStack} />
    </BossTabStuff.Navigator>
  );
}

function AddItemStuff() {
  return (
    <AddTabStuff.Navigator>
      <AddTabStuff.Screen
        options={{tabBarVisible: false}}
        name="Barcode"
        component={AddItemStack}
      />
      <AddTabStuff.Screen
        options={{tabBarVisible: false}}
        name="NoBarcode"
        component={AddItemNOBCStack}
      />
    </AddTabStuff.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{tabBarVisible: false}}
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
        <Tab.Screen
          options={{tabBarVisible: false}}
          name="AuthScreen"
          component={AuthScreen}
        />
        <Tab.Screen
          options={{tabBarVisible: false}}
          name="SignupScreen"
          component={SignupScreen}
        />
        <Tab.Screen
          options={{tabBarVisible: false}}
          name="Boss"
          component={BossTab}
        />
        <Tab.Screen
          options={{tabBarVisible: false}}
          name="Staff"
          component={StaffTab}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

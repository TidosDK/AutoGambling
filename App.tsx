import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MyComponent from './components/utils/debug/TestComponent';
import ProductList from './components/product/productList';
import ProductView from './components/product/productView';
import UserList from './components/utils/debug/UserList';
import ProceedPage from './components/product/proceedPage';
import PaymentScreen from './components/payment/PaymentScreen';
import SpinTab from './components/spin/SpinTab';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function ProductStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductView" component={ProductView} />
        <Stack.Screen name="ProceedPage" component={ProceedPage} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductStackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="Spin" component={SpinTab} />
        <Tab.Screen name="Debug (User List)" component={UserList} />
        <Tab.Screen name="Debug (Create User)" component={MyComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

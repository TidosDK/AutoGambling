import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MyComponent from './components/TestComponent';
import ProductList from './components/product/productList';
import ProductView from './components/product/productView';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function ProductStackNavigator(){
      return (
        <Stack.Navigator>
          <Stack.Screen name="Product List" component={ProductList} />
          <Stack.Screen name="Product View" component={ProductView} />
        </Stack.Navigator>
      )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductStackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="MyComponent2" component={MyComponent} />
        <Tab.Screen name="MyComponent3" component={MyComponent} />
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

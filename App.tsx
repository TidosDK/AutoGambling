import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MyComponent from './components/TestComponent';
import CarList from './components/utils/CarList';
import UserList from './components/utils/UserList';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Debug (Car List)" component={CarList} />
        <Tab.Screen name="Debug (User List)" component={UserList} />
        <Tab.Screen name="MyComponent1" component={MyComponent} />
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

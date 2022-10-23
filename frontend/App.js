import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/components/profileuser';
const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>    
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
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

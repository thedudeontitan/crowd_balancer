import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileUser from './src/components/profileuser';
import ProfileClg from './src/components/profileclg';
const Tab = createBottomTabNavigator();


export default function App() {
  const [isCollege, setIsCollege] = useState(false);
  return(
    <NavigationContainer>    
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={isCollege ? ProfileClg : ProfileUser} />
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

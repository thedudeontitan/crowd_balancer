import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileUser from './src/components/profileuser';
import ProfileClg from './src/components/profileclg';
import Locationform from './src/components/locationform';

import Floor from './src/components/floor';

const Tab = createBottomTabNavigator();

const DATA = [
  {
      floors: [
          {
              floor_no: "LIB_NO1",
              id: 1,
              total_capacity: 200,
              total_peoplr: 0
          }
      ],
      id: 1,
      name: "Library"
  },
  {
      floors: [
          {
              floor_no: "MESS_NO1",
              id: 2,
              total_capacity: 200,
              total_peoplr:100
          }
      ],
      id: 2,
      name: "MESS"
  }
]

export default function App() {
  const [isCollege, setIsCollege] = useState(false);
  return(
    <NavigationContainer>    
          <Tab.Navigator>
            <Tab.Screen name="Home">
              {props => <Home {...props} DATA={DATA}/>}
            </Tab.Screen>
            <Tab.Screen name="Floor">
              {props => <Floor {...props} DATA={DATA}/>}
            </Tab.Screen>

            <Tab.Screen name="Profile" component={isCollege ? ProfileClg : ProfileUser} />
            
            <Tab.Screen name="Locationform" component={Locationform}/>
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

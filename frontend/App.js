import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './routes/Home';
import Location from './routes/Location';
import ProfileUser from './routes/Profile';
import Floor from './routes/Floor';
import UserLogIn from './routes/Login';

import ContextProvider from './context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='UserLogIn' component={UserLogIn} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Location' component={Location} options={{headerTitle:"Current Crowd"}}/>
          <Stack.Screen name='Floor' component={Floor} options={{headerTitle:"Floor"}}/>
          <Stack.Screen name='ProfileUser' component={ProfileUser} options={{headerTitle:"Profile"}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

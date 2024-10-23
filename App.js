// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuranScreen from './screens/QuranScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Quran" 
          component={QuranScreen} 
          options={{ headerShown: false }} // Hide default header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

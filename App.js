import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from './src/screens/Screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="IoT_AR" 
          component={Screen} 
          options={{ title: 'MONITOREO UDB' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import PasswordManager from './screens/PasswordManager';
import AddPasswordScreen from './screens/AddPasswordScreen';
import PasswordDetails from './screens/PasswordDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PassVault">
        <Stack.Screen 
          name="PassVault" 
          component={LoginScreen} 
          options={{ headerTitle: "PassVault" }} 
        />
        <Stack.Screen 
          name="PasswordManager" 
          component={PasswordManager} 
          options={{ headerTitle: "PassVault" }} 
        />
        <Stack.Screen 
        name="AddPassword" 
        component={AddPasswordScreen}
        options={{ headerTitle: "Add a password" }} />
        <Stack.Screen 
        name="PasswordDetails" 
        component={PasswordDetails}
        options={{ headerTitle: "Password Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// app/(tabs)/_layout.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../components/WelcomeScreen';
import SignInComponent from '../components/SignInComponent';
import SignUpForm from '../components/SignUpForm';
import HomeScreen from '../screens/HomeScreen';
import AppNavigator from '../navigation/AppNavigator'; // Import your main app navigator

const Stack = createStackNavigator();

const Layout: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInComponent} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpForm" component={SignUpForm} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Layout;

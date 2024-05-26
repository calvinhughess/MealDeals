// app/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ClaimedDealsScreen from '../screens/ClaimedDealsScreen';
import DealDetailsScreen from '../screens/DealDetailsScreen';


const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Deals" component={DealDetailsScreen} />
      <Tab.Screen name="ClaimedDeals" component={ClaimedDealsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import ExploreScreen from './screens/Explore/ExploreScreen';
import MapsScreen from './screens/Maps/MapsScreen';
import PricesToolsScreen from './screens/PricesTools/PricesToolsScreen';
import SafetyCommsScreen from './screens/SafetyComms/SafetyCommsScreen';
import ReportPriceScreen from './screens/Report/ReportPriceScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#64748b',
            headerStyle: {
              backgroundColor: '#2563eb',
            },
            headerTintColor: '#fff',
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
            },
          }}
        >
          <Tab.Screen 
            name="Explore" 
            component={ExploreScreen}
            options={{
              title: 'Explore',
              tabBarIcon: ({ color, size }) => (
                <Icon name="compass" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Maps" 
            component={MapsScreen}
            options={{
              title: 'Maps',
              tabBarIcon: ({ color, size }) => (
                <Icon name="map-marker" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="PricesTools" 
            component={PricesToolsScreen}
            options={{
              title: 'Prices & Tools',
              tabBarIcon: ({ color, size }) => (
                <Icon name="currency-usd" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="SafetyComms" 
            component={SafetyCommsScreen}
            options={{
              title: 'Safety & Comms',
              tabBarIcon: ({ color, size }) => (
                <Icon name="shield-check" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Report" 
            component={ReportPriceScreen}
            options={{
              title: 'Report Price',
              tabBarIcon: ({ color, size }) => (
                <Icon name="plus-circle" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

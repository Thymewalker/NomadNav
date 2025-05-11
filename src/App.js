import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/Home/HomeScreen';
import ReportPriceScreen from './screens/Home/ReportPriceScreen';
import SimplePlaceholderScreen from './screens/Common/PlaceholderScreen';

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
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'NomadNav',
            }}
          />
          <Tab.Screen 
            name="Report" 
            component={ReportPriceScreen}
            options={{
              title: 'Report Price',
            }}
          />
          <Tab.Screen 
            name="Guides" 
            component={SimplePlaceholderScreen}
            options={{
              title: 'Travel Guides',
            }}
          />
          <Tab.Screen 
            name="Prices" 
            component={SimplePlaceholderScreen}
            options={{
              title: 'Price Database',
            }}
          />
          <Tab.Screen 
            name="Trusted" 
            component={SimplePlaceholderScreen}
            options={{
              title: 'Trusted Contacts',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

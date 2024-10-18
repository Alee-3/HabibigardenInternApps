import React from 'react';
import { Platform, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from './screens/home';
import Table from './screens/Table';  // Pastikan ini benar-benar sesuai dengan file Table.js kamu

import { IconCode } from 'tabler-icons-react-native'; // Hanya ikon yang digunakan

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// Pindahkan definisi BottomTabStack ke luar fungsi komponen render
const BottomTabStack = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingTop: Platform.OS === 'ios' ? insets.top : null,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'android' ? 8 : null,
          fontFamily: 'Metropolis-SemiBold',
          fontSize: 11,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom / 2 : null,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'android' ? 5 : null,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom / 2 : null,
        },
        tabBarIcon: ({ focused }) => (
          <IconCode size={28} color={focused ? '#2ab7a8' : '#aaa'} />
        ),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Beranda Project',
        }}
      />
    </BottomTab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabStack} />
      <Stack.Screen name="Table" component={Table} />
    </Stack.Navigator>
  );
};

export default function AppRoute() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

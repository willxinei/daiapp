import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import AppProvider from './src/hooks';

export default function App() {
   return (
      <NavigationContainer>
         <AppProvider>
            <View style={{ flex: 1 }}>
               <StatusBar hidden />
               <Routes />
            </View>
         </AppProvider>
      </NavigationContainer>
   );
}

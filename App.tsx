/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductList } from './screens/productlist';
import { ProductDetails } from './screens/productdetails';
import { Cart } from './screens/cart';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {

  return (
 <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Products' component={ProductList} 
          options={{headerShown:false}} />
          <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={{headerShown:false}} />
          <Stack.Screen name='Cart' component={Cart} 
          options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

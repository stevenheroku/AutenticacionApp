

import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductScreen } from '../screens/ProductScreen';

export type ProductsStackParams ={
    ProductsScreen: undefined;
    ProductScreen:{id?:string,name?:string,imag?:string};
}

const Stack = createStackNavigator<ProductsStackParams>();

export const ProductsNavigator = () => {

    return (
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor:'white'
          },
        }}>
          <>
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            </>
      </Stack.Navigator>
    );
}

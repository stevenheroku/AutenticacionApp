import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {StatusBar} from 'react-native';
import {PruebaScreen} from '../screens/PruebaScreen';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';
import {LoadingScreen} from '../screens/LoadingScreen';
import {ProductsNavigator} from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {},
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="ProductsNavigator"
            component={ProductsNavigator}
          />
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

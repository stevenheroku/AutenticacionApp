import React, {createContext, useEffect, useReducer} from 'react';
import {LoginData, LoginResponse, RegisterData, Usuario} from '../interfaces/Usuario';
import {authReducer, AuthState} from './authReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  errorMessage: string | null;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';
  signUp: (registerData:RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token2 = await AsyncStorage.getItem('token');

      // No hay token, no autenticado
      if (!token2) {
        return dispatch({type: 'notAuthenticated'});
      }

      // Verificar si existe un token válido
      const resp = await cafeApi.get('/auth/login');

      // Verificar si la respuesta es exitosa (código 200)
      if (resp.status === 200) {
        dispatch({
          type: 'signUp',
          payload: {token: resp.data.token, user: resp.data.usuario},
        });
      } else {
        // La respuesta no fue exitosa, manejar el error
        console.log('Error al verificar el token:', resp.data);
        dispatch({type: 'notAuthenticated'});
      }
    } catch (error) {
      // Error al realizar la verificación, manejar la excepción
      console.log('Error al verificar el token:', error);
      dispatch({type: 'notAuthenticated'});
    }
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
      console.log(resp.data.token);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // El código de estado es 400 (Bad Request)
        console.log(error.response.data.msg);
        dispatch({
          type: 'addError',
          payload: error.response.data.msg || 'Informacion Incorrecta',
        });
        // Puedes manejar el error de alguna manera específica para el código de estado 400 aquí
      } else {
        // Otro tipo de error
        console.log('Error:', error);
      }
    }
  };


  
  const signUp =async ({nombre,correo,password}:RegisterData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
      console.log(resp.data.token);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // El código de estado es 400 (Bad Request)
        console.log(error.response.data);
        dispatch({
          type: 'addError',
          payload: error.response.data.errors[0].msg || 'Informacion Incorrecta',
        });
        // Puedes manejar el error de alguna manera específica para el código de estado 400 aquí
      } else {
        // Otro tipo de error
        console.log('Error:', error.response.data);
      }
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

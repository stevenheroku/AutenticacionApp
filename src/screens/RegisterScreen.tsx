import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {loginStyles} from '../themes/loginTheme';
import {Logo} from '../components/Logo';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {Background} from '../components/Background';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {signUp,errorMessage,removeError} = useContext(AuthContext);

  const {nombre,email, password, form, onChange} = useForm({
    nombre:'',
    email: '',
    password: '',

  });

  useEffect(() => {
    if (errorMessage?.length === 0) return;
  
    Alert.alert(
      'Registro Incorrecto',
      errorMessage?.toString(),
      [
        {
          text: 'OK',
          onPress: removeError,
        },
      ]
    );
  }, [errorMessage]);
  const registrarme = () => {
    console.log({nombre,email, password});
    Keyboard.dismiss();
    signUp({nombre,correo:email,password})
  };

  return (
    <>
      {/**BACKGROUND */}

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/**keyboard */}
        <View style={loginStyles.formContainer}>
          <Logo />

          <Text style={loginStyles.title}>Register</Text>
          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder="Ingrese su nombre:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={loginStyles.inputField}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'nombre')}
            value={nombre}
            onSubmitEditing={registrarme}
          />
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={loginStyles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={registrarme}
          />
          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="******"
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={loginStyles.inputField}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={registrarme}
          />

          {/**BOTON LOGIN */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={registrarme}>
              <Text style={loginStyles.buttonText}>Registrarme</Text>
            </TouchableOpacity>
          </View>

          {/**CREAR UNA NUEVA CUENTA */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('LoginScreen')}
              style={loginStyles.buttonSalir}
              >
              <Text style={loginStyles.buttonText
              }>Login</Text>
            </TouchableOpacity>
          </View>


        </View>
      </KeyboardAvoidingView>
    </>
  );
};

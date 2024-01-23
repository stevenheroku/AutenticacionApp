import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import {Logo} from '../components/Logo';
import {loginStyles} from '../themes/loginTheme';
import {TextInput} from 'react-native-gesture-handler';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn,errorMessage,removeError} = useContext(AuthContext);

  const {email, password, form, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage?.length === 0) return;
  
    Alert.alert(
      'Login Incorrecto',
      errorMessage?.toString(),
      [
        {
          text: 'OK',
          onPress: removeError,
        },
      ]
    );
  }, [errorMessage]);
  

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({correo: email, password: password});
  };
  return (
    <>
      {/**BACKGROUND */}
      <Background />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/**keyboard */}
        <View style={loginStyles.formContainer}>
          <Logo />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            style={loginStyles.inputField}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
          />

          {/**BOTON LOGIN */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
              
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/**CREAR UNA NUEVA CUENTA */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Nueva Cuenta </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

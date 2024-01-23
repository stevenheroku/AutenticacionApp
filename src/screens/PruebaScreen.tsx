import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export const PruebaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
      <Text style={styles.label}>Tipo de documento</Text>
      <View style={styles.pickerContainer}>
        <TextInput style={styles.input} placeholder="DPI" />
      </View>
      <Text style={styles.label}>Número de documento</Text>
      <TextInput style={styles.input} placeholder="Número de documento" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>POWERED BY BANTRABⓇ</Text>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
 title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
 },
 label: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
 },
 input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingLeft: 10,
 },
 button: {
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    padding: 10,
    marginTop: 10,
    width: '80%',
 },
 buttonText: {
    color: 'white',
    fontSize: 16,
 },
 footer: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
 },
 pickerContainer: {
  borderColor: 'gray',
  borderWidth: 1,
  width: '80%',
  marginBottom: 10,
},
});

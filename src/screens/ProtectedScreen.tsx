import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { showMessage } from 'react-native-flash-message'

export const ProtectedScreen = () => {

  const {user,token,logOut} = useContext(AuthContext)
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <Button
        onPress={() => {
          /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
          showMessage({
            message: "Simple message",
            type: "info",
          });
        }}
        title="Request Details"
        color="#841584"
      />
        <Button
          title='Logout'
          onPress={logOut}
        />

        <Text>{JSON.stringify(user,null,5)}</Text>

        <Text>{JSON.stringify(token,null,5)}</Text>

    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    title:{
      fontSize:20,
      marginBottom:20
    }
});
import React from 'react'
import { Image, View } from 'react-native'

export const Logo = () => {
  return (
    <View>
        <Image
        source={require('../assets/logo.png')}
        style={{
            borderRadius:60,
            opacity:0.9,
            alignItems:'center',
        }}
        />
    </View>
  )
}

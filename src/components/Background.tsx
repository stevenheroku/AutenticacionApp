import React from 'react';
import { Dimensions, View } from 'react-native';

const { height, width } = Dimensions.get('window');

export const Background = () => {
  return (
    <View style={{
        position: 'absolute',
        backgroundColor: '#5856D6',
        width: width +250,
        height: height + 250,  // Aumentar la altura para cubrir completamente el cuadro morado
        top: -150,  // Ajustar la posición hacia arriba para centrar el cuadro morado
        transform: [{ rotate: '-70deg' }]
    }}>
    </View>
  );
};

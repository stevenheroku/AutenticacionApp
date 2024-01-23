import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {

  const [selectedImage, setSelectedImage] = useState<string>();

  // Accede a los parámetros enviados desde ProductsScreen
  const {id = '', name = '', imag} = route.params;

  const {isLoading, categories} = useCategories();

  const {loadProductById,addProduct,updateProduct,loadProducts,uploadImage} = useContext(ProductsContext);

 
  const {_id, categoryId, nombre, img, form, onChange, setFormValue} = useForm({
    _id: id,
    categoryId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      //sirve para cambiar el title del navbar del navigator, si deseo que sea flexible el encabezado dependiendo la navegacion
      title: (nombre) ? nombre : 'Nuevo Producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;

    const product = await loadProductById(id);
    console.log(product);
    setFormValue({
      _id: id,
      categoryId: product.categoria._id,
      nombre,
      img: product.img || '',
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoryId,nombre,id);
    } else {
      const newProduct = await addProduct(categoryId,nombre);
      onChange(newProduct._id,'_id');
    }
  };

  const uploadImage2 = async()=>{

    if (id.length === 0) return;
    const newProduct = await uploadImage(categoryId,nombre);

  }

  const openCamera = () => {

    launchCamera( {
      mediaType: 'photo',
      quality: 0.5,
    }, (response) => {
      handleImagePickerResponse(response);
      uploadImage(response,_id);
    });
  };

  const openImageLibrary = () => {
   
    launchImageLibrary( {
      mediaType: 'photo',
      quality: 0.5,
    }, (response) => {
      handleImagePickerResponse(response);
      uploadImage(response,_id);

    });
  };

  const handleImagePickerResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else if (response.assets && response.assets.length > 0) {
      setSelectedImage(response.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del Producto:{} </Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Categoria: </Text>

        <Picker
          selectedValue={categoryId}
          onValueChange={itemValue => onChange(itemValue, 'categoryId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button title="Guardar" color={'#b2b8b2'} onPress={saveOrUpdate} />

        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Button title="Cámara" color={'#b2b8b2'} onPress={openCamera} />
            <View style={{width: 10}} />
            <Button title="Galería" color={'#b2b8b2'} onPress={openImageLibrary} />
            <View style={{width: 10}} />

            <Button title="Eliminar" color={'#b2b8b2'} onPress={() => {}} />
          </View>
        )}


        {(img.length > 0 &&!selectedImage?.toString()) &&   (
          <Image
            source={{uri: img}}
            style={{width: 200, height: 200, marginTop: 50}}
          />
        )}

        {/**MOSTRAR IMAGEN TEMPORAL */}
        {( selectedImage)&& (
          <Image
            source={{uri: selectedImage?.toString()}}
            style={{width: 200, height: 200, marginTop: 50}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 15,
  },
});

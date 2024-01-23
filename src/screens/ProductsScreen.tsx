
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductsContext } from '../context/ProductsContext'
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';


interface Props extends StackScreenProps<ProductsStackParams,'ProductsScreen'>{};

export const ProductsScreen = ({navigation}:Props) => {

    const{products,loadProducts}=    useContext(ProductsContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: ()=> (
                <TouchableOpacity 
                onPress={()=>navigation.push('ProductScreen',{})}
                style={{marginRight:20}}
                >

                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })
      
    }, [])
    const [isRefreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
      // Fetch your data here
      // For example, you can use fetch() or any other data fetching mechanism
      // Update the data state with the fetched data
  
      // Simulating a delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      loadProducts();
      setRefreshing(false);
    }, []);

    const loadProductsFreomBackend=()=>{
        setRefreshing(true);
        fetchData();
      };
    //TODO: Pull to refresh
  return (
    <View style={{flex:1,
        marginHorizontal:10,
       
    }}>
        
        <FlatList
        data={products}
        keyExtractor={(p)=>p._id}
        renderItem={({item})=>(
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> navigation.navigate('ProductScreen',{id:item._id,name:item.nombre,imag:item.img
            })}
            >
                 <Text style={styles.productName}>{item.nombre}</Text>
            </TouchableOpacity>
           
        )}
        ItemSeparatorComponent={()=>(
            
            <View style={styles.itemSeparator} />

        )}

        refreshControl={
            <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFreomBackend}
            title="Pull to refresh"
            tintColor="#000"
            titleColor="#000"
          />
        }
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    productName:{
        fontSize:24,
    },
    itemSeparator:{
        borderBottomWidth:2,
        marginVertical:5,
        borderBottomColor:'rgba(0,0,0,0.1'
    }
});
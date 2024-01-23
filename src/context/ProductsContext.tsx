import {createContext, useEffect, useState} from 'react';
import { Producto, ProductsResponse } from '../interfaces/Usuario';
import cafeApi from '../api/cafeApi';
import { ImagePickerResponse } from 'react-native-image-picker';


type ProductsContextProps={
    products: Producto[];
    loadProducts:() =>Promise<void>;
    addProduct:(categoryId:string,productName:string) =>Promise<Producto>;
    updateProduct:(categoryId:string,productName:string,productId:string) =>Promise<void>;
    deleteProduct:(id:string) =>Promise<void>;
    loadProductById:(id:string) =>Promise<Producto>;
    uploadImage:(data:any,id:string)=> Promise<void>;

}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])
    

   const  loadProducts=async() =>{
    
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');

    setProducts([...resp.data.productos])
    console.log(resp.data.productos)
   };
   const addProduct=async(categoryId:string,productName:string):Promise<Producto>=>{
    console.log('producadd')
    const resp = await cafeApi.post<Producto>('/productos',{

        nombre:productName,
        categoria:categoryId
    });

    setProducts([...products,resp.data]);

    return resp.data;

    };
    const updateProduct=async(categoryId:string,productName:string,productId:string) =>{
        console.log('producadd')
        const resp = await cafeApi.put<Producto>(`/productos/${productId}`,{
    
            nombre:productName,
            categoria:categoryId,
        });
    
        setProducts(products.map(prod =>{
            return (prod._id===productId)
            ? resp.data
            : prod;
        }));
    
    };
    const deleteProduct=async(id:string) =>{
        const resp = await cafeApi.delete<Producto>(`/productos/${id}`);
        
    };
    const loadProductById=async(id:string):Promise<Producto> =>{
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };
    // const uploadImage=async(data:any,id:string)=>{

    //     const fileUpload ={
    //         uri: data.assets[0].uri,
    //         type:data.assets[0].type,
    //         name:data.assets[0].fileName
    //     }
    //     console.log(fileUpload)
    //     console.log({id})
    //     const formData = new FormData();
    //     formData.append('archivo',fileUpload);
    //     try {

    //         const resp = await cafeApi.put(`/api/uploads/productos/${id}`,formData);
    //         console.log(resp)

            
    //     } catch (error) {
    //         console.log(error)
    //     }
    
    // };
    
    const uploadImage = async (data: any, id: string) => {
        try {
          const fileUpload = {
            uri: data.assets[0].uri,
            type: data.assets[0].type,
            name: data.assets[0].fileName,
          };
      
          const formData = new FormData();
          formData.append('archivo', fileUpload);
      
          // Añadir encabezados según sea necesario
          const headers = {
            'Content-Type': 'multipart/form-data',
            // Otros encabezados necesarios...
          };
      
          const resp = await cafeApi.put(`/uploads/productos/${id}`, formData, { headers });
          console.log(resp.data); // Puedes acceder a los datos de la respuesta
      
        } catch (error:any) {
          console.log('Error:', error.message);
          console.log('Request config:', error.config);
          console.log('Response data:', error.response?.data);
        }
      };
  return (
    <ProductsContext.Provider value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage
    }}>
        {children}
    </ProductsContext.Provider>
  );
};

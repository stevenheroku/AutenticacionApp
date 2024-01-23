import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import cafeApi from '../api/cafeApi';
import {Categoria, CategoriesResponse} from '../interfaces/Usuario';

export const useCategories = () => {
const [isLoading, setisLoading] = useState(true);//sirve para enviar un spinner de carga mientras termina la solicitud al api

  const [categories, setcategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getcategories();
  }, []);
  const getcategories = async () => {
    const resp = await cafeApi.get<CategoriesResponse>('/categorias');
    setcategories(resp.data.categorias);
    setisLoading(false);
  };

  return {
    isLoading,
    categories,
  };
};

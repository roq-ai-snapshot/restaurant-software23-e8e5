import axios from 'axios';
import { MenuCategoriesInterface } from 'interfaces/menu-categories';

export const getMenuCategories = async () => {
  const response = await axios.get(`/api/menu-categories`);
  return response.data;
};

export const createMenuCategories = async (menuCategories: MenuCategoriesInterface) => {
  const response = await axios.post('/api/menu-categories', menuCategories);
  return response.data;
};

export const updateMenuCategoriesById = async (id: string, menuCategories: MenuCategoriesInterface) => {
  const response = await axios.put(`/api/menu-categories/${id}`, menuCategories);
  return response.data;
};

export const getMenuCategoriesById = async (id: string) => {
  const response = await axios.get(`/api/menu-categories/${id}`);
  return response.data;
};

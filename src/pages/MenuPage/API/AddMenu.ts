// ./API/StoreRegister.ts

import axios from 'axios';
import { MenuItemFormData } from '../../../Types/Menu/Index';

export const addMenu = async (formData: MenuItemFormData) => {
  try {
    // Use import.meta.env for Vite environment variables
    const baseURL = import.meta.env.VITE_BASE_URL;

    if (!baseURL) {
      throw new Error("VITE_BASE_URL is not defined in import.meta.env");
    }

    console.log(formData);
    return;

    const response = await axios.post(`${baseURL}/menu`, formData);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Menu Addition failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};
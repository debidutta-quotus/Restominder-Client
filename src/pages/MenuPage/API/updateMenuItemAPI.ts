// ./API/StoreRegister.ts

import axios, { AxiosError } from 'axios';
import { FoodItem } from '../../../Types/Menu/Index';

export const updateMenu = async (formData: FoodItem) => {
  try {
    const POS_URL = import.meta.env.VITE_POS_URL;

    if (!POS_URL) {
      throw new Error('VITE_POS_URL is not defined in import.meta.env');
    }

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    console.log('edit form data:', formData);

    const response = await axios.put(`${POS_URL}/menu/${formData._id}`, formData, { // Change to PUT and include ID
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // Type assertion

      console.error('Menu update failed:', axiosError.response?.data || axiosError.message);
      throw axiosError.response?.data || axiosError.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};
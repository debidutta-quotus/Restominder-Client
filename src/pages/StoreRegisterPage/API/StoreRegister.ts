// ./API/StoreRegister.ts

import axios from 'axios';
import { StoreForm } from '../../../Types';

export const registerStore = async (formData: StoreForm) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/store/register`, formData);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Store registration failed:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};
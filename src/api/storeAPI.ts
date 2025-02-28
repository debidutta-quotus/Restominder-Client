// src/api/store.ts
import axios from 'axios';

export const registerStore = async (storeData: any) => {
  try {
    const response = await axios.post('/api/store/register', storeData);
    return response.data;
  } catch (error : any) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

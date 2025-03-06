import axios from 'axios';
    import { FoodItem, MenuItemsResponse } from '../../../Types/Menu/Index';

    export const getMenuItems = async (): Promise<FoodItem[]> => {
      const POS_URL = import.meta.env.VITE_POS_URL;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get<MenuItemsResponse>(`${POS_URL}/menu`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data.menus;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error.message);
          throw error;
        } else {
          console.error('An unexpected error occurred:', error);
          throw new Error('An unexpected error occurred');
        }
      }
    };
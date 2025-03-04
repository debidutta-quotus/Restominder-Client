export interface MenuItemFormData {
  storeId?: string;
  name: string;
  description: string;
  price: number;
  minPrepTime: number;
  maxPrepTime: number;
  maxPossibleOrders: number;
  images: string[];
  tags: string[];
  category: string;
  isVeg: boolean;
  available: boolean;
}
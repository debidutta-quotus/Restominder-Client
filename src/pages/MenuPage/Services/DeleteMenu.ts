// deleteMenuService.ts

import { FoodItem } from '../../../assets/DummyData/MockMenuItems'; // Adjust the import path

export const deleteMenuItem = async (item: FoodItem): Promise<boolean> => {
  try {
    // Simulate an API call with a setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second delay

    console.log("item delete request came");

    const response = await fetch(`/api/food-items/${item._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log("Item deleted successfully (service):", item);
      return true;
    } else {
      console.error("Failed to delete item (service):", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error deleting item (service):", error);
    return false;
  }
};
import { FoodItem } from "../../../Types/Menu/Index";
import { deleteMenu } from "../API/deleteMenuItemAPI";

export const deleteMenuItem = async (item: FoodItem): Promise<boolean> => {
  try {

    console.log("item delete request came item - ", item);

    const response = await deleteMenu(item);

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
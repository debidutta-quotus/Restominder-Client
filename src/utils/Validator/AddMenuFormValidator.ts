import { MenuItemFormData } from "../../Types/Menu/Index";

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const AddMenuFormValidator = (menuData: MenuItemFormData): ValidationResult => {
    const errors: string[] = [];
    let isValid = true;

    if(menuData.maxPossibleOrders < 1){
        errors.push("Max Orders can't be less than 1");
        isValid = false;
    }

    return { isValid, errors };
}
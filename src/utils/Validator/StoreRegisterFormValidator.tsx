import { StoreForm } from '../../pages/StoreRegisterPage/Index'; // Adjust the import path as needed

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const StoreRegisterFormValidator = (formData: StoreForm): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  console.log("formData - - - ", formData);

  // Basic validation checks
  if (!formData.storeName.trim()) {
    errors.push('Store Name is required.');
    isValid = false;
  }

  if (!formData.brandName.trim()) {
    errors.push('Brand Name is required.');
    isValid = false;
  }

  if (!formData.firstName.trim()) {
    errors.push('First Name is required.');
    isValid = false;
  }

  if (!formData.lastName.trim()) {
    errors.push('Last Name is required.');
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.push('Email is required.');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push('Invalid email format.');
    isValid = false;
  }

  // if (!formData.password.trim()) {
  //   errors.push('Password is required.');
  //   isValid = false;
  // } else if (formData.password.length < 6) {
  //   errors.push('Password must be at least 6 characters.');
  //   isValid = false;
  // }

  if (!formData.contactNumber.trim()) {
    errors.push('Contact Number is required.');
    isValid = false;
  } else if (!/^\d+$/.test(formData.contactNumber)) {
    errors.push('Contact Number must contain only digits.');
    isValid = false;
  }

  if (!formData.streetAddress.trim()) {
    errors.push('Street Address is required.');
    isValid = false;
  }

  if (!formData.city.trim()) {
    errors.push('City is required.');
    isValid = false;
  }

  if (!formData.region.trim()) {
    errors.push('Region is required.');
    isValid = false;
  }

  if (!formData.country.trim()) {
    errors.push('Country is required.');
    isValid = false;
  }

  if (!formData.postalCode.trim()) {
    errors.push('Postal Code is required.');
    isValid = false;
  }

  if (!formData.openTime.trim()) {
    errors.push('Open Time is required.');
    isValid = false;
  }

  if (!formData.closeTime.trim()) {
    errors.push('Close Time is required.');
    isValid = false;
  }

  if (!formData.operatingDays || formData.operatingDays.length === 0) {
    errors.push('Operating Days are required.');
    isValid = false;
  }

  if (!formData.bankName.trim()) {
    errors.push('Bank Name is required.');
    isValid = false;
  }

  if (!formData.accountNumber.trim()) {
    errors.push('Account Number is required.');
    isValid = false;
  } else if (!/^\d+$/.test(formData.accountNumber)) {
    errors.push('Account Number must contain only digits.');
    isValid = false;
  }

  if (!formData.accountHolder.trim()) {
    errors.push('Account Holder is required.');
    isValid = false;
  }

  if (!formData.ifscCode.trim()) {
    errors.push('IFSC Code is required.');
    isValid = false;
  }

  if (formData.iban && !/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/.test(formData.iban)) {
      errors.push("Invalid IBAN format");
      isValid = false;
  }

  if (formData.swiftCode && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.swiftCode)) {
    errors.push('Invalid SWIFT Code format.');
    isValid = false;
  }

  if (formData.numberOfLocation < 1) {
    errors.push('Number of Locations must be at least 1.');
    isValid = false;
  }

  // if (formData.floor !== null && formData.floor !== undefined && !Number.isInteger(formData.floor)) {
  //   errors.push('Floor must be an integer or null.');
  //   isValid = false;
  // }

  return { isValid, errors };
};
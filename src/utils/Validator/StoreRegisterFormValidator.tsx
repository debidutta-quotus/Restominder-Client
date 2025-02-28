import { StoreForm } from '../../Types'; // Adjust the import path as needed

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const StoreRegisterFormValidator = (formData: StoreForm): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  // Basic Information Validation
  if (!formData.storeInfo.storeName.trim()) {
    errors.push('Store Name is required.');
    isValid = false;
  }

  if (!formData.storeInfo.brandName.trim()) {
    errors.push('Brand Name is required.');
    isValid = false;
  }

  if (!formData.storeInfo.firstName.trim()) {
    errors.push('First Name is required.');
    isValid = false;
  }

  if (!formData.storeInfo.lastName.trim()) {
    errors.push('Last Name is required.');
    isValid = false;
  }

  if (!formData.storeInfo.email.trim()) {
    errors.push('Email is required.');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.storeInfo.email)) {
    errors.push('Invalid email format.');
    isValid = false;
  }

  if (!formData.storeInfo.contactNumber.trim()) {
    errors.push('Contact Number is required.');
    isValid = false;
  } else if (!/^\d+$/.test(formData.storeInfo.contactNumber)) {
    errors.push('Contact Number must contain only digits.');
    isValid = false;
  }

  // Address Validation
  if (!formData.storeAddress.streetAddress.trim()) {
    errors.push('Street Address is required.');
    isValid = false;
  }

  if (!formData.storeAddress.city.trim()) {
    errors.push('City is required.');
    isValid = false;
  }

  if (!formData.storeAddress.region.trim()) {
    errors.push('Region is required.');
    isValid = false;
  }

  if (!formData.storeAddress.country.trim()) {
    errors.push('Country is required.');
    isValid = false;
  }

  if (!formData.storeAddress.postalCode.trim()) {
    errors.push('Postal Code is required.');
    isValid = false;
  }

  // Operating Hours Validation
  if (!formData.storeInfo.openTime.trim()) {
    errors.push('Open Time is required.');
    isValid = false;
  }

  if (!formData.storeInfo.closeTime.trim()) {
    errors.push('Close Time is required.');
    isValid = false;
  }

  if (!formData.storeInfo.operatingDays || formData.storeInfo.operatingDays.length === 0) {
    errors.push('Operating Days are required.');
    isValid = false;
  }

  // Business Details Validation
  if (formData.storeInfo.numberOfLocation < 1) {
    errors.push('Number of Locations must be at least 1.');
    isValid = false;
  }

  // Bank Details Validation
  if (!formData.storeBankDetails.bankName.trim()) {
    errors.push('Bank Name is required.');
    isValid = false;
  }

  if (!formData.storeBankDetails.accountNumber.trim()) {
    errors.push('Account Number is required.');
    isValid = false;
  } else if (!/^\d+$/.test(formData.storeBankDetails.accountNumber)) {
    errors.push('Account Number must contain only digits.');
    isValid = false;
  }

  if (!formData.storeBankDetails.accountHolder.trim()) {
    errors.push('Account Holder is required.');
    isValid = false;
  }

  if (!formData.storeBankDetails.ifscCode.trim()) {
    errors.push('IFSC Code is required.');
    isValid = false;
  }

  if (formData.storeBankDetails.iban && !/^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/.test(formData.storeBankDetails.iban)) {
    errors.push("Invalid IBAN format");
    isValid = false;
  }

  if (formData.storeBankDetails.swiftCode && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.storeBankDetails.swiftCode)) {
    errors.push('Invalid SWIFT Code format.');
    isValid = false;
  }

  return { isValid, errors };
};
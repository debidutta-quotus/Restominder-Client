import React, { useState, ChangeEvent, useEffect } from 'react';
import { Store } from 'lucide-react';
import './StoreRegister.css';
import countriesData from '../../assets/countries.json';
import { StoreRegisterFormValidator } from '../../utils/Validator/StoreRegisterFormValidator';
import { showErrorToast, showSuccessToast } from '../../utils/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../utils/Modal/ConfirmationModal';

type BusinessType = 'Restaurant' | 'Convenience Store' | 'Coffee Shops' | 'Bakeries';
type Status = 'ACTIVE' | 'INACTIVE';
type CuisineType = 'American' | 'BBQ' | 'Asian' | 'Italian' | 'Chinese' | 'Indian' | 'Mexican' | 'Thai' | 'Korean';

const demoProfileDetails = {
  firstname: "Debidutta",
  lastname: "Acharya",
  email: "debidutta.acharya@quotus.co.in",
  contactNumber: "6371875968",
  password: "PASSWORD1234"
}

export interface StoreForm {
  id?: number;
  posId?: number;
  deliveryPartnerID: number[];
  storeName: string;
  brandName: string;
  businessType: BusinessType;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  streetAddress: string;
  floor: number | null;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  neighbourhood: string;
  cuisineType: CuisineType;
  numberOfLocation: number;
  description: string;
  websiteUrl: string;
  status: Status;
  available: boolean;
  openTime: string;
  closeTime: string;
  operatingDays: string[];
  // Bank Details
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  ifscCode: string;
  iban: string;
  swiftCode: string;
  isPrimary: boolean;
}

export const initialFormState: StoreForm = {
  deliveryPartnerID: [],
  storeName: '',
  brandName: '',
  businessType: 'Restaurant',
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  password: '',
  streetAddress: '',
  floor: 0,
  city: '',
  region: '',
  country: '',
  postalCode: '',
  neighbourhood: '',
  cuisineType: 'American',
  numberOfLocation: 1,
  description: '',
  websiteUrl: '',
  status: 'ACTIVE',
  available: true,
  openTime: '',
  closeTime: '',
  operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  // Bank Details
  bankName: '',
  accountNumber: '',
  accountHolder: '',
  ifscCode: '',
  iban: '',
  swiftCode: '',
  isPrimary: true
};

interface RenderAddressProps {
  formData: StoreForm;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const steps = [
  {
    title: 'Basic Information',
    description: 'Store details and business type'
  },
  {
    title: 'Contact Information',
    description: 'Your contact details'
  },
  {
    title: 'Address',
    description: 'Store location details'
  },
  {
    title: 'Business Details',
    description: 'Additional business information'
  },
  {
    title: 'Operating Hours',
    description: 'Working hours and days'
  },
  {
    title: 'Bank Details',
    description: 'Payment information'
  }
];

export default function StoreRegister() {
  const [formData, setFormData] = useState<StoreForm>(initialFormState);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const navigate = useNavigate();
  const handleSkipClicked = () => {
    setIsConfirmationOpen(true);
  }

  // call api here to fetch user details
  useEffect(() => {
    setFormData(prev => ({ ...prev, firstName: demoProfileDetails.firstname}));
    setFormData(prev => ({ ...prev, lastName: demoProfileDetails.lastname}));
    setFormData(prev => ({ ...prev, email: demoProfileDetails.email}));
    setFormData(prev => ({ ...prev, contactNumber: demoProfileDetails.contactNumber}));
  }, [])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      operatingDays: prev.operatingDays.includes(day)
        ? prev.operatingDays.filter(d => d !== day)
        : [...prev.operatingDays, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // onsubmit logic 
    const validationResult = StoreRegisterFormValidator(formData);

    if (validationResult.isValid) {
      showSuccessToast('Store registration successful!');
      console.log(formData);
      // TODO: Add your submission logic
    } else {
      // Show only the first error
      if (validationResult.errors.length > 0) {
        showErrorToast(validationResult.errors[0]);
        return;
      }
    }

    console.log(formData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderBasicInfo = () => (
    <div className="store-register-grid">
      <div>
        <label htmlFor="storeName" className="store-register-label">
          Store Name
        </label>
        <input
          type="text"
          name="storeName"
          id="storeName"
          value={formData.storeName}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="brandName" className="store-register-label">
          Brand Name
        </label>
        <input
          type="text"
          name="brandName"
          id="brandName"
          value={formData.brandName}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="businessType" className="store-register-label">
          Business Type
        </label>
        <select
          name="businessType"
          id="businessType"
          value={formData.businessType}
          onChange={handleInputChange}
          className="store-register-field"
        >
          <option value="Restaurant">Restaurant</option>
          <option value="Convenience Store">Convenience Store</option>
          <option value="Coffee Shops">Coffee Shops</option>
          <option value="Bakeries">Bakeries</option>
        </select>
      </div>

      <div>
        <label htmlFor="cuisineType" className="store-register-label">
          Cuisine Type
        </label>
        <select
          name="cuisineType"
          id="cuisineType"
          value={formData.cuisineType}
          onChange={handleInputChange}
          className="store-register-field"
        >
          <option value="American">American</option>
          <option value="BBQ">BBQ</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          <option value="Thai">Thai</option>
          <option value="Korean">Korean</option>
        </select>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="store-register-grid">
      <div>
        <label htmlFor="firstName" className="store-register-label">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          disabled
          readOnly
          onChange={handleInputChange}
          className="store-register-field store-register-field-contact-information-disable"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="store-register-label">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          disabled
          readOnly
          onChange={handleInputChange}
          className="store-register-field store-register-field-contact-information-disable"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="store-register-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          disabled
          readOnly
          onChange={handleInputChange}
          className="store-register-field store-register-field-contact-information-disable"
          required
        />
      </div>

      <div>
        <label htmlFor="contactNumber" className="store-register-label">
          Contact Number
        </label>
        <input
          type="tel"
          name="contactNumber"
          id="contactNumber"
          value={formData.contactNumber}
          disabled
          readOnly
          onChange={handleInputChange}
          className="store-register-field store-register-field-contact-information-disable"
          required
        />
      </div>
    </div>
  );

  const renderAddress = ({ formData, handleInputChange }: RenderAddressProps) => (
    <div className="store-register-grid">
      <div className="sm:col-span-2">
        <label htmlFor="streetAddress" className="store-register-label">
          Street Address
        </label>
        <input
          type="text"
          name="streetAddress"
          id="streetAddress"
          value={formData.streetAddress}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="floor" className="store-register-label">
          Floor (optional)
        </label>
        <input
          type="number"
          name="floor"
          id="floor"
          value={formData.floor || ''}
          onChange={handleInputChange}
          className="store-register-field"
        />
      </div>

      <div>
        <label htmlFor="city" className="store-register-label">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="region" className="store-register-label">
          Region
        </label>
        <input
          type="text"
          name="region"
          id="region"
          value={formData.region}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="country" className="store-register-label">
          Country
        </label>
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleInputChange}
          className="store-register-field"
          required
        >
          <option value="">Select a Country</option>
          {countriesData.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="postalCode" className="store-register-label">
          Postal Code
        </label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="store-register-grid">
      <div>
        <label htmlFor="numberOfLocation" className="store-register-label">
          Number of Locations
        </label>
        <input
          type="number"
          name="numberOfLocation"
          id="numberOfLocation"
          min="1"
          value={formData.numberOfLocation}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className="store-register-label">
          Website URL
        </label>
        <input
          type="url"
          name="websiteUrl"
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleInputChange}
          className="store-register-field"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="store-register-label">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleInputChange}
          className="store-register-field"
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  );

  const renderOperatingHours = () => (
    <div className="store-register-grid">
      <div>
        <label htmlFor="openTime" className="store-register-label">
          Opening Time
        </label>
        <input
          type="time"
          name="openTime"
          id="openTime"
          value={formData.openTime}
          onChange={handleInputChange}
          className="store-register-field store-register-field-opentime-closetime"
          required
        />
      </div>

      <div>
        <label htmlFor="closeTime" className="store-register-label">
          Closing Time
        </label>
        <input
          type="time"
          name="closeTime"
          id="closeTime"
          value={formData.closeTime}
          onChange={handleInputChange}
          className="store-register-field store-register-field-opentime-closetime"
          required
        />
      </div>

      <div className="sm:col-span-2">
        <label className="store-register-label mb-2">
          Operating Days
        </label>
        <div className="store-register-checkbox-group">
          {days.map(day => (
            <label key={day} className="store-register-checkbox-label">
              <input
                type="checkbox"
                checked={formData.operatingDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="store-register-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="store-register-grid">
      <div>
        <label htmlFor="bankName" className="store-register-label">
          Bank Name
        </label>
        <input
          type="text"
          name="bankName"
          id="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="accountHolder" className="store-register-label">
          Account Holder Name
        </label>
        <input
          type="text"
          name="accountHolder"
          id="accountHolder"
          value={formData.accountHolder}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="accountNumber" className="store-register-label">
          Account Number
        </label>
        <input
          type="text"
          name="accountNumber"
          id="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="ifscCode" className="store-register-label">
          IFSC Code
        </label>
        <input
          type="text"
          name="ifscCode"
          id="ifscCode"
          value={formData.ifscCode}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="iban" className="store-register-label">
          IBAN
        </label>
        <input
          type="text"
          name="iban"
          id="iban"
          value={formData.iban}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="swiftCode" className="store-register-label">
          SWIFT Code
        </label>
        <input
          type="text"
          name="swiftCode"
          id="swiftCode"
          value={formData.swiftCode}
          onChange={handleInputChange}
          className="store-register-field"
          required
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderContactInfo();
      case 2:
        return renderAddress({ formData, handleInputChange });
      case 3:
        return renderBusinessDetails();
      case 4:
        return renderOperatingHours();
      case 5:
        return renderBankDetails();
      default:
        return null;
    }
  };

  return (
    <div className="store-register-container">
      <div className="store-register-wrapper">
        <div className="store-register-header">
          <Store className="store-register-icon" />
          <h2 className="store-register-title">
            Register Your Store
          </h2>
          <p className="store-register-subtitle">
            Connect your POS system with food delivery partners
          </p>
        </div>

        {/* <form onSubmit={handleSubmit} className="store-register-form"> */}
        <form className="store-register-form">
          <div className="store-register-progress">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`store-register-progress-step ${index <= currentStep ? 'active' : ''}`}
              >
                <div className="store-register-progress-step-number">
                  {index + 1}
                </div>
                <div className="store-register-progress-step-text">
                  <div className="store-register-progress-step-title">
                    {step.title}
                  </div>
                  <div className="store-register-progress-step-description">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="store-register-section">
            <h3 className="store-register-section-title">
              {steps[currentStep].title}
            </h3>
            {renderStepContent()}
          </div>

          <div className="store-register-button-group">
            {currentStep === 0 && (
              <button
                type="button"
                onClick={handleSkipClicked}
                className="store-register-button-secondary"
              >
                Skip
              </button>
            )}
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="store-register-button-secondary"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="store-register-button-primary"
              >
                Next
              </button>
            ) : (
              <button
                // type="submit"
                type='button'
                className="store-register-button-primary"
                onClick={handleSubmit}
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onRequestClose={() => setIsConfirmationOpen(false)}
        message="Are you sure you want to proceed?"
        onConfirm={() => {
          setIsConfirmationOpen(false);
          navigate("/")
        }}
        onCancel={() => {
          setIsConfirmationOpen(false);
        }}
      />
    </div>
  );
}
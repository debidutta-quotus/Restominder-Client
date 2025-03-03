import React, { useState, useEffect } from 'react';
import { Store } from 'lucide-react';
import './StoreRegister.css';
import countriesData from '../../assets/countries.json';
import { StoreRegisterFormValidator } from '../../utils/Validator/StoreRegisterFormValidator';
import { showErrorToast, showSuccessToast } from '../../utils/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../utils/Modal/ConfirmationModal';
import { StoreForm } from '../../Types';
import { deliveryPartners } from '../../assets/DummyData/MockDeleveryPartners';

const demoProfileDetails = {
  firstname: "Debidutta",
  lastname: "Acharya",
  email: "debidutta.acharya@quotus.co.in",
  contactNumber: "6371875968",
  password: "PASSWORD1234"
}

export const initialFormState: StoreForm = {
  storeInfo: {
    posId: 0,
    deliveryPartnerID: [],
    storeName: '',
    brandName: '',
    businessType: 'Restaurant',
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
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
  },
  storeAddress: {
    streetAddress: '',
    floor: 0,
    city: '',
    region: '',
    country: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
  },
  storeBankDetails: {
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    ifscCode: '',
    iban: '',
    swiftCode: '',
    isPrimary: true
  }
};

interface RenderAddressProps {
  formData: StoreForm;
  handleInputChange: (section: string, name: string, value: any) => void;
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
    title: 'Delivery Partners',
    description: 'Choose delivery services'
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
    setFormData(prev => ({
      ...prev,
      storeInfo: {
        ...prev.storeInfo,
        posId: 1234,
        firstName: demoProfileDetails.firstname,
        lastName: demoProfileDetails.lastname,
        email: demoProfileDetails.email,
        contactNumber: demoProfileDetails.contactNumber,
        password: demoProfileDetails.password
      }
    }));
  }, []);

  const handleInputChange = (section: string, name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof StoreForm],
        [name]: value
      }
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      storeInfo: {
        ...prev.storeInfo,
        operatingDays: prev.storeInfo.operatingDays.includes(day)
          ? prev.storeInfo.operatingDays.filter(d => d !== day)
          : [...prev.storeInfo.operatingDays, day]
      }
    }));
  };

  const handleDeliveryPartnerToggle = (partnerId: number) => {
    setFormData(prev => ({
      ...prev,
      storeInfo: {
        ...prev.storeInfo,
        deliveryPartnerID: prev.storeInfo.deliveryPartnerID.includes(partnerId)
          ? prev.storeInfo.deliveryPartnerID.filter(id => id !== partnerId)
          : [...prev.storeInfo.deliveryPartnerID, partnerId]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("form data is here inside handlesubmit", formData);
    
    // onsubmit logic 
    const validationResult = StoreRegisterFormValidator(formData);
    
    
    if (validationResult.isValid) {
      try {
        
        console.log("form data - - ", formData);
        
        const response = await fetch('http://164.164.178.27:5000/api/v1/store/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        console.log("response is - ", response);
        
        if (response.ok) {
          showSuccessToast('Store registration successful!');
          // Navigate to dashboard or another page after successful registration
          navigate('/dashboard');
        } else {
          const errorData = await response.json();
          showErrorToast(errorData.message || 'Registration failed. Please try again.');
        }

        
      } catch (error) {
        console.error('Registration error:', error);
        showErrorToast('Network error. Please check your connection and try again.');
      }
    } else {
      // Show only the first error
      if (validationResult.errors.length > 0) {
        showErrorToast(validationResult.errors[0]);
        return;
      }
    }
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
          id="storeName"
          value={formData.storeInfo.storeName}
          onChange={(e) => handleInputChange('storeInfo', 'storeName', e.target.value)}
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
          id="brandName"
          value={formData.storeInfo.brandName}
          onChange={(e) => handleInputChange('storeInfo', 'brandName', e.target.value)}
          className="store-register-field"
          required
        />
      </div>

      <div>
        <label htmlFor="businessType" className="store-register-label">
          Business Type
        </label>
        <select
          id="businessType"
          value={formData.storeInfo.businessType}
          onChange={(e) => handleInputChange('storeInfo', 'businessType', e.target.value)}
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
          id="cuisineType"
          value={formData.storeInfo.cuisineType}
          onChange={(e) => handleInputChange('storeInfo', 'cuisineType', e.target.value)}
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
          id="firstName"
          value={formData.storeInfo.firstName}
          disabled
          readOnly
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
          id="lastName"
          value={formData.storeInfo.lastName}
          disabled
          readOnly
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
          id="email"
          value={formData.storeInfo.email}
          disabled
          readOnly
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
          id="contactNumber"
          value={formData.storeInfo.contactNumber}
          disabled
          readOnly
          className="store-register-field store-register-field-contact-information-disable"
          required
        />
      </div>
    </div>
  );

  const renderAddress = ({ formData, handleInputChange }: RenderAddressProps) => (
    <div className="store-register-grid address-grid">
      <div className="sm:col-span-2">
        <label htmlFor="streetAddress" className="store-register-label">
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          value={formData.storeAddress.streetAddress}
          onChange={(e) => handleInputChange('storeAddress', 'streetAddress', e.target.value)}
          className="store-register-field"
          required
        />
      </div>

      <div className="address-small-field">
        <label htmlFor="floor" className="store-register-label">
          Floor
        </label>
        <input
          type="number"
          id="floor"
          value={formData.storeAddress.floor || ''}
          onChange={(e) => handleInputChange('storeAddress', 'floor', e.target.value === '' ? null : Number(e.target.value))}
          className="store-register-field"
        />
      </div>

      <div className="address-small-field">
        <label htmlFor="neighbourhood" className="store-register-label">
          Neighbourhood
        </label>
        <input
          type="text"
          id="neighbourhood"
          value={formData.storeInfo.neighbourhood}
          onChange={(e) => handleInputChange('storeInfo', 'neighbourhood', e.target.value)}
          className="store-register-field"
        />
      </div>

      <div className="address-small-field">
        <label htmlFor="city" className="store-register-label">
          City
        </label>
        <input
          type="text"
          id="city"
          value={formData.storeAddress.city}
          onChange={(e) => handleInputChange('storeAddress', 'city', e.target.value)}
          className="store-register-field"
          required
        />
      </div>

      <div className="address-small-field">
        <label htmlFor="region" className="store-register-label">
          Region
        </label>
        <input
          type="text"
          id="region"
          value={formData.storeAddress.region}
          onChange={(e) => handleInputChange('storeAddress', 'region', e.target.value)}
          className="store-register-field"
          required
        />
      </div>

      <div className="address-small-field">
        <label htmlFor="country" className="store-register-label">
          Country
        </label>
        <select
          id="country"
          value={formData.storeAddress.country}
          onChange={(e) => handleInputChange('storeAddress', 'country', e.target.value)}
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

      <div className="address-small-field">
        <label htmlFor="postalCode" className="store-register-label">
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          value={formData.storeAddress.postalCode}
          onChange={(e) => handleInputChange('storeAddress', 'postalCode', e.target.value)}
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
          id="numberOfLocation"
          min="1"
          value={formData.storeInfo.numberOfLocation}
          onChange={(e) => handleInputChange('storeInfo', 'numberOfLocation', Number(e.target.value))}
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
          id="websiteUrl"
          value={formData.storeInfo.websiteUrl}
          onChange={(e) => handleInputChange('storeInfo', 'websiteUrl', e.target.value)}
          className="store-register-field"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="store-register-label">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.storeInfo.description}
          onChange={(e) => handleInputChange('storeInfo', 'description', e.target.value)}
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
          id="openTime"
          value={formData.storeInfo.openTime}
          onChange={(e) => handleInputChange('storeInfo', 'openTime', e.target.value)}
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
          id="closeTime"
          value={formData.storeInfo.closeTime}
          onChange={(e) => handleInputChange('storeInfo', 'closeTime', e.target.value)}
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
                checked={formData.storeInfo.operatingDays.includes(day)}
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

  // Simplified delivery partner UI
  const renderChooseDeliveryPartner = () => (
    <div>
      <div className="delivery-partners-header">
        <h4 className="delivery-partners-title">
          Select your preferred delivery partners
        </h4>
        <span className="delivery-partners-count">
          {formData.storeInfo.deliveryPartnerID.length} selected
        </span>
      </div>
      
      <div className="delivery-partner-grid">
        {deliveryPartners.map(partner => (
          <div 
            key={partner.id} 
            className={`delivery-partner-card ${formData.storeInfo.deliveryPartnerID.includes(partner.id) ? 'selected' : ''}`}
            onClick={() => handleDeliveryPartnerToggle(partner.id)}
          >
            <div className="delivery-partner-logo-container">
              <img 
                src={partner.logo} 
                alt={`Partner ${partner.id} logo`} 
                className="delivery-partner-logo" 
              />
            </div>
          </div>
        ))}
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
          id="bankName"
          value={formData.storeBankDetails.bankName}
          onChange={(e) => handleInputChange('storeBankDetails', 'bankName', e.target.value)}
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
          id="accountHolder"
          value={formData.storeBankDetails.accountHolder}
          onChange={(e) => handleInputChange('storeBankDetails', 'accountHolder', e.target.value)}
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
          id="accountNumber"
          value={formData.storeBankDetails.accountNumber}
          onChange={(e) => handleInputChange('storeBankDetails', 'accountNumber', e.target.value)}
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
          id="ifscCode"
          value={formData.storeBankDetails.ifscCode}
          onChange={(e) => handleInputChange('storeBankDetails', 'ifscCode', e.target.value)}
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
          id="iban"
          value={formData.storeBankDetails.iban}
          onChange={(e) => handleInputChange('storeBankDetails', 'iban', e.target.value)}
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
          id="swiftCode"
          value={formData.storeBankDetails.swiftCode}
          onChange={(e) => handleInputChange('storeBankDetails', 'swiftCode', e.target.value)}
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
        return renderChooseDeliveryPartner();
      case 6:
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

        <form onSubmit={handleSubmit} className="store-register-form">
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
                type="submit"
                className="store-register-button-primary"
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
        message="Want to skip store registration for now?"
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
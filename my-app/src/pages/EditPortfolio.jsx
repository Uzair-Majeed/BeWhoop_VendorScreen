import React, { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import FileUploadSplit from '../additional_components/FileUpload.jsx';
import { useNavigate } from 'react-router-dom';

function EditPortfolio() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [minPrice, setMinPrice] = useState(vendorData?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(vendorData?.maxPrice || '');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check HTML5 form validity
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // Show browser validation messages
      return;
    }

    const updatedData = {
      ...vendorData,
      minPrice: minPrice || vendorData.minPrice,
      maxPrice: maxPrice || vendorData.maxPrice,
    };

    // Custom validation for maxPrice > minPrice
    const min = parseInt(updatedData.minPrice, 10);
    const max = parseInt(updatedData.maxPrice, 10);
    if ((minPrice || maxPrice) && (isNaN(min) || isNaN(max))) {
      alert('Prices must be valid numbers.');
      return;
    }
    if (minPrice && maxPrice && max <= min) {
      alert('Maximum price must be greater than minimum price.');
      return;
    }

    // Build payload with all required fields
    const payload = {
      fullName: vendorData.fullName || '',
      email: vendorData.email || '',
      phone: vendorData.phone || '',
      services: updatedData.services || [],
      budgetRange: minPrice && maxPrice ? `${min}-${max}` : vendorData.budgetRange || '',
      city: updatedData.location || '',
      socialProof: updatedData.mapLink || null,
    };

    // Validate required fields
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.services ||
      payload.services.length === 0 ||
      !payload.budgetRange ||
      !payload.city
    ) {
      alert('Please fill all required fields: full name, email, phone, services, price range, and city.');
      return;
    }

    console.log('📦 Payload being sent:', JSON.stringify(payload, null, 2));

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await fetch(`${baseURL}/onboarding/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Response Status:', response.status);
      const text = await response.text();
      console.log('Response Body:', text);

      if (!response.ok) {
        let result;
        try {
          result = JSON.parse(text);
        } catch (e) {
          alert(`HTTP ${response.status}: ${text}`);
          return;
        }
        console.error('❌ API Error:', result);
        alert(result.error || 'Error saving data.');
        return;
      }

      const result = JSON.parse(text);
      setVendorData(updatedData);
      navigate('/EditProfile');
    } catch (err) {
      console.error('❌ Error:', err);
      alert(`Something went wrong: ${err.message}`);
    }
  };

  // Custom validation to make fields required only if changed to empty
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    if (value === '') {
      e.target.setCustomValidity('Minimum price cannot be empty if changed.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (value === '') {
      e.target.setCustomValidity('Maximum price cannot be empty if changed.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <div className="editportfolio-dashboard-container">
      <Sidebar />
      <div className="editportfolio-main-content">
        <Header />
        <div className="editportfolio-scrollable">
          <form ref={formRef} onSubmit={handleSave}>
            <div className="editportfolio-form-wrapper">
              <label className="editportfolio-label3">Price Range</label>
              <div className="editportfolio-price-range">
                <input
                  className="editportfolio-input-range"
                  type="number"
                  min="0"
                  placeholder="Minimum"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
                <input
                  className="editportfolio-input-range"
                  type="number"
                  min="0"
                  placeholder="Maximum"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>

            <div className="editportfolio-upload">
              <FileUploadSplit />
            </div>

            <div className="editportfolio-save-button-container">
              <button type="submit" className="editportfolio-save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPortfolio;
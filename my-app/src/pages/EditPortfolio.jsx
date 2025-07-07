import { useContext, useState } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import FileUploadSplit from '../additional_components/FileUpload.jsx';
import { useNavigate } from 'react-router-dom';

function EditPortfolio() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [error, setError] = useState('');
  const [minPrice, setMinPrice] = useState(vendorData?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(vendorData?.maxPrice || '');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSave = async () => {
    const updatedData = {
      ...vendorData,
      minPrice: minPrice || vendorData.minPrice,
      maxPrice: maxPrice || vendorData.maxPrice,
    };

    if (!updatedData.minPrice || !updatedData.maxPrice) {
      return setError('Price range must be filled.');
    }

    setError('');
    setVendorData(updatedData);

    const payload = {
      fullName: `${vendorData.firstName} ${vendorData.lastName}`,
      email: vendorData.email,
      phone: vendorData.phone || '0000000000',
      services: vendorData.services,
      budgetRange: `$${vendorData.minPrice}-$${vendorData.maxPrice}`,
      city: vendorData.location,
      socialProof: vendorData.mapLink || '',
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseURL}/onboarding/vendors`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        navigate('/EditProfile');
      } else {
        setError(result.message || 'Error saving data.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="editportfolio-dashboard-container">
      <Sidebar />
      <div className="editportfolio-main-content">
        <Header />
        <div className="editportfolio-scrollable">
          <div className="editportfolio-form-wrapper">
            <label className="editportfolio-label3">Price Range</label>
            <div className="editportfolio-price-range">
              <input
                className="editportfolio-input-range"
                placeholder="Minimum"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="editportfolio-input-range"
                placeholder="Maximum"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <label className="editportfolio-label1">Add Portfolio</label>
          </div>

          <div className="editportfolio-upload">
            <FileUploadSplit />
          </div>

          {error && <p className="editportfolio-error-fields">{error}</p>}

          <div className="editportfolio-save-button-container">
            <button className="editportfolio-save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPortfolio;
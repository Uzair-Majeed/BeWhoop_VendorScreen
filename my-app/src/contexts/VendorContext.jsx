import React, { createContext, useState } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorData, setVendorData] = useState({
    firstName: '',
    lastName:'',
    email : '',
    profileImage: null,
    description: '',
    services: [],
    location: '',
    mapLink: '',
    minPrice: '',
    maxPrice: '',
    cnicFront: null,
    cnicBack: null,
    portfolio: null,
  });

  return (
    <VendorContext.Provider value={{ vendorData, setVendorData }}>
      {children}
    </VendorContext.Provider>
  );
};

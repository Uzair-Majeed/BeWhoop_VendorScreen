import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorSetup from './components/VendorSetup.jsx';
import VendorProfile from './components/VendorProfile.jsx'
import './App.css'
import UploadPortfolio from './components/UploadPortfolio.jsx';
import Dashboard from './components/Dashboard.jsx';
import { VendorProvider } from './contexts/VendorContext.jsx';

function App() {

  return (
    <>
    <VendorProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VendorProfile />} />  
        
        <Route path="/SettingUp" element={<VendorSetup />} />
        <Route path="/UploadPortfolio" element={<UploadPortfolio />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </VendorProvider>
    </>
  )
}

export default App

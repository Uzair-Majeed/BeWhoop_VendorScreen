import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorSetup from './pages/VendorSetup.jsx';
import VendorProfile from './pages/VendorProfile.jsx'
import './App.css'
import UploadPortfolio from './pages/UploadPortfolio.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Signup from './pages/Signup.jsx';
import EditProfile from './pages/EditProfile.jsx'
import EditServices from './pages/EditServices.jsx'
import EditPortfolio from './pages/EditPortfolio.jsx'
import Placeholder from './additional_components/PlaceHolder.jsx';
import { VendorProvider } from './contexts/VendorContext.jsx';

function App() {

  return (
    <>
    <VendorProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/VendorProfile" element={<VendorProfile />} />  
        <Route path="/SettingUp" element={<VendorSetup />} />
        <Route path="/UploadPortfolio" element={<UploadPortfolio />} />
        <Route path="/MyProfile" element={<Dashboard />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/EditServices" element={<EditServices />} />
        <Route path="/EditPortfolio" element={<EditPortfolio />} />
        <Route path="/Settings" element={<Placeholder />} />
        <Route path="/Messages" element={<Placeholder />} />
      </Routes>
    </BrowserRouter>
    </VendorProvider>
    </>
  )
}

export default App

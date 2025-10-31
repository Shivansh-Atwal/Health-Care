import { useState } from 'react'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './component/shared/Navbar.jsx';
import Landingpage from './component/pages/Landingpage.jsx';
import Pagenotfound from './component/pages/Pagenotfound.jsx';
import Home from './component/pages/Home.jsx';
import Contact from './component/contact/Contact.jsx'
import Login from './component/pages/Login.jsx';
import Signup from './component/pages/Signup.jsx';
import DoctorDashboard from './component/dashboard/DoctorDashboard.jsx';
import PatientDashboard from './component/dashboard/PatientDashboard.jsx';
import DoctorsList from './component/doctors/DoctorsList.jsx';
import Profile from './component/profile/Profile.jsx';
import EditProfile from './component/profile/EditProfile.jsx';
import Blog from './component/blog/Blog.jsx';
import ProtectedRoute from './component/shared/ProtectedRoute.jsx';
import RoleBasedRedirect from './component/shared/RoleBasedRedirect.jsx';
import PatientReports from './component/reports/PatientReports.jsx';
import AdminDashboard from './component/dashboard/AdminDashboard.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/doctor-dashboard" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/patient-dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['doctor', 'patient', 'admin']}><Profile /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute allowedRoles={['doctor', 'patient', 'admin']}><EditProfile /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute allowedRoles={['doctor', 'patient']}><PatientReports /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>} />
        
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App

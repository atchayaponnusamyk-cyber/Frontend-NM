import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

import UserDashboard from './pages/user/UserDashboard';
import SubmitComplaint from './pages/user/SubmitComplaint';
import MyComplaints from './pages/user/MyComplaints';
import ComplaintDetail from './pages/user/ComplaintDetail';

import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaints from './pages/admin/AllComplaints';
import StaffManagement from './pages/admin/StaffManagement';

import StaffDashboard from './pages/staff/StaffDashboard';
import MyAssignedComplaints from './pages/staff/MyAssignedComplaints';
import UpdateComplaint from './pages/staff/UpdateComplaint';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/user/dashboard" element={<ProtectedRoute allowedRole="USER"><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/complaints/new" element={<ProtectedRoute allowedRole="USER"><SubmitComplaint /></ProtectedRoute>} />
        <Route path="/user/complaints" element={<ProtectedRoute allowedRole="USER"><MyComplaints /></ProtectedRoute>} />
        <Route path="/user/complaints/:id" element={<ProtectedRoute allowedRole="USER"><ComplaintDetail /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="ADMIN"><AllComplaints /></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute allowedRole="ADMIN"><StaffManagement /></ProtectedRoute>} />

        <Route path="/staff/dashboard" element={<ProtectedRoute allowedRole="STAFF"><StaffDashboard /></ProtectedRoute>} />
        <Route path="/staff/complaints" element={<ProtectedRoute allowedRole="STAFF"><MyAssignedComplaints /></ProtectedRoute>} />
        <Route path="/staff/complaints/:id" element={<ProtectedRoute allowedRole="STAFF"><UpdateComplaint /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
export default App;
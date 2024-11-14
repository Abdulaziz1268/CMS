import './App.css';
import ForgetPassword from './components/Authentication/forgetPassword';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import ComplaintList from './components/ComplaintSubmission/complaintList';
import Complaint from './components/ComplaintSubmission/complaint';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Admin from './components/AdminPanel/Admin';
import Dashboard from './components/AdminPanel/Dashboard';
import Complaints from './components/AdminPanel/Complaints';
import Departments from './components/AdminPanel/Departments';
import Users from './components/AdminPanel/Users';
import Chat from './components/Departments/Chat';
import NotFound from './components/NotFound';
import Notifications from './components/Departments/Notifications';
import DepComplaints from './components/Departments/depComplaints';
import DepartmentPanel from './components/Departments/departmetnPanel';


function App() {
  // Initialize isLoged based on token in localStorage
  const [isLoged, setIsLoged] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoged(!!token); // Update isLoged based on token presence
    };

    checkToken();
    // Listen for changes to localStorage to detect login/logout across tabs
    window.addEventListener('storage', checkToken);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const handleIsLoged = () => {
    setIsLoged(prevState => !prevState);
  };

  return (
    <div className="app-container">
      <Routes>
        {/* Department Routes */}
        
        <Route path='/departmentPanel' element={isLoged ? <DepartmentPanel /> : <Navigate replace to="/login" />} />
        <Route path='/notifications' element={isLoged ? <Notifications /> : <Navigate replace to="/login" />} />
        <Route path='/depComplaints' element={isLoged ? <DepComplaints /> : <Navigate replace to="/login" />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login handleIsLoged={handleIsLoged} />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isLoged ? <Admin /> : <Navigate replace to="/login" />}>
          <Route index path="" element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="departments" element={<Departments />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* Main Routes */}
        <Route path="/" element={<NavBar isLoged={isLoged} />}>
          <Route path="complaint" element={isLoged ? <Complaint /> : <Navigate replace to="/login" />} />
          <Route path="complaintList" element={isLoged ? <ComplaintList /> : <Navigate replace to="/login" />} />
          <Route index element={<Home />} />
        </Route>
        
        {/* Not Found Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

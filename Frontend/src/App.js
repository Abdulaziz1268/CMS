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
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoged(true);
    }
  }, [isLoged]);

  const handleIsLoged = () => {
    setIsLoged(prevState => !prevState)
  }

  return (
    <div className="app-container">
      <Routes>
        {/* Department Routes */}
        <Route path='/departmentPanel' element={<DepartmentPanel />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/depComplaints' element={<DepComplaints />} />
        <Route path='/chat' element={<Chat />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login handleIsLoged={handleIsLoged} />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={/*isLoged ? */<Admin /> /*: <Navigate replace to="/login" />*/}>
          <Route index /*path="dashboard"*/ element={/*isLoged ?*/ <Dashboard /> /*: <Navigate replace to="/login" />*/} />
          <Route path="complaints" element={isLoged ? <Complaints /> : <Navigate replace to="/login" />} />
          <Route path="departments" element={/*isLoged ? */<Departments />/* : <Navigate replace to="/login" />*/} />
          <Route path="users" element={/*isLoged ? */<Users />/* : <Navigate replace to="/login" />*/} />
        </Route>
    
        {/* Main Routes */}
        <Route path="/" element={<NavBar isLoged={isLoged} />}>
          <Route path="complaint" element={isLoged ? <Complaint /> : <Navigate replace to="/login" />} />
          <Route path="complaintList" element={isLoged ? <ComplaintList /> : <Navigate replace to="/login" />} />
          <Route index element={<Home />} />
        </Route>
        {/* not Found Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

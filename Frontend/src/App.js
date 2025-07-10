import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

import "./App.css"
import Admin from "./components/AdminPanel/Admin"
import AuthContext from "./Context/AuthContext"
import Chat from "./components/Departments/Chat"
import Complaint from "./components/ComplaintSubmission/complaint"
import ComplaintList from "./components/ComplaintSubmission/complaintList"
import Complaints from "./components/AdminPanel/Complaints"
import Dashboard from "./components/AdminPanel/Dashboard"
import DepartmentPanel from "./components/Departments/departmetnPanel"
import Departments from "./components/AdminPanel/Departments"
import DepComplaints from "./components/Departments/depComplaints"
import ForgetPassword from "./components/Authentication/forgetPassword"
import Home from "./components/Home"
import Login from "./components/Authentication/Login"
import NavBar from "./components/Navbar"
import NotFound from "./components/NotFound"
import Notifications from "./components/Departments/Notifications"
import Register from "./components/Authentication/Register"
import Users from "./components/AdminPanel/Users"

function App() {
  // Initialize isLoged based on token in localStorage
  const [isLoged, setIsLoged] = useState(!!localStorage.getItem("token"))

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token")
      setIsLoged(!!token) // Update isLoged based on token presence
    }

    checkToken()
    // Listen for changes to localStorage to detect login/logout across tabs
    window.addEventListener("storage", checkToken)

    // Clean up event listener on component unmount
    return () => window.removeEventListener("storage", checkToken)
  }, [])

  const handleIsLoged = () => {
    setIsLoged((prevState) => !prevState)
  }

  return (
    <div className="app-container">
      <AuthContext.Provider value={{ isLoged, handleIsLoged }}>
        <Routes>
          {/* Department Routes */}
          <Route
            path="/departmentPanel"
            element={
              isLoged ? <DepartmentPanel /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/notifications"
            element={
              isLoged ? <Notifications /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/depComplaints"
            element={
              isLoged ? <DepComplaints /> : <Navigate replace to="/login" />
            }
          />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={isLoged ? <Admin /> : <Navigate replace to="/login" />}
          >
            <Route index path="" element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="departments" element={<Departments />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Main Routes */}
          <Route path="/" element={<NavBar />}>
            <Route
              path="complaint"
              element={
                isLoged ? <Complaint /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="complaintList"
              element={
                isLoged ? <ComplaintList /> : <Navigate replace to="/login" />
              }
            />
            <Route index element={<Home />} />
          </Route>

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App

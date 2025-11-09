import { Navigate, Route, Routes } from "react-router-dom"
import { useContext } from "react"

import "./App.css"
import Admin from "./components/AdminPanel/Admin"
import { AuthProvider, AuthContext } from "./Context/AuthContext"
// import Chat from "./components/Departments/Chat"
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
  return (
    <AuthProvider>
      <RoutesComponent />
      <div>
        <h1>vite</h1>
      </div>
    </AuthProvider>
  )
}

const RoutesComponent = () => {
  const { isLogged } = useContext(AuthContext)

  return (
    <div className="app-container">
      <Routes>
        {/* Department Routes */}
        <Route
          path="/departmentPanel"
          element={
            isLogged ? <DepartmentPanel /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/notifications"
          element={
            isLogged ? <Notifications /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/depComplaints"
          element={
            isLogged ? <DepComplaints /> : <Navigate replace to="/login" />
          }
        />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={isLogged ? <Admin /> : <Navigate replace to="/login" />}
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
              isLogged ? <Complaint /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="complaintList"
            element={
              isLogged ? <ComplaintList /> : <Navigate replace to="/login" />
            }
          />
          <Route index element={<Home />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
export default App

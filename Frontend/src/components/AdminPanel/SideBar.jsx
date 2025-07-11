import { Link } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../../Context/AuthContext"
import complaintLight from "../.././images/complaint-white.png"
import dashboardLight from "../.././images/dashboard-white.png"
import deprtmentLight from "../.././images/department-white.png"
import logoutLight from "../.././images/logout-white.png"
import usersLight from "../.././images/users-white.png"
// import dashboardDark from "../.././images/dashboard-dark.png"
// import loginDark from "../.././images/login-dark.png"
// import loginLight from "../.././images/login-white.png"
// import usersDark from "../.././images/users-dark.png"
// import logoutDark from "../.././images/logout-dark.png"
// import departmentDark from "../.././images/department-dark.png"
// import complaintDark from "../.././images/complaint-dark.png"

const SideBar = () => {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <div className="sidebar-container">
        <ul>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin">
              <img className="sidebar-img" src={dashboardLight} alt="" />
              Dashboard
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin/users">
              <img className="sidebar-img" src={usersLight} alt="" />
              Users
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin/departments">
              <img className="sidebar-img" src={deprtmentLight} alt="" />
              Departments
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin/complaints">
              <img className="sidebar-img" src={complaintLight} alt="" />
              Complaints
            </Link>
          </li>
        </ul>
        <ul>
          <li className="sidebar-item last-sidebar-item">
            <Link className="sidebar-link" to="/login" onClick={() => logout()}>
              <img className="sidebar-img" src={logoutLight} alt="" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideBar

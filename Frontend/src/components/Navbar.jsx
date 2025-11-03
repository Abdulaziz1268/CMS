import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../Context/AuthContext"

const NavBar = () => {
  const { isLogged, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    navigate("login")
  }

  const showLink = location.pathname !== "/"
  const showWelcome = location.pathname === "/"
  const fname = localStorage.getItem("fname")

  console.log(location.pathname)

  const handleSelect = (e) => {
    navigate(e.target.value)
  }

  return (
    <div className="nav">
      <nav className="nav-list">
        <h1 className="logo">CMS</h1>

        {showLink && (
          <>
            <ul>
              <li>
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/complaint"}>
                  Complaint
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/ComplaintList"}>
                  Complaint List
                </Link>
              </li>
            </ul>
            <select
              value={location.pathname}
              onChange={handleSelect}
              className="navDropDown"
            >
              <option value="/">Home</option>
              <option value="/complaint">Complaint</option>
              <option value="/complaintList">Complaint List</option>
            </select>
          </>
        )}
        {isLogged && showWelcome && (
          <h2 className="nav-welcome">Welcome {fname}</h2>
        )}
        {isLogged ? (
          <button className="nav-btn" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <button className="nav-btn" onClick={handleClick}>
            Signin/ Signup
          </button>
        )}
      </nav>
      <Outlet />
    </div>
  )
}

export default NavBar

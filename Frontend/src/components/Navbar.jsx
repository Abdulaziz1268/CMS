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

  return (
    <div className="nav">
      <nav className="nav-list">
        <h1 className="logo">CMS</h1>
        <ul>
          {showLink && (
            <>
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
            </>
          )}
          {isLogged && showWelcome ? <li>Welcome {fname}</li> : <li></li>}
        </ul>
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

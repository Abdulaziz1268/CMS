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
    // <div className="pt-5">
    //   <nav className="w-full h-[8vh] flex justify-evenly items-center">
    //     <h1 className="text-blue-700 text-6xl m-0 align-top">CMS</h1>

    //     {showLink && (
    //       <>
    //         <ul className="flex p-0 list-none">
    //           <li>
    //             <Link
    //               className="text-gray-900 text-xl font-semibold decoration-0 ml-5 h-[50px] p-6 hover:text-blue-700"
    //               to={"/"}
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               className="text-gray-900 text-xl font-semibold decoration-0 ml-5 h-[50px] p-6 hover:text-blue-700"
    //               to={"/complaint"}
    //             >
    //               Complaint
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               className="text-gray-900 text-xl font-semibold decoration-0 ml-5 h-[50px] p-6 hover:text-blue-700"
    //               to={"/ComplaintList"}
    //             >
    //               Complaint List
    //             </Link>
    //           </li>
    //         </ul>
    //         <select
    //           value={location.pathname}
    //           onChange={handleSelect}
    //           className="navDropDown"
    //         >
    //           <option value="/">Home</option>
    //           <option value="/complaint">Complaint</option>
    //           <option value="/complaintList">Complaint List</option>
    //         </select>
    //       </>
    //     )}
    //     {isLogged && showWelcome && <h2 className="m-0">Welcome {fname}</h2>}
    //     {isLogged ? (
    //       <button
    //         className="hover:cursor-pointer hover:bg-blue-400 hover:scale-105 duration-300 ease-in-out border-none m-0 px-[15px] py-[5px] h-[50px] bg-blue-700 text-white rounded-[10px]"
    //         onClick={() => logout()}
    //       >
    //         Logout
    //       </button>
    //     ) : (
    //       <button
    //         className="hover:cursor-pointer hover:bg-blue-400 hover:scale-105 duration-300 ease-in-out border-none m-0 px-[15px] py-[5px] h-[50px] bg-blue-700 text-white rounded-[10px]"
    //         onClick={handleClick}
    //       >
    //         Signin/ Signup
    //       </button>
    //     )}
    //   </nav>
    //   <Outlet />
    // </div>
    <>
      <div className="w-full  shadow-sm border-b border-gray-200 fixed backdrop-blur-sm z-50">
        <nav className="w-full min-h-[8vh] flex  sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-2 gap-4 sm:gap-0">
          {/* Logo */}
          <h1 className="text-blue-700 text-4xl sm:text-5xl lg:text-6xl font-bold m-0">
            CMS
          </h1>

          {showLink && (
            <>
              {/* Navigation Links - Hidden on mobile */}
              <ul className="hidden md:flex p-0 list-none space-x-2 lg:space-x-4">
                <li>
                  <Link
                    className={`text-gray-900 text-lg font-semibold no-underline px-4 py-3 rounded-lg transition-all duration-200 hover:text-blue-700 hover:bg-blue-50 ${
                      location.pathname === "/"
                        ? "text-blue-700 bg-blue-100"
                        : ""
                    }`}
                    to={"/"}
                  >
                    🏠 Home
                  </Link>
                </li>
                {localStorage.getItem("role") !== "admin" && (
                  <li>
                    <Link
                      className={`text-gray-900 text-lg font-semibold no-underline px-4 py-3 rounded-lg transition-all duration-200 hover:text-blue-700 hover:bg-blue-50 ${
                        location.pathname === "/complaint"
                          ? "text-blue-700 bg-blue-100"
                          : ""
                      }`}
                      to={"/complaint"}
                    >
                      📝 Complain
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className={`text-gray-900 text-lg font-semibold no-underline px-4 py-3 rounded-lg transition-all duration-200 hover:text-blue-700 hover:bg-blue-50 ${
                      location.pathname === "/ComplaintList"
                        ? "text-blue-700 bg-blue-100"
                        : ""
                    }`}
                    to={"/ComplaintList"}
                  >
                    📋 Complaint List
                  </Link>
                </li>
              </ul>

              {/* Mobile Dropdown - Visible on mobile */}
              <select
                value={location.pathname}
                onChange={handleSelect}
                className="md:hidden w-full max-w-[200px] px-2 py-2 text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="/">🏠 Home</option>
                {localStorage.getItem("role") !== "admin" && (
                  <option value="/complaint">📝 Complain</option>
                )}
                <option value="/ComplaintList">📋 Complaint List</option>
              </select>
            </>
          )}

          {/* User Welcome Message */}
          {isLogged && showWelcome && (
            <div className="h-full flex items-center">
              <p className="text-gray-700 text-lg font-medium m-0  hidden sm:block">
                Welcome,{" "}
                <span className="text-blue-600 font-semibold">{fname}</span>!
              </p>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLogged ? (
              <button
                className="hover:cursor-pointer hover:bg-blue-600 active:scale-95 hover:scale-105 duration-300 ease-in-out border-none px-2 sm:px-4 py-2 h-[50px] bg-blue-700 text-white rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all min-w-[100px]"
                onClick={() => logout()}
              >
                👋 Logout
              </button>
            ) : (
              <button
                className="hover:cursor-pointer hover:bg-blue-600 active:scale-95 hover:scale-105 duration-300 ease-in-out border-none px-4 py-2 h-[50px] bg-blue-700 text-white rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all min-w-[120px]"
                onClick={handleClick}
              >
                🔐 Signin/ Signup
              </button>
            )}
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar

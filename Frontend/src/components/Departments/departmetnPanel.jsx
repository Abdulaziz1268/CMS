import Notifications from "./Notifications"
import DepComplaints from "./depComplaints"
import homeWhite from '../../images/home-white.png'
import homeDark from '../../images/home-dark.png'
import sun from '../../images/light-mode.png'
import moon from '../../images/dark-mode.png'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DepartmentPanel = () => {
  
  const [darkTheme, setDarkTheme] = useState(false)
  const navigate = useNavigate()

  function toggleTheme() {
    setDarkTheme(prevTheme => !prevTheme)
    document.body.classList.toggle("light-theme")
}

  return (
    <div className="department-pannel-container">
      <div className="new-complaints">
        <div className="header">
        <img className="theme-image admin-nav-elements" onClick={() => navigate('/')} src={!darkTheme ? homeDark : homeWhite} alt="" />
        <h2>New Complaints</h2>
        <img className="theme-image admin-nav-elements" onClick={toggleTheme} src={darkTheme ? sun : moon} alt="" />
        </div>
        <Notifications />
      </div>
      <div className="old-complaints">
        <h2>Old Complaints</h2>
        <DepComplaints />
      </div>
    </div>
  )
}

export default DepartmentPanel

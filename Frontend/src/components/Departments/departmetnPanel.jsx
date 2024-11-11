import Notifications from "./Notifications"
import DepComplaints from "./depComplaints"
import homeWhite from '../../images/home-white.png'
import homeDark from '../../images/home-dark.png'
import sun from '../../images/light-mode.png'
import moon from '../../images/dark-mode.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const DepartmentPanel = () => {
  
  const [darkTheme, setDarkTheme] = useState(false)
  const [refresher, setRefersher] = useState(true)
  const [department, setDepartment] = useState([])

  const navigate = useNavigate()

  useEffect(()=> {
    axios.get(`http://localhost:2005/getDepHead/${localStorage.getItem('fname')}`)
      .then(response => {
        setDepartment(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [refresher])

  function handleRefresher() {
    setRefersher(prevState => !prevState)
  }

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
        <Notifications 
          handleRefresher={handleRefresher} 
          refresher={refresher} 
          department={department}
          />
      </div>
      <div className="old-complaints">
        <h2>Old Complaints</h2>
        <DepComplaints 
          refresher={refresher} 
          department={department}
          />
      </div>
    </div>
  )
}

export default DepartmentPanel

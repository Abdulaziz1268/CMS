import { useState } from "react";
import sun from '../../images/light-mode.png'
import moon from '../../images/dark-mode.png'
import { useLocation, useNavigate } from "react-router-dom";
import homeWhite from '../../images/home-white.png'
import homeDark from '../../images/home-dark.png'

const AdminNav = () => {
    const [darkTheme, setDarkTheme] = useState(false)
    const [title, setTitle] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    function toggleTheme() {
        setDarkTheme(prevTheme => !prevTheme)
        document.body.classList.toggle("light-theme")
    }

    const loc = location.pathname
    
    return (
        <div className="admin-nav-container">
            <h2 className="location">{loc === '/admin/users' ? 'Users' :
                loc === '/admin' ? 'Dashboard':
                loc === '/admin/departments' ? 'Departments' :
                loc === '/admin/complaints' ? 'Complaints' : ''}
            </h2>
            <div className="admin-inner-nav-container">
                <h2 className="profile-name admin-nav-elements">Welcome {localStorage.getItem('fname')}</h2>
                <img className="theme-image admin-nav-elements" onClick={() => navigate('/')} src={darkTheme ? homeDark : homeWhite} alt="" />
                <img className="theme-image admin-nav-elements" onClick={toggleTheme} src={darkTheme ? sun : moon} alt="" />
            </div>           
        </div>
    );
}
 
export default AdminNav;
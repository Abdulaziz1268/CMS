import { useState } from "react";
import sun from '../../images/light-mode.png'
import moon from '../../images/dark-mode.png'
import { useLocation } from "react-router-dom";

const AdminNav = () => {
    const [darkTheme, setDarkTheme] = useState(false)
    const [title, setTitle] = useState('')
    const location = useLocation()

    function toggleTheme() {
        setDarkTheme(prevTheme => !prevTheme)
        document.body.classList.toggle("light-theme")
    }

    // if(location.pathname === '/admin/users') {
    //     setTitle('Users')
    // } else if(location.pathname === '/admin/dashboard') {
    //     setTitle('Dashboard')
    // } else if (location.pathname === '/admin/departments') {
    //     setTitle('Departments')
    // } else if (location.pathname === '/admin/complaints') {
    //     setTitle('Complaints')
    // } else {
    //     setTitle('')
    // }

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
                <img className="theme-image admin-nav-elements" onClick={toggleTheme} src={darkTheme ? sun : moon} alt="" />
            </div>           
        </div>
    );
}
 
export default AdminNav;
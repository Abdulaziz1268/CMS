import dashboardDark from '../.././images/dashboard-dark.png'
import dashboardLight from '../.././images/dashboard-white.png'
import loginDark from '../.././images/login-dark.png'
import loginLight from '../.././images/login-white.png'
import usersDark from '../.././images/users-dark.png'
import usersLight from '../.././images/users-white.png'
import logoutDark from '../.././images/logout-dark.png'
import logoutLight from '../.././images/logout-white.png'
import departmentDark from '../.././images/department-dark.png'
import deprtmentLight from '../.././images/department-white.png'
import complaintDark from '../.././images/complaint-dark.png'
import complaintLight from '../.././images/complaint-white.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'


const SideBar = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('fname')
    localStorage.removeItem('role')
    navigate('/login')
}


    return (
        <>
            <div className="sidebar-container">
                <ul>
                    <li className='sidebar-item'><Link className='sidebar-link' to='/admin'><img className='sidebar-img' src={dashboardLight} alt="" />Dashboard</Link></li>
                    <li className='sidebar-item'><Link className='sidebar-link' to='/admin/users'><img className='sidebar-img' src={usersLight} alt=""/>Users</Link></li>
                    <li className='sidebar-item'><Link className='sidebar-link' to='/admin/departments'><img className='sidebar-img' src={deprtmentLight} alt=""/>Departments</Link></li>
                    <li className='sidebar-item'><Link className='sidebar-link' to='/admin/complaints'><img className='sidebar-img' src={complaintLight} alt=""/>Complaints</Link></li>
                </ul>
                <ul>
                    <li className='sidebar-item last-sidebar-item'><Link className='sidebar-link' to='/login' onClick={handleLogout} ><img className='sidebar-img' src={logoutLight} alt='' />Logout</Link></li>
                </ul>
            </div>
        </>
    );
}
 
export default SideBar;
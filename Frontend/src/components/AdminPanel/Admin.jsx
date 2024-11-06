import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import AdminNav from "./AdminNav";


const Admin = () => {

    return (
        <div className="admin-container">
            <SideBar />  
            <div className="admin-inner-container">
                <AdminNav />        
                <Outlet />
            </div>
            
        </div>
    );
}
 
export default Admin;
import axios from "axios";
import { useEffect, useState } from "react";
import deleteWhite from '../../images/delete-white.png'
import deleteDark from '../../images/delete-dark.png'
import editWhite from '../../images/edit-white.png'
import editDark from '../../images/edit-dark.png'

const Users = () => {

    const [data, setData] = useState('')
    useEffect(()=>{
        axios.get('http://localhost:2005/userList')
            .then(result => {
                setData(result.data)
            })
            .catch(err => err)
    }, [])

    const handleEdit = (id) => {

    }

    const handleDelete = (id) => {
        
    }

    return (
        <div className="users-container">
            <table className="users-table">
                <thead className="table-head">
                    <th className="table-head-data r-border">ID</th>
                    <th className="table-head-data r-border">First Name</th>
                    <th className="table-head-data r-border">Last Name</th>
                    <th className="table-head-data r-border">Email</th>
                    <th className="table-head-data">Role</th>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((user, index) => (
                        
                            <tr key={index} className="table-row">
                                <td className="table-row-data r-border">{user._id}</td>
                                <td className="table-row-data r-border">{user.fname}</td>
                                <td className="table-row-data r-border">{user.lname}</td>
                                <td className="table-row-data r-border">{user.email}</td>
                                <td className="table-row-data">{user.role}</td>
                                <div className="hidden-btn">
                                        <img src={editDark} className="row-btn" onClick={() => handleEdit(user._id)} alt="" />
                                        <img src={deleteDark} className="row-btn" onClick={() => handleDelete(user._id)} alt="" />
                                    </div>
                            </tr>         
                        
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </tbody> 
            </table>
        </div>
    );
}
 
export default Users;
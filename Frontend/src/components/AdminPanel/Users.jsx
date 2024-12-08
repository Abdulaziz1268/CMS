import axios from "axios";
import { useEffect, useState } from "react";
import deleteWhite from '../../images/delete-white.png'
import deleteDark from '../../images/delete-dark.png'
import editWhite from '../../images/edit-white.png'
import editDark from '../../images/edit-dark.png'
import { Toaster, toast } from "sonner";
import saveDark from '../../images/save-dark.png'
import saveWhite from '../../images/save-white.png'
import cancelWhite from '../../images/cancel-white.png'
import cancelDark from '../../images/cancel-dark.png'

const Users = () => {
    const [data, setData] = useState('')
    const [editUserId, setEditUserId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        role: ''
      });


    useEffect(()=>{
        axios.get('https://cms-hwdq.onrender.com/userList')
            .then(result => {
                setData(result.data)
            })
            .catch(err => err)
    }, [editUserId])

    const handleFormChange = (e) => {
        setEditFormData({
          ...editFormData,
          [e.target.name]: e.target.value,
        });
    }

    const handleEditClick = (department) => {
        setEditUserId(department._id);
        setEditFormData(department);
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`https://cms-hwdq.onrender.com/updateUser/${editUserId}`, editFormData);
          setData(data.map(user => (user._id === editUserId ? response.data : user)));
          setEditUserId(null); // Exit edit mode
          toast.success('User successfull updated')
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('error occured')
        }
      };

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`https://cms-hwdq.onrender.com/deleteUser/${id}`)
            console.log(result)
            setData((prevItems) => prevItems.filter(item => item._id !== id));
            toast.success('User successfully deleted')
        } catch (error) {
            console.log(error.message)
            toast.error('there was an error please try again')
        }
    }

    return (
        <div className="users-container">
            <Toaster richColors expand={false} position="bottom-center" />
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
                        data.map(user => (
                        
                            <tr key={user._id} className="table-row">
                                {editUserId === user._id ? (
                                    <>
                                    <td className="table-row-data r-border">{user._id}</td>
                                    <td className="table-row-data r-border">
                                        <input className="table-inputs inputs em-pas" type="text" name='fname' value={editFormData.fname} onChange={handleFormChange}/>
                                    </td>
                                    <td className="table-row-data r-border">
                                        <input type="text" className="table-inputs inputs em-pas" name='lname' value={editFormData.lname} onChange={handleFormChange}/>
                                    </td>
                                    <td className="table-row-data r-border">
                                    <input type="text" name='email' className="table-inputs inputs em-pas" value={editFormData.email} onChange={handleFormChange}/>
                                    </td>
                                    <td className="table-row-data td-last">
                                        <select className="table-inputs inputs em-pas" name="role" onChange={handleFormChange} value={editFormData.role}>
                                            <option value="admin" >admin</option>
                                            <option value="head" >head</option>
                                            <option value="user" >user</option>
                                        </select>
                                    {/* <input type="text" name='email' className="table-inputs inputs em-pas" value={editFormData.email} onChange={handleFormChange}/> */}
                                    </td>
                                    <div className="update-div">
                                        <img src={saveDark} className="row-btn" onClick={handleFormSubmit} />
                                        <img src={cancelDark} className="row-btn" onClick={() => setEditUserId(null)} />
                                    </div>
                                    </>
                                ):(
                                <>
                                    <td className="table-row-data r-border">{user._id}</td>
                                    <td className="table-row-data r-border">{user.fname}</td>
                                    <td className="table-row-data r-border">{user.lname}</td>
                                    <td className="table-row-data r-border">{user.email}</td>
                                    <td className="table-row-data">{user.role}</td>
                                    <div className="hidden-btn">
                                            <img src={editDark} className="row-btn" onClick={() => handleEditClick(user)} alt="" />
                                            <img src={deleteDark} className="row-btn" onClick={() => handleDelete(user._id)} alt="" />
                                        </div>
                                    </>
                                )}
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
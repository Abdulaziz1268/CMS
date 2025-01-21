import axios from "axios"
import { Toaster, toast } from "sonner"
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"

import deleteWhite from '../../images/delete-white.png'
import deleteDark from '../../images/delete-dark.png'
import editWhite from '../../images/edit-white.png'
import editDark from '../../images/edit-dark.png'
import saveDark from '../../images/save-dark.png'
import saveWhite from '../../images/save-white.png'
import cancelWhite from '../../images/cancel-white.png'
import cancelDark from '../../images/cancel-dark.png'

const Departments = () => {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        head: '',
        members: ''
    })

    const togglePopup = async() => {
        setIsOpen(prevState => !prevState)
        setFormData({})
    }

    const handleChange = (event) => {
        setFormData(prevData => {
            return ({
                ...prevData,
                [event.target.name]: event.target.value
            })
        })
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        try {
            const newDep = await axios.post(`https://cms-hwdq.onrender.com/department/`, formData)
            console.log(newDep)
            togglePopup()
            toast.success('New Department Successfully added')
        } catch (error) {
            console.log(error)
            toast.error('error occured')
        }
    }    

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`https://cms-hwdq.onrender.com/deleteDepartment/${id}`)
            console.log(result)
            setNewData((prevItems) => prevItems.filter(item => item._id !== id));
            toast.success('Department successfully deleted')
        } catch (error) {
            console.log(error.message)
            toast.error('there was an error please try again')
        }

    } 



  const [editDepId, setEditDepId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    head: '',
    members: ''
  });

    useEffect(()=>{
        axios.get('https://cms-hwdq.onrender.com/departmentList')
            .then(result => {
                setData(result.data)
            })
            .catch(err => console.log(err))
    }, [editDepId, newData, isOpen])

    const handleFormChange = (e) => {
        setEditFormData({
          ...editFormData,
          [e.target.name]: e.target.value,
        });
    }

    const handleEditClick = (department) => {
        setEditDepId(department._id);
        setEditFormData(department);
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`https://cms-hwdq.onrender.com/updateDepartment/${editDepId}`, editFormData);
          setData(data.map(dep => (dep._id === editDepId ? response.data : dep)));
          setEditDepId(null); // Exit edit mode
          toast.success('successfull')
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('error occured')
        }
      };

    return (
        <div className="departments-container">
            <Toaster richColors expand={false} position="bottom-center" />
            <div className="inner-container">
                <table className="departments-table">
                    <thead className="table-head">
                        <tr>
                            <th className="table-head-data r-border">ID</th>
                            <th className="table-head-data r-border">Department Name</th>
                            <th className="table-head-data r-border">Department Head</th>
                            <th className="table-head-data ">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map( department => (
                            
                                <tr key={department._id} className="table-row">
                                    {editDepId === department._id ? (
                                        <>
                                            <td className="table-row-data r-border">{department._id}</td>
                                            <td className="table-row-data r-border">
                                                <input className="table-inputs inputs em-pas" type="text" name='name' value={editFormData.name} onChange={handleFormChange}/>
                                            </td>
                                            <td className="table-row-data r-border">
                                                <input type="text" className="table-inputs inputs em-pas" name='head' value={editFormData.head} onChange={handleFormChange}/>
                                            </td>
                                            <td className="table-row-data td-last">
                                            <input type="text" name='members' className="table-inputs inputs em-pas" value={editFormData.members} onChange={handleFormChange}/>
                                            </td>
                                            <div className="update-div">
                                                <img src={saveDark} className="row-btn" onClick={handleFormSubmit} />
                                                <img src={cancelDark} className="row-btn" onClick={() => setEditDepId(null)} />
                                            </div>
                                            </>
                                        ) : (
                                        <>
                                            <td className="table-row-data r-border">{department._id}</td>
                                            <td className="table-row-data r-border">{department.name}</td>
                                            <td className="table-row-data r-border">{department.head}</td>
                                            <td className="table-row-data">{department.members}</td>
                                            <div className="hidden-btn">
                                                <img src={editDark} className="row-btn" onClick={()=> handleEditClick(department)} alt="" />
                                                <img src={deleteDark} className="row-btn" onClick={()=>handleDelete(department._id)} alt="" />
                                            </div>
                                        </>
                                    )}
                                </tr>         
                            
                            ))
                        ) : (
                            <p>No departments found.</p>
                        )}
                    </tbody> 
                </table>
                
                <Popup
                    trigger={<button className="dep-btn add-btn">+ Add Department</button>}
                    modal
                    nested
                >
                    { close => (
                        <form onSubmit={ e => { handleAddSubmit(e); close(); }} className="department-form">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} className="inputs em-pas" required onChange={handleChange} />
                            <label htmlFor="head">Head</label>
                            <input type="text" id="head" name="head" value={formData.head} className="inputs em-pas" required onChange={handleChange} />
                            <label htmlFor="members">Members</label>
                            <input type="text" id="members" name="members" value={formData.members} className="inputs em-pas" required onChange={handleChange} />
                            {/* later make this a select with list of checkbexes nested inside options */}
                            <div className="add-btn-div">
                                <button className="dep-inputs dep-btn dep-one" onClick={() => close()}>Cancel</button>
                                <input type="submit" name="submit" value='Submit' className="dep-inputs dep-btn dep-two" />
                            </div>
                        </form>
                        )
                    }
                </Popup>
            </div>
            
        </div>
    );
}
export default Departments;
import axios from "axios"
import { Toaster, toast } from "sonner"
import { useEffect, useState } from "react"
import deleteWhite from '../../images/delete-white.png'
import deleteDark from '../../images/delete-dark.png'
import editWhite from '../../images/edit-white.png'
import editDark from '../../images/edit-dark.png'

const Departments = () => {
    const [data, setData] = useState([])
    const [render, setRender] = useState(true) //just to rerender whenever a document is deleted from the database
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        head: '',
        members: ''
    })
    console.log(formData)
    useEffect(()=>{
        axios.get('http://localhost:2005/departmentList')
            .then(result => {
                setData(result.data)
            })
            .catch(err => console.log(err))
    }, [])

    const togglePopup = async(id, num) => {
        num === 1 ? setIsOpen1(prevState => !prevState) : setIsOpen2(prevState => !prevState)
    }

    const handleEdit = async (id, updateData) => {
        try {
            await togglePopup()
            const result = await axios.patch(`http://localhost:2005/${id}`, updateData)
            toast.success('Item successfully updated')
            console.log(result)
        } catch (error) {
            console.log(error.message)
            toast.error('There was an error please try again')
        }
    }

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete('http://localhost:2005/deleteDepartment', id)
            console.log(result)
            setData((prevItems) => prevItems.filter(item => item.id !== id));
            toast.success('Department successfully deleted')
        } catch (error) {
            console.log(error.message)
            toast.error('there was an error please try again')
        }

    } 

    const handleChange = (event) => {
        setFormData(prevData => {
            return ({
                ...prevData,
                [event.target.name]: event.target.value
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const result = await axios.post('http://localhost:2005/department', formData)
            console.log(result)
            togglePopup()
        } catch (error) {
            console.log(error.message)
        }


    }

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
                                    <td className="table-row-data r-border">{department._id}</td>
                                    <td className="table-row-data r-border">{department.name}</td>
                                    <td className="table-row-data r-border">{department.head}</td>
                                    <td className="table-row-data">{department.members}</td>
                                    <div className="hidden-btn">
                                        <img src={editDark} className="row-btn" onClick={()=> togglePopup(department._id, 2)} alt="" />
                                        <img src={deleteDark} className="row-btn" onClick={()=>handleDelete(department._id)} alt="" />
                                    </div>
                                </tr>         
                            
                            ))
                        ) : (
                            <p>No departments found.</p>
                        )}
                    </tbody> 
                </table>
                {isOpen2 && 
                    <form onSubmit={handleEdit} className="department-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} className="dep-inputs" onChange={handleChange} />
                        <label htmlFor="head">Head</label>
                        <input type="text" id="head" name="head" value={formData.head} className="dep-inputs" onChange={handleChange} />
                        <label htmlFor="members">Members</label>
                        <input type="text" id="members" name="members" value={formData.members} className="dep-inputs" onChange={handleChange} />
                        {/* later make this a select with list of checkbexes nested inside options */}
                        <input type="submit" name="submit" value='Submit' className="dep-inputs dep-btn" />
                    </form>
                }
                <button className="dep-btn add-btn" onClick={() => togglePopup(1)}>+ Add Department</button>
                {isOpen1 && 
                    <form onSubmit={handleSubmit} className="department-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} className="dep-inputs" required onChange={handleChange} />
                        <label htmlFor="head">Head</label>
                        <input type="text" id="head" name="head" value={formData.head} className="dep-inputs" required onChange={handleChange} />
                        <label htmlFor="members">Members</label>
                        <input type="text" id="members" name="members" value={formData.members} className="dep-inputs" required onChange={handleChange} />
                        {/* later make this a select with list of checkbexes nested inside options */}
                        <input type="submit" name="submit" value='Submit' className="dep-inputs dep-btn" />
                    </form>
                }
            </div>
            
        </div>
    );
}
 
export default Departments;
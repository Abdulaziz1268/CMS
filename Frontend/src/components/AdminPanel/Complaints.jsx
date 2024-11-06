import axios from "axios"
import { useEffect, useState } from "react"

const Complaints = () => {
    const [data, setData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:2005/complaintList')
            .then(response => {
                setData(response.data)
            })
    }, [])

    return (
        <div className="complaint-list-container-admin">
            
        {/* Check if data is an array and map over it */}
        {data.length > 0 ? (
            data.map((complaint, index) => (
                <div key={index} className="complaint-list-item">
                    
                    <p>Complaint description: {complaint.description}</p>
                    <p>Complaint severity: {complaint.severity}</p>
                    <p>{complaint.attachment}</p>
                    <p>To department: {complaint.department}</p>
                    <img src="complaint.attachment" alt="" />
                    {/* Display other complaint properties */}
                </div>
            ))
        ) : (
            <p>No complaints found.</p>
        )}
    </div>    );
}
 

 
export default Complaints;
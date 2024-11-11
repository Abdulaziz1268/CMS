import axios from "axios";
import { useEffect, useState } from "react";

const ComplaintList = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:2005/complaintList')
            .then(response => {
                setData(response.data)
            })
    }, [])

    return (
        <div className="complaint-list-container">
        <h1>Complaint List</h1>

        {/* Check if data is an array and map over it */}
        {data.length > 0 ? (
            data.map((complaint, index) => {
                if(complaint.status === 'read'){
                    return (
                        <div key={index} className="complaint-list-item">
                    
                            <p><strong>Complaint description:</strong> {complaint.description}</p>
                            <p><strong>Complaint severity:</strong> {complaint.severity}</p>
                            <p>{complaint.file}</p>
                            <p><strong>To department:</strong> {complaint.department}</p>
                            <p><strong>Solution:</strong> {complaint.solution}</p>

                            {/* Display other complaint properties */}
                        </div>
                    )
                }
            })
        ) : (
            <p>No complaints found.</p>
        )}
    </div>    );
}
 
export default ComplaintList;
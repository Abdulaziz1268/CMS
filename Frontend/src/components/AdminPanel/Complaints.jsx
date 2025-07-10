import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { adminApi } from "../Authentication/api"

const Complaints = () => {
  const [data, setData] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    adminApi.get("/complaintList").then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <div className="complaint-list-container-admin">
      {/* <button className="dep-btn add-btn" onClick={() => navigate('/departmentPanel')}>View admin complaints</button> */}
      {/* Check if data is an array and map over it */}
      {data.length > 0 ? (
        data.map((complaint, index) => (
          <div key={index} className="complaint-list-item">
            {complaint.status === "read" ? (
              <p className="resolved">Resolved</p>
            ) : (
              <p className="unresolved">Unresolved</p>
            )}
            <p>
              <strong>Complaint description:</strong> {complaint.description}
            </p>
            <p>
              <strong>Complaint severity:</strong> {complaint.severity}
            </p>
            <p>{complaint.attachment}</p>
            <p>
              <strong>To department:</strong> {complaint.department}
            </p>
            <p>
              <strong>Reporter:</strong> {complaint.reporter}
            </p>
            <p>
              <strong>posted at:</strong> {complaint.createdAt}
            </p>
            {/*later add attachment*/}
          </div>
        ))
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  )
}

export default Complaints

import axios from "axios"
import { useEffect, useState } from "react"
import { adminApi, headApi, userApi } from "../Authentication/api"

const ComplaintList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const checkUser = async () => {
      const role = localStorage.getItem("role")
      const api =
        role === "admin" ? adminApi : role === "head" ? headApi : userApi
      try {
        const response = await api.get("/complaintList")
        setData(response.data.reverse())
      } catch (error) {
        console.log(error)
      }
    }

    checkUser()
  }, [])

  const currentUser = localStorage.getItem("email")

  return (
    <div className="complaint-list-container">
      <h1>Complaint List</h1>

      {/* Check if data is an array and map over it */}
      {data.length > 0 ? (
        data.map((complaint) => {
          if (
            complaint.status === "read" ||
            complaint.reporter === currentUser
          ) {
            return (
              <div key={complaint._id} className="complaint-list-item">
                {complaint.reporter === currentUser && (
                  <p className="badge">Your Complaint</p>
                )}
                {complaint.status !== "read" && (
                  <p className="unresolved">Unresolved</p>
                )}
                <p>
                  <strong>Complaint description:</strong>{" "}
                  {complaint.description}
                </p>
                <p>
                  <strong>Complaint severity:</strong> {complaint.severity}
                </p>
                <p>{complaint.file}</p>
                <p>
                  <strong>To department:</strong> {complaint.department}
                </p>
                <p>
                  <strong>Solution:</strong> {complaint.solution}
                </p>

                {/* Display other complaint properties */}
              </div>
            )
          }
        })
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  )
}

export default ComplaintList

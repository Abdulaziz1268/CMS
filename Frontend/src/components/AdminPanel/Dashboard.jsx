import { useState, useEffect } from "react"

import SimpleLineChart from "./SimpleLineChart"
import { adminApi } from "../Authentication/api"

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0)
  const [departmentCount, setDepartmentCount] = useState(0)
  const [complaintCount, setComplaintCount] = useState(0)
  const [clicked, setClicked] = useState(1)
  const [data, setData] = useState({
    users: [],
    departments: [],
    complaints: [],
  })

  useEffect(() => {
    adminApi
      .get("/userList")
      .then((result) => {
        setUserCount(result.data.length)
        setData((prevState) => {
          return {
            ...prevState,
            users: result.data,
          }
        })
      })
      .catch((err) => err)

    adminApi
      .get("/departmentList")
      .then((result) => {
        setDepartmentCount(result.data.length)
        setData((prevState) => {
          return {
            ...prevState,
            departments: result.data,
          }
        })
      })
      .catch((err) => err)

    adminApi
      .get("/complaintList")
      .then((result) => {
        setComplaintCount(result.data.length)
        setData((prevState) => {
          return {
            ...prevState,
            complaints: result.data,
          }
        })
      })
      .catch((err) => err)
  }, [])

  return (
    <div className="dashboard-container">
      <div className="top-container">
        <div className="div-1 metrics" onClick={() => setClicked(1)}>
          <h2>Users</h2>
          <h2>{userCount}</h2>
        </div>
        <div className="div-2 metrics" onClick={() => setClicked(2)}>
          <h2>Departments</h2>
          <h2>{departmentCount}</h2>
        </div>
        <div className="div-3 metrics" onClick={() => setClicked(3)}>
          <h2>Complaints</h2>
          <h2>{complaintCount}</h2>
        </div>
      </div>
      <div className="bottom-container">
        <SimpleLineChart data={data} clicked={clicked} />
      </div>
    </div>
  )
}

export default Dashboard

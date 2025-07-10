import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"

import { adminApi, headApi, userApi } from "../Authentication/api"

function Complaint() {
  const [depList, setDepList] = useState([])
  const [loggedUser, setLoggedUser] = useState("")
  const [formData, setFormData] = useState({
    department: "",
    severity: "",
    description: "",
    file: null,
    reporter: localStorage.getItem("email") || "",
  })

  useEffect(() => {
    const checkUser = async () => {
      const role = localStorage.getItem("role")
      setLoggedUser(role)
      const api =
        role === "admin" ? adminApi : role === "head" ? headApi : userApi

      try {
        const response = await api.get("/departmentList")
        setDepList(response.data)
      } catch (error) {
        console.log(error)
        toast.error(
          error.response?.data?.message || "error fetching departments"
        )
      }
    }

    checkUser()
  }, [])

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    })
  }

  function handleFileChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        file: event.target.files[0],
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData()
    data.append("department", formData.department)
    data.append("severity", formData.severity)
    data.append("description", formData.description)
    data.append("reporter", formData.reporter)
    data.append("file", formData.file)

    const api =
      loggedUser === "admin"
        ? adminApi
        : loggedUser === "head"
        ? headApi
        : userApi
    api
      .post("/createComplaint", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data)
        toast.success("your complaint is successfully submited")
        setFormData({
          department: "",
          severity: "",
          description: "",
          file: null,
          reporter: localStorage.getItem("email") || "",
        })
      })
      .catch((error) => {
        console.log(error.message)
        toast.error("there was an error please try again")
      })
  }

  return (
    <div className="apps-container">
      <div className="complaint-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="departments">Departments</label>
          <select
            id="departments"
            className="inputs em-pas"
            name="department"
            required
            onChange={handleChange}
            value={formData.department}
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="admin">Admin </option>
            {depList.map((dep) => (
              <option key={dep._id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </select>
          <label htmlFor="severity">severity</label>
          <select
            id="severity"
            className="inputs em-pas"
            name="severity"
            required
            onChange={handleChange}
            value={formData.severity}
          >
            <option value="" disabled>
              Select severity
            </option>
            <option value="very sever">Very severe</option>
            <option value="severe">Sever</option>
            <option value="normal">Normal</option>
            <option value="easy">Easy</option>
          </select>

          <label htmlFor="desc">Description</label>
          <textarea
            name="description"
            className="inputs em-pas txt-area"
            required
            id="description"
            placeholder="describe your complaint"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="file">Attach file</label>
          <input
            type="file"
            id="file"
            className="inputs"
            name="file"
            // value={formData.file}
            onChange={handleFileChange}
          />
          <input
            type="submit"
            className="inputs btn btn1"
            name="submit"
            value="Submit"
          />
        </form>
        <Toaster position="bottom-center" expand={false} richColors />
      </div>
    </div>
  )
}

export default Complaint

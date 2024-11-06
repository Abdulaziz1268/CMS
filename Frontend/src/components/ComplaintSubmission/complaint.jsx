import axios from "axios"
import { useState } from "react"
import { Toaster, toast } from 'sonner';



function Complaint() {
  const [formData, setFormData] = useState({
    department: "",
    severity: "",
    description: "",
    file: "",
    reporter: localStorage.getItem("email"),
  })

  console.log(formData)

  console.log(formData.reporter)

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post("http://localhost:2005/complaint", formData)
      .then(response => {
        console.log(response.data)
        toast.success("your complaint is successfully submited")
      })
      .catch(error => {
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
            <option value="software engineering">software engineering</option>
            <option value="computer science">computer science</option>
            <option value="information system">information system</option>
            <option value="information technology">
              information technology
            </option>
            <option value="admin">Admin </option>
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
            name="attachment"
            value={formData.file}
            onChange={handleChange}
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

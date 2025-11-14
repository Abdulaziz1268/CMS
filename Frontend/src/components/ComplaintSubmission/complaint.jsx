import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"

import { userApi } from "../Authentication/api"

function Complaint() {
  const [depList, setDepList] = useState([])
  const [formData, setFormData] = useState({
    department: "",
    severity: "",
    description: "",
    file: null,
    reporter: localStorage.getItem("email") || "",
  })

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await userApi.get("/departmentList")
        setDepList(response.data)
      } catch (error) {
        console.log(error)
        toast.error(
          error.response?.data?.message || "error fetching departments"
        )
      }
    }

    fetchDepartment()
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

    userApi
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
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center pt-24">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        {/* <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
          📝 File a Complaint
        </h2> */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Department Select */}
          <div className="space-y-2">
            <label
              htmlFor="departments"
              className="block text-sm font-semibold text-gray-700"
            >
              🏢 Department <span className="text-red-500">*</span>
            </label>
            <select
              id="departments"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
              name="department"
              required
              onChange={handleChange}
              value={formData.department}
            >
              <option value="" disabled className="text-gray-400">
                Select department
              </option>
              <option value="admin">Admin</option>
              {depList.map((dep) => (
                <option key={dep._id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Select */}
          <div className="space-y-2">
            <label
              htmlFor="severity"
              className="block text-sm font-semibold text-gray-700"
            >
              ⚠️ Severity <span className="text-red-500">*</span>
            </label>
            <select
              id="severity"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
              name="severity"
              required
              onChange={handleChange}
              value={formData.severity}
            >
              <option value="" disabled className="text-gray-400">
                Select severity level
              </option>
              <option value="very sever" className="text-red-600 font-medium">
                🔴 Very Severe
              </option>
              <option value="severe" className="text-orange-600 font-medium">
                🟠 Severe
              </option>
              <option value="normal" className="text-yellow-600 font-medium">
                🟡 Normal
              </option>
              <option value="easy" className="text-green-600 font-medium">
                🟢 Easy
              </option>
            </select>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              📄 Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="w-full min-h-[120px] p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical hover:border-gray-400 placeholder-gray-400"
              required
              id="description"
              placeholder="Please describe your complaint in detail..."
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <label
              htmlFor="file"
              className="block text-sm font-semibold text-gray-700"
            >
              📎 Attach File
            </label>
            <input
              type="file"
              id="file"
              className="w-full h-11 pr-4 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 
               file:mr-4 hover:file:cursor-pointer file:py- file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
               file:bg-linear-to-r file:from-blue-500 file:to-blue-600 file:text-white 
               hover:file:from-blue-600 hover:file:to-blue-700 
               hover:border-blue-300 bg-gray-50/50 cursor-pointer"
              name="file"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: PDF, JPG, PNG, DOC (Max: 10MB)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
            <span>🚀</span>
            <span>Submit Complaint</span>
          </button>
        </form>

        <Toaster
          position="bottom-center"
          expand={false}
          richColors
          toastOptions={{
            style: {
              borderRadius: "12px",
            },
          }}
        />
      </div>
    </div>
  )
}

export default Complaint

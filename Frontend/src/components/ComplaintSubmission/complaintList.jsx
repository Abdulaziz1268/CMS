import axios from "axios"
import { useEffect, useState } from "react"
import { adminApi, headApi, userApi } from "../Authentication/api"

const ComplaintList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const role = localStorage.getItem("role")
      const api =
        role === "admin" ? adminApi : role === "head" ? headApi : userApi
      setLoading(true)
      try {
        const response = await api.get("/complaintList")
        setData(response.data.reverse())
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const currentUser = localStorage.getItem("email")

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 pt-24">
      {loading ? (
        // Loading Indicator
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            {/* Pulse effect */}
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping bg-blue-100/30"></div>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Loading Complaints
            </p>
            <p className="text-gray-500">
              Please wait while we fetch your data...
            </p>
          </div>
        </div>
      ) : data.length > 0 ? (
        // Complaint List
        <div className="w-full max-w-4xl space-y-6">
          {data.map((complaint) => {
            if (
              complaint.status === "read" ||
              complaint.reporter === currentUser
            ) {
              return (
                <div
                  key={complaint._id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-wrap gap-3 mb-4">
                    {complaint.reporter === currentUser && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        👤 Your Complaint
                      </span>
                    )}
                    {complaint.status !== "read" ? (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⚠️ Unresolved
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✅ Resolved
                      </span>
                    )}
                    {complaint.severity && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          complaint.severity === "high"
                            ? "bg-red-100 text-red-800"
                            : complaint.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {complaint.severity === "high"
                          ? "🔥"
                          : complaint.severity === "medium"
                          ? "⚠️"
                          : "💡"}
                        {complaint.severity.charAt(0).toUpperCase() +
                          complaint.severity.slice(1)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Description:</strong>{" "}
                      {complaint.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Severity:</strong>{" "}
                        <span className="font-medium capitalize">
                          {complaint.severity}
                        </span>
                      </p>

                      <p className="text-gray-700">
                        <strong className="text-gray-900">Department:</strong>{" "}
                        <span className="font-medium">
                          {complaint.department}
                        </span>
                      </p>
                    </div>

                    {complaint.file && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Attachment:</strong>{" "}
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
                          📎 {complaint.file}
                        </span>
                      </p>
                    )}

                    {complaint.solution && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <strong className="text-green-900 block mb-2">
                          ✅ Solution:
                        </strong>
                        <p className="text-green-800">{complaint.solution}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Complaint ID: {complaint._id}
                    </p>
                  </div>
                </div>
              )
            }
            return null // Explicit return for complaints that don't meet condition
          })}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-gray-600 mb-2">No complaints found</p>
          <p className="text-gray-500">
            When you submit complaints, they will appear here.
          </p>
        </div>
      )}
    </div>
  )
}

export default ComplaintList

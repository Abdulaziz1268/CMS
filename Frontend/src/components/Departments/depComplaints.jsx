import { useEffect, useState } from "react"

import { headApi } from "../Authentication/api"

const DepComplaints = (props) => {
  const [data, setData] = useState([])
  const [clickedId, setClickedId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    headApi
      .get("/complaintList")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false))
  }, [props.refresher])

  const handleClick = (id) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <div className="pt-5 flex flex-col items-center sm:px-6 lg:px-8">
      {loading && (
        <div className="w-full max-w-4xl flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping bg-blue-100/30"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Loading Complaints
            </p>
            <p className="text-gray-500 text-sm">
              Fetching department complaints...
            </p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="w-full max-w-4xl space-y-4">
          {data.map((item) => {
            if (
              props.department.length > 0 &&
              item.department === props.department[0].name &&
              item.status !== "unread"
            ) {
              return (
                <div
                  className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 p-6 cursor-pointer group"
                  key={item._id}
                  onClick={() => handleClick(item._id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-700 line-clamp-2">
                        <strong className="text-gray-900 font-semibold">
                          Description:{" "}
                        </strong>
                        {item.description}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong className="text-gray-700">Created: </strong>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      {/* <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "resolved"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                      >
                        {item.status === "resolved"
                          ? "✅ Resolved"
                          : "🟡 In Progress"}
                      </span> */}
                      <div className=" text-gray-400 group-hover:text-blue-500 transition-colors">
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            clickedId === item._id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {clickedId === item._id && (
                    <div className="mt-6 space-y-4 border-t border-gray-100 pt-4 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-gray-700">
                          <strong className="text-gray-900 font-semibold">
                            Severity:{" "}
                          </strong>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              item.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : item.severity === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item.severity?.charAt(0).toUpperCase() +
                              item.severity?.slice(1) || "Not specified"}
                          </span>
                        </p>

                        <p className="text-gray-700">
                          <strong className="text-gray-900 font-semibold">
                            Reporter:{" "}
                          </strong>
                          <span className="font-medium bg-gray-100 px-3 py-1 rounded-lg">
                            {item.reporter}
                          </span>
                        </p>
                      </div>

                      {item.solution && (
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <strong className="text-green-900 font-semibold block mb-2">
                            💡 Solution:
                          </strong>
                          <p className="text-green-800 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      )}

      {!loading &&
        data.filter(
          (item) =>
            props.department.length > 0 &&
            item.department === props.department[0].name &&
            item.status !== "unread"
        ).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600 font-medium mb-2">
              No Processed Complaints
            </p>
            <p className="text-gray-500">
              All complaints are currently unread or in progress.
            </p>
          </div>
        )}
    </div>
  )
}

export default DepComplaints

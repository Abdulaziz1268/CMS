import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"

import { headApi } from "../Authentication/api"
import arrowDark from "../../images/arow-dark.png"
import arrowUpDark from "../../images/arrow-up-dark.png"
// import arrowWhite from "../../images/arow-white.png"
// import arroUpWhite from "../../images/arrow-up-white.png"

const Notifications = (props) => {
  const [messages, setMessages] = useState([])
  const [clickedId, setClickedId] = useState(null) // State to track the ID of the clicked item
  const [popUp, setPopUp] = useState(null)
  const [textArea, setTextArea] = useState({
    solution: "",
  })

  useEffect(() => {
    headApi
      .get("/unreadedcomplaintList")
      .then((response) => {
        setMessages(response.data)
      })
      .catch((error) => console.log(error))
  }, [props.refresher])

  const handleSolved = (id) => {
    setPopUp(popUp === id ? null : id)
    setTextArea({
      solution: "",
    })
  }

  const handleClick = (id) => {
    // Toggle expansion: if the same item is clicked again, collapse it; otherwise, expand it
    setClickedId(clickedId === id ? null : id)
  }

  const handleTextArea = (event) => {
    setTextArea({ solution: event.target.value })
  }

  const handlePost = async (id) => {
    try {
      await headApi.put(`/solution/${id}`, textArea)
      toast.success("Posted successfully")
      props.handleRefresher()
      setTextArea({ solution: "" })
    } catch (error) {
      console.log(error)
      toast.error("there was a problem posting the solution")
    }
  }

  return (
    <div className="pt-5 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <Toaster richColors expand={false} position="bottom-center" />

      {props.department.length > 0 ? (
        (() => {
          const filteredMessages = messages.filter(
            (item) =>
              item.status === "unread" &&
              item.department === props.department[0].name
          )

          return filteredMessages.length > 0 ? (
            <div className="w-full max-w-4xl space-y-4">
              {filteredMessages.map((item) => (
                <div className="w-full flex justify-center" key={item._id}>
                  <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 p-6">
                    {/* Main complaint info */}
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <strong className="text-gray-900 font-semibold">
                          Description:{" "}
                        </strong>
                        {item.description}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong className="text-gray-700">Created at: </strong>
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Expanded details */}
                    {clickedId === item._id && (
                      <div className="mt-6 space-y-4 border-t border-gray-100 pt-4">
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
                              {item.severity}
                            </span>
                          </p>
                          <p className="text-gray-700">
                            <strong className="text-gray-900 font-semibold">
                              Reporter:{" "}
                            </strong>
                            <span className="font-medium">{item.reporter}</span>
                          </p>
                        </div>

                        {/* File attachment - commented out but styled */}
                        {/* {item.filePath && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900 font-semibold">Attachment:</strong>{' '}
                        <a 
                          href={`http://localhost:2005${item.filePath}`} 
                          download 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline transition-colors"
                        >
                          View Attachment
                        </a>
                      </p>
                    )} */}

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                          {popUp !== item._id && (
                            <button
                              className="px-6 py-3 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                              onClick={() => handleSolved(item._id)}
                            >
                              💡 Provide Solution
                            </button>
                          )}
                        </div>

                        {/* Solution input form */}
                        {popUp === item._id && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-4">
                            <label
                              htmlFor={`solution-${item._id}`}
                              className="block text-sm font-semibold text-blue-900"
                            >
                              💬 Solution:
                            </label>
                            <textarea
                              id={`solution-${item._id}`}
                              className="w-full min-h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                              onChange={(e) => handleTextArea(e)}
                              value={textArea.solution}
                              placeholder="Enter your solution here..."
                            />
                            <div className="flex gap-3">
                              <button
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                                onClick={() => handlePost(item._id)}
                              >
                                ✅ Post Solution
                              </button>
                              <button
                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                                onClick={() => setPopUp(null)}
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expand/collapse arrow */}
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => {
                          handleClick(item._id)
                          if (clickedId === item._id) handleSolved(item._id)
                        }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out hover:scale-110"
                      >
                        <img
                          src={clickedId === item._id ? arrowUpDark : arrowDark}
                          className="w-5 h-5 transition-transform duration-300"
                          alt={clickedId === item._id ? "Collapse" : "Expand"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl text-gray-600 font-medium mb-2">
                No Unread Notifications
              </p>
              <p className="text-gray-500">
                All complaints have been addressed or are in progress.
              </p>
            </div>
          )
        })()
      ) : (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            Loading department information...
          </p>
        </div>
      )}
    </div>
  )
}

export default Notifications

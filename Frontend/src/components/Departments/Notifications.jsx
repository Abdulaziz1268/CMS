import axios from "axios"
import { useEffect, useState } from "react"
import arrowDark from "../../images/arow-dark.png"
import arrowWhite from "../../images/arow-white.png"
import arroUpWhite from "../../images/arrow-up-white.png"
import arrowUpDark from "../../images/arrow-up-dark.png"
import { toast, Toaster } from "sonner"

const Notifications = (props) => {
  const [messages, setMessages] = useState([])
  const [clickedId, setClickedId] = useState(null) // State to track the ID of the clicked item
  const [popUp, setPopUp] = useState(null)
  const [textArea, setTextArea] = useState({
    solution: "",
  })

  useEffect(() => {
    axios
      .get("http://localhost:2005/api/head/unreadedcomplaintList")
      .then((response) => {
        setMessages(response.data)
        // console.log(response.data)
      })
      .catch((error) => console.log(error))
  }, [props.refresher])

  const handleSolved = (id) => {
    setPopUp(popUp === id ? null : id)
    setTextArea({
      solution: "",
    })
  }
  // console.log(messages)

  const handleClick = (id) => {
    // Toggle expansion: if the same item is clicked again, collapse it; otherwise, expand it
    setClickedId(clickedId === id ? null : id)
  }

  const handleTextArea = (event) => {
    setTextArea({ solution: event.target.value })
  }

  const handlePost = (id) => {
    axios
      .put(`http://localhost:2005/api/head/solution/${id}`, textArea)
      .then((response) => {
        console.log(response)
        toast.success("Posted successfully")
        props.handleRefresher()
        setTextArea({ solution: "" })
      })
      .catch((error) => {
        console.log(error)
        toast.error("there was a problem posting the solution")
        // console.log(id, textArea)
      })
  }
  // console.log(props.department[0].name)
  console.log("eee", messages)
  return (
    <div className="notifications-container">
      <Toaster richColors expand={false} position="bottom-center" />
      {messages.length > 0 ? (
        messages.map((item) => {
          //   {console.log(item.department)}
          if (
            props.department.length > 0 &&
            item.status === "unread" &&
            item.department === props.department[0].name
          ) {
            return (
              <div className="item-outer-container" key={item._id}>
                <div className="notification-item" key={item._id}>
                  <p>
                    <strong>Description: </strong>
                    {item.description}
                  </p>
                  <p>
                    <strong>Created at: </strong>
                    {item.createdAt}
                  </p>

                  {clickedId === item._id && (
                    <>
                      <p>
                        <strong>Severity: </strong>
                        {item.severity}
                      </p>
                      <p>
                        <strong>Reporter: </strong>
                        {item.reporter}
                      </p>
                      {console.log(item.filePath)}
                      {/* {item.filePath && (
                            <p><strong>Attachment:</strong> <a href={`http://localhost:2005${item.filePath}`} download target="_blank" rel="noopener noreferrer">View Attachment</a></p>
                        )} */}
                      <div className="buttons">
                        {/* {popUp !== item._id && <button className="chat-btn" onClick={(e) => { e.stopPropagation(); }}>Chat</button>} */}
                        {popUp !== item._id && (
                          <button
                            className="chat-btn"
                            onClick={() => handleSolved(item._id)}
                          >
                            Solution
                          </button>
                        )}
                      </div>
                      {popUp === item._id && (
                        <div className="solution">
                          <label htmlFor="txt">Solution:</label>
                          <textarea
                            id="txt"
                            className="inputs em-pas sol"
                            onChange={(e) => handleTextArea(e)}
                            value={textArea.solution}
                          ></textarea>
                          <button
                            className="chat-btn sol"
                            onClick={() => handlePost(item._id)}
                          >
                            Post
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <img
                    src={clickedId === item._id ? arrowUpDark : arrowDark}
                    onClick={() => {
                      handleClick(item._id)
                      {
                        clickedId === item._id && handleSolved(item._id)
                      }
                    }}
                    className="arrow"
                    alt="down arrow"
                  />
                </div>
              </div>
            )
          }
        })
      ) : (
        <p>No unread notifications</p>
      )}
    </div>
  )
}

export default Notifications

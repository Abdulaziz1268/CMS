import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
    const [messages, setMessages] = useState([])
    const [clickedId, setClickedId] = useState(null); // State to track the ID of the clicked item

    useEffect(() => {
      axios.get('http://localhost:2005/unreadedComplaintList')
            .then(response => {
                setMessages(response.data)
                console.log(response.data)
            })
    }, [])
    
    const handleClick = (id) => {
        // Toggle expansion: if the same item is clicked again, collapse it; otherwise, expand it
        setClickedId(clickedId === id ? null : id);
      };

    return (
        <div className="notifications-container">
            {messages.map(item => {
                if(item.status === 'unread'){
                    return (
                        <div className="notification-item" key={item._id} onClick={() => handleClick(item._id)}>
                            <p><strong>Description: </strong>{item.description}</p>
              <p><strong>Created at: </strong>{item.createdAt}</p>
              
              {clickedId === item._id && (
                <>
                  <p><strong>Severity: </strong>{item.severity}</p>
                  <p><strong>Reporter: </strong>{item.reporter}</p>
                  <button className="chat-btn" onClick={(e) => { e.stopPropagation(); /* Add chat functionality here */ }}>Chat</button>
                </>
              )}
                        </div>
                    )
                }
            })}
        </div>
    );
}
 
export default Notifications;
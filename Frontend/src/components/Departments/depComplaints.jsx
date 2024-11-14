import axios from "axios";
import { useEffect, useState } from "react";

const DepComplaints = (props) => {
  const [data, setData] = useState([]);
  const [clickedId, setClickedId] = useState(null); // State to track the ID of the clicked item

  useEffect(() => {
    axios.get('http://localhost:2005/complaintList')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [props.refresher]);

  const handleClick = (id) => {
    // Toggle expansion: if the same item is clicked again, collapse it; otherwise, expand it
    setClickedId(clickedId === id ? null : id);
  };
//  console.log(props.department[0])
  return (
    <div className="department-complaints-container">
      {data.map(item => {
        if (props.department.length > 0 && item.department === props.department[0].name && item.status !== 'unread') {
          return (
            <div
              className="item-container"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <p><strong>Description: </strong>{item.description}</p>
              <p><strong>Created at: </strong>{new Date(item.createdAt).toLocaleDateString()}</p>
              
              {clickedId === item._id && ( // Show extra details if this item is clicked
                <>
                  <p><strong>Severity: </strong>{item.severity}</p>
                  <p><strong>Reporter: </strong>{item.reporter}</p>
                  <p><strong>Solution: </strong>{item.solution}</p>
                  {/* <button className="chat-btn" onClick={(e) => { e.stopPropagation();}}>Chat</button> */}
                </>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DepComplaints;

// import io from "socket.io-client"
// import sendWhite from '../../images/send-white.png'
// import sendDark from '../../images/send-dark.png'
// import { useState, useEffect } from "react"

// const socket = io("http://localhost:2005")

// const Chat = () => {
//   const [message, setMessage] = useState("")
//   const [chats, setChats] = useState([])

//   useEffect(() => {
//     // Listen for incoming messages from the server
//     socket.on("chat message", (msg) => {
//       setChats((prevChat) => [...prevChat, msg])
//     })

//     // Cleanup the listener on component unmount
//     return () => {
//       socket.off("chat message")
//     }
//   }, [])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (message.trim() !== "") {
//       // Send the message to the server
//       socket.emit("chat message", message)
//       // Add the sent message to the chat list
//       setChats((prevChats) => [...prevChats, `You: ${message}`])
//       // Clear the input field after sending
//       setMessage("")
//     }
//   }
//   return (
//     <div className="chat-container">
//       <div className="chat-block-container">
//         {chats.map((chat, index) => (
//           <div className="chat">
//             {/* <h2>You</h2> */}
//             <p key={index}>
//               <pre> {chat}</pre>
//             </p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="chat-form">
//         <input
//           className="message-input"
//           type="text"
//           placeholder="message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         {/* <button className="btn1" type="submit"><img src={sendWhite} alt="send" /></button> */}
//         <input type="image" id="send-image" src={sendWhite} />
//       </form>
//     </div>
//   )
// }

// export default Chat

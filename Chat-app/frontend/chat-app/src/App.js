import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChatPage from "./components/ChatPage";
import JoinPage from "./components/JoinPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<JoinPage />} />
        <Route path="/chatPage" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;




// const increment = () => {
// console.log("Button clicked");
// socket.emit("increment");
// }; 
// const [message, setMessage] = useState("")

// useEffect(() => {
//   socket.on("connect", () => {
//     console.log("Connected to server");
//   });

//   socket.on("receive_message", (data) => {
//     console.log("Received message:", data);
//     alert(data.message);
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected from server");
//   });

//   // Clean up event listeners on unmount
//   return () => {
//     socket.off("connect");
//     socket.off("receive_message");
//     socket.off("disconnect");
//   };
// }, []);

// const sendMessage = () => {
//   console.log("Button clicked");
//   socket.emit("send_message", { message });
// };

// <div className="App">
//   <input placeholder="Message" onChange={(event) => {
//     setMessage(event.target.value)
//   }} />
//   <button onClick={sendMessage}>Click</button>
// </div>

// socket.on("countUpdate", (count) => {
//   console.log("count update", count)
//   setInc(count)
// })
// socket.off("countUpdate");

// const [inc, setInc] = useState(0);

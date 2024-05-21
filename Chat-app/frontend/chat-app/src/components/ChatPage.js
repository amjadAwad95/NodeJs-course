import React, { useEffect, useState, useRef } from "react";
import Moment from 'react-moment';
import io from "socket.io-client";
import "./ChatPage.css"
import { useLocation, useNavigate } from "react-router-dom";


const socket = io.connect("http://localhost:5000");


const ChatPage = () => {

    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [message, setMessage] = useState("");
    const [disabledSendLocation, setDisabledSendLocation] = useState(false);
    const [arrayOfMessage, setArrayOfMessage] = useState([]);

    const [users, setUsers] = useState([{}])
    const [roomSider, setRoomSider] = useState("");

    const location = useLocation();

    const { userName, room } = location.state || {};

    const getDateStringDifference = (timestamp) => {
        const date = new Date(timestamp);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedHour = (hour < 10 ? '' : '') + hour;
        const formattedMinute = (minute < 10 ? '' : '') + minute;
        const formattedTime = `${formattedHour}:${formattedMinute}`;
        return formattedTime
    }

    const autoscroll = () => {
        const { current: messagesEnd } = messagesEndRef;
        if (messagesEnd) {
            const { scrollHeight, clientHeight, scrollTop } = messagesEnd.parentElement;
            const isScrolledNearBottom = scrollHeight - clientHeight - scrollTop < 100;
            if (isScrolledNearBottom) {
                messagesEnd.scrollIntoView({ behavior: "smooth" });
            } else if (scrollTop + clientHeight >= scrollHeight) {
                messagesEnd.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const sendMessage = (event) => {
        event.preventDefault();
        console.log("Button clicked");
        if (message === "") {
            return;
        }
        socket.emit("sendMessage", message, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log("The message delivered", message, arrayOfMessage);
            setArrayOfMessage(prevArray => [...prevArray, message]);
            autoscroll(); // Scroll to bottom after adding message
        });
        setMessage(""); // Clear the message input after sending
    };

    const sendLocation = () => {
        if (!navigator.geolocation) {
            return alert("Geolocation is not supported by your browser.");
        }
        setDisabledSendLocation(true);
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("sendLocation", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, (msg) => {
                setDisabledSendLocation(false);
                setArrayOfMessage(prevArray => [...prevArray, msg]);
                console.log(msg);
                autoscroll(); // Scroll to bottom after adding location message
            });
        });
    };

    useEffect(() => {
        socket.on("message", (data) => {
            setArrayOfMessage(prevArray => [...prevArray, data]);
            autoscroll(); // Scroll to bottom after adding message
        });
        socket.on("locationMessage", (data) => {
            setArrayOfMessage(prevArray => [...prevArray, data]);
            autoscroll(); // Scroll to bottom after adding location message
        });

        socket.on("roomData", ({ room, users }) => {
            setUsers(users)
            setRoomSider(room)
        })

        socket.emit("join", { userName, room }, (error) => {
            if (error) {
                alert(error);
                navigate("/")
                return;
            }
        })
        return () => {
            socket.off("message");
            socket.off("locationMessage");
            socket.off("roomData");
        };
    }, []);

    return (
        <div className="chat">
            <div className="chat__sidebar">
                <h2 className="room-title">{roomSider}</h2>
                <h2 className="list-title">Users</h2>
                <ul className="users">
                    {users.map((user, idx) => (
                        <li key={idx}>
                            <p>{user.userName}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat__main">
                <div className="chat__messages">
                    {arrayOfMessage.map((message, idx) => (
                        <p key={idx}>
                            {message.url?.includes("https://google.com/maps") ? (
                                <a href={message.url}>
                                    <span className="user-name">{message.userName}:</span>Go to location <span className="message__meta">{getDateStringDifference(message.createdAt)}</span>
                                </a>
                            ) : (
                                <>
                                    <span className="user-name">{message.userName}:</span>{message.message} <span className="message__meta">{getDateStringDifference(message.createdAt)}</span>
                                </>
                            )}
                        </p>
                    ))}
                    <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
                </div>
                <div className="compose">
                    <form id="message-form">
                        <input
                            placeholder="Message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <button onClick={(event) => sendMessage(event)}>Send</button>
                    </form>
                    <button onClick={sendLocation} disabled={disabledSendLocation}>Send Location</button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

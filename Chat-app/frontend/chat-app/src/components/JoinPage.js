import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import "./JoinPage.css"

const JoinPage = () => {
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const roomRef = useRef(null);

    const handelJoin = (event) => {
        event.preventDefault();
        let userName = nameRef.current.value;
        let room = roomRef.current.value;
        navigate("/chatPage", { state: { userName, room } })
    }
    return (
        <div className="centered-form">
            <div className="centered-form__box">
                <h1>Join</h1>
                <form onSubmit={(event) => handelJoin(event)}>
                    <label>Display name</label>
                    <input type="text" name="username" placeholder="Display name" required={true} ref={nameRef} />
                    <label>Room</label>
                    <input type="text" name="room" placeholder="Room" required={true} ref={roomRef} />
                    <button className="button" >Join</button>
                </form>
            </div>
        </div>
    )
}

export default JoinPage
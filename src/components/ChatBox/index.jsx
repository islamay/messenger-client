import React from 'react'
import './style.scss'

const ChatBox = ({ message, date, isMe }) => {

    return (

        <div className={`cb ${isMe ? 'right' : 'left'}`}>
            <div className="cb-body">
                <span className="chat-content">{message}</span>
                <p className="chat-date">{date}</p>
            </div>
        </div>
    )
}

export default ChatBox
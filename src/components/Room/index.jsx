import React from 'react'
import Avatar from '../Avatar'
import './style.scss'

const Room = ({ avatarSrc, roomName, lastMessage, lastMessageTime, lastSender, onClick, className, roomId }) => {

    return (
        <div
            className={`chat-room-component ${className}`}
            onClick={onClick}
            data-avatar-src={avatarSrc}
            data-room-name={roomName}
            data-room-id={roomId}
        >
            <div className="chat-room-avatar">
                <Avatar avatarSrc={avatarSrc} />
            </div>
            <div className="chat-room-main">
                <h4 className="chat-room-name">{roomName}</h4>
                <h5 className="chat-room-last-message">{!!lastSender && `${lastSender}: `}{lastMessage}</h5>
            </div>
            <h6 className="chat-room-last-time">{lastMessageTime}</h6>
        </div>
    )
}

export default Room
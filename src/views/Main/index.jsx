import React, { useState } from "react";
import Avatar from '../../components/Avatar'
import TextInput from '../../components/TextInput'
import Room from '../../components/Room'
import { IoMdSend } from 'react-icons/io'
import { AiOutlineLink } from 'react-icons/ai'
import { authUser } from "./services";
import { HiEmojiHappy } from 'react-icons/hi'
import './style.scss'

const Main = (props) => {
  authUser(props);

  const [room, setRoom] = useState()

  const handleClick = (e) => {
    console.log(e.currentTarget.dataset);
    setRoom({
      avatarSrc: e.currentTarget.dataset.avatarSrc,
      roomName: e.currentTarget.dataset.roomName
    })
  }


  return (
    <>
      <div className="container">
        <div className="profile">
          <header className="profile-header">
            <div className="profile-avatar-container">
              <Avatar
                avatarSrc="https://i.stack.imgur.com/34AD2.jpg"
              />
            </div>
          </header>
          <form className="find-user-form">
            <TextInput
              className="find-user-input"
              placeholder="Insert username to start"
            />
          </form>
          <div className="chat-room-thumb-container">
            <Room
              onClick={handleClick}
              avatarSrc="https://i.stack.imgur.com/34AD2.jpg"
              roomName="X RPL 4 FUN"
              lastMessage="iya"
              lastMessageTime="16:45"
              lastSender="SMK Kevin"

            />
          </div>
        </div>
        <div className="main">
          <header className='main-header'>
            {room && <>
              <div className="chat-room-profile-container">
                <Avatar
                  avatarSrc={room.avatarSrc}
                />
              </div>
            </>}
          </header>
          <div className="room">

          </div>

          <div className="message-controll">
            <form action="" className="message-form">
              <button
                disabled={true}
                className="message-widget">
                <HiEmojiHappy size={30} fill="#919191" />
              </button>
              <button
                disabled={true}
                className="message-widget">
                <AiOutlineLink size={30} fill="#919191" />
              </button>
              <TextInput
                className="message-input"
                placeholder="Type message"
              />
              <button className="message-send-button">
                <IoMdSend size={30} fill="#919191" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Main;

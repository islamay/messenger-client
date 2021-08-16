import React, { useState, useEffect } from "react";
import moment from 'moment'
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink, AiOutlineSearch } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import Avatar from "../../components/Avatar";
import TextInput from "../../components/TextInput";
import Room from "../../components/Room";
import ChatBox from '../../components/ChatBox'
import {
  authUser,
  logout,
  fetchRoomData,
  startChat,
  showMessages,
  fetchGeneralMessage,
  handleSendMessage
} from "./services";
import "./style.scss";

const Main = (props) => {
  authUser(props);

  const initUser = !!JSON.parse(localStorage.getItem('login')) && JSON.parse(localStorage.getItem('login')).publicProfile

  const [room, setRoom] = useState();
  const [focusRoom, setFocusRoom] = useState();
  const [roomData, setRoomData] = useState();
  const [user, setUser] = useState(initUser)
  const [generalMessages, setGeneralMessages] = useState()
  const [roomMessages, setRoomMessages] = useState()
  const [messageInput, setMessageInput] = useState('')


  const handleMessageInput = e => setMessageInput(e.target.value)

  const handleMessageForm = handleSendMessage(messageInput, setMessageInput, setRoomMessages, focusRoom)

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  console.log(roomData);


  const clickRoom = showMessages({ setRoom, setFocusRoom })

  const handleStartChatForm = startChat(setUser)

  useEffect(() => {
    fetchRoomData(setRoomData)
  }, [user])

  useEffect(() => {
    fetchGeneralMessage(setGeneralMessages, roomData)
  }, [roomData])

  useEffect(() => {
    if (focusRoom) {
      let isChanged = false
      // eslint-disable-next-line
      generalMessages.forEach((roomMessage) => {
        if (roomMessage.length !== 0 && roomMessage[0].toRoom === focusRoom) {
          setRoomMessages(roomMessage)
          isChanged = true
        }
      })

      if (!isChanged) setRoomMessages([])
    }

  }, [focusRoom, generalMessages])


  return (
    <>
      <div className="container">
        <div className="profile">
          <header className="profile-header">
            <div className="profile-avatar-container">
              <Avatar avatarSrc="https://i.stack.imgur.com/34AD2.jpg" />
            </div>
            <button onClick={handleLogout} className="logout-button">
              <BiLogOut size={25} fill="#919191" />
            </button>
          </header>
          <form className="find-user-form" onSubmit={handleStartChatForm}>
            <TextInput
              name="findUserInput"
              className="find-user-input"
              placeholder="Insert username to start"
            />
            <button type="submit" className="submit-find-user">
              <AiOutlineSearch size={20} fill="#919191" />
            </button>
          </form>
          <div className="chat-room-thumb-container">

            {/* Looping Through Data */}
            {!!roomData && roomData.map((room) => {
              return (
                <Room
                  key={room.roomId}
                  roomId={room.roomId}
                  className={room.roomName === focusRoom ? "room-focus" : ''}
                  onClick={clickRoom}
                  avatarSrc={room.avatarSrc}
                  roomName={room.roomName}
                  lastMessage={room.lastMessage}
                  lastMessageTime={room.lastMessageTime}
                  lastSender={room.lastSender || null}
                />
              )
            })}


          </div>
        </div>
        <div className="main">
          <header className="main-header">
            {room && (
              <>
                <div className="chat-room-profile-container">
                  <Avatar avatarSrc={room.avatarSrc} />
                </div>
                <div className="chat-room-details-container">
                  <h4 className="room-details-name">{room.roomName}</h4>
                </div>
              </>
            )}
          </header>
          {focusRoom && (
            <>
              <div className="room">

                {roomMessages && roomMessages.map((message) => {
                  return (
                    <ChatBox
                      key={message._id}
                      isMe={message.sender === user._id}
                      message={message.message}
                      date={moment(message.time).format('hh.mm')}
                    />
                  )
                })}

              </div>

              <div className="message-controll">
                <form action="" className="message-form" onSubmit={handleMessageForm}>
                  <button disabled={true} className="message-widget">
                    <HiEmojiHappy size={30} fill="#919191" />
                  </button>
                  <button disabled={true} className="message-widget">
                    <AiOutlineLink size={30} fill="#919191" />
                  </button>
                  <TextInput required={true} value={messageInput} onChange={handleMessageInput} className="message-input" placeholder="Type message" />
                  <button className="message-send-button">
                    <IoMdSend size={30} fill="#919191" />
                  </button>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Main;

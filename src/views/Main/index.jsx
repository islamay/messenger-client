import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar";
import TextInput from "../../components/TextInput";
import Room from "../../components/Room";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink, AiOutlineSearch } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { authUser, logout, fetchRoomData, startChat } from "./services";
import "./style.scss";

const Main = (props) => {
  authUser(props);


  const [room, setRoom] = useState();
  const [focusRoom, setFocusRoom] = useState();
  const [roomData, setRoomData] = useState();



  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const clickRoom = (e) => {
    setRoom({
      avatarSrc: e.currentTarget.dataset.avatarSrc,
      roomName: e.currentTarget.dataset.roomName,
    });
    setFocusRoom(e.currentTarget.dataset.roomName)
  };

  const handleStartChatForm = startChat

  useEffect(() => {
    fetchRoomData(setRoomData)
  }, [])

  // const RoomData = [
  //   {
  //     avatarSrc: "https://i.stack.imgur.com/34AD2.jpg",
  //     roomName: "X RPL 4 FUN",
  //     lastMessage: "iya",
  //     lastMessageTime: "16:45",
  //     lastSender: "RPL Kevin"
  //   },
  //   {
  //     avatarSrc: "https://i.stack.imgur.com/34AD2.jpg",
  //     roomName: "tes",
  //     lastMessage: "tes tes",
  //     lastMessageTime: "16:45"
  //   },
  //   {
  //     avatarSrc: "https://i.stack.imgur.com/34AD2.jpg",
  //     roomName: "aaa",
  //     lastMessage: "ntaran",
  //     lastMessageTime: "23:35"
  //   },
  // ]

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
              <AiOutlineSearch size={20} fill="#919191"/>
            </button>
          </form>
          <div className="chat-room-thumb-container">

            {/* Looping Through Data */}
            {!!roomData && roomData.map((room) => {
              return (
                <Room
                  key={room.roomName}
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
          <div className="room"></div>

          <div className="message-controll">
            <form action="" className="message-form">
              <button disabled={true} className="message-widget">
                <HiEmojiHappy size={30} fill="#919191" />
              </button>
              <button disabled={true} className="message-widget">
                <AiOutlineLink size={30} fill="#919191" />
              </button>
              <TextInput className="message-input" placeholder="Type message" />
              <button className="message-send-button">
                <IoMdSend size={30} fill="#919191" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

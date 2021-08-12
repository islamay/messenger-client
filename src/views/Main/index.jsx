import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import TextInput from "../../components/TextInput";
import Room from "../../components/Room";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { authUser, logout } from "./services";
import "./style.scss";

const Main = (props) => {
  authUser(props);

  const [room, setRoom] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleClick = (e) => {
    console.log(e.currentTarget.dataset);
    setRoom({
      avatarSrc: e.currentTarget.dataset.avatarSrc,
      roomName: e.currentTarget.dataset.roomName,
    });
  };

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
            <Room
              onClick={handleClick}
              avatarSrc="https://i.stack.imgur.com/34AD2.jpg"
              roomName="SMK Lila"
              lastMessage="belom"
              lastMessageTime="16:45"
              lastSender="SMK Lila"
            />
            <Room
              onClick={handleClick}
              avatarSrc="https://cloud.jpnn.com/smart/600x375,t_resize,q_80/arsip/watermark/2020/07/26/muhammad-ilham-alfarisi-meraih-meraih-medali-emas-ajang-international-kangaroo-mathematics-contest-foto-dok-probadi-for-jpnncom-21.webp"
              roomName="Ilham"
              lastMessage="belom beb"
              lastMessageTime="23:35"
            />
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

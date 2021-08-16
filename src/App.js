/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import './Styles/App.css';

import ChatListItem from './components/ChatList/index';
import ChatIntro from './components/ChatIntro/index';
import ChatWindow from './components/ChatWindow/index';
import NewChat from './components/NewChat/index';
import Login from './components/Login/index';
import Api from './api'

import { DonutLarge, Chat, MoreVert, Search } from '@material-ui/icons';

export default () => {

  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState({
    id: 'u1sVgUjKRHW3DiJNAEjHO0kPw8e2',
    name: 'Breno Henrique',
    avatar: 'https://lh3.googleusercontent.com/a/AATXAJz5Lrh1dfF5YGqnJqJBgSGMn7IfR3Upj6YBsp4F=s96-c',
  });
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if(user === null) {
    return (<Login onReceive={handleLoginData} />);
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat 
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="avatar-imagem" />

          <div className="header--buttons"> 
            <div className="header--btn">
              <DonutLarge />
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <Chat />
            </div>
            <div className="header--btn">
              <MoreVert />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <Search fontSize="small" style={{color: '#919191'}}/>
            <input type="text" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>

        <div className="chatlist"> 
          {chatList.map((item, key) => (
            <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>

      <div className="contentarea">
        {activeChat.chatId !== undefined &&
          <ChatWindow 
            user={user}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}
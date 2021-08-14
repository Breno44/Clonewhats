/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import './Styles/App.css';

import ChatListItem from './components/ChatList/index';
import ChatIntro from './components/ChatIntro/index';
import ChatWindow from './components/ChatWindow/index';

import { DonutLarge, Chat, MoreVert, Search } from '@material-ui/icons';

export default () => {

  const [chatList, setChatList] = useState([
    {chatId: 1, title: "Davids arrombado", image: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"},
    {chatId: 2, title: "Davids arrombado", image: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"},
    {chatId: 3, title: "Davids arrombado", image: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"},
    {chatId: 4, title: "Davids arrombado", image: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"},
  ]);
  const [activeChat, setActiveChat] = useState({});

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img className="header--avatar" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="avatar-imagem" />

          <div className="header--buttons"> 
            <div className="header--btn">
              <DonutLarge />
            </div>
            <div className="header--btn">
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
          <ChatWindow />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}
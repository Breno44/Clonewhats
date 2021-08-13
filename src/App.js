/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import './Styles/App.css';

import ChatListItem from './components/ChatList/';
import ChatIntro from './components/ChatIntro/';

import { DonutLarge, Chat, MoreVert, Search } from '@material-ui/icons';

export default () => {

  const [chatList, setChatList] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

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
            />
          ))}
        </div>
      </div>

      <div className="contentarea">
        <ChatIntro />
      </div>
    </div>
  );
}
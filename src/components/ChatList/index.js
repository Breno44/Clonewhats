/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './styles.css';

export default () => {
    return (
        <div className="chatListItem">
            <img className="chatListItem--avatar" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">Breno Henrique</div>
                    <div className="chatListItem--date">19:00</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>Texto de exemplo, lorem ipsum dolor, lorem ipsum dolor</p>
                    </div> 
                </div>
            </div>
        </div>
    );
}
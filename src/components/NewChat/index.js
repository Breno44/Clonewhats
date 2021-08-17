/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import './styles.css';
import Api from '../../api';
import { ArrowBack } from '@material-ui/icons';

export default ({user, chatList, show, setShow}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getList =async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results)
            }
        }

        getList()
    }, [user])

    const handleClose = () => {
        setShow(false)
    }

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        handleClose();
    }

    return(
        <div className="newChat" style={{left: show? 0 : -415}}>
            <dvi className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBack style={{color: 'white'}} />
                </div>
                <div className="newChat--headtitle">
                    Nova Conversa
                </div>
            </dvi>
            <dvi className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src={item.avatar} alt=""/>
                        <div className="newChat--itemname">
                            {item.name}
                        </div>
                    </div>
                ))}
            </dvi>
        </div>
    );
}

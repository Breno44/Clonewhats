/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useRef  } from 'react';
import EmojiPicker from 'emoji-picker-react';
import "./styles.css";
import MessageItem from '../MessageItem/index'
import { Search, AttachFile, MoreVert, InsertEmoticon, Close, Send, Mic } from '@material-ui/icons';
import Api from '../../api'

export default ({user, data}) => {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list])

    useEffect(() => {
        setList([]);

        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId])

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji)
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if(recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }

            recognition.onend = () => {
                setListening(false);
            }

            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();
        }
    }

    const handleInputKeyUp = (e) => {
        if(e.keyCode === 13) {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if(text.length > 0) {
            Api.sendMessage(data, user.id, 'text', text, users)
             setText('')
             setEmojiOpen(false);
        }
    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src={data.image} alt="" />
                    <div className="chatWindow--name">{data.title}</div>
                </div>
                <div className="chatWindow--headerbuttons">
                     <div className="chatWindow--btn">
                        <Search style={{color: '#919191'}}/>
                     </div>
                     <div className="chatWindow--btn">
                        <AttachFile style={{color: '#919191'}}/>
                     </div>
                     <div className="chatWindow--btn">
                        <MoreVert style={{color: '#919191'}}/>
                     </div>
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {list.map((item, key) => (
                    <MessageItem 
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className="chatWindow--emojiarea" style={{height: emojiOpen ? '200px': '0px'}}>
                <EmojiPicker 
                   onEmojiClick={handleEmojiClick}
                   disableSearchBar
                   disableSkinTonePicker 
                />
            </div>

            <div className="chatWindow--footer">
                <div className="chatWindow--pre">
                    <div className="chatWindow--btn">
                        <Close 
                            style={{color: '#919191', width: emojiOpen?40:0}}
                            onClick={handleCloseEmoji}
                        />
                        <InsertEmoticon 
                            style={{color: emojiOpen?'#009688':'#919191'}}
                            onClick={handleOpenEmoji}
                        />
                    </div>
                </div>
                <div className="chatWindow--inputarea">
                    <input 
                        className="chatWindow--input" type="search" placeholder="Digite uma mensagem" value={text} onChange={e => setText(e.target.value)} onKeyUp={handleInputKeyUp}
                        />
                </div>
                <div className="chatWindow--pos">
                    {text.length === 0 && 
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <Mic style={{color: listening ? '#126ece' : '#919191'}}/>
                        </div>
                    }

                    {text.length !== 0 && 
                        <div onClick={handleSendClick} className="chatWindow--btn">
                            <Send style={{color: '#919191'}}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
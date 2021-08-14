/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState} from 'react';
import EmojiPicker from 'emoji-picker-react';
import "./styles.css";
import { Search, AttachFile, MoreVert, InsertEmoticon, Close, Send, Mic } from '@material-ui/icons';

export default () => {

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');

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
        
    }

    const handleSendClick = () => {

    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
                    <div className="chatWindow--name">Davids arrombado</div>
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
            <div className="chatWindow--body">

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
                            style={{color: '#919191'}}
                            onClick={handleCloseEmoji}
                            style={{width: emojiOpen?40:0}}
                        />
                        <InsertEmoticon 
                            style={{color: emojiOpen?'#009688':'#919191'}}
                            onClick={handleOpenEmoji}
                        />
                    </div>
                </div>
                <div className="chatWindow--inputarea">
                    <input 
                        className="chatWindow--input" type="search" placeholder="Digite uma mensagem" value={text} onChange={e => setText(e.target.value)}
                        />
                </div>
                <div className="chatWindow--pos">
                    {text.length === 0 && 
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <Mic style={{color: '#919191'}}/>
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
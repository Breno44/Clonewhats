/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './styles.css';
import Api from '../../api'

export default ({onReceive}) => {
    const handleGoogleLogin = async () => {
        let result = await Api.GlPopup();
        if(result) {
            onReceive(result.user);
        } else {
            alert('Erro')
        }
    }

    return(
        <div className="login">
            <div>
                <button onClick={handleGoogleLogin}>Logar com o google</button>
            </div>
        </div>
    );
}
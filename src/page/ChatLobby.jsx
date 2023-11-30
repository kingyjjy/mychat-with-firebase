import React from 'react'
import { useAuthValue } from '../context/AuthProvider'

import '../assets/css/chatlobby.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const ChatLobby = () => {
    const {email, nick, uicon} = useAuthValue();
  return (
    <div>
        <Header nick={nick} uicon={uicon} email={email}/>

        <Footer/>    
    </div>
  )
}

export default ChatLobby
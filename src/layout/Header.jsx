import React from 'react'
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import '../assets/css/chatlobby.css';
import ButtonType from '../components/ButtonType';

const Header = ({nick, email, uicon}) => {
    const nav = useNavigate();
    const logout =()=>{
        signOut(auth).then(()=>{    
            nav('/login');
        }).catch((err)=>{console.error('logout error'+err)});
    }

  return (
    <div className='header'>
        <div className="userinfo">
            <div className="usericon">
                <img src={uicon} alt={nick} />
            </div>
            <strong>{nick}</strong>님이 접속하셨습니다.           
        </div>
        <ButtonType types='button' classNames="logout" text="logout" functions={logout} styles={{padding:'5px 10px', backgroudColor:'#FD9061'}}/>
    </div>
  )
}

export default Header
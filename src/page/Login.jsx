import React,{useState} from 'react'
import '../assets/css/login.css';
import googleLogin from '../assets/images/google.png'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import logo from '../assets/images/logo.png'
import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';


const Login = () => {
  const [useremail, setUseremail] = useState();
  const [userpass, setUserpass] = useState();
  const navigate = useNavigate();
  const onPress = async (e)=>{
    e.preventDefault();
    if(!useremail){
      alert('이메일 입력하세요!');
      return;
    }else if(!userpass){
      alert('비밀번호를 입력하세요');
    }else{
      try{
        const res = await signInWithEmailAndPassword(auth, useremail, userpass);
        const usr = res.user;
        if(!usr){
          alert('아이디 또는 비밀번호 오류');
          return;
        }else{
          const user = auth.currentUser;
          if(user.displayName){
            navigate('/');
          }else{
            alert('회원가입이 완료되지 않았습니다 \n 회원가입 페이지로 이동합니다.');
            navigate('/joinend');
          }
        }
      }catch(err){
        console.error('회원로그인 도중 에러 발생',err)
      }
    }
    
  }

  return (
    <>
        <div className="loginContainer">
            <div className="logo" style={{backgroundImage:`url(${logo})`}}></div>
            <h1 className="text-center">My Chat Sign In</h1>
            <form className='loginForm' method='post'>
                <InputType types='text' names='useremail' values={useremail} functions={(e)=>{setUseremail(e.target.value)}} placeholders='email' classNames='input'/>
                <InputType types='password' names='userpass' values={userpass} functions={(e)=>{setUserpass(e.target.value)}} placeholders='password' classNames='input'/>
                <ButtonType types='submit' classNames='button' functions={onPress} text='LOGIN'/>
            </form>
            <img src={googleLogin} alt='googlelogin' className='google-login'/>
            <Link to='/join'>register</Link>
        </div>
        
    </>
  )
}

export default Login
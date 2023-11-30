import React,{useState, useEffect} from 'react'
import './assets/css/index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './config/firebase'

import Login from './page/Login'
import RegisterA from './page/RegisterA'
import RegisterB from './page/RegisterB'
import ChatLobby from './page/ChatLobby'
import { AuthProvider } from './context/AuthProvider'

const App = () => {
   const [isLogged, setIsLogged] = useState(false);
   const [email,setEmail] = useState();
   const [nick, setNick] = useState();
   const [uicon, setUicon] = useState();

   const waitForAuthChange = ()=>{
    return new Promise(resolve=>{
      const unsub = onAuthStateChanged(auth, (user)=>{
        if(user){
          setIsLogged(true);
          setEmail(user.email);
          setNick(user.displayName);
          setUicon(user.photoURL);
          resolve();//사용자 인증이 성공하면 promise를 해결
        }
      });
      return ()=>unsub(); //컴포넌츠 언마운트될때(구독이 필요하지 않아질때) 구독 해제
    });
   };

   //인증상태 변경
   const handleAuthChange = async()=>{
    try{
      await waitForAuthChange();
      console.log('사용자가 인즘되었습니다');
    }catch(err){
      console.error('인증상태 변경중 오류났습니다.',err);
    }
   }

   useEffect(()=>{
    handleAuthChange();
   },[]);

  return (
    <Router>
      <div className='container'>
        <div className="container-in">
          <AuthProvider value={{email, nick, uicon}}>
            <Routes>
              {
                isLogged?(
                  <Route exact path='/' element={<ChatLobby/>}/>
                ):(
                  <Route exact path='/login' element={<Login/>}/>
                )
              }
              <Route path='/login' element={<Login/>}/>
              <Route path='/join' element={<RegisterA/>}/>
              <Route path='/joinend' element={<RegisterB/>}/>
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  )
}

export default App
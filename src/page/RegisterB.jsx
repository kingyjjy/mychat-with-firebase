import React,{useState} from 'react'
import '../assets/css/login.css';
import {Link, useNavigate} from 'react-router-dom'
import {auth, storage} from '../config/firebase'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';

import user from '../assets/images/user.png';
import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';

const RegisterB = () => {
    const navigate = useNavigate();
    const [nick, setNick] = useState();
    const [userIcon, setUserIcon] = useState();
    const [userImg, setUserImg] = useState();
    const [fileName, setFileName] = useState();

    const user = auth.currentUser;

    // 이미지 미리보기
    const encodeFileToBase64 = (fileB)=>{
        const reader = new FileReader();
        reader.readAsDataURL(fileB);
        return new Promise((res)=>{
            reader.onload =()=>{
                setUserIcon(reader.result);
                res();
            }
        })
    }
    //파일 확장자 추출 함수
    const extExt = (filename)=>{
        //마지막에있는 점의 위치찾기
        const lastDot = filename.lastIndexOf(".");
        // subString 함수로 마지막 부분만 추출, 소문자로 변환
        return filename.subString(lastDot, filename.length).toLowerCase();
    }
   

    const imgChange =(e)=>{
        const newIcon = e.target.files[0];
        encodeFileToBase64(newIcon);
        setUserIcon(newIcon);
        setFileName(newIcon.name);
        setUserImg(e.target.files[0]);
        console.log(extExt(fileName));
    }

    const onPress= async (e)=>{
            e.preventDefault();
            let photoURL ='';
            if(fileName !== null){
                try{
                    //ㄹ확장자 추출
                    const fileExt = extExt(fileName);
                    const imgRef = ref(storage, `userdata/${v4()}${fileExt}`);
                    await uploadBytes(imgRef, userImg);
                    photoURL = await getDownloadURL(imgRef);
                }catch(err){
                    console.error('Error image upload : ',err);
                }
            }
            try{
                await updateProfile(
                    user, {
                        displayName:nick,
                        photoURL
                    }
                )
            }catch(err){
                console.error('error user update profile :', err);
            }
            navigate('/');
        }
  return (
    <>
        <div className="loginContainer">
            <div className="logo" style={{backgroundImage:`url(${user})`,borderRadius:'50%', overflow:'hidden', border:'1px solid #ddd'}}>
                {
                    fileName && <img src={userIcon} alt={fileName}/>
                }
            </div>
           
            <h1 className="text-center">My Chat Sign Up</h1>
            <p>2단계: 닉네임(필수), 이미지 아이콘(선택) 등록</p>
            <form className='loginForm' method='post'>
                <InputType types='text' names='nick' values={nick} functions={(e)=>setNick(e.target.value)} placeholders='nickname' classNames='input'/>
                <div className="filebox">
                    <input type="file" hidden id='myfile' onInput={imgChange}/>
                    <label htmlFor="myfile" style={{color:'#fff', padding:'0.1rem 0.5rem', borderRadius:'0.3rem', cursor:'pointer', marginTop:'2rem', marginRight:'0.5rem', backgroundColor:'skyblue'}}>이미지 선택</label>
                    {fileName}
                </div>
                <ButtonType types='submit' styles={{backgroundColor:'#C5E898'}} classNames='button' functions={onPress} text='SignUp'/>
            </form>
            <Link to='/' className='link'>LOGIN</Link>
        </div>
        
    </>
  )
}

export default RegisterB
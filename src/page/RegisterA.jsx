import React,{useState} from 'react'
import '../assets/css/login.css';
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AiOutlineClose } from "react-icons/ai";

import logo from '../assets/images/logo.png'
import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';

const RegisterA = () => {
    const initialValues = {
        email: '',
        pass: '',
        repass:''
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('error');
    const navigate = useNavigate();

    const handleChanges = (e)=>{
        const {name, value}= e.target;
        setFormValues({...formValues, [name]:value});
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(validate(formValues)){
            try{
                await createUserWithEmailAndPassword(auth, formValues.email, formValues.pass);
                navigate('/joinend');
            }catch(error){
                console.error('error creating user',error);
            }
        }
    }

    //폼검증 라이브러리 Formik, Yup 이용가능
    const validate = (values)=>{
        //email 
        let formError = true;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // !email
        if(!values.email){
            formError=false;
            setError('이메일 주소를 입력해 주세요');
            setIsError(true);
        }else if(!regex.test(values.email)){
            formError=false;
            setError('이메일 형식이 아니다.');
            setIsError(true);
        }else if(!values.pass){
            formError=false;
            setError('비밀번호를 입력해 주세요.');
            setIsError(true);
        }else if(values.pass.length<6){
            formError=false;
            setError('비밀번호의 길이는 6자 이상입니다.');
            setIsError(true);
        }else if(values.pass !== values.repass){
            formError=false;
            setError('비밀번호가 일치하지 않습니다.');
            setIsError(true);
        }
        return formError;
        
    }
    
    
  return (
    <>
        
        <div className="loginContainer">
            {/* error */}
            { isError && <div className="errorbox">
                            <div className="absolute"><AiOutlineClose onClick={()=>setIsError(false)}/></div>
                            {error}
                        </div>
            }

            <div className="logo" style={{backgroundImage:`url(${logo})`}}></div>
            <h1 className="text-center">My Chat Sign Up</h1>
            <p>1단계: 이메일, 패스워드 등록</p>
            
            <form className='loginForm'>
                <InputType types='text' names='email' values={formValues.email} functions={handleChanges} placeholders='email' classNames='input'/>
                <InputType types='password' names='pass' values={formValues.pass} functions={handleChanges} placeholders='password' classNames='input'/>
                <InputType types='password' names='repass' values={formValues.repass} functions={handleChanges} placeholders='confrim password' classNames='input'/>
                <ButtonType types='submit' styles={{backgroundColor:'#C5E898'}} classNames='button' functions={handleSubmit} text='NEXT'/>
            </form>
            <Link to='/' className='link'>LOGIN</Link>
        </div>
        
    </>
  )
}

export default RegisterA
import { useEffect, useState } from "react"
import styles from './styles.module.scss';
import {TOKEN_FOR_LS} from '../../assets';    
import { useNavigate } from "react-router-dom";
export const SignIn = () => {

const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')
const navigate = useNavigate()

// useEffect(()=>{
//     if (!localStorage.getItem(TOKEN_FOR_LS)){
//     navigate('/')
// }
// },[])
    async function signInFunction(e){
        e.preventDefault();
        const response = await fetch('https://api.react-learning.ru/signin',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "email": emailInput,
                "password": passwordInput
                })
        });
        let result = await response.json();
        console.log(result)
        if(result.statusCode === 400){
            alert('Пожалуйста,введите корректные данные')
        }else{
            localStorage.setItem(TOKEN_FOR_LS,JSON.stringify(result.token))
            if(localStorage.getItem(TOKEN_FOR_LS)){
                navigate(`/homepage/`)
        }
        }

    }



    return(
     <div className={`d-flex justify-content-center ${styles.signInPage}`}>       
        <form onSubmit={signInFunction} className={styles.form}>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email </label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Email" 
                onChange={(e)=>{setEmailInput(e.currentTarget.value)}}
                value={emailInput}/>
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="password"
                onChange={(e)=>{setPasswordInput(e.currentTarget.value)}}/>
                </div>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.signInBtn}`}>Sign in</button>
        </form>
    </div>
        )
}

//Авторизация
//Переход на главную страницу с продуктами

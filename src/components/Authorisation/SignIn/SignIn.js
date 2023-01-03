import { useEffect, useState } from "react"
import styles from './styles.module.scss';
import { TOKEN_FOR_LS} from '../../assets';    
import { useNavigate } from "react-router-dom";
import { useMutation} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { TOKE_FOR_AUTHORIZATION } from "../../../Redux/Redux";
import { Loader } from "../../Loader/Loader";


export const SignIn = () => {



const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')
const navigate = useNavigate()
const dispatch = useDispatch()

useEffect(() =>{
    if(localStorage.getItem(TOKEN_FOR_LS)){
        navigate('/homepage')
    }
} ,[])

// запрос через TanStackQuery с помощью хука useQuery

async function signInFunction(){
    const response = await fetch('https://api.react-learning.ru/signin',{
        method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "email": emailInput,
                    "password": passwordInput
                    })
            })
            let result = await response.json();
            console.log({result}, {response})
            if(response.status === 400 || response.status === 401 ){
                console.log(`Введите корректные данные.Ошибка: ${result.message}`)
                throw Error(result.message);
            }else if(response.status === 200){
            //     if(localStorage.getItem(TOKEN_FOR_LS)){
            //         navigate(`/homepage`)
            // }
                return result
            }
}
    const mutation = useMutation({
        mutationFn: signInFunction
    });
// console.log(mutation)
if(mutation.error){
    console.log(mutation.error.message)
}else if(mutation.isLoading){
    return <Loader/>
}else if(mutation.isSuccess){
    console.log("eto success",mutation.data)
    localStorage.setItem(TOKEN_FOR_LS, JSON.stringify(mutation.data.token))
    console.log(mutation.data)
    dispatch({type: TOKE_FOR_AUTHORIZATION, payload: mutation.data.token})
    navigate(`/homepage`)
    
}
function goToSignUp(){
    navigate('/')
}
    return(
     <div className={`d-flex justify-content-center ${styles.signInPage}`}>       
        <form onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({email:emailInput, password:passwordInput})
    }} 
        className={styles.form}>
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
            <input type='button' className='btn btn-primary' onClick={goToSignUp} value='создать аккаунт' />
        </form>
    </div>
        )
}

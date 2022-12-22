import { useState } from "react"
import styles from './styles.module.scss';
import { TOKEN_FOR_LS} from '../../assets';    
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


export const SignIn = () => {

const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')
const [enabled, setEnabled] = useState(false)
const navigate = useNavigate()


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
                // localStorage.setItem(TOKEN_FOR_LS,JSON.stringify(result.token))
                if(localStorage.getItem(TOKEN_FOR_LS)){
                    navigate(`/homepage`)
            }
                return result
            }
}
    const {data,isSuccess, error} = useQuery({
        queryKey:['signInFunc'],
        queryFn: signInFunction,
        enabled: enabled,
        retry: false,
        refetchOnWindowFocus: false,    
        cacheTime: 0,
        refetchOnMount: false
    }) 
if(error){
    console.log(error.message)
}else if(isSuccess){
    console.log("eto success",{data})
    localStorage.setItem(TOKEN_FOR_LS,JSON.stringify(data.token))
    navigate(`/homepage`)
    
}

// обычный запрос
// async function signInFunction(){
//         try{
//             const response = await fetch('https://api.react-learning.ru/signin',{
//                 method:"POST",
//                 headers:{
//                     "Content-Type": "application/json"
//                 },
//                 body:JSON.stringify({
//                     "email": emailInput,
//                     "password": passwordInput
//                     })
//             });
//             let result = await response.json();
//             console.log(response)
//             console.log(result)
//             if (response.status === 401 || response.status === 400){
//                 alert('Введите кооректные данные')
//             }else if(response.status === 500){
//                 alert('Произошла ошибка')
//             }else if(response.status === 200){
//             localStorage.setItem(TOKEN_FOR_LS,JSON.stringify(result.token))
//             if(localStorage.getItem(TOKEN_FOR_LS)){
//                     navigate(`/homepage/`)
//             }
//             }        
//         }catch(err){
//             alert(err.message);
//             console.log('tut')
//         }
      
// }
function goToSignUp(){
    navigate('/')
}
    return(
     <div className={`d-flex justify-content-center ${styles.signInPage}`}>       
        <form onSubmit={(e) => {
        e.preventDefault();
        setEnabled(prev => !prev)
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

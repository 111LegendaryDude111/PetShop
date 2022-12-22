import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_FOR_LS } from '../../assets';
import styles from './styles.module.scss'

export const SignUp = () => {

    const navigate = useNavigate()
    const [emailSignUp,setEmailSignUp] = useState('')
    const [passwordSignUp,setPasswordSignUp] = useState('')
    const [enabledSignUp, setEnabledSignUp] = useState(false)

    useEffect(() => {
        if (localStorage.getItem(TOKEN_FOR_LS)){
            navigate(`/authorization`)
        }
    },[])
    
    // Попытка сделать через TanStackQuery с помощью хука useQuery
    async function signUpFunc () {
        const response = await fetch('https://api.react-learning.ru/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify( {
                "email": "" + emailSignUp,
                "group": "sm8",
                "password": "" + passwordSignUp
            })
        })
        let result = await response.json();
        console.log({emailSignUp},{passwordSignUp})
        if(response.status === 400 || response.status === 409 ){
            console.log(`Введите корректные данные.Ошибка: ${result.message}`)
        }else if(response.status === 200){
            return result
        }
    } 
    
    const {data,isSuccess, error} = useQuery({
        queryKey:['signUpFunc'],
        queryFn: signUpFunc,
        enabled: enabledSignUp,
        refetchOnMount: false,
        retry:false
    })

    if(error){
        console.log(`Error ${error.message}`)
    }else if(isSuccess){
        console.log(data);
        navigate(`/authorization`)
    }
    


    function goToAutorization(){
        navigate(`/authorization`)
    }

    return (
        <div className={`d-flex justify-content-center ${styles.signUpPage}`}>
        <form onSubmit={(e)=> {
            e.preventDefault();
        }}
        className={styles.form}>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmailSignUp" placeholder="Email" 
                onChange={(e) => setEmailSignUp(e.currentTarget.value)}
                value={emailSignUp} />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPasswordSignUp" placeholder="Password"
                value={passwordSignUp}
                onChange={(e) => setPasswordSignUp(e.currentTarget.value)}
                />
                </div>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Description</label>
                <input type="text" className="form-control" id="Description" placeholder="Your description"/>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.signUpBtn}`}
            onClick={() => setEnabledSignUp(prev => !prev)}>Sign up</button>
            <input type='button' className='btn btn-primary' onClick={goToAutorization} value='у меня уже есть аккаунт' />
            </form>
        </div>
    )
}
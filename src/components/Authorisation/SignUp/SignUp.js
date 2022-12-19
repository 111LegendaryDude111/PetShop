import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_FOR_LS } from '../../assets';
import styles from './styles.module.scss'

export const SignUp = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    // const queryClient = useQueryClient()
    // Попытка сделать через TanStackQuery с помощью хука useMutation
    // const {data, isLoading} = useMutation(signUpFunc(email,password),{
    //     onSuccess: data => {
    //         console.log(data);
    //         alert('Регистрация прошла успешно')
    //         navigate(`/authorization`)
    //       },
    //       onError: () => {
    //         alert("Произошла ошибка")
    //       },
    //       onSettled: () => {
    //         queryClient.invalidateQueries('create');
    //       }
    // })

    useEffect(() => {
        if (localStorage.getItem(TOKEN_FOR_LS)){
            navigate(`/authorization`)
        }
    },[])
    
    
    async function signUpFunc (email,password) {
        const response = await fetch('https://api.react-learning.ru/signup ', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify( {
                "email": "" + email,
                "group": "sm8",
                "password": "" + password
            })
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            alert('Регистрация прошла успешно')
            navigate(`/authorization`)
        } )
        .catch(err => alert(err.message))   
    } 

    function goToAutorization(){
        navigate(`/authorization`)
    }

    return (
        <div className={`d-flex justify-content-center ${styles.signUpPage}`}>
        <form onSubmit={(e)=> {
            e.preventDefault();
            signUpFunc()
        }}
        className={styles.form}>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmailSignUp" placeholder="Email" 
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email} />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPasswordSignUp" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                />
                </div>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Description</label>
                <input type="text" className="form-control" id="Description" placeholder="Your description"/>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.signUpBtn}`}>Sign up</button>
            <input type='button' className='btn btn-primary' onClick={goToAutorization} value='у меня уже есть аккаунт' />
            </form>
        </div>
    )
}
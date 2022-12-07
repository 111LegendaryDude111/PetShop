import { useState } from "react"

export const SignIn = () => {
    
// значение инпутов через стейт

const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')

// if(localStorage.getItem(TOKEN_FOR_LS)){
//     setEmailInput();
//     setPasswordInput();
// }

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
        // localStorage.setItem(TOKEN_FOR_LS,JSON.stringify({
        //     result.token,
        //     res
            
        // });
    }



    return(
    <form onSubmit={signInFunction}>
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
        <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
        )
}
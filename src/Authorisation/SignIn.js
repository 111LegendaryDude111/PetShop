import { useState } from "react"

export const SignIn = () => {
    
// значение инпутов через стейт

const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')
    async function signInFunction(e){
        e.preventDefault();
        console.log(emailInput,passwordInput)
        const response = await fetch('https://api.react-learning.ru/signin',{
            method:"POST",
            headers:{
                "Content-Type": "applicatin/json"
            },
            body:JSON.stringify({
                "email": emailInput,
                "password": passwordInput
                })
                
        });
        let result = await response.json();
        console.log(result);
    }


    return(
    <form onSubmit={signInFunction}>
        <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
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
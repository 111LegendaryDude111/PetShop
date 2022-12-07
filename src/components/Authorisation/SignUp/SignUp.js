

export const SignUp = () => {

    async function signUpFunction(event){
        event.preventDefault();
        const target = event.target;
        const response = await fetch('https://api.react-learning.ru/signup ', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify( {
                "email": "" + target[0].value,
                "group": "sm8",
                "password": "" + target[1].value
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => alert(err.status))        
    } 



    return (
        <form onSubmit={signUpFunction}>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmailSignUp" placeholder="Email" />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPasswordSignUp" placeholder="Password"/>
                </div>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Description</label>
                <input type="text" className="form-control" id="Description" placeholder="Your description"/>
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
    )
}
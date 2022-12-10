import { Footer } from "./Footer/Footer"
import { Header } from "./Header/Header"
import { Main } from "./Main/Main"


export const HomePage = (user,setUser) => {
    


    return(
        <>
        <Header  user={user} setUser={setUser} />
        <Main />
        <Footer />
        </>
    )
}
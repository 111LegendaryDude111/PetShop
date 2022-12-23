import { useState } from "react"
import { Footer } from "./Footer/Footer"
import { Header } from "./Header/Header"
import { Main } from "./Main/Main"


export const HomePage = () => {
    
    const [searchValue,setSearchValue]= useState('')


    return(
        <>
        <Header setSearchValue={setSearchValue} searchValue={searchValue}/>
        <Main searchValue={searchValue}/>
        <Footer />
        </>
    )
}
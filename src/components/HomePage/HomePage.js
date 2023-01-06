import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Footer } from "./Footer/Footer"
import { Header } from "./Header/Header"
import { Main } from "./Main/Main"


export const HomePage = () => {
    const [searchValue,setSearchValue] = useState('')
    const productsInTheBasket = useSelector(state => state.productsInTheBasket)
    useEffect(()=>{
        console.log(productsInTheBasket)
        let basketProducts = JSON.stringify(productsInTheBasket)
        localStorage.setItem('basketProducts',basketProducts )
    },[productsInTheBasket])

    return(
        <>
        <Header setSearchValue={setSearchValue} searchValue={searchValue}/>
        <Main  setSearchValue={setSearchValue} searchValue={searchValue}/>
        <Footer />
        </>
    )
}
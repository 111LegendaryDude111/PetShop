import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { tokenForFetch, TOKEN_FOR_LS } from "../../../assets";
import { Header } from "../../Header/Header"
import { Footer } from "../Footer"
import styles from './styles.module.scss'

export const Stocks = () => {

const [stocksProducts, setStocksProducts] = useState([]);
const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
            }
        stocksProductsFunc()
    },[])
async function stocksProductsFunc(){

    const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: tokenForFetch
        }
})
let result = await response.json()
    if(response.status === 400 || response.status === 401 ){
        console.log(`error: ${result.message}`)
    }else if(response.status === 200){
        setStocksProducts(result.products.filter(prdct => prdct.discount > 0))
        return result
    }
}


return (
    <>    
        <Header/>
            <main className="container">
                <div className="row justify-content-center">
                {
                    stocksProducts.map((el) => {
                        return(
                        <div key={el._id} className={`card col col-3 ${styles.divCard}`}>
                            <span className={styles.discountPrice}>
                                {el.discount ? `-${el.discount}%` : ''}
                            </span>
                            <span className={styles.newProduct}>
                                {el.tags[0] === 'new'? `Новинка`: ''}
                            </span>
                            <span className={styles.spanForImg}>
                                <img key={el.pictures} src={el.pictures} className={`card-img-top ${styles.cardImg}`} alt={el.name} />
                                <i className={`fa-regular fa-heart ${styles.heartStyleForFavourite}`}></i>
                            </span>
                            <div className="card-body">
                                <div className={`card-text ${el.discount ? styles.discPrice :styles.price}`}>
                                  <div className={styles.oldPrice}>
                                     {el.discount ? el.price + 'P': ''}
                               </div>
                                    {el.discount ? Math.round(el.price - (el.price * (el.discount /100)))
                                    :el.price} 
                                <i className="fa-solid fa-ruble-sign"></i>
                                </div>
                                <p className={`card-text ${styles.weight}`}>{el.wight} </p>
                                <h5 className={`card-title ${styles.productName}`}>{el.name}</h5>
                                <br/>
                                <button className={`btn ${styles.btnStyle}`}>В корзину</button>
                            </div>
                        </div>
                        )
                    })
                }
                </div>
            </main>

        <Footer/>
    </>

)
}
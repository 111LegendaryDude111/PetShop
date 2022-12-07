import { useEffect, useState } from "react"
import { tokenForFetch } from "../assets";
import styles from './styles.module.scss'

export const Main = () => {

const [cards, setCards] = useState([]);
 useEffect( () =>  {
    getProducts()
},[]);

async function getProducts(){
    const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: tokenForFetch
        }
    })
    let result = await response.json();
    setCards(result.products)
}
    return (
        <main>
            <div className="container ">
            {
                cards.map((el,i) => {
                    return(
                    <div key={i} className={`card col ${styles.divCard}`}>
                        <img key={el.pictures} src={el.pictures} className="card-img-top" alt={el.name} />
                        <div className="card-body">
                            <p className="card-text">{el.price} <i className="fa-solid fa-ruble-sign"></i></p>
                            <h5 className="card-title">{el.name}</h5>
                            <p className="card-text">{el.wight} г.</p>
                            <button className="btn btn-primary">В корзину</button>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        </main>
    )
}
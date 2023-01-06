import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { tokenForFetch } from "../assets"


export const Basket = () => {
    const productsInTheBasket = useSelector(store => store.productsInTheBasket)
    const [arrayForCards, setArrayForCards] = useState([]);
    useEffect(()=>{
        getProductsInTheBasket(productsInTheBasket)
    },[productsInTheBasket])

    async function getProductsInTheBasket(arrayWithProductsId){
        let tempArray = [];
        for(let i = 0; i < arrayWithProductsId.length;i++){
          await  fetch(`https://api.react-learning.ru/products/${arrayWithProductsId[i]}`,{
                    method: 'GET',
                    headers:{
                        authorization: tokenForFetch
                    }
            }).then(resp => resp.json())
            .then(data => tempArray.push(data))
        }
        console.log(tempArray)
        setArrayForCards(tempArray)
        return tempArray;
    }   

    if (arrayForCards.length < 1){
       return( <p> Basket is empty</p>)
    }
    return(

        <div>
            <h2>Список товаров:</h2>
            <div className="">
                {
                    arrayForCards.map(el => {
                        return(
                            <div key={el._id}>
                                <span>
                                    <img src={el.pictures} style={{height: 5 + 'em'}} />
                                </span>
                                <span>
                                    {el.name}
                                </span>
                                <span>{' ' + el.price }</span>
                                <span id={el._id}>
                                     Кол-во: 
                                     <i className="fa-solid fa-minus"
                                     ></i>                                    
                                        {}
                                        <i className="fa-solid fa-plus"
                                        // onClick={(e) => addOneMoreProduct(e.target.parentNode.id)}
                                        ></i>
                                     </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
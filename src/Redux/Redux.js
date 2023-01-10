import { useEffect } from "react"

export const TOKE_FOR_AUTHORIZATION = 'TOKE_FOR_AUTHORIZATION'
export const PRODUCT_IN_BASKET = 'PRODUCT_IN_BASKET'
export const DELETE_PRODUCTS_IN_BASKET = 'DELETE_PRODUCTS_IN_BASKET'

const productsInTheBasketFromLS = JSON.parse(localStorage.getItem('basketProducts'))? JSON.parse(localStorage.getItem('basketProducts')):[];
const tokenForReduxFromLS = JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):[]
const defaultState = {
    productsInTheBasket: productsInTheBasketFromLS,
    token: tokenForReduxFromLS,
}

export const reducer = (state = defaultState, action) => {
    switch(action.type){
            case TOKE_FOR_AUTHORIZATION: 
                return {...state, token: action.payload}
                
            case PRODUCT_IN_BASKET:
                    let {productsInTheBasket} = state;
                    productsInTheBasket.push(action.payload);
                    productsInTheBasket = productsInTheBasket.reduce((acc, item) => {
                        if (acc.includes(item)) {
                          return acc; 
                        }
                        return [...acc, item]; 
                      }, []);
                    let basketProducts = JSON.stringify(productsInTheBasket)
                    localStorage.setItem('basketProducts',basketProducts )
                return {...state, productsInTheBasket}
            case DELETE_PRODUCTS_IN_BASKET:
                let productsAfterDelete = state.productsInTheBasket;
                productsAfterDelete = productsAfterDelete.filter(el => el !== action.payload)
                    localStorage.setItem('basketProducts', JSON.stringify(productsAfterDelete) )
                return {...state, productsInTheBasket: productsAfterDelete}
        default:
            return state;
    }
}
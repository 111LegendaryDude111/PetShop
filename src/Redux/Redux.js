import { useEffect } from "react"

export const TOKE_FOR_AUTHORIZATION = 'TOKE_FOR_AUTHORIZATION'
export const PRODUCT_IN_BASKET = 'PRODUCT_IN_BASKET'


const defaultState = {
    productsInTheBasket: [],
    token: '',
}

export const reducer = (state = defaultState, action) => {
    switch(action.type){
            case TOKE_FOR_AUTHORIZATION: 
                return {...state, token: action.payload}

            case PRODUCT_IN_BASKET:
                    let {productsInTheBasket} = state
                    productsInTheBasket.push(action.payload)
                return {...state, productsInTheBasket}
        default:
            return state;
    }
}
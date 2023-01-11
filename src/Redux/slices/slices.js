import { createSlice } from "@reduxjs/toolkit";
import {defaultState} from '../Redux'

 const basketProductSlices = createSlice({
    name:'basket',
    initialState: defaultState.productsInTheBasket ,
    reducers:{
        addProductsInBasket(state,action){
           let productsInBasket =  state.includes(action.payload)? [...state] : [...state, action.payload]
           localStorage.setItem('basketProducts',JSON.stringify(productsInBasket))
           return productsInBasket
        },
        deleteProductsInBasket(state,action){
            let productsAfterDelete = state.filter(el => el !== action.payload)
            localStorage.setItem('basketProducts', JSON.stringify(productsAfterDelete))
            return productsAfterDelete
        }
    }
})

 const tokenForRedux = createSlice({
    name:'token',
    initialState: defaultState.token,
    reducers:{
        addTokenRedux(state, action){
            state.token = action.payload;
        }
    }
})

export const {addProductsInBasket, deleteProductsInBasket} = basketProductSlices.actions
export const {addTokenRedux} = tokenForRedux.actions

export const basketProductReducer = basketProductSlices.reducer
export const tokenReducer =  tokenForRedux.reducer

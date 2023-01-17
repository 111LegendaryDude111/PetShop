import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../Redux";




const basketProductSlices = createSlice({
  name: "basket",
  initialState: defaultState.productsInTheBasket,
  reducers: {
    addProductsInBasket(state, action) {
        function findinxeFunc(el, i, arr){
          const element = el.id;
          return element === action.payload
        }
        let temp = state.findIndex(findinxeFunc)
        if(temp === -1){
          state.push({
            id:action.payload,
            count:1,
            checked:false
          })  
        }else{
          state[temp].count++
        }
          localStorage.setItem("basketProducts", JSON.stringify(state))   
    },
    deleteProductsInBasket(state, action) {
      function findinxeFunc(el, i, arr){
        const element = el.id;
        return element === action.payload
      }
        const productsAfterDelete = state.findIndex(findinxeFunc);
        state.splice(productsAfterDelete, 1)
        localStorage.setItem(
          "basketProducts",
          JSON.stringify(state)
          );
          // return state
        // return productsAfterDelete;
    },
    changeStatusOfProductInBasket(state,action){
      function findinxeFunc(el, i, arr){
        const element = el.id;
        return element === action.payload
      }
      let i = state.findIndex(findinxeFunc)
      state[i].checked = !state[i].checked
      localStorage.setItem("basketProducts", JSON.stringify(state))   
    },
  incrementProductsInBasket(state,action){
    function findinxeFunc(el, i, arr){
      const element = el.id;
      return element === action.payload
    }
    let i = state.findIndex(findinxeFunc)
      state[i].count = state[i].count + 1
      localStorage.setItem("basketProducts", JSON.stringify(state))   
  },
  decrementProductsInBasket(state,action){
    function findinxeFunc(el, i, arr){
      const element = el.id;
      return element === action.payload
    }
    let i = state.findIndex(findinxeFunc)
      state[i].count = state[i].count - 1
      localStorage.setItem("basketProducts", JSON.stringify(state)) 
  },
}
});

const tokenForRedux = createSlice({
  name: "token",
  initialState: defaultState.token,
  reducers: {
    addTokenRedux(state, action) {
      state.token = action.payload
    }
  }
})


export const { addProductsInBasket, deleteProductsInBasket,changeStatusOfProductInBasket,
  incrementProductsInBasket,decrementProductsInBasket } = basketProductSlices.actions;
export const { addTokenRedux } = tokenForRedux.actions;

export const basketProductReducer = basketProductSlices.reducer;
export const tokenReducer = tokenForRedux.reducer;

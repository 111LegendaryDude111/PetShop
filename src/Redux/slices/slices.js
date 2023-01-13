import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../Redux";

const basketProductSlices = createSlice({
  name: "basket",
  initialState: defaultState.productsInTheBasket,
  reducers: {
    addProductsInBasket(state, action) {
      const productsInBasket = state.includes(action.payload)
        ? [...state]
        : [...state, action.payload];
      localStorage.setItem("basketProducts", JSON.stringify(productsInBasket));
      return productsInBasket;
    },
    deleteProductsInBasket(state, action) {
      const productsAfterDelete = state.filter((el) => el !== action.payload);
      localStorage.setItem(
        "basketProducts",
        JSON.stringify(productsAfterDelete)
      );
      return productsAfterDelete;
    },
  },
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
const registrationProductsReducer = createSlice({
  name: "productsForRegistration",
  initialState: defaultState.registrationProducts,
  reducers: {
    addProductsForRegistration(state, action) {
      let registredProduct = state.includes(action.payload)? [...state]: [...state,action.payload]
      localStorage.setItem("registredProducts", JSON.stringify(registredProduct));
      return registredProduct
    },
  },
});

// const changeStatus = (id) => {
//   setTodos(prev => prev.map(el => {
//       if (el.id === id){
//         return {
//             ...el,
//             status:!el.status
//           }        
//         }
//         return el
//     })
// )}
export const { addProductsInBasket, deleteProductsInBasket } = basketProductSlices.actions;
export const { addTokenRedux } = tokenForRedux.actions;
export const { addProductsForRegistration,getState } = registrationProductsReducer.actions;

export const basketProductReducer = basketProductSlices.reducer;
export const tokenReducer = tokenForRedux.reducer;
export const registrationReducer = registrationProductsReducer.reducer;

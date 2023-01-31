import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../Redux";

const basketProductSlices = createSlice({
  name: "basket",
  initialState: defaultState.productsInTheBasket,
  reducers: {
    addProductsInBasket(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el.id;
        return element === action.payload.id;
      }
      let temp = state.findIndex(findinxeFunc);
      if (temp === -1) {
        state.push({
          id: action.payload.id,
          count: 1,
          checked: false,
          discount: action.payload.discount,
          price: action.payload.price,
        });
      } else {
        state[temp].count++;
      }
      localStorage.setItem("basketProducts", JSON.stringify(state));
    },
    deleteProductsInBasket(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el.id;
        return element === action.payload;
      }
      const productsAfterDelete = state.findIndex(findinxeFunc);
      state.splice(productsAfterDelete, 1);
      localStorage.setItem("basketProducts", JSON.stringify(state));
    },
    changeStatusOfProductInBasket(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el.id;
        return element === action.payload;
      }
      let i = state.findIndex(findinxeFunc);
      state[i].checked = !state[i].checked;
      localStorage.setItem("basketProducts", JSON.stringify(state));
    },
    incrementProductsInBasket(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el.id;
        return element === action.payload;
      }
      let i = state.findIndex(findinxeFunc);
      state[i].count = state[i].count + 1;
      localStorage.setItem("basketProducts", JSON.stringify(state));
    },
    decrementProductsInBasket(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el.id;
        return element === action.payload;
      }
      let i = state.findIndex(findinxeFunc);
      state[i].count = state[i].count - 1;
      localStorage.setItem("basketProducts", JSON.stringify(state));
    },
  },
});

const tokenForRedux = createSlice({
  name: "token",
  initialState: defaultState.token,
  reducers: {
    addTokenRedux(state, action) {
      state.token = action.payload;
    },
  },
});

const likedProductsRedux = createSlice({
  name: "likes",
  initialState: defaultState.likedProducts,
  reducers: {
    addProductInLikedProducts(state, action) {
      state.push(action.payload);
      localStorage.setItem("likedProducts", JSON.stringify(state));
    },
    deleteProductInLikedProducts(state, action) {
      function findinxeFunc(el, i, arr) {
        const element = el;
        return element === action.payload;
      }
      const likedProductsAfterDelete = state.findIndex(findinxeFunc);
      state.splice(likedProductsAfterDelete, 1);
      localStorage.setItem("likedProducts", JSON.stringify(state));
    },
  },
});

export const {
  addProductsInBasket,
  deleteProductsInBasket,
  changeStatusOfProductInBasket,
  incrementProductsInBasket,
  decrementProductsInBasket,
} = basketProductSlices.actions;
export const { addTokenRedux } = tokenForRedux.actions;
export const {
  addProductInLikedProducts,
  deleteProductInLikedProducts,
  huita,
} = likedProductsRedux.actions;

export const basketProductReducer = basketProductSlices.reducer;
export const tokenReducer = tokenForRedux.reducer;
export const likedProductsReducer = likedProductsRedux.reducer;

export const productsInTheBasketFromLS = JSON.parse(
  localStorage.getItem("basketProducts")
)
  ? JSON.parse(localStorage.getItem("basketProducts"))
  : [];
export const tokenForReduxFromLS = JSON.parse(localStorage.getItem("token"))
  ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
  : [];
export const likedProductsFromLS = JSON.parse(
  localStorage.getItem("likedProducts")
)
  ? JSON.parse(localStorage.getItem("likedProducts"))
  : [];

export const defaultState = {
  productsInTheBasket: productsInTheBasketFromLS,
  token: {
    token: tokenForReduxFromLS,
  },
  likedProducts: likedProductsFromLS,
};

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn } from "./components/Authorisation/SignIn/SignIn";
import { HomePage } from "./components/HomePage/HomePage";
import { SignUp } from "./components/Authorisation/SignUp/SignUp";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Basket } from "./components/Basket/Basket";
import { configureStore } from "@reduxjs/toolkit";
import {
  basketProductReducer,
  likedProductsReducer,
  tokenReducer,
} from "./Redux/slices/slices";
import { DetailedProductCard } from "./components/HomePage/Main/DetailedProductCard/DetailedProductCard";
import { LikedProducts } from "./components/LikedProducts/LikedProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "authorization/",
    element: <SignIn />,
  },
  {
    path: "homepage",
    element: <HomePage />,
  },
  {
    path: "homepage/:productId",
    element: <DetailedProductCard />,
  },
  {
    path: "userProfile",
    element: <UserProfile />,
  },
  {
    path: "basket",
    element: <Basket />,
  },
  {
    path: "LikedProducts",
    element: <LikedProducts />,
  },
]);

const store = configureStore({
  reducer: {
    basket: basketProductReducer,
    token: tokenReducer,
    likes: likedProductsReducer,
  },
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);

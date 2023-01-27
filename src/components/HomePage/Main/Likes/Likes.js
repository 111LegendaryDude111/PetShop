import { tokenForFetch } from "../../../assets";
import styles from "./styles.module.scss";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addProductInLikedProducts,
  deleteProductInLikedProducts,
} from "../../../../Redux/slices/slices";

export const Likes = ({ id }) => {
  const dispatch = useDispatch();

  function clickLikesHandler(target) {
    target.parentElement.classList.toggle("like");
    target.parentElement.className.includes("like")
      ? fetch(`https://api.react-learning.ru/products/likes/${target.id}`, {
          method: "PUT",
          headers: {
            authorization: tokenForFetch,
          },
        })
          .then((resp) => {
            dispatch(addProductInLikedProducts(id));
            return resp.json();
          })
          .catch((err) => console.log(`Error ${err.message}`))
      : fetch(`https://api.react-learning.ru/products/likes/${target.id}`, {
          method: "DELETE",
          headers: {
            authorization: tokenForFetch,
          },
        })
          .then((resp) => {
            dispatch(deleteProductInLikedProducts(id));
            return resp.json();
          })
          .catch((err) => console.log(`Error ${err.message}`));
  }

  return (
    <i
      id={id}
      className={`fa-solid fa-heart ${styles.heartStyleForFavourite}`}
      onClick={(e) => {
        clickLikesHandler(e.target);
      }}
    ></i>
  );
};

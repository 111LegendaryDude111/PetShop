import styles from "./styles.module.scss";
import { tokenForFetch } from "../../../assets";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../../../Loader/Loader";

export const AddNewProduct = ({ modal, setModal }) => {
  const modalForm = useRef();
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [wight, setWight] = useState("");
  const [description, setDescription] = useState("");
  const mutation = useMutation({
    mutationFn: AddProduct,
  });
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape" && modal === true) {
        setModal(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [modal]);

  async function AddProduct() {
    return await fetch("https://api.react-learning.ru/products", {
      method: "POST",
      headers: {
        authorization: tokenForFetch,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        available: true, // boolean
        pictures: picture, // string
        name: name, // string, обязательное
        price: price, // number, обязательное
        discount: discount, // number
        stock: stock, // number
        wight: wight, // string
        description: description, // string, обязательное
      }),
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => alert(err.message));
  }

  if (mutation.isLoading) {
    <Loader />;
  } else if (mutation.isSuccess) {
    setModal(false);
  } else {
    return (
      <div
        className={` ${modal ? styles.modal : styles.inactive}`}
        ref={modalForm}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              available: true, // boolean
              pictures: picture, // string
              name: name, // string, обязательное
              price: price, // number, обязательное
              discount: discount, // number
              stock: stock, // number
              wight: wight, // string
              description: description, // string, обязательное
            });
          }}
          className={styles.formModal}
        >
          <label htmlFor="pictures"> Ссылка на картинку товара: </label>
          <input
            placeholder="Ссылка на картинку товара..."
            type="text"
            id="pictures"
            onChange={(e) => setPicture(e.target.value)}
            value={picture}
          />

          <label htmlFor="name"> Название товара: </label>
          <input
            placeholder="Введите название"
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label htmlFor="price"> Цена товара: </label>
          <input
            placeholder="1234 р."
            type="text"
            id="price"
            onChange={(e) => setPrice(+e.target.value)}
            value={price}
          />

          <label htmlFor="discount"> Скидка в %: </label>
          <input
            placeholder="10%"
            type="text"
            id="discount"
            onChange={(e) => setDiscount(+e.target.value)}
            value={discount}
          />

          <label htmlFor="stock"> Количество товара: </label>
          <input
            placeholder="10 шт"
            type="text"
            id="stock"
            onChange={(e) => setStock(+e.target.value)}
            value={stock}
          />

          <label htmlFor="wight">Вес: </label>
          <input
            placeholder="100 г"
            type="text"
            id="wight"
            onChange={(e) => setWight(e.target.value)}
            value={wight}
          />

          <label htmlFor="description">Описание товара:</label>
          <input
            placeholder="Описание товара..."
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <button type="submit">Отправить</button>

          <i
            className={`${styles.cross} fa-solid fa-xmark`}
            onClick={() => setModal(false)}
          ></i>
        </form>
      </div>
    );
  }
};

import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./styles.module.scss";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import { tokenForFetch } from "../assets";

export const ModalFormik = ({ modal, setModal }) => {
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
  const modalForm = useRef();
  async function AddProduct(
    pictures,
    name,
    price,
    discount,
    stock,
    wight,
    description
  ) {
    console.log(description);
    return await fetch("https://api.react-learning.ru/products", {
      method: "POST",
      headers: {
        authorization: tokenForFetch,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        available: true,
        pictures: pictures,
        name: name,
        price: price,
        discount: discount,
        stock: stock,
        wight: wight,
        description: description ? "Demo описание" : description,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => alert(err.message));
  }
  const initialValues = {
    pictures: "",
    name: "",
    price: "",
    discount: "",
    stock: "",
    wight: "",
    description: "",
  };
  const validationsSchema = yup.object({
    pictures: yup
      .string()
      .min(10)
      .typeError("Должна быть ссылка на картинку")
      .required("Обязательное поле"),
    name: yup
      .string()
      .min(2)
      .typeError("Должно быть строкой")
      .required("Обязательное поле"),
    price: yup
      .number()
      .min(1)
      .typeError("Должно быть число")
      .required("Обязательное поле")
      .positive(),
    discount: yup
      .number()
      .min(1)
      .max(99)
      .typeError("Должно быть число")
      .required("Обязательное поле"),
    stock: yup
      .number()
      .typeError("Должно быть число")
      .required("Обязательное поле")
      .positive(),
    wight: yup
      .number()
      .typeError("Должно быть число")
      .required("Обязательное поле")
      .positive(),
    description: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательное поле"),
  });
  return (
    <div
      className={` ${modal ? styles.modal : styles.inactive}`}
      ref={modalForm}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationsSchema}
        onSubmit={(values) => {
          // pictures,name,price,discount,stock,wight,description
          AddProduct(
            values.pictures,
            values.name,
            values.price,
            values.discount,
            values.stock,
            values.wight,
            values.description
          );
          setModal(false);
        }}
      >
        <Form className={styles.formModal}>
          <Field name="name" placeholder="Название товара" type="text" />
          <ErrorMessage className={styles.error} component="span" name="name" />

          <Field
            name="pictures"
            placeholder="Ссылка на картинку товара"
            type="text"
          />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="pictures"
          />

          <Field name="price" placeholder="Цена товара" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="price"
          />

          <Field name="discount" placeholder="Размер скидки" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="discount"
          />

          <Field name="stock" placeholder="Количество товаров" type="number" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="stock"
          />

          <Field name="wight" placeholder="Вес товара" type="text" />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="wight"
          />

          <Field
            name="description"
            placeholder="Описание товара"
            type="textarea"
          />
          <ErrorMessage
            className={styles.error}
            component="span"
            name="description"
          />
          <button type="submit" className={styles.formBtn}>
            Отправить
          </button>
        </Form>
      </Formik>
    </div>
  );
};

import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenForFetch, TOKEN_FOR_LS } from "../assets";
import { Header } from "../HomePage/Header/Header";
import { Footer } from "../HomePage/Footer/Footer";

import { Loader } from "../Loader/Loader";
import styles from "./styles.module.scss";

export const UserProfile = () => {
  const { data, isLoading, isSuccess } = useQuery(
    ["userProfile"],
    getUserDataWithQuery
  );
  const [name, setName] = useState("");
  const [description, setDesription] = useState("");
  const myRef = useRef();
  const navigate = useNavigate();

  async function getUserDataWithQuery() {
    return await fetch("https://api.react-learning.ru/v2/sm8/users/me", {
      method: "GET",
      headers: {
        authorization: tokenForFetch,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDesription(data.about);
        return data;
      })
      .catch((err) => alert(err.message));
  }

  function signOut() {
    localStorage.removeItem(TOKEN_FOR_LS);
    navigate("/");
  }

  async function editProfile() {
    fetch("https://api.react-learning.ru/v2/sm8/users/me", {
      method: "PATCH",
      headers: {
        authorization: tokenForFetch,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDesription(data.about);
        setName(data.name);
        return data;
      });
  }

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    return (
      <>
        <Header />
        <div className={styles.user_profile}>
          <img
            src={data.avatar}
            alt="UserPhoto"
            className={styles.user_avatar}
          />
          <h2>{name}</h2>
          <p> {description}</p>
          <p> {data.email} </p>
          <div>
            <button className="btn btn-primary" onClick={signOut}>
              {" "}
              Выйти из аккаунта
            </button>
            {"  "}
            <button
              className="btn btn-primary"
              onClick={(e) => {
                myRef.current.classList.add(styles.active);
              }}
            >
              {" "}
              Редактирование профиль
            </button>
          </div>

          <form className={styles.modal} ref={myRef}>
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Введите Имя"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <input
                type="text"
                onChange={(e) => setDesription(e.target.value)}
                id="description"
                className="form-control"
                placeholder="Введите описание"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                editProfile();
                myRef.current.classList.remove(styles.active);
              }}
              className="btn btn-primary"
            >
              Подтвердить
            </button>
          </form>
        </div>

        <Footer />
      </>
    );
  }
};

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import modalStyles from "./modalStyles.css";
import { tokenForFetch } from "../../../../assets";

export const ModalForComment = ({ id }) => {
  const ref = useRef();
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(5);

  useEffect(() => {
    const onKeypress = e => {
      if(e.key === 'Escape' && ref.current.classList.contains("active") === true){
        modalToogle()
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);



  function modalToogle() {
    if (ref.current.classList.contains("active")) {
      ref.current.classList.remove("active");
      ref.current.classList.add("inactive");
    } else {
      ref.current.classList.add("active");
      ref.current.classList.remove("inactive");
    }
  }

  function addComment() {
    fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: "POST",
      headers: {
        authorization: tokenForFetch,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rate,
        text: comment,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button
        type="button"
        className={styles.commentsBtn}
        onClick={(e) => modalToogle()}
      >
        {" "}
        Добавить комментраий
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
          modalToogle();
          setComment("");
        }}
        className={`inactive ${styles.modal}`}
        ref={ref}
      >
        <input
          placeholder="Оставьте отзыв..."
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <label htmlFor="inutRange">Рейтинг товара: {rate}</label>
        <input
        id="inutRange"
          placeholder="Оставьте отзыв..."
          type="range"
          min={1}
          max={5}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        />
        <button type="submit">Отправить</button>

        <i className="cross fa-solid fa-xmark"
        onClick={modalToogle}
        ></i>
      </form>
    </>
  );
};

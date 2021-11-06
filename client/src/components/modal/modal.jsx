import React from "react";

import style from "./modal.module.css";

const Modal = (props) => {
  return (
    <div className={`${style.modal} ${props.show ? style.show : ""}`}>
      <div className={style.modalContent} onCick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h4 className={style.modalTitle}>{props.title}</h4>
          <button onClick={props.onClose}>X</button>
        </div>
        <div className={style.modalBody}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;

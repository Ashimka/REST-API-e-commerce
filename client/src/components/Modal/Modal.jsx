import React from "react";

import "./modal.scss";

const Modal = ({ children, confirmedModal }) => {
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <div
              className="modal__header_btn"
              onClick={() => confirmedModal(false)}
            >
              x
            </div>
          </div>
          <div className="modal__body">{children}</div>
          <div className="modal__footer">
            <button
              className="modal-btn-cancel"
              onClick={() => confirmedModal(false)}
            >
              Cancel
            </button>
            <button
              className="modal-btn-delete"
              onClick={() => confirmedModal(true)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

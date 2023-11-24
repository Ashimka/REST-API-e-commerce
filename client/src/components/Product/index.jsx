import React from "react";

import "./product.scss";

const Product = ({ image, name, price }) => {
  return (
    <>
      <div className="product">
        <div className="product__image">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/upload${image}`}
            alt={name}
            className="product-img"
          />
        </div>
        <div className="product__title">{name}</div>
        <div className="product__price">{price} ₽</div>
        <button className="product__btn">Добавить</button>
      </div>
    </>
  );
};

export default Product;

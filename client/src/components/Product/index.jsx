import React from "react";

import "./product.scss";

const Product = ({ image, title, price }) => {
  return (
    <>
      <div className="product">
        <div className="product__image">
          <img src={image} alt="" className="product-img" />
        </div>
        <div className="product__title">{title}</div>
        <div className="product__price">{price} ₽</div>
        <button className="product__btn">Добавить</button>
      </div>
    </>
  );
};

export default Product;

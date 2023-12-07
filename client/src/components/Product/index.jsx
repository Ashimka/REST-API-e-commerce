import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../redux/features/cartSlice";

import "./product.scss";

const Product = ({ id, image, name, price }) => {
  const dispatch = useDispatch();
  const findCount = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)
  );
  const totalCount = findCount ? findCount.count : 0;
  const addProductCart = () => {
    const item = {
      id,
      name,
      price,
      image,
      count: 1,
    };

    dispatch(addProduct(item));
  };

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
        <button className="product__btn" onClick={addProductCart}>
          Добавить {totalCount > 0 && <span>{totalCount}</span>}
        </button>
      </div>
    </>
  );
};

export default Product;

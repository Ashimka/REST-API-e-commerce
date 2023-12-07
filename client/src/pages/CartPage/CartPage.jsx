import React from "react";
import { useSelector } from "react-redux";

import "./cartPage.scss";

const CartPage = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <>
      <div className="cart-page">
        <div className="cart-page__header">
          <div className="title">Корзина</div>
          <div className="clear">Очистить корзину</div>
        </div>
        <div className="cart-page__body">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/upload${item.image}`}
                  alt={item.name}
                  className="image"
                />
              </div>
              <div className="cart-item__desc">
                <span className="title">{item.name}</span>
                <span className="price">{item.price} ₽</span>
              </div>
              <div className="cart-item__quantity">
                <span className="decrement">-</span>
                <span className="quantity">{item.count}</span>
                <span className="increment">+</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-page__footer">
          <div className="total-order">
            <span>Итого:</span>
            <span>{totalPrice} ₽</span>
          </div>
          <botton className="checkout">Оформить заказ</botton>
        </div>
      </div>
    </>
  );
};

export default CartPage;

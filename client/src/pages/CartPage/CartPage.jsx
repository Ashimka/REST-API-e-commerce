import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addProduct,
  clearCart,
  removeProduct,
} from "../../redux/features/cartSlice";

import { createOrder } from "../../redux/features/orderSlice";

import "./cartPage.scss";

const CartPage = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeCart = () => {
    dispatch(clearCart());
    navigate("/");
  };

  const decrementProduct = (id) => {
    dispatch(removeProduct({ id }));
  };

  const orderСheckout = () => {
    const order = JSON.parse(localStorage.getItem("cartItems"))?.map((item) => {
      return {
        id: item.id,
        count: item.count,
      };
    });
    console.log(JSON.stringify(order));

    dispatch(
      createOrder({
        detailsOrder: JSON.stringify(order),
        totalPrice,
      })
    );
    navigate("/users/orderlist");
    dispatch(clearCart());
  };

  return (
    <>
      <div className="cart-page">
        {items.length > 0 ? (
          <>
            <div className="cart-page__header">
              <div className="title">Корзина</div>
              <div className="clear" onClick={removeCart}>
                Очистить корзину
              </div>
            </div>
            <div className="cart-page__body">
              {items
                .filter((obj) => obj.count !== 0)
                .map((item) => (
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
                      <span
                        className="decrement"
                        onClick={() => decrementProduct(item.id)}
                      >
                        -
                      </span>
                      <span className="quantity">{item.count}</span>
                      <span
                        className="increment"
                        onClick={() => dispatch(addProduct({ id: item.id }))}
                      >
                        +
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-page__footer">
              <div className="total-order">
                <span>Итого</span>
                <span>{totalPrice} ₽</span>
              </div>
              <button className="checkout" onClick={orderСheckout}>
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cart-page__header">
              <div className="title">Корзина пуста</div>
              <div onClick={() => navigate("/")} className="clear">
                Назад
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;

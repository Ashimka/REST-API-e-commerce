import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { orderDetails } from "../../redux/features/orderSlice";

import { dateFormat } from "../../utils/date";

import "./orderDetailsPage.scss";

const OrderDetailsPage = () => {
  const DELIVERY_PRICE = +process.env.REACT_APP_DELIVERY_PRICE;
  const MIN_PRICE = +process.env.REACT_APP_MIN_PRICE;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailsOrder } = useSelector((state) => state.order);

  const order = detailsOrder?.order;
  const profile = detailsOrder?.user?.profile;
  const data = detailsOrder?.createdDate;

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="order-details">
        <div className="order-details__header">
          <button
            className="back-list-orders"
            onClick={() => navigate("/users/orderlist")}
          >
            К списку заказов
          </button>
          <div className="title">Заказ № {id}</div>
          <div className="date">{`от ${dateFormat(data)}`}</div>
        </div>
        <div className="order-details__body">
          {order &&
            order?.map((item, id) => (
              <div className="order-list" key={id}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/upload${item.product.image}`}
                  alt={item.product.name}
                  className="order-list__image"
                />
                <div className="order-list__body">
                  <div className="title">{item.product.name}</div>
                  <div className="desc">{item.product.description}</div>
                  <div className="desc">{`количество: ${item.count} порций(шт.)`}</div>
                </div>
                <div className="order-list__price">
                  <div className="price">
                    {item.product.price * item.count} ₽
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="order-details__delivery">
          <div className="delivery">
            <div className="delivery__title">Доставка</div>
            <div className="delivery__info">{profile?.name}</div>
            <Link to={`tel:${profile?.phone}`}>{profile?.phone}</Link>
            <div className="delivery__info">{profile?.addres}</div>
          </div>
          <div className="delivery">
            <div className="delivery__title">{`Стоимость заказа ${detailsOrder?.totalPrice} ₽`}</div>
            <div className="delivery__info">
              Доставка
              {detailsOrder?.totalPrice >= MIN_PRICE
                ? " бесплатно по городу"
                : ` ${DELIVERY_PRICE} ₽`}
            </div>
            <div className="delivery__total">
              <span>Итого:</span>
              {detailsOrder?.totalPrice >= MIN_PRICE
                ? detailsOrder?.totalPrice
                : detailsOrder?.totalPrice + DELIVERY_PRICE}
              ₽
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;

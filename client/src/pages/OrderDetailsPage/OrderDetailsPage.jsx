import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { orderDetails } from "../../redux/features/orderSlice";

import "./orderDetailsPage.scss";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailsOrder } = useSelector((state) => state.order);

  console.log(detailsOrder);

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="order-details">
        <div className="order-details__header">
          <button className="back-list-orders">К списку заказов</button>
          <div className="title">Заказ № {id}</div>
          <div className="date">от 24 августа</div>
        </div>
        <div className="order-details__body">
          <div className="order-list">
            <img src="#" alt="" className="order-list__image" />
            <div className="order-list__title">Title</div>
            <div className="order-list__desc">description</div>
            <div className="order-list__count">count</div>
            <div className="order-list__price">price</div>
          </div>
          <div className="total-price">total-price</div>
        </div>
        <div className="order-details__delivery">
          <div className="delivery">
            <div className="delivery__title">delivery</div>
            <div className="delivery__address">address</div>
          </div>
          <div className="delivery">
            <div className="delivery__title">delivery</div>
            <div className="delivery__address">address</div>
            <div className="delivery__address">address</div>
            <div className="delivery__address">address</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;

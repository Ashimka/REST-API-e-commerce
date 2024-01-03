import React from "react";

import { Link } from "react-router-dom";

import { dateFormat } from "../../utils/date";

const AllOrders = (props) => {
  const DELIVERY_PRICE = +process.env.REACT_APP_DELIVERY_PRICE;
  const MIN_PRICE = +process.env.REACT_APP_MIN_PRICE;

  const totalPrice = props.order_details.reduce((sum, obj) => {
    return obj.product.price * obj.count + sum;
  }, 0);
  return (
    <>
      <div className="all-orders">
        <div className="all-orders__header">
          <div className="date-time">{`Заказ № ${props.id} от ${dateFormat(
            props.createdDate
          )}`}</div>
        </div>
        <ol className="all-orders__body">
          {props.order_details.map((item, id) => (
            <li className="order" key={id}>
              <span>{item.product.category.category.name}</span>
              <div className="name">{item.product.name}</div>
              <div className="description">{item.product.description}</div>
              <div className="count">{`Количество ${item.count}`}</div>
              <div className="price">{`Стоимость: за 1 порцию/шт ${item.product.price} ₽`}</div>
            </li>
          ))}
        </ol>
        <div className="all-orders__customer">
          <details className="customer">
            <summary>Customer</summary>
            <div className="customer-info">{`Name: ${props.user.profile.name}`}</div>
            <Link
              className="customer-info"
              to={`tel:${props.user.profile.phone}`}
            >{`Phone: ${props.user.profile.phone}`}</Link>
            <div className="customer-info">{`Adress: ${props.user.profile.addres}`}</div>
          </details>
        </div>
        <div className="all-orders__total-price">
          {totalPrice < MIN_PRICE && (
            <div>{`+${DELIVERY_PRICE} ₽ доставка`}</div>
          )}
          <span>Итого к оплате: </span>
          {totalPrice < MIN_PRICE ? totalPrice + DELIVERY_PRICE : totalPrice}
          <span> ₽</span>
        </div>
      </div>
    </>
  );
};

export default AllOrders;

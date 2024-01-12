import React from "react";

import { Link } from "react-router-dom";

import { dateFormat } from "../../utils/date";

const AllOrders = (props) => {
  const DELIVERY_PRICE = +process.env.REACT_APP_DELIVERY_PRICE;
  const MIN_PRICE = +process.env.REACT_APP_MIN_PRICE;

  const totalPrice =
    (props.order_details &&
      props.order_details.reduce((sum, obj) => {
        return obj.product.price * obj.count + sum;
      }, 0)) ||
    props.totalPrice;
  return (
    <>
      <div className="all-orders">
        <div className="all-orders__header">
          <div className="date-time">{`Заказ № ${props.id} от ${dateFormat(
            props.createdDate
          )}`}</div>
        </div>
        <ol className="all-orders__body">
          {props.order_details &&
            props.order_details.map((item, id) => (
              <li className="order" key={id}>
                <span>{item.product.category.category.name}</span>
                <div className="name">{item.product.name}</div>
                <div className="description">{item.product.description}</div>
                <div className="count">{`Количество ${item.count}`}</div>
                {props.user && (
                  <div className="price">{`Стоимость: за 1 порцию/шт ${item.product.price} ₽`}</div>
                )}
              </li>
            ))}
        </ol>
        {props.user && (
          <>
            <div className="all-orders__customer">
              <details className="customer">
                <summary>Доставка</summary>
                <div className="customer-info">{`Имя: ${props.user.profile.name}`}</div>
                <div className="customer-info">
                  Телефон:
                  <Link
                    to={`tel:${props.user.profile.phone}`}
                  >{`   ${props.user.profile.phone}`}</Link>
                </div>

                <div className="customer-info">{`Адрес: ${props.user.profile.addres}`}</div>
              </details>
            </div>
            <div className="all-orders__total-price">
              {totalPrice < MIN_PRICE && (
                <span className="delivery">{`+${DELIVERY_PRICE} ₽ доставка`}</span>
              )}
              <span>Итого к оплате: </span>
              {totalPrice < MIN_PRICE
                ? totalPrice + DELIVERY_PRICE
                : totalPrice}
              <span> ₽</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllOrders;

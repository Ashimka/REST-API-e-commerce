import React from "react";

import { dateFormat } from "../../utils/date";

const AllOrders = (props) => {
  console.log(props);
  return (
    <>
      <div className="all-orders">
        <div className="all-orders__header">
          <div className="date-time">{`Заказ от ${dateFormat(
            props.createdDate
          )}`}</div>
        </div>
        <div className="all-orders__body">
          {props.order_details.map((item, id) => (
            <div className="order" key={id}>
              <div className="name">{item.product.name}</div>
              <div className="description">{item.product.description}</div>
              <div className="count">{`Количество ${item.count}`}</div>
              <div className="price">{`Стоимость: за 1 порцию/шт ${item.product.price} ₽`}</div>
            </div>
          ))}
        </div>
        <div className="all-orders__total-price">
          <span>Итого к оплате: </span>
          {props.order_details.reduce((sum, obj) => {
            return obj.product.price * obj.count + sum;
          }, 0)}
          <span> ₽</span>
        </div>
      </div>
    </>
  );
};

export default AllOrders;

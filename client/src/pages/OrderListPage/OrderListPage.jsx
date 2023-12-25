import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userOrders } from "../../redux/features/orderSlice";

import { dateFormat } from "../../utils/date";

import "./orderListPage.scss";
const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderList, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  const orderDetails = (id) => {
    navigate(`/users/orderdetails/${id}`);
  };

  return (
    <>
      <div className="order-page">
        <div className="order-page__header">
          <div className="title">Заказы</div>
          <span>{orderList.length}</span>
        </div>
        <div className="order-page__body">
          {isLoading && <p>Loading</p>}

          {orderList &&
            orderList.map((obj, id) => (
              <div key={id} className="order">
                <div
                  className="order__header"
                  onClick={() => orderDetails(obj.id)}
                >
                  <div className="title">
                    Заказ от
                    <span>{dateFormat(obj.createdDate)}</span>
                  </div>
                  <div className="price">
                    {obj.isDelivered ? "Оплачено" : "К оплате"}

                    <span> {obj.totalPrice} ₽</span>
                  </div>
                </div>
                <div className="order__body">
                  <div className="order-id">№ {obj.id}</div>
                  <div className="delivered">
                    Статус
                    <span className={obj.isConfirmed ? "ischeckout" : ""}>
                      {obj.isConfirmed ? "подтвержден" : "в обработке"}
                    </span>
                  </div>
                  {obj.isConfirmed && (
                    <div className="delivered">
                      Доставка
                      <span className={obj.isDelivered ? "ischeckout" : ""}>
                        {obj.isDelivered ? "доставлен" : "в пути"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderListPage;

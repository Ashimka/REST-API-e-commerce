import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userOrders } from "../../redux/features/orderSlice";

import "./orderListPage.scss";
const OrderListPage = () => {
  const dispatch = useDispatch();

  const { orderList, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  return (
    <>
      <div className="order-page">
        <div className="order-page__header">
          <div className="title">Заказы</div>
          <span>{orderList.length}</span>
        </div>
        <div className="order-page__body">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            orderList?.map((obj, id) => (
              <div key={id} className="order">
                <div className="order__header">
                  <div className="title">
                    Заказ от
                    <span>
                      {obj.created_at
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join(" ")}
                    </span>
                  </div>
                  <div className="price">
                    {obj.isDelivered ? "Оплачено" : "К оплате"}

                    <span> {obj.totalPrice} ₽</span>
                  </div>
                </div>
                <div className="order__body">
                  <div className="order-id">Заказ № {obj.id}</div>
                  <div className="delivered">
                    Заказ
                    <span className={obj.isConfirmed ? "ischeckout" : ""}>
                      {obj.isConfirmed ? "подтвержден" : "в обработке"}
                    </span>
                  </div>
                  <div className="delivered">
                    Заказ
                    <span className={obj.isDelivered ? "ischeckout" : ""}>
                      {obj.isDelivered ? "доставлен" : "в пути"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrderListPage;

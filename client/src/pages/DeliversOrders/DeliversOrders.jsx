import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { newOrders, confirmOrders } from "../../redux/features/deliversSlice";

import Orders from "../../components/Orders/Orders";

import "./deliversOrders.scss";

const DeliversOrders = () => {
  const [allOrdersList, setAllOrdersList] = useState(false);
  const [newOrderList, setNewOrderList] = useState(false);
  const [confirmedOrdersList, setConfirmedOrdersList] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get("order");

  const dispatsh = useDispatch();

  const { orders } = useSelector((state) => state.delivery);
  const { roles } = useSelector((state) => state.persistedReducer.auth);

  const isAdmin = roles?.includes("admin");
  const isDeliveryMan = roles?.includes("deliveryMan");

  useEffect(() => {
    if (newOrderList) {
      dispatsh(newOrders());
    }
  }, [dispatsh, newOrderList]);

  useEffect(() => {
    if (confirmedOrdersList) {
      dispatsh(confirmOrders(params));
    }
  }, [dispatsh, confirmedOrdersList, params]);

  const getAllOrders = () => {
    setAllOrdersList(true);
    setNewOrderList(false);
    setConfirmedOrdersList(false);
  };

  const getNewOrders = () => {
    setNewOrderList(true);
    setAllOrdersList(false);
    setConfirmedOrdersList(false);
    setSearchParams({ order: "new" });
  };

  const getConfirmedOrders = () => {
    setConfirmedOrdersList(true);
    setNewOrderList(false);
    setAllOrdersList(false);
    setSearchParams({ order: "confirm" });
  };

  return (
    <>
      <div className="delivery-wrapper">
        <div className="delivery">
          {isAdmin && (
            <>
              <div className="delivery__item" onClick={getAllOrders}>
                Все заказы
              </div>
              <div className="delivery__item" onClick={getNewOrders}>
                Новые заказы
              </div>
            </>
          )}

          {isDeliveryMan && (
            <>
              <div className="delivery__item" onClick={getConfirmedOrders}>
                Заказы на кухне
              </div>
              <div className="delivery__item">Заказы в доставке</div>
            </>
          )}
        </div>
        <div className="delivery__body">
          {newOrderList && (
            <>
              <h4>Новые заказы</h4>
              {orders?.map((item) => (
                <React.Fragment key={item.id}>
                  <Orders {...item} />
                </React.Fragment>
              ))}
            </>
          )}

          {allOrdersList && <h4>Все заказы</h4>}
          {confirmedOrdersList && (
            <>
              <h4>Заказы переданные на кухню</h4>
              {orders?.map((item) => (
                <React.Fragment key={item.id}>
                  <Orders {...item} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliversOrders;

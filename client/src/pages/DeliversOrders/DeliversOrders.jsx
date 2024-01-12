import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getOrders } from "../../redux/features/deliversSlice";

import Orders from "../../components/Orders/Orders";

import "./deliversOrders.scss";

const DeliversOrders = () => {
  const [newOrderList, setNewOrderList] = useState(false);
  const [confirmedOrdersList, setConfirmedOrdersList] = useState(false);
  const [readyOrdersList, setReadyOrdersList] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get("order");

  const dispatsh = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.delivery);
  const { roles } = useSelector((state) => state.persistedReducer.auth);

  const isAdmin = roles?.includes("admin");
  const isDeliveryMan = roles?.includes("deliveryMan");

  useEffect(() => {
    if (params === "new") {
      setNewOrderList(true);
    }

    if (newOrderList) {
      dispatsh(getOrders(params));
    }
  }, [dispatsh, newOrderList, params]);

  useEffect(() => {
    if (params === "confirm") {
      setConfirmedOrdersList(true);
    }

    if (confirmedOrdersList) {
      dispatsh(getOrders(params));
    }
  }, [dispatsh, confirmedOrdersList, params]);

  useEffect(() => {
    if (params === "ready") {
      setReadyOrdersList(true);
    }

    if (readyOrdersList) {
      dispatsh(getOrders(params));
    }
  }, [dispatsh, readyOrdersList, params]);

  const getNewOrders = () => {
    setSearchParams({ order: "new" });
    setNewOrderList(true);
    setConfirmedOrdersList(false);
    setReadyOrdersList(false);
  };

  const getConfirmedOrders = () => {
    setSearchParams({ order: "confirm" });
    setConfirmedOrdersList(true);
    setNewOrderList(false);
    setReadyOrdersList(false);
  };

  const getReadyOrders = () => {
    setSearchParams({ order: "ready" });
    setReadyOrdersList(true);
    setConfirmedOrdersList(false);
    setNewOrderList(false);
  };

  return (
    <>
      <div className="delivery-wrapper">
        <div className="delivery">
          {isAdmin && (
            <>
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
              <div className="delivery__item" onClick={getReadyOrders}>
                Заказы в доставке
              </div>
            </>
          )}
        </div>
        <div className="delivery__body">
          {isLoading && (
            <>
              <h4>Loading...</h4>
            </>
          )}
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

          {readyOrdersList && (
            <>
              <h4>Заказы в доставке</h4>
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

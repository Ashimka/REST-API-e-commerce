import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allOrders } from "../../redux/features/deliversSlice";

import AllOrders from "../../components/AllOrders/AllOrders";

import "./deliversOrders.scss";

const DeliversOrders = () => {
  const [allOrdersList, setAllOrdersList] = useState(false);
  const [newOrderList, setNewOrderList] = useState(false);
  const dispatsh = useDispatch();
  const { orders } = useSelector((state) => state.delivery);
  const { roles } = useSelector((state) => state.persistedReducer.auth);

  const isAdmin = roles?.includes("admin");
  const isDeliveryMan = roles?.includes("deliveryMan");

  useEffect(() => {
    if (allOrdersList) {
      dispatsh(allOrders());
    }
  }, [dispatsh, allOrdersList]);

  const getAllOrders = () => {
    setAllOrdersList(true);
    setNewOrderList(false);
  };

  const getNewOrders = () => {
    setNewOrderList(true);
    setAllOrdersList(false);
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
              <div className="delivery__item">Заказы на кухне</div>
              <div className="delivery__item">Заказы в доставке</div>
            </>
          )}
        </div>
        <div className="delivery__body">
          {allOrdersList && (
            <>
              <h4>Все заказы</h4>
              {orders?.orders?.map((item) => (
                <AllOrders key={item.id} {...item} />
              ))}
            </>
          )}

          {newOrderList && <h4>NEW ORDERS</h4>}
        </div>
      </div>
    </>
  );
};

export default DeliversOrders;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allOrders } from "../../redux/features/deliversSlice";

import AllOrders from "../../components/AllOrders/AllOrders";

import "./deliversOrders.scss";

const DeliversOrders = () => {
  const [allOrdersList, setAllOrdersList] = useState(false);
  const dispatsh = useDispatch();
  const { orders } = useSelector((state) => state.delivery);
  const { role } = useSelector((state) => state.user?.profile);

  const isDeliveryMan = Boolean(role?.deliveryMan);
  const isAdmin = Boolean(role?.admin);

  useEffect(() => {
    dispatsh(allOrders());
  }, [dispatsh]);

  return (
    <>
      <div className="delivery-wrapper">
        <div className="delivery">
          {isAdmin && (
            <>
              <div
                className="delivery__item"
                onClick={() => setAllOrdersList(true)}
              >
                Все заказы
              </div>
              <div className="delivery__item">Новые заказы</div>
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
          {allOrdersList &&
            orders.map((item, id) => <AllOrders key={id} {...item} />)}
        </div>
      </div>
    </>
  );
};

export default DeliversOrders;

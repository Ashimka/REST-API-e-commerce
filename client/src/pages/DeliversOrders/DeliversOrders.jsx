import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allOrders } from "../../redux/features/deliversSlice";
import { checkRoleUser } from "../../utils/date";

import AllOrders from "../../components/AllOrders/AllOrders";

import "./deliversOrders.scss";

const DeliversOrders = () => {
  const [allOrdersList, setAllOrdersList] = useState(false);
  const dispatsh = useDispatch();
  const { orders } = useSelector((state) => state.delivery);

  const isDeliveryMan = checkRoleUser("deliveryMan", orders?.roles);
  const isAdmin = checkRoleUser("admin", orders?.roles);

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
            orders?.orders.map((item) => <AllOrders key={item.id} {...item} />)}
        </div>
      </div>
    </>
  );
};

export default DeliversOrders;

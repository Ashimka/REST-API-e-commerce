import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allOrders } from "../../redux/features/deliversSlice";

const DeliversOrders = () => {
  const dispatsh = useDispatch();
  const { orders } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatsh(allOrders());
  }, [dispatsh]);

  console.log(orders);
  return (
    <div>
      {orders &&
        orders.map((item) => (
          <>
            <div key={item.id}> order {item.id}</div>
          </>
        ))}
    </div>
  );
};

export default DeliversOrders;

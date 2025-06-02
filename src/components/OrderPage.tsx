"use client";

import { fetchOrders } from "@/gateways/dessert";
import { IOrder } from "@/interface/dessert";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    fetchOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">OrderPage</h1>
      {orders.map((order) => (
        <div key={order._id as string}>
          <h2>{order.dessert[0].dessert.name}</h2>
          <p>{order.dessert[0].quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;

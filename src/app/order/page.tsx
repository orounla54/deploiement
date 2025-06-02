"use client";

import { fetchOrders } from "@/gateways/dessert";
import { IOrder } from "@/interface/dessert";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    fetchOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 ">
      <h1 className="text-2xl font-bold">Mes Commandes</h1>
      <div className="grid gap-4 w-full max-w-2xl mx-auto rounded-lg p-4 mb-4">
        {orders.map((order) => (
          <div
            key={order._id as string}
            className="p-4 rounded-lg flex flex-col gap-2 bg-rose-100"
          >
            {order.dessert.map((d) => (
              <div
                key={d.dessert._id as string}
                className="flex gap-2 items-center w-full border-b border-neutral-300 pb-2"
              >
                <img
                  src={`/images/${d.dessert.image.thumbnail}`}
                  alt={d.dessert.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="">
                  <h2 className="font-semibold">{d.dessert.description}</h2>
                  <div className="flex gap-2">
                    <p className="text-red-800 font-semibold">{d.quantity}x</p>
                    <p className="text-neutral-500 font-semibold">
                      @${d.dessert.price}{" "}
                    </p>
                  </div>
                </div>
                <p className="font-semibold flex-1 text-right">
                  ${(parseFloat(d.dessert.price) * d.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order Total:</p>
              <p className="font-semibold">${order.total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order Date:</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;

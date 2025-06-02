import { IDessert, ICreateOrder, IOrder } from "@/interface/dessert";

const API_URL = "api/desserts";

export const fetchDesserts = async (): Promise<IDessert[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.desserts;
};

export const fetchOrders = async (): Promise<IOrder[]> => {
  const response = await fetch(`${API_URL}/orders`);
  const data = await response.json();
  return data.orders;
};

export const createOrder = async (order: ICreateOrder) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

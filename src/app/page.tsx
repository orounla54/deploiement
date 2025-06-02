"use client";

import Cart from "@/components/Cart";
import DessertListPage from "@/components/DessertList";
import OrderConfirmed from "@/components/OrderConfirmed";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { isOpen } = useCart();
  return (
    <div
      className={`flex flex-col md:flex-row gap-4 mx-auto md:w-5xl mt-6 ${
        isOpen
          ? "after:content-[''] after:absolute after:inset-0 after:z-10 after:bg-black/50"
          : ""
      }`}
    >
      <DessertListPage key="dessert-list" />
      <Cart key="cart" />
      <OrderConfirmed key="order-confirmed" />
    </div>
  );
}

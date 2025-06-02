"use client";

import { IDessert } from "@/interface/dessert";
import { fetchDesserts } from "@/gateways/dessert";
import { useEffect, useState } from "react";
import DessertPage from "./Dessert";

const DessertListPage = () => {
  const [desserts, setDesserts] = useState<IDessert[]>([]);

  useEffect(() => {
    fetchDesserts().then((desserts) => setDesserts(desserts));
  }, []);

  return (
    <main>
      <h1 className="text-2xl mb-6">Dessert</h1>
      <div className="max-w-[950] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {desserts.map((dessert) => (
          <DessertPage key={dessert._id as string} dessert={dessert} />
        ))}
      </div>
    </main>
  );
};

export default DessertListPage;

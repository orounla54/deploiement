import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/gateways/dessert";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";

const OrderConfirmed = () => {
  const { cart, total, removeFromCart, isOpen, toggleOrderConfirmed } =
    useCart();
  const router = useRouter();

  const handleSubmit = async () => {
    // Créer une commande pour chaque dessert dans le panier
    const order = await createOrder({
      dessert: cart.map((item) => ({
        dessert: new Types.ObjectId(item._id),
        quantity: item.quantity,
      })),
      total: total,
    });

    // Vider le panier
    cart.forEach((item) => {
      removeFromCart(item._id);
    });

    // Vider le localStorage
    localStorage.removeItem("cart");

    // Rediriger vers la page d'accueil
    router.push("/order");
  };

  return (
    <div
      className={`${
        isOpen
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 min-w-xs flex flex-col bg-white rounded-lg p-4 text-xs"
          : "hidden"
      }`}
    >
      <img
        src="/images/icon-order-confirmed.svg"
        alt="Order Confirmed"
        className="w-10 h-10"
      />
      <div className="flex flex-col my-4">
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
        <p className="text-sm text-gray-500">We hope you enjoy your food!</p>
      </div>

      <div className="flex flex-col bg-rose-100 p-2 rounded-lg">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2 ">
              {cart.map((item) => (
                <li key={item._id} className="border-b border-neutral-200 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <img
                        src={`/images/${item.image.thumbnail}`}
                        alt={item.name}
                        className="w-10 h-10"
                      />
                      <div className="">
                        <p className="font-semibold">{item.description}</p>
                        <div className="flex gap-2 font-semibold">
                          <p className="text-red-800">{item.quantity}x</p>
                          <p className="text-neutral-500">@ ${item.price}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-800 font-semibold">
                      $
                      {parseFloat(
                        `${parseFloat(item.price) * item.quantity}`
                      ).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 font-semibold ">Order Total</p>
              <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No items in cart</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={toggleOrderConfirmed}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm"
        >
          Annuler
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm"
          onClick={() => {
            toggleOrderConfirmed();
            handleSubmit();
          }}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;

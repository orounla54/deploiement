import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, total, toggleOrderConfirmed } =
    useCart();
  return (
    <div
      key="cart-container"
      className="text-xs bg-white rounded-lg p-6 w-xs min-h-[250px] h-fit flex flex-col justify-between"
    >
      <h1 className="text-red-800 font-bold text-2xl mb-4">
        Your Cart {cart.length > 0 ? `(${cart.length})` : "0"}
      </h1>
      {cart.length > 0 ? (
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2 ">
            {cart.map((item) => (
              <li key={item._id} className="border-b border-neutral-200 pb-2">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="font-semibold">{item.description}</p>
                    <div className="flex gap-2 font-semibold">
                      <p className="text-red-800">{item.quantity}x</p>
                      <p className="text-neutral-500">@ ${item.price}</p>
                      <p className="text-neutral-500">
                        $
                        {parseFloat(
                          `${parseFloat(item.price) * item.quantity}`
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                      updateQuantity(item._id, 0);
                    }}
                    className="rounded-full border-2 px-1 py-1 border-[#CAAFA7] hover:border-neutral-500 cursor-pointer"
                  >
                    <img
                      src="/images/icon-remove-item.svg"
                      alt="delete icon"
                      className="self-center w-2 h-2"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <p className="text-neutral-500 text-sm font-semibold">
              Order Total
            </p>
            <p className="text-lg font-semibold">${total.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-center gap-2 bg-rose-100 p-2 rounded-lg">
            <img
              src="/images/icon-carbon-neutral.svg"
              alt="delivery icon"
              className="self-center"
            />
            <p className="text-neutral-500 text-xs font-semibold text-center whitespace-nowrap">
              This is a carbon-neutral delivery
            </p>
          </div>
          <button
            onClick={toggleOrderConfirmed}
            className="bg-red-800 text-white py-2 px-4 rounded-full cursor-pointer"
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <img
            src="/images/illustration-empty-cart.svg"
            alt=""
            className="self-center"
          />
          <p className="text-center text-amber-950 text-sm">
            Your added items will appear here
          </p>
        </div>
      )}
    </div>
  );
};
export default Cart;

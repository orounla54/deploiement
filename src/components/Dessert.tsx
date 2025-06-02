import { useCart } from "@/context/CartContext";
import { IDessertItemsProps, order } from "@/interface/dessert";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const DessertPage = ({ dessert }: IDessertItemsProps) => {
  const [addCart, setAddCart] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [colorPlus, setColorPlus] = useState("#fff");
  const [colorMinus, setColorMinus] = useState("#fff");

  const { addToCart, updateQuantity, removeFromCart } = useCart();

  const toggleAddCart = () => setAddCart(!addCart);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const data = JSON.parse(savedCart);
      const item = data.find((item: any) => item._id === dessert._id);
      if (item) {
        setQuantity(item.quantity);
        setAddCart(true);
      }
    }
    if (quantity === 0) toggleAddCart();
  }, [quantity]);

  const handleAddToCart = () => {
    addToCart({
      _id: dessert._id as string,
      name: dessert.name,
      description: dessert.description,
      price: dessert.price,
      image: dessert.image,
      quantity: 1,
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(dessert._id as string, quantity - 1);
      setQuantity(quantity - 1);
    } else {
      removeFromCart(dessert._id as string);
      setQuantity(0);
    }
  };

  const handleIncrement = () => {
    updateQuantity(dessert._id as string, quantity + 1);
    setQuantity(quantity + 1);
  };

  return (
    <div key={dessert._id as string}>
      <div
        className={cn(
          "relative ",
          addCart ? "border-red-800 rounded-lg border-2" : ""
        )}
      >
        <Image
          src={`/images/${dessert.image.desktop}`}
          alt=""
          width={250}
          height={250}
          className="rounded-lg w-full h-full object-cover"
        />
        <button
          onClick={() => {
            toggleAddCart();
            setQuantity(1);
            handleAddToCart();
          }}
          className={cn(
            "min-w-[130px] absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black rounded-full py-2 whitespace-nowrap justify-center gap-2 text-sm cursor-pointer",
            addCart ? "hidden" : "flex"
          )}
        >
          <img src="/images/icon-add-to-cart.svg" alt="cart icon" />{" "}
          <span className="">Add to Cart</span>
        </button>
        <div
          style={{ backgroundColor: "var(--primary-red)" }}
          className={cn(
            "min-w-[130px] absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black rounded-full py-2 px-3 whitespace-nowrap justify-between gap-2 text-sm cursor-pointer",
            addCart ? "flex" : "hidden"
          )}
        >
          <button
            onClick={() => {
              handleDecrement();
            }}
            className="rounded-full border px-1 border-white hover:bg-white"
            onMouseOver={() => setColorMinus("#c73a0f")}
            onMouseOut={() => setColorMinus("#fff")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2"
            >
              <path fill={colorMinus} d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span className="text-white font-semibold">{quantity}</span>
          <button
            onClick={() => {
              handleIncrement();
            }}
            className="rounded-full border px-1 border-white hover:bg-white"
            onMouseOver={() => setColorPlus("#c73a0f")}
            onMouseOut={() => setColorPlus("#fff")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill={colorPlus}
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-neutral-500">{dessert.name}</h2>
        <p className="font-semibold">{dessert.description}</p>
        <p
          style={{ color: "var(--primary-red)" }}
          className="--color-primary-red font-semibold"
        >
          <span>$ </span>
          {dessert.price}
        </p>
      </div>
    </div>
  );
};

export default DessertPage;

"use client";

import { IDessert, IImage } from "@/interface/dessert";
// context/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Définir le type pour un dessert
interface Dessert {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: IImage;
  quantity: number;
}

// Définir le type pour le Context
interface CartContextType {
  cart: Dessert[];
  addToCart: (dessert: Dessert) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  total: number;
  isOpen: boolean;
  toggleOrderConfirmed: () => void;
}

// Créer le Context avec une valeur par défaut undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Fournisseur du Context
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Dessert[]>([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotal(total);
  }, [cart]);

  // Fonction pour ouvrir et fermer la fenêtre de confirmation de commande
  const toggleOrderConfirmed = () => {
    setIsOpen(!isOpen);
  };

  // Ajouter un produit au panier
  const addToCart = (dessert: Dessert) => {
    setCart((prevCart: Dessert[]) => {
      const existingDessert = prevCart.find((item) => item._id === dessert._id);
      if (existingDessert) {
        return prevCart.map((item) =>
          item._id === dessert._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          _id: dessert._id as string,
          name: dessert.name,
          description: dessert.description,
          price: dessert.price,
          image: dessert.image,
          quantity: 1,
        },
      ];
    });
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      // Supprimer le produit si la quantité est 0
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item._id === id ? { ...item, quantity } : item))
      );
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const value: CartContextType = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    total,
    isOpen,
    toggleOrderConfirmed,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personnalisé pour consommer le Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

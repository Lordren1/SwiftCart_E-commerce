"use client";

import { dummyProducts } from "@/data";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default function AppContextProvider(prop) {
  const [products, setProducts] = useState([]);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  /* const [user, setUser] = useState(true); */
  const { user } = useUser();
  const router = useRouter();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";

  const getProducts = () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId, size, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const cartData = structuredClone(prevCartItems);

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
      console.log("Updated cart:", cartData);

      return cartData;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }

    return totalCount;
  };

  const updateCartQuantity = (itemId, size, quantity) => {
    setCartItems((prevCartItems) => {
      const updatedCart = structuredClone(prevCartItems);

      // Safely check: Verify the item actually exists in the cart registry
      if (updatedCart[itemId]) {
        if (quantity <= 0) {
          // Permantly delete just this specific size variant key
          delete updatedCart[itemId][size];
          console.log(
            `Deleted size variant [${size}] for product ID: ${itemId}`,
          );

          // Check if that product has any remaining active sizes left
          if (Object.keys(updatedCart[itemId]).length === 0) {
            delete updatedCart[itemId];
            console.log(
              `Product ID: ${itemId} has no sizes left. Swept completely from cart memory!`,
            );
          }
        } else {
          // If quantity is greater than 0, simply update the value normally
          updatedCart[itemId][size] = quantity;
        }
      }

      console.log("Updated cart state structure:", updatedCart);
      return updatedCart;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        // Loop through each individual size variation for this product ID
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];

          if (quantity > 0) {
            totalAmount += itemInfo.offerPrice * quantity;
          }
        }
      }
    }

    // Enforces clean currency format calculation rules
    return Number(totalAmount.toFixed(2));
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, ...updatedProduct, _id: product._id }
          : product,
      ),
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId),
    );
  };

  useEffect(() => {
    getProducts();
  }, []);
  /*

  const { user } = useUser();
  */

  const value = {
    products,
    setProducts,
    getProducts,
    updateProduct,
    deleteProduct,
    isSeller,
    setIsSeller,
    currency,
    router,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateCartQuantity,
    getCartAmount,
    user,
  };

  return (
    <>
      <AppContext.Provider value={value}>{prop.children}</AppContext.Provider>
    </>
  );
}

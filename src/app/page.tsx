"use client";

import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import Product from "@/components/Product";
import Cart from "@/components/Cart";
import useCart from "@/hooks/useCart";
import { requestPermission } from "@/firebase";

export default function Home() {
  const [products, setProducts] = useState<
    { id: number; [key: string]: any }[]
  >([]);
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      await fetch("https://fakestoreapi.com/products?limit=5")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setProducts(json);
        });
    };

    fetchProducts();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",

            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    const access = requestPermission().then((token) => {
      if (token) {
        setFcmToken(token);
      }
    });
  }, [fcmToken]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const timer = setTimeout(() => {
        fetch("http://localhost:3001/send-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Cart Reminder",
            body: "You have items in your cart. Don't forget to complete your purchase!",
            token: fcmToken,
            email: email,
          }),
        });
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const subscribeUser = async () => {
    if (!fcmToken) {
      console.error("FCM Token is not available");
      return;
    }

    await fetch("http://localhost:3001/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Subscribed!",
        body: "Thank you for subscribing, we'll notify you when we a new product.",
        token: fcmToken,
        email: email,
      }),
    });
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Product
                key={product.id}
                id={product.id.toString()}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                onAddToCart={() =>
                  addToCart({
                    id: product.id.toString(),
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                  })
                }
              />
            ))}
          </div>
          <div className="w-1/3">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
            <div className="m-2 p-4 bg-gray-300 text-black rounded">
              <h1 className="text-xl">Subscribe</h1>
              <p>To get notified when there is a new product.</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" p-2 text-black border rounded"
              />
              <button
                onClick={() => {
                  subscribeUser();
                  setEmail("");
                }}
                className="bg-blue-500 text-white ml-2 px-4 py-2 rounded"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// "use client";

// import Header from "@/components/Header";
// import Layout from "@/components/Layout";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Product from "@/components/Product";
// import Cart from "@/components/Cart";
// import useCart from "@/hooks/useCart";

// export default function Home() {
//   const [products, setProducts] = useState<
//     { id: number; [key: string]: any }[]
//   >([]);
//   const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       await fetch("https://fakestoreapi.com/products?limit=5")
//         .then((res) => res.json())
//         .then((json) => {
//           console.log(json);
//           setProducts(json);
//         });
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Available Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <Product
//             key={product.id}
//             id={product.id}
//             title={product.title}
//             description={product.description}
//             price={product.price}
//             image={product.image}
//             onAddToCart={() =>
//               addToCart({
//                 ...product,
//                 id: product.id.toString(),
//                 name: product.title,
//                 price: product.price,
//                 quantity: 1,
//               })
//             }
//           />
//         ))}
//       </div>
//       <Cart
//         cartItems={cartItems}
//         removeFromCart={removeFromCart}
//         clearCart={clearCart}
//       />
//     </Layout>
//   );
// }

"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import Product from "@/components/Product";
import Cart from "@/components/Cart";
import useCart from "@/hooks/useCart";

export default function Home() {
  const [products, setProducts] = useState<
    { id: number; [key: string]: any }[]
  >([]);
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

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
  }, []);

  return (
    <Layout>
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
        <div className="w-1/4">
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </div>
      </div>
    </Layout>
  );
}

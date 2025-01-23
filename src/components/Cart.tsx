// import React from "react";
// // import { useCart } from "../hooks/useCart"; // Custom hook to manage cart state
// import useCart from "@/hooks/useCart";
// // Ensure that the file '../hooks/useCart.ts' exists and exports 'useCart'
// import { CartItem } from "../types"; // Assuming CartItem type is defined in types/index.ts

// const Cart: React.FC = () => {
//   const { cartItems, removeFromCart, clearCart } = useCart();

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map((item: CartItem) => (
//               <li
//                 key={item.id}
//                 className="flex justify-between items-center mb-4"
//               >
//                 <span>
//                   {item.name} - ${item.price.toFixed(2)}
//                 </span>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={clearCart}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Clear Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// src/components/Cart.tsx
import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  clearCart,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <span>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

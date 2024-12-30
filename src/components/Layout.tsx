import React from "react";
import Header from "./Header";
import Cart from "./Cart";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      {/* <Cart cartItems={[]} /> */}
    </div>
  );
};

export default Layout;

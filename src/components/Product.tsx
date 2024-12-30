import React from "react";

interface ProductProps {
  id: any;
  title: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (id: any) => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  description,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <div className="border p-2 rounded-md shadow-md">
      <img
        src={image}
        alt={title}
        width={150}
        height={150}
        className="object-cover"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      {/* <p className="text-sm">{description}</p> */}
      <p className="text-md font-semibold">${price.toFixed(2)}</p>
      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;

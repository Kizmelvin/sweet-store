export interface Product {
  id: string;
  name: string;
  description: string;
  price: any;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

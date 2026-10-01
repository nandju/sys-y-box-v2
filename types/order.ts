/**
 * Types pour les commandes SYS'Y BOX EVENTS
 */

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderEmailData {
  orderNumber: string;
  orderDate: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
}

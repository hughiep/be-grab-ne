import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  getAllCart(): string {
    return 'Carts';
  }

  getCartById(id: string): string {
    return `Cart with id ${id}`;
  }

  createCart(): string {
    return 'Cart created';
  }

  updateCart(id: string): string {
    return `Cart with id ${id} updated`;
  }

  deleteCart(id: string): string {
    return `Cart with id ${id} deleted`;
  }

  addToCart(id: string): string {
    return `Product with id ${id} added to cart`;
  }

  removeFromCart(id: string): string {
    return `Product with id ${id} removed from cart`;
  }

  updateCartProduct(id: string): string {
    return `Product with id ${id} updated in cart`;
  }

  getCartProducts(id: string): string {
    return `Products in cart with id ${id}`;
  }
}

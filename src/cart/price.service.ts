import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceService {
  private readonly bookPrice = 8;
  private readonly discounts = [0, 0.05, 0.1, 0.2, 0.25];

  calculateCheapestOffer(cart: number[]): number {
    return this.backtrack(cart, 0);
  }

  private backtrack(cart: number[], currentPrice: number): number {
    // Remove empty entries
    cart = cart.filter((count) => count > 0);

    // If the cart is empty, return the current price
    if (cart.length === 0) {
      return currentPrice;
    }

    let minPrice = Infinity;

    // Try to create book sets of different sizes
    for (let setSize = 1; setSize <= cart.length; setSize++) {
      // Create a new cart with one less book from each of the first setSize books
      const newCart = [...cart];

      for (let i = 0; i < setSize; i++) {
        newCart[i]--;
      }

      // Calculate the price of this set
      const setPrice =
        this.bookPrice * setSize * (1 - this.discounts[setSize - 1]);

      // Recursively calculate the price for the remaining books
      const totalPrice = this.backtrack(newCart, currentPrice + setPrice);

      // Update the minimum price
      minPrice = Math.min(minPrice, totalPrice);
    }

    return minPrice;
  }
}

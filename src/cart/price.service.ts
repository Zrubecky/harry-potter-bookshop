import { Injectable } from '@nestjs/common';
import { CartItem } from '../schemas/cart-item.schema';

@Injectable()
export class PriceService {
  private readonly discounts = [0, 0.05, 0.1, 0.2, 0.25];

  calculateCheapestOffer(items: CartItem[]): number {
    return this.backtrack(items, 0);
  }

  private backtrack(items: CartItem[], currentPrice: number): number {
    // If the itemArr is empty, return the current price
    if (items.length === 0) {
      return currentPrice;
    }

    let minPrice = Infinity;

    // Try to create book sets of different sizes
    for (let setSize = 1; setSize <= items.length; setSize++) {
      // Create a new items array with one less book from each of the first setSize books
      const newItems = items
        .map((item, index) => ({
          ...item,
          quantity: index < setSize ? item.quantity - 1 : item.quantity,
        }))

        .filter((item) => item.quantity > 0);

      // Calculate the price of this set
      const setPrice =
        items
          .slice(0, setSize)
          .reduce((sum, item) => sum + item.book.price, 0) *
        (1 - this.discounts[setSize - 1]);

      // Recursively calculate the price for the remaining books
      const totalPrice = this.backtrack(newItems, currentPrice + setPrice);

      // Update the minimum price
      minPrice = Math.min(minPrice, totalPrice);
    }

    return minPrice;
  }
}

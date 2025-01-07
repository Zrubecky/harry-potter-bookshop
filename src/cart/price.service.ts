import { Injectable } from '@nestjs/common';
import { CartItem } from '../schemas/cart-item.schema';

@Injectable()
export class PriceService {
  private readonly bookPrice = 8;
  private readonly discounts = [0, 0.05, 0.1, 0.2, 0.25];

  calculateCheapestOffer(items: CartItem[]): number {
    const quantityArr = items.map((item) => item.quantity);

    return this.backtrack(quantityArr, 0);
  }

  private backtrack(items: number[], currentPrice: number): number {
    // Remove empty entries
    items = items.filter((count) => count > 0);

    // If the itemArr is empty, return the current price
    if (items.length === 0) {
      return currentPrice;
    }

    let minPrice = Infinity;

    // Try to create book sets of different sizes
    for (let setSize = 1; setSize <= items.length; setSize++) {
      // Create a new itemsArr with one less book from each of the first setSize books
      const newItems = [...items];

      for (let i = 0; i < setSize; i++) {
        newItems[i]--;
      }

      // Calculate the price of this set
      const setPrice =
        this.bookPrice * setSize * (1 - this.discounts[setSize - 1]);

      // Recursively calculate the price for the remaining books
      const totalPrice = this.backtrack(newItems, currentPrice + setPrice);

      // Update the minimum price
      minPrice = Math.min(minPrice, totalPrice);
    }

    return minPrice;
  }
}

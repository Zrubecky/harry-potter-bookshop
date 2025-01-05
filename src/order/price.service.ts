import { Injectable } from '@nestjs/common';
import { OrderItem } from '../schemas/order-item.schema';
import { Book } from '../schemas/book.schema';

@Injectable()
export class PriceService {
  public readonly discountRates = [0, 0.05, 0.1, 0.2, 0.25];

  calculateTotalPrice(items: OrderItem[]): number {
    const sets = this.sortBooksIntoUniqueSets(items);

    let price = 0;

    for (const set of sets) {
      const setPrice = this.calculateSetPrice(set);
      const booksInSet = set.length;
      const discount =
        this.discountRates[
          booksInSet > this.discountRates.length
            ? this.discountRates.length - 1
            : booksInSet - 1
        ];

      price += setPrice * (1 - discount);
    }

    return price;
  }

  private calculateSetPrice(set: Book[]): number {
    return set.reduce((acc, book) => acc + book.price, 0);
  }

  private sortBooksIntoUniqueSets(items: OrderItem[]): Book[][] {
    const sets: Book[][] = [];
    const bookCounts: Map<Book, number> = new Map();

    // Initialize book counts
    for (const item of items) {
      bookCounts.set(item.book, item.quantity);
    }

    while (true) {
      const set: Book[] = [];

      for (const [book, count] of bookCounts.entries()) {
        if (count > 0) {
          set.push(book);
          bookCounts.set(book, count - 1);
        }
      }

      if (set.length === 0) {
        break;
      }

      sets.push(set);
    }

    return sets;
  }
}

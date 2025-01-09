import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { Cart, cartSchema } from '../schemas/cart.schema';
import { CartItem } from '../schemas/cart-item.schema';

@Controller('cart')
export class CartController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getCart(): Cart {
    const products: CartItem[] = [
      { book: { name: 'Volume 1', price: 8 }, quantity: 2 },
      { book: { name: 'Volume 2', price: 8 }, quantity: 2 },
      { book: { name: 'Volume 3', price: 8 }, quantity: 2 },
      { book: { name: 'Volume 4', price: 8 }, quantity: 1 },
      { book: { name: 'Volume 5', price: 8 }, quantity: 1 },
    ];

    const price = this.priceService.calculateCheapestOffer(products);

    return cartSchema.parse({ price, products });
  }
}

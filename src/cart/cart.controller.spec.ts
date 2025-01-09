import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { PriceService } from './price.service';

const EXPECTED_PRICE = 51.2;

const mockPriceService = {
  calculateCheapestOffer: jest.fn().mockReturnValue(EXPECTED_PRICE),
};

const CART_ITEMS = [
  { book: { name: 'Volume 1', price: 8 }, quantity: 2 },
  { book: { name: 'Volume 2', price: 8 }, quantity: 2 },
  { book: { name: 'Volume 3', price: 8 }, quantity: 2 },
  { book: { name: 'Volume 4', price: 8 }, quantity: 1 },
  { book: { name: 'Volume 5', price: 8 }, quantity: 1 },
];

describe('CartController', () => {
  let controller: CartController;
  let priceService: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: PriceService,
          useValue: mockPriceService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    priceService = module.get<PriceService>(PriceService);
  });

  it('should call calculateCheapestOffer with correct arguments', () => {
    controller.getCart();

    expect(priceService.calculateCheapestOffer).toHaveBeenCalledWith(
      CART_ITEMS,
    );
  });
});

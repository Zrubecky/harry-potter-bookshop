import { Test, TestingModule } from '@nestjs/testing';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let priceService: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile();

    priceService = module.get<PriceService>(PriceService);
  });

  it.each([
    {
      scenario: 'no items',
      items: [],
      expectedPrice: 0,
    },
    {
      scenario: 'single item',
      items: [{ book: { price: 8 }, quantity: 1 }],
      expectedPrice: 8,
    },
    {
      scenario: 'two items',
      items: [
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 15.2,
    },
    {
      scenario: 'three items',
      items: [
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 21.6,
    },
    {
      scenario: 'four items',
      items: [
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 25.6,
    },
    {
      scenario: 'five items',
      items: [
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 30,
    },
    {
      scenario: 'two sets with different quantities',
      items: [
        { book: { price: 8 }, quantity: 2 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 23.2,
    },
    {
      scenario: 'three sets with different quantities',
      items: [
        { book: { price: 8 }, quantity: 3 },
        { book: { price: 8 }, quantity: 2 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 3 },
        { book: { price: 8 }, quantity: 2 },
      ],
      expectedPrice: 30 + 25.6 + 15.2,
    },
    {
      scenario: 'six items',
      items: [
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 36,
    },
    {
      scenario: 'Example scenario',
      items: [
        { book: { price: 8 }, quantity: 2 },
        { book: { price: 8 }, quantity: 2 },
        { book: { price: 8 }, quantity: 2 },
        { book: { price: 8 }, quantity: 1 },
        { book: { price: 8 }, quantity: 1 },
      ],
      expectedPrice: 51.2,
    },
  ])(
    `should calculate total price correctly for scenario: $scenario`,
    ({ items, expectedPrice }) => {
      expect(priceService.calculateTotalPrice(items)).toBe(expectedPrice);
    },
  );
});

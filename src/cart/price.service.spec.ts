import { Test, TestingModule } from '@nestjs/testing';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it.each([
    {
      scenario: 'One volume',
      items: [{ book: { name: 'Volume 1', price: 8 }, quantity: 1 }],
      expectedPrice: 8,
    },
    {
      scenario: 'Volume 1 twice',
      items: [{ book: { name: 'Volume 1', price: 8 }, quantity: 2 }],
      expectedPrice: 16,
    },
    {
      scenario: 'Two volumes, one book',
      items: [
        { book: { name: 'Volume 1', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 2', price: 8 }, quantity: 1 },
      ],
      expectedPrice: 15.2,
    },
    {
      scenario: 'Two volumes, multiple book',
      items: [
        { book: { name: 'Volume 2', price: 8 }, quantity: 2 },
        { book: { name: 'Volume 1', price: 8 }, quantity: 1 },
      ],
      expectedPrice: 23.2,
    },
    {
      scenario: 'Five volumes, one book',
      items: [
        { book: { name: 'Volume 1', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 2', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 3', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 4', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 5', price: 8 }, quantity: 1 },
      ],
      expectedPrice: 30,
    },
    {
      scenario: 'Five volumes, Volume 1 twice',
      items: [
        { book: { name: 'Volume 1', price: 8 }, quantity: 2 },
        { book: { name: 'Volume 2', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 3', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 4', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 5', price: 8 }, quantity: 1 },
      ],
      expectedPrice: 38,
    },
    {
      scenario: 'Task Example',
      items: [
        { book: { name: 'Volume 1', price: 8 }, quantity: 2 },
        { book: { name: 'Volume 2', price: 8 }, quantity: 2 },
        { book: { name: 'Volume 3', price: 8 }, quantity: 2 },
        { book: { name: 'Volume 4', price: 8 }, quantity: 1 },
        { book: { name: 'Volume 5', price: 8 }, quantity: 1 },
      ],
      expectedPrice: 51.2,
    },
  ])(
    `Should return $expectedPrice EUR for scenario: $scenario`,
    ({ items, expectedPrice }) => {
      expect(service.calculateCheapestOffer(items)).toBe(expectedPrice);
    },
  );
});

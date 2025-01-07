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
    { scenario: 'One volume', cart: [1], expectedPrice: 8 },
    { scenario: 'Two volumes, one book', cart: [1, 1], expectedPrice: 15.2 },
    {
      scenario: 'Two volumes, multiple book',
      cart: [1, 2],
      expectedPrice: 23.2,
    },
    {
      scenario: 'Five volumes, one book',
      cart: [1, 1, 1, 1, 1],
      expectedPrice: 30,
    },
    {
      scenario: 'Five volumes, Volume 1 twice',
      cart: [2, 1, 1, 1, 1],
      expectedPrice: 38,
    },
    { scenario: 'Task Example', cart: [2, 2, 2, 1, 1], expectedPrice: 51.2 },
  ])(
    `Should return $expectedPrice EUR for scenario: $scenario`,
    ({ cart, expectedPrice }) => {
      expect(service.calculateCheapestOffer(cart)).toBe(expectedPrice);
    },
  );
});

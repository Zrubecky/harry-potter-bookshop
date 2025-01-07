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

  it('should be defined', () => {
    expect(service.calculateCheapestOffer([2, 1, 1, 1, 1])).toBe(38);
    expect(service.calculateCheapestOffer([1, 1, 1, 1, 1])).toBe(30);
    expect(service.calculateCheapestOffer([2, 2, 2, 1, 1])).toBe(51.2);
  });
});

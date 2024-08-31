import { Test, TestingModule } from '@nestjs/testing';
import { WebscrapService } from './webscrap.service';

describe('WebscrapService', () => {
  let service: WebscrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebscrapService],
    }).compile();

    service = module.get<WebscrapService>(WebscrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

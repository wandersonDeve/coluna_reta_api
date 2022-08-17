import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionService } from './institution.service';

describe('InstitutionService', () => {
  let service: InstitutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutionService],
    }).compile();

    service = module.get<InstitutionService>(InstitutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

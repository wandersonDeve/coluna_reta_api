import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';

describe('InstitutionController', () => {
  let controller: InstitutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutionController],
      providers: [InstitutionService],
    }).compile();

    controller = module.get<InstitutionController>(InstitutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

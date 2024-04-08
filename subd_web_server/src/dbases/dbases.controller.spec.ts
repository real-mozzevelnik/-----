import { Test, TestingModule } from '@nestjs/testing';
import { BasesController } from './dbases.controller';

describe('DbasesController', () => {
  let controller: BasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasesController],
    }).compile();

    controller = module.get<BasesController>(BasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

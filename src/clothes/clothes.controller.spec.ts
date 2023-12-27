import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';

describe(ClothesController.name, () => {
  let controller: ClothesController;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        imports: [PrismaModule],
        controllers: [ClothesController],
        providers: [ClothesService],
      })
      .compile();

    controller = module.get(ClothesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

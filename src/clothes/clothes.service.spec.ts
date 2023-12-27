import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { ClothesService } from './clothes.service';

describe(ClothesService.name, () => {
  let service: ClothesService;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        imports: [PrismaModule],
        providers: [ClothesService]
      })
      .compile();

    service = module.get(ClothesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

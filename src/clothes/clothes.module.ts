import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';

@Module({
  controllers: [ClothesController],
  providers: [ClothesService],
  imports: [PrismaModule]
})
export class ClothesModule {}

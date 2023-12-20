import { Module } from '@nestjs/common';
import { ClothesModule } from './clothes/clothes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClothesModule
  ]
})
export class AppModule {}

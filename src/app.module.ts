import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClothesModule } from './clothes/clothes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClothesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ClothesModule } from './clothes/clothes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ],
  imports: [
    PrismaModule,
    ClothesModule
  ]
})
export class AppModule { }

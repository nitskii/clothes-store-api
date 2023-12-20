import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ClothesModule } from './clothes/clothes.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter
    }
  ],
  imports: [
    PrismaModule,
    ClothesModule
  ]
})
export class AppModule { }

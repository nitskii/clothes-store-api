import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { ClothesModule } from '../clothes/clothes.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ClothesModule
  ]
})
export class AppModule { }

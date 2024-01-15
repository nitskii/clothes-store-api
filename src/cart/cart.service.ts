import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly db: PrismaClient) { }
}

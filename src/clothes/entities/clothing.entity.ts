import { ApiProperty } from "@nestjs/swagger";
import { Clothing, Prisma } from "@prisma/client";

export class ClothingEntity implements Clothing {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ minLength: 1 })
  name: string;

  @ApiProperty({ minLength: 1 })
  description: string;

  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  images: string[];

  @ApiProperty({ type: 'number', format: 'currency' })
  price: Prisma.Decimal;

  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  sizes: string[];

  @ApiProperty({ minLength: 1 })
  category: string;

  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  colors: string[];

  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  materials: string[];

  @ApiProperty({ minLength: 1 })
  brand: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

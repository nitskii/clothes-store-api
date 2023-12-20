import { ApiProperty } from "@nestjs/swagger";
import { Clothing } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ClothingEntity implements Clothing {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: 'number', format: 'double' })
  price: Decimal;

  @ApiProperty()
  sizes: string[];
  
  @ApiProperty()
  category: string;

  @ApiProperty()
  colors: string[];

  @ApiProperty()
  materials: string[];

  @ApiProperty()
  brand: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateClothingDto {
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  price: number;

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
}

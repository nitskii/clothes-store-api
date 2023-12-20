import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsCurrency,
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateClothingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 1 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 1 })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 1 })
  image: string;

  @IsCurrency({ allow_negatives: false })
  @ApiProperty()
  price: number;

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  sizes: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 1 })
  category: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  colors: string[];

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ minItems: 1, items: { type: 'string', minLength: 1 } })
  materials: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 1 })
  brand: string;
}

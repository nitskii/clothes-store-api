import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ClothesService } from './clothes.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { ClothingEntity } from './entities/clothing.entity';

@Controller('clothes')
@ApiTags('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) { }

  @Post()
  @ApiCreatedResponse({ type: ClothingEntity })
  create(@Body() createClothingDto: CreateClothingDto) {
    return this.clothesService.create(createClothingDto);
  }

  @Get()
  @ApiOkResponse({ type: ClothingEntity, isArray: true })
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClothingEntity })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clothesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClothingEntity })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClothingDto: UpdateClothingDto
  ) {
    return this.clothesService.update(id, updateClothingDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ClothingEntity })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clothesService.remove(id);
  }
}

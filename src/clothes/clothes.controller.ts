import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ClothesService } from './clothes.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { ClothingEntity } from './entities/clothing.entity';

@Controller('clothes')
@ApiTags('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClothingEntity })
  create(@Body() clothing: CreateClothingDto) {

    return this.clothesService.create(clothing);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClothingEntity })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changes: UpdateClothingDto
  ) {
    return this.clothesService.update(id, changes);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClothingEntity })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clothesService.remove(id);
  }
}

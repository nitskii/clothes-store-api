import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';

@Injectable()
export class ClothesService {
  constructor(private readonly db: PrismaService) { }

  create(clothing: CreateClothingDto) {
    return this.db.clothing.create({ data: clothing });
  }

  findAll() {
    return this.db.clothing.findMany();
  }

  async findOne(id: string) {
    const clothing = await this.db.clothing.findUnique({ where: { id } });

    if (clothing === null) {
      throw new NotFoundException(`Clothing with id '${id}' does not exist`);
    }

    return clothing;
  }

  update(id: string, changes: UpdateClothingDto) {
    return this.db.clothing.update({
      where: { id },
      data: changes
    });
  }

  remove(id: string) {
    return this.db.clothing.delete({ where: { id } });
  }
}

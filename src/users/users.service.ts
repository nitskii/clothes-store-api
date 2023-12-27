import { Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) { }

  async create(user: CreateUserDto) {
    return this.db.user.create({
      data: {
        ...user,
        password: await hash(user.password, await genSalt()),
      }
    });
  }

  findAll() {
    return this.db.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });

    if (user === null) {
      throw new NotFoundException(`User with id '${id}' does not exist`);
    }

    return user;
  }

  async update(id: string, changes: UpdateUserDto) {
    if (changes.password) {
      changes.password = await hash(
        changes.password,
        await genSalt()
      );
    }

    return this.db.user.update({
      where: { id },
      data: changes
    });
  }

  remove(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}

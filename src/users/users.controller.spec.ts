import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe(UsersController.name, () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        imports: [PrismaModule],
        controllers: [UsersController],
        providers: [UsersService],
      })
      .compile();

    controller = module.get(UsersController);
  });

  it('creates new user', async () => {
    const user = new CreateUserDto();

    user.email = 'test.user@example.com';
    user.firstName = 'Test';
    user.lastName = 'User';
    user.password = 'qwerty123';

    const result = await controller.create(user);

    expect(result).toBeInstanceOf(UserEntity);
  });

  it('throws an error when trying to create a user with existing email', async () => {
    const user = new CreateUserDto();

    user.email = "test.user@example.com";
    user.firstName = "Test";
    user.lastName = "User";
    user.password = "qwerty123";

    try {
      await controller.create(user);
    } catch (err) {
      expect(err)
        .toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    }
  });

  afterAll(async () => await controller.removeAll());
});

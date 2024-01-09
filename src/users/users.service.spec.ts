import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        imports: [PrismaModule],
        providers: [UsersService]
      })
      .compile();

    service = module.get(UsersService);
  });

  it('creates new user', async () => {
    const user = new CreateUserDto();

    user.email = "test.user@example.com";
    user.firstName = "Test";
    user.lastName = "User";
    user.password = "qwerty123";

    const result = await service.create(user);

    expect(result).toHaveProperty('id');
  });

  afterAll(async () => {
    await service.removeAll();
  });
});

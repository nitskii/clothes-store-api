import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

  let userId: string;

  it('creates new user', async () => {
    const user = new CreateUserDto();

    user.email = "test.user@example.com";
    user.firstName = "Test";
    user.lastName = "User";
    user.password = "qwerty123";

    const { id } = await service.create(user);
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    expect(id).toMatch(uuidPattern);

    userId = id;
  });

  it('throws an error when trying to create a user with existing email', async () => {
    const user = new CreateUserDto();

    user.email = "test.user@example.com";
    user.firstName = "Test";
    user.lastName = "User";
    user.password = "qwerty123";

    try {
      await service.create(user);
    } catch (err) {
      expect(err)
        .toBeInstanceOf(PrismaClientKnownRequestError);
    }
  });

  it('finds all users', async () => {
    const result = await service.findAll();

    expect(result).toBeInstanceOf(Array);
  });

  it('finds existing user', async () => {
    const { id } = await service.findOne(userId);

    expect(id).toEqual(userId);
  });

  it('throws an error when a user is not found', async () => {
    try {
      await service.findOne("NON_EXISTING_ID");
    } catch (err) {
      expect(err)
        .toBeInstanceOf(PrismaClientKnownRequestError);
    }
  });

  it('updates existing user email', async () => {
    const newEmail = "new.email@example.com";

    const { email } = await service.update(
      userId,
      { email: newEmail }
    );

    expect(email).toEqual(newEmail);
  });

  it('deletes existing user', async () => {
    const { id } = await service.remove(userId);

    expect(id).toEqual(userId);
  });

  afterAll(async () => await service.removeAll());
});

import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;
  let db: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test
      .createTestingModule({
        imports: [PrismaModule],
        providers: [UsersService]
      })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = moduleRef.get(UsersService);
    db = moduleRef.get(PrismaService);
  });

  const userId = randomUUID();

  it('creates new user', async () => {
    const user = {
      email: 'test.user@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'qwerty123'
    } satisfies CreateUserDto;

    const expectedResult = {
      id: randomUUID(),
      ...user,
      password: await hash(
        user.password,
        await genSalt()
      ),
      role: Role.USER
    };

    db.user.create.mockResolvedValueOnce(expectedResult);

    const actualResult = await service.create(user);

    expect(actualResult).toEqual(expectedResult);
  });

  it('throws an error when trying to create a user with existing email', async () => {
    const user = {
      email: 'test.user@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'qwerty123'
    } satisfies CreateUserDto;

    expect(async () => await service.create(user))
      .toThrow(Prisma.PrismaClientKnownRequestError);
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
        .toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
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

  it('updates existing user password', async () => {
    const newPassword = "asdfg456";

    const { password } = await service.update(
      userId,
      { password: newPassword }
    );

    expect(await compare(newPassword, password)).toEqual(true);
  });

  it('throws an error when trying to update a non-existing user', async () => {
    try {
      await service.update(
        "NON_EXISTING_ID",
        { firstName: "User" }
      );
    } catch (err) {
      expect(err)
        .toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    }
  });

  it('deletes existing user', async () => {
    const { id } = await service.remove(userId);

    expect(id).toEqual(userId);
  });

  it('throws an error when trying to delete a non-existing user', async () => {
    try {
      await service.remove("NON_EXISTING_ID");
    } catch (err) {
      expect(err)
        .toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    }
  });

  afterAll(async () => await service.removeAll());
});

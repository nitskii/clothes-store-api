import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const db = new PrismaClient();

(async () => {
  await db.user.upsert({
    where: {
      email: process.env.ADMIN_SEED_EMAIL
    },
    update: {},
    create: {
      firstName: 'Nikita',
      lastName: 'Miller',
      email: process.env.ADMIN_SEED_EMAIL!,
      role: 'ADMIN',
      password: await hash(process.env.ADMIN_SEED_PASSWORD!, await genSalt())
    }
  });
})()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await db.$disconnect());


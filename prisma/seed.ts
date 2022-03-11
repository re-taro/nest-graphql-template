/* eslint-disable no-console */
import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();

const userData: User[] = [
  {
    id: 1,
    name: 'Alice',
  },
  {
    id: 2,
    name: 'Bob',
  },
  {
    id: 3,
    name: 'Claire',
  },
];

const doSeed = async (): Promise<User[]> => {
  const users: Array<Prisma.Prisma__UserClient<User>> = [];
  for (const user of userData) {
    const createdUser = prisma.user.create({
      data: user,
    });
    users.push(createdUser);
  }
  // eslint-disable-next-line no-return-await
  return await prisma.$transaction(users);
};

const main = async () => {
  console.log('Start seeding...');
  await doSeed();
  console.log('Seeding done.');
};

main()
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });

/* eslint-enable */

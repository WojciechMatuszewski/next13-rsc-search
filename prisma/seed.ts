import { PrismaClient, Prisma, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  const NUM_USERS = 100;

  const users: Prisma.UserCreateInput[] = Array.from(
    { length: NUM_USERS },
    () => {
      return {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      };
    }
  );

  for (const user of users) {
    const createdUser = await prisma.user.create({ data: user });
    console.log(`User ${createdUser.id} created.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

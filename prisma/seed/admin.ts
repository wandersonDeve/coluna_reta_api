import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await Promise.all([
    await prisma.$queryRaw(
      Prisma.sql`INSERT IGNORE INTO user (id,name,role,email,password_hash)
    VALUES
      (1,"Julia Chang","ADMIN","admin@colunareta.com","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W"),
      (2,"Jinpachi Mishima","CAMPO","campo@colunareta.com","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W"),
      (3,"Jack","BACKOFFICE","backoffice@colunareta.com","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W")`,
    ),
  ]);

  console.log(`Seeding admin finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

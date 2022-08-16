import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.$queryRaw(
    Prisma.sql`INSERT INTO user (name,role,email)
    VALUES
      ("Mercedes Chen","BACKOFFICE","nisl.sem.consequat@yahoo.ca"),
      ("Wade Henson","BACKOFFICE","risus.odio.auctor@icloud.net"),
      ("Malcolm Day","BACKOFFICE","nisl.maecenas@yahoo.ca"),
      ("Cassandra Hansen","BACKOFFICE","ipsum.suspendisse@google.edu"),
      ("Nayda Hansen","BACKOFFICE","aliquet.libero@hotmail.edu"),
      ("Lesley William","BACKOFFICE","ridiculus.mus@aol.com"),
      ("Hector Pena","BACKOFFICE","orci.ut@outlook.edu"),
      ("Fulton Johns","BACKOFFICE","arcu.et@icloud.edu"),
      ("Quail Maddox","BACKOFFICE","rutrum.urna.nec@icloud.ca"),
      ("Madeline Hunter","BACKOFFICE","purus@aol.couk"),
      ("Madonna Browning","BACKOFFICE","sodales@hotmail.edu"),
      ("Carla Price","BACKOFFICE","in@aol.ca"),
      ("Ursa Brock","BACKOFFICE","est.mollis@google.org"),
      ("Sawyer Craig","BACKOFFICE","vitae.erat@hotmail.couk"),
      ("Breanna Suarez","BACKOFFICE","amet.consectetuer.adipiscing@outlook.ca"),
      ("Darryl Dixon","BACKOFFICE","magna.nam.ligula@aol.com"),
      ("Zeus Long","BACKOFFICE","velit.dui@google.org"),
      ("Abraham Lindsay","BACKOFFICE","phasellus.dolor@protonmail.couk"),
      ("Fiona Boyer","BACKOFFICE","nunc.sollicitudin@google.couk"),
      ("Alexis Ferguson","BACKOFFICE","semper.pretium.neque@icloud.ca"),
      ("Drake Cohen","BACKOFFICE","in.lobortis.tellus@outlook.org"),
      ("Vivien Griffin","BACKOFFICE","semper.dui.lectus@protonmail.couk"),
      ("Nasim Gould","BACKOFFICE","suspendisse.eleifend@icloud.com"),
      ("Elmo Hatfield","BACKOFFICE","pede.blandit.congue@hotmail.ca"),
      ("Fallon Francis","BACKOFFICE","semper.egestas@protonmail.edu"),
      ("Ignacia Fitzgerald","BACKOFFICE","nunc.mauris.morbi@outlook.com"),
      ("Grant Joyner","BACKOFFICE","convallis.erat@icloud.ca"),
      ("Roanna Clarke","BACKOFFICE","iaculis@aol.net"),
      ("Shellie Diaz","BACKOFFICE","massa.non@aol.ca"),
      ("Phelan Hill","BACKOFFICE","luctus.curabitur@icloud.couk"),
      ("Colette Barrett","BACKOFFICE","egestas.fusce.aliquet@protonmail.ca"),
      ("Iris Sparks","BACKOFFICE","nulla.integer@icloud.org"),
      ("Bernard Trujillo","BACKOFFICE","elit.elit@google.edu"),
      ("Scott Hardin","BACKOFFICE","massa@hotmail.org"),
      ("Priscilla Mcmillan","BACKOFFICE","diam.eu@google.com"),
      ("Quin Meyer","BACKOFFICE","fermentum.metus@hotmail.net"),
      ("Jemima Holden","BACKOFFICE","nunc.est@protonmail.net"),
      ("Ima Pennington","BACKOFFICE","blandit.enim@icloud.ca"),
      ("Quemby Weber","BACKOFFICE","facilisi.sed.neque@hotmail.couk"),
      ("Upton Garner","BACKOFFICE","magna.tellus.faucibus@google.com"),
      ("Hedwig Hutchinson","BACKOFFICE","varius.ultrices@outlook.net"),
      ("Brenden Gould","BACKOFFICE","ante.iaculis@outlook.net"),
      ("Burke Mcclure","BACKOFFICE","sit.amet@hotmail.org"),
      ("Mikayla Pacheco","BACKOFFICE","nec.euismod@hotmail.com"),
      ("Velma Mooney","BACKOFFICE","nec.imperdiet@hotmail.net"),
      ("Keegan Wilcox","BACKOFFICE","mauris.eu@aol.edu")`,
  );

  console.log(`Seeding finished.`);
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

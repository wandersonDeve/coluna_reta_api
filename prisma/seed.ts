import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.$queryRaw(
    Prisma.sql`INSERT INTO user (name,role,email,password_hash)
    VALUES
      ("Autumn Robertson","BACKOFFICE","lacus.quisque@google.org","DEW87RRK1VO"),
      ("Anthony Murray","BACKOFFICE","est.mauris.eu@google.org","FKG11NFY7TS"),
      ("Rebekah Austin","BACKOFFICE","molestie.dapibus@icloud.org","DLP63QMI2IO"),
      ("Lysandra Rowe","BACKOFFICE","turpis.egestas@hotmail.couk","MHW37HEJ0DD"),
      ("Chloe Henson","BACKOFFICE","sociis.natoque.penatibus@aol.org","EHW63NPR8CN"),
      ("Troy Conley","BACKOFFICE","nunc.sed.orci@google.com","LTS08NAI8MY"),
      ("Gregory Suarez","BACKOFFICE","nec.tellus@aol.com","YNY07DXY5QP"),
      ("Nayda Barber","BACKOFFICE","ipsum@yahoo.edu","HHM11EMQ6KO"),
      ("Quon Brady","BACKOFFICE","malesuada@google.org","WQK22RIX2ZL"),
      ("Stone Burt","BACKOFFICE","velit.aliquam@google.edu","NFY82SZB2TP"),
      ("Danielle Burt","BACKOFFICE","eu.tempor.erat@protonmail.net","IQY86CHG4UH"),
      ("Urielle Frederick","BACKOFFICE","egestas.a.dui@hotmail.com","DJG38QRH6EG"),
      ("Mechelle Kennedy","BACKOFFICE","fermentum.arcu.vestibulum@protonmail.net","HHI52DKH0KS"),
      ("Edward Chen","BACKOFFICE","etiam.gravida.molestie@aol.org","HGA91WRS2BK"),
      ("Bert Langley","BACKOFFICE","praesent.eu@yahoo.edu","FEM52LHK4VE"),
      ("Galena Wolf","BACKOFFICE","sed.eu@hotmail.com","VCB19WGB6MD"),
      ("Harriet Rodriquez","BACKOFFICE","suspendisse.eleifend.cras@aol.com","BVG32BDC6GF"),
      ("Christopher Chang","BACKOFFICE","nulla@yahoo.edu","IHK53QES2OH"),
      ("Hope Scott","BACKOFFICE","donec.tincidunt@outlook.ca","YRY57IWQ2IU"),
      ("Mona Mathis","BACKOFFICE","nulla.tincidunt@google.ca","RRP15JIR8QH"),
      ("Alvin Castro","BACKOFFICE","sagittis.nullam@protonmail.net","NQI50WQO8GM"),
      ("Garrison Sellers","BACKOFFICE","odio.semper@outlook.org","VHY88YDJ7XY"),
      ("Unity Nash","BACKOFFICE","mauris.a.nunc@yahoo.org","JTM81REU5OE"),
      ("Reed Joseph","BACKOFFICE","nec.quam@hotmail.ca","JQL56BGP3TW"),
      ("Shaine Sargent","BACKOFFICE","risus@outlook.ca","TOO77YQG4FN"),
      ("Whoopi Rutledge","BACKOFFICE","a@outlook.net","DQP81DMQ1ZB"),
      ("Anne Coleman","BACKOFFICE","cras.eu@outlook.net","GHJ49FPP6UY"),
      ("Pamela Martin","BACKOFFICE","tincidunt.pede@protonmail.couk","SWT16JUI4NS"),
      ("Luke Hewitt","BACKOFFICE","suspendisse.eleifend@hotmail.couk","RIV51NER1YQ"),
      ("Zachary Delgado","BACKOFFICE","non.lobortis@protonmail.couk","FRH54KJU4GB"),
      ("Tamekah Frost","BACKOFFICE","nibh.donec@hotmail.ca","TVV14MGI2QG"),
      ("Meredith Walton","BACKOFFICE","nisi.cum.sociis@hotmail.couk","WRJ22QNN0WG"),
      ("Medge Woodward","BACKOFFICE","nunc@aol.org","XWN16ITH0ND"),
      ("Wanda Potts","BACKOFFICE","justo.proin@yahoo.net","RUL72ONX8BM"),
      ("Trevor Freeman","BACKOFFICE","luctus.ut.pellentesque@outlook.edu","CMF15SOO3RQ"),
      ("Kasimir Wheeler","BACKOFFICE","feugiat.placerat.velit@icloud.net","TSX14ECX2HV"),
      ("Ivan Frederick","BACKOFFICE","tempor.bibendum.donec@yahoo.net","BFC83RLB1YC"),
      ("Kevin Lambert","BACKOFFICE","lectus.a.sollicitudin@yahoo.org","PSJ21WRO8VX"),
      ("Hashim Juarez","BACKOFFICE","velit.justo.nec@outlook.org","YDY68OFQ6MO"),
      ("Aretha Whitaker","BACKOFFICE","urna.nullam.lobortis@hotmail.net","WAN77RWX7JM"),
      ("Nell Spears","BACKOFFICE","et.magnis.dis@yahoo.edu","HNZ45GTO3PM"),
      ("Galena James","BACKOFFICE","bibendum@hotmail.org","SVU69ORP6ON"),
      ("Jerome Parsons","BACKOFFICE","non.bibendum@icloud.org","ZHP14YPZ0BM"),
      ("Jaden Kirby","BACKOFFICE","aenean@yahoo.org","GUN82YPR3BE"),
      ("Quynn Blake","BACKOFFICE","sed@google.couk","WTF85SSB6SE"),
      ("Veda Kemp","BACKOFFICE","consequat.dolor@yahoo.com","SLX83FBY9CI")`,
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

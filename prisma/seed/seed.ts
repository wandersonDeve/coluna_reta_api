import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await Promise.all([
    await prisma.$queryRaw(
      Prisma.sql`INSERT IGNORE INTO Address (id,city,neighborhood,number,state,street,zip_code)
      VALUES
        (1,"Paulista","Picardie","595","Paraíba","nulla vulputate dui,","12383-260"),
        (2,"Mogi das Cruzes","Henegouwen","886","Paraná","Nunc mauris","76730-453"),
        (3,"Patos","Southwestern Tagalog Region","514","São Paulo","ullamcorper.","97062-045"),
        (4,"Goiânia","Arkhangelsk Oblast","943","Minas Gerais","luctus aliquet","82039-158"),
        (5,"Blumenau","Borno","405","Pernambuco","luctus, ipsum","25146-653"),
        (6,"Fortaleza","Ross-shire","812","Pernambuco","ornare. In","67599-163"),
        (7,"Gravataí","Bretagne","067","Goiás","rutrum lorem","27652-662"),
        (8,"Rio Verde","Dōngběi","697","Paraná","sodales. Mauris blandit","65702-790"),
        (9,"Salvador","Katsina","842","Pará","purus ac tellus.","98916-355"),
        (10,"Recife","Nariño","459","Santa Catarina","mollis dui, in","90765-549"),
        (11,"Fortaleza","Tabasco","301","Rio Grande do Sul","fringilla","61889-525"),
        (12,"João Pessoa","Balochistan","878","Paraíba","Morbi non","68444-719"),
        (13,"Petrópolis","Dalarnas län","862","Bahia","leo.","47870-007"),
        (14,"Caruaru","Odessa oblast","528","Pernambuco","lacus","44817-054"),
        (15,"João Pessoa","Cagayan Valley","675","Pernambuco","ligula. Aenean euismod","13580-621"),
        (16,"Petrolina","Adana","451","Bahia","ipsum. Suspendisse sagittis.","42661-419"),
        (17,"Lauro de Freitas","Troms og Finnmark","214","Paraná","auctor,","60818-123"),
        (18,"Maracanaú","Diyarbakır","547","Pará","Aenean gravida nunc","35037214"),
        (19,"Governador Valadares","Vorarlberg","673","Rio Grande do Sul","Donec nibh enim,","61869-033"),
        (20,"Anápolis","Ceará","886","Pará","lorem vitae odio","74785-635")`,
    ),

    await prisma.$queryRaw(
      Prisma.sql`INSERT IGNORE INTO Institution (id, name,phone_number,address_id)
    VALUES
      (1,"Urna Vivamus Corp.","(55) 86 2148 2912",5),
      (2,"Natoque Penatibus LLP","(55) 11 2705 3468",15),
      (3,"Ante Vivamus Institute","(55) 81 8716 1788",8),
      (4,"Dui Augue Eu Ltd","(55) 44 7881 6137",19),
      (5,"Nullam Inc.","(55) 68 3283 3699",7),
      (6,"Eget Massa Institute","(55) 65 5518 0603",1),
      (7,"Elit Foundation","(55) 56 1131 6953",9),
      (8,"Sit Amet Corp.","(55) 21 5678 1214",3),
      (9,"Luctus Ut Corp.","(55) 28 9306 9166",13),
      (10,"Velit Industries","(55) 32 1459 6114",2);`,
    ),

    await prisma.$queryRaw(
      Prisma.sql`INSERT IGNORE INTO user (name,role,email,password_hash)
    VALUES
      ("Autumn Robertson","BACKOFFICE","lacus.quisque@google.org","DEW87RRK1VO"),
      ("Anthony Murray","BACKOFFICE","est.mauris.eu@google.org","FKG11NFY7TS"),
      ("Rebekah Austin","BACKOFFICE","molestie.dapibus@icloud.org","DLP63QMI2IO"),
      ("Lysandra Rowe","BACKOFFICE","turpis.egestas@hotmail.couk","MHW37HEJ0DD"),
      ("Chloe Henson","BACKOFFICE","sociis.natoque.penatibus@aol.org","EHW63NPR8CN"),
      ("Troy Conley","BACKOFFICE","nunc.sed.orci@google.com","LTS08NAI8MY"),
      ("Gregory Suarez","BACKOFFICE","nec.tellus@aol.com","YNY07DXY5QP"),
      ("Nayda Barber","BACKOFFICE","ipsum@yahoo.edu","HHM11EMQ6KO"),
      ("Quon Brady","BACKOFFICE","malesuada@google.org","WQK22RIX2ZL")`,
    ),

    await prisma.$queryRaw(
      Prisma.sql`INSERT IGNORE INTO Student (name,birth_date,phone,institution_id,address_id)
      VALUES
        ("Kennedy V. Casey","04/06/16","(55) 99 5421 6812",1,10),
        ("Addison V. Butler","26/02/15","(55) 72 8216 6181",7,13),
        ("Jordan L. Wall","21/03/15","(55) 98 9785 9157",3,19),
        ("Jessica V. Church","10/01/13","(55) 70 3256 9980",9,3),
        ("Josiah K. Castro","11/01/16","(55) 68 2137 7613",5,16),
        ("Tyler U. Herring","22/10/12","(55) 58 8735 9622",8,17),
        ("Ciara C. Wood","04/09/11","(55) 43 4622 6395",4,11),
        ("Oscar F. Blackburn","02/04/11","(55) 57 1514 2863",7,20),
        ("Caryn E. Lara","22/08/15","(55) 21 3012 1425",7,17),
        ("Lane N. Barry","08/06/11","(55) 55 1860 3486",7,13),
        ("Jolene U. Kennedy","26/12/16","(55) 33 7684 2424",4,19),
        ("Walter A. Stewart","29/05/14","(55) 97 6170 4893",8,18),
        ("Len Z. Lott","21/08/10","(55) 41 7588 1589",5,17),
        ("Ivor L. Langley","20/07/16","(55) 56 8804 2826",7,4),
        ("Tucker V. Haynes","08/02/13","(55) 47 5235 4538",5,8),
        ("Kato H. Mccarthy","10/01/11","(55) 54 9741 5134",6,15),
        ("Miriam F. Dotson","15/02/13","(55) 53 4423 5069",5,14),
        ("Todd H. Andrews","18/06/12","(55) 50 3225 8672",8,10),
        ("Joy B. Clayton","29/11/14","(55) 59 5822 2472",6,12),
        ("Joseph J. Wong","16/01/11","(55) 66 3732 0632",7,18),
        ("Jessamine P. Tucker","02/12/11","(55) 71 6612 7466",1,18),
        ("Emi Y. Rodriguez","10/01/14","(55) 58 4282 0766",2,18),
        ("Arden Q. Gomez","10/10/14","(55) 27 1258 9815",1,5),
        ("Caesar T. Meyer","22/09/14","(55) 38 7435 3953",5,12),
        ("Daria B. Frederick","14/08/12","(55) 59 4223 7836",7,5),
        ("Lucy Z. Ball","29/06/12","(55) 71 6833 0247",3,8),
        ("Nash M. Cote","22/08/12","(55) 72 4188 3451",8,8),
        ("Emma X. Schroeder","10/11/12","(55) 42 4534 8680",4,17),
        ("Ferris M. Davis","11/03/14","(55) 33 6979 8718",6,3),
        ("Hillary W. Hatfield","14/12/15","(55) 70 6214 7183",4,10),
        ("Lila C. Morales","26/10/16","(55) 25 8444 6563",5,6),
        ("Alexis Z. Cummings","13/04/14","(55) 18 4535 9752",8,12),
        ("Jerome J. Haley","27/09/12","(55) 35 1961 2532",6,15),
        ("Avram J. Campos","22/01/16","(55) 06 5985 7286",7,3),
        ("Ifeoma I. Bird","25/05/15","(55) 12 4337 3189",7,11),
        ("Madaline T. Morrison","01/05/15","(55) 02 2722 9103",6,5),
        ("Minerva B. Allison","06/01/10","(55) 28 1180 4399",7,14),
        ("Daphne J. Bradford","26/05/12","(55) 42 2546 4846",3,17),
        ("Wyoming E. Greer","22/11/10","(55) 66 4869 7753",5,16),
        ("Ima Z. Sandoval","09/05/13","(55) 31 7237 9626",1,11),
        ("Jemima C. Hernandez","03/05/16","(55) 46 1098 6248",6,15),
        ("Perry K. Rollins","23/12/10","(55) 34 8102 1363",4,2),
        ("Jorden N. Walker","24/01/14","(55) 08 1633 4423",4,3),
        ("Claire H. Boyle","07/05/13","(55) 73 2272 7754",7,16),
        ("Ryan L. Riddle","14/08/13","(55) 19 2843 6502",7,12),
        ("Hall Y. Guzman","13/05/12","(55) 77 3117 3973",3,2),
        ("Faith A. Knight","29/09/13","(55) 87 2731 4509",8,15),
        ("Gisela W. Whitaker","18/07/12","(55) 38 3182 9741",3,14),
        ("Basia T. Blankenship","25/09/11","(55) 72 7862 1785",4,9),
        ("Ethan M. Hobbs","05/05/15","(55) 51 0056 8016",7,13),
        ("Aline K. Ryan","14/12/12","(55) 77 5832 7267",6,15),
        ("Stuart L. Wall","14/01/15","(55) 64 0380 3085",2,15),
        ("Erich S. Cervantes","16/02/12","(55) 46 6682 0801",6,12),
        ("Whoopi I. Vincent","10/07/10","(55) 84 8878 8283",4,10),
        ("Clinton O. Mcclure","25/06/12","(55) 27 6578 2814",2,8),
        ("Aimee E. Watts","13/07/11","(55) 73 6263 4122",1,7),
        ("Zachery Z. Patrick","14/04/11","(55) 26 8342 6139",4,6),
        ("Gay P. Snyder","03/07/12","(55) 58 0458 7275",8,1),
        ("Jeremy V. Johnston","17/03/15","(55) 87 0426 3657",2,14),
        ("Jacqueline M. Lancaster","13/10/10","(55) 46 1063 4278",7,9),
        ("Raja F. Rios","19/06/16","(55) 94 6586 7328",9,3),
        ("Uriel E. Yates","26/04/12","(55) 71 0212 5542",4,17),
        ("Yoshi D. Cash","05/12/15","(55) 15 1585 2754",4,19),
        ("Alana T. Tillman","06/04/13","(55) 42 7953 8583",4,4),
        ("Kelly F. Bernard","21/01/15","(55) 54 4625 0820",3,12),
        ("Stuart O. Valdez","25/02/16","(55) 61 3169 8058",8,8),
        ("Jemima B. Mckee","06/03/15","(55) 44 7286 3640",1,15),
        ("Kylynn C. Merritt","02/07/11","(55) 58 4534 4444",8,6),
        ("George Y. Oneil","05/03/10","(55) 11 5617 3145",7,10),
        ("Erin R. Foreman","03/09/11","(55) 64 6822 7597",3,6),
        ("Driscoll B. Cruz","23/07/16","(55) 38 5703 7318",4,3),
        ("Aurelia P. Dillard","21/07/16","(55) 21 5387 7628",4,2),
        ("Mara W. Ratliff","01/04/10","(55) 63 6844 7542",2,5),
        ("Ethan R. Goff","14/09/15","(55) 66 8570 4365",4,14),
        ("Macy P. Atkins","03/12/11","(55) 43 2877 1862",4,3),
        ("Tate X. Osborn","08/03/13","(55) 54 1872 3306",3,2),
        ("Burton I. Cohen","07/11/11","(55) 23 9336 4555",4,19),
        ("Velma H. Figueroa","14/06/13","(55) 53 8476 7461",2,4),
        ("Lucius Y. Carver","26/10/14","(55) 61 5365 1971",2,13),
        ("Zena S. Peters","26/08/11","(55) 31 5812 7646",7,12),
        ("Warren P. Cruz","23/10/10","(55) 46 3236 3406",9,19),
        ("Baker B. Beach","13/11/12","(55) 67 1376 8906",7,11),
        ("Chadwick J. England","23/09/14","(55) 43 8907 5863",5,7),
        ("Aladdin X. Koch","11/08/13","(55) 51 4756 7212",6,5),
        ("Odysseus K. Bird","17/07/10","(55) 43 8103 9979",6,9),
        ("Colby E. Colon","26/05/11","(55) 28 0756 5563",4,19),
        ("Thor H. Doyle","16/10/12","(55) 85 5438 3783",5,3)`,
    ),
  ]);

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

/*
  Warnings:

  - You are about to drop the `UsersHasInstitution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UsersHasInstitution` DROP FOREIGN KEY `UsersHasInstitution_institution_id_fkey`;

-- DropForeignKey
ALTER TABLE `UsersHasInstitution` DROP FOREIGN KEY `UsersHasInstitution_user_id_fkey`;

-- DropTable
DROP TABLE `UsersHasInstitution`;

-- CreateTable
CREATE TABLE `_InstitutionToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InstitutionToUser_AB_unique`(`A`, `B`),
    INDEX `_InstitutionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_InstitutionToUser` ADD CONSTRAINT `_InstitutionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Institution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InstitutionToUser` ADD CONSTRAINT `_InstitutionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

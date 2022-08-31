-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_institution_id_fkey`;

-- DropForeignKey
ALTER TABLE `UsersHasInstitution` DROP FOREIGN KEY `UsersHasInstitution_institution_id_fkey`;

-- DropForeignKey
ALTER TABLE `UsersHasInstitution` DROP FOREIGN KEY `UsersHasInstitution_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_institution_id_fkey` FOREIGN KEY (`institution_id`) REFERENCES `Institution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersHasInstitution` ADD CONSTRAINT `UsersHasInstitution_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersHasInstitution` ADD CONSTRAINT `UsersHasInstitution_institution_id_fkey` FOREIGN KEY (`institution_id`) REFERENCES `Institution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

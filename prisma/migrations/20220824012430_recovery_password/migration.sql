-- AlterTable
ALTER TABLE `user` ADD COLUMN `recoverPasswordToken` VARCHAR(191) NULL,
    MODIFY `password_hash` VARCHAR(191) NULL;

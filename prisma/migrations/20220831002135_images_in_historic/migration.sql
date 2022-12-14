/*
  Warnings:

  - Added the required column `image_1` to the `Historic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_2` to the `Historic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Historic` ADD COLUMN `image_1` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_2` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Consultation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NULL,
    `historic_id` INTEGER NULL,
    `clinic` VARCHAR(191) NOT NULL,
    `consultation_date` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_historic_id_fkey` FOREIGN KEY (`historic_id`) REFERENCES `Historic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

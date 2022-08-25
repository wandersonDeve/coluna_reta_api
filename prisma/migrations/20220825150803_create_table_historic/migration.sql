-- CreateTable
CREATE TABLE `Historic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NULL,
    `consultation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `forwarding` VARCHAR(191) NULL,
    `cobb_angle` VARCHAR(191) NOT NULL,
    `return_date` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Historic` ADD CONSTRAINT `Historic_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

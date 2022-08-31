/*
  Warnings:

  - You are about to drop the column `consultation_date` on the `Historic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Historic` DROP COLUMN `consultation_date`,
    ADD COLUMN `visit_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

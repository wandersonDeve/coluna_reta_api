/*
  Warnings:

  - You are about to drop the column `address_id` on the `Institution` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Institution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Institution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Institution` DROP FOREIGN KEY `Institution_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_address_id_fkey`;

-- AlterTable
ALTER TABLE `Institution` DROP COLUMN `address_id`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip_code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `address_id`;

-- DropTable
DROP TABLE `Address`;

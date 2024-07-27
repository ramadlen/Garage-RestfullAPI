/*
  Warnings:

  - You are about to drop the column `customer_id` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `jenisPerangkat` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `karyawan` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_jenisPerangkat_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_karyawan_fkey`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `customer_id`,
    DROP COLUMN `jenisPerangkat`,
    DROP COLUMN `karyawan`;

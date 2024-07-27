/*
  Warnings:

  - Added the required column `customer_id` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` ADD COLUMN `customer_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customermasuk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

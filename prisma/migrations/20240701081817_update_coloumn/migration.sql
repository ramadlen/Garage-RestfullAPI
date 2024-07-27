/*
  Warnings:

  - Added the required column `customer_id` to the `jenisperangkat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gudang_id` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisPerangkat` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jenisperangkat` ADD COLUMN `customer_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `gudang_id` INTEGER NOT NULL,
    ADD COLUMN `jenisPerangkat` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `jenisperangkat` ADD CONSTRAINT `jenisperangkat_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customermasuk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_gudang_id_fkey` FOREIGN KEY (`gudang_id`) REFERENCES `gudang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_jenisPerangkat_fkey` FOREIGN KEY (`jenisPerangkat`) REFERENCES `jenisperangkat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

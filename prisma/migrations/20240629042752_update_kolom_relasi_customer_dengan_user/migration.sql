/*
  Warnings:

  - Added the required column `username_yangmasukin` to the `customermasuk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customermasuk` ADD COLUMN `username_yangmasukin` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `customermasuk` ADD CONSTRAINT `customermasuk_username_yangmasukin_fkey` FOREIGN KEY (`username_yangmasukin`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `boardId` on table `column` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `column` MODIFY `boardId` VARCHAR(191) NOT NULL;

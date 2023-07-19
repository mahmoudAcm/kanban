/*
  Warnings:

  - Made the column `taskId` on table `subtask` required. This step will fail if there are existing NULL values in that column.
  - Made the column `columnId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `subtask` MODIFY `taskId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `columnId` VARCHAR(191) NOT NULL;

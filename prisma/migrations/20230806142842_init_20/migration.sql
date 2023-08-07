/*
  Warnings:

  - Added the required column `userId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SubTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `column` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subtask` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

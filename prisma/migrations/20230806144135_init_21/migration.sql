-- AlterTable
ALTER TABLE `board` ALTER COLUMN `userId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `column` ALTER COLUMN `userId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `subtask` ALTER COLUMN `userId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `task` ALTER COLUMN `userId` DROP DEFAULT;

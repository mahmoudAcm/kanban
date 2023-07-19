-- AlterTable
ALTER TABLE `subtask` MODIFY `isCompleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `task` MODIFY `description` LONGTEXT NULL;

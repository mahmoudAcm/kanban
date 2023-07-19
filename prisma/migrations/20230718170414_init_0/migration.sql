/*
  Warnings:

  - You are about to drop the `boards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `boards`;

-- CreateTable
CREATE TABLE `Board` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Board_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Column` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `boardId` VARCHAR(191) NULL,

    UNIQUE INDEX `Column_id_key`(`id`),
    INDEX `Column_boardId_idx`(`boardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `columnId` VARCHAR(191) NULL,

    UNIQUE INDEX `Task_id_key`(`id`),
    INDEX `Task_columnId_idx`(`columnId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubTask` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,
    `taskId` VARCHAR(191) NULL,

    UNIQUE INDEX `SubTask_id_key`(`id`),
    INDEX `SubTask_taskId_idx`(`taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

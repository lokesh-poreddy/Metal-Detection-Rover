-- CreateTable
CREATE TABLE `RoverStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `direction` VARCHAR(10) NULL,
    `batteryLevel` INTEGER NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SensorData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roverId` INTEGER NOT NULL,
    `lidarData` TEXT NULL,
    `metalDetected` BOOLEAN NOT NULL DEFAULT false,
    `metalType` VARCHAR(50) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetalDetectionLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `metalType` VARCHAR(50) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SensorData` ADD CONSTRAINT `SensorData_roverId_fkey` FOREIGN KEY (`roverId`) REFERENCES `RoverStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

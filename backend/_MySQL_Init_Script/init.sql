

CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `Users` (
    `Id` VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    `Username` VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    `Email` VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    `Password` VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    `Role` VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `RefreshTokens` (
    `Id` VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    `UserId` VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    `Value` VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_RefreshTokens` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_RefreshTokens_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_RefreshTokens_UserId` ON `RefreshTokens` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20220628021101_InitialCreation', '6.0.5');

COMMIT;



-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema descomplica_med
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema descomplica_med
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `descomplica_med` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `descomplica_med` ;

-- -----------------------------------------------------
-- Table `descomplica_med`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `descomplica_med`.`users` (
  `cpf` CHAR(11) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `descomplica_med`.`chat_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `descomplica_med`.`chat_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender` VARCHAR(50) NOT NULL,
  `message_text` TEXT NULL DEFAULT NULL,
  `file_path` VARCHAR(255) NULL DEFAULT NULL,
  `message_type` ENUM('text', 'file') NOT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `user_cpf` CHAR(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_cpf` (`user_cpf` ASC) VISIBLE,
  CONSTRAINT `chat_history_ibfk_1`
    FOREIGN KEY (`user_cpf`)
    REFERENCES `descomplica_med`.`users` (`cpf`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for diena_parfum
CREATE DATABASE IF NOT EXISTS `diena_parfum` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `diena_parfum`;

-- Dumping structure for table diena_parfum.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.cache: ~2 rows (approximately)
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('laravel-cache-da4b9237bacccdf19c0760cab7aec4a8359010b0', 'i:1;', 1778266319),
	('laravel-cache-da4b9237bacccdf19c0760cab7aec4a8359010b0:timer', 'i:1778266319;', 1778266319);

-- Dumping structure for table diena_parfum.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.cache_locks: ~0 rows (approximately)

-- Dumping structure for table diena_parfum.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table diena_parfum.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.jobs: ~0 rows (approximately)

-- Dumping structure for table diena_parfum.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.job_batches: ~0 rows (approximately)

-- Dumping structure for table diena_parfum.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.migrations: ~4 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(45, '0001_01_01_000000_create_users_table', 1),
	(46, '0001_01_01_000001_create_cache_table', 1),
	(47, '0001_01_01_000002_create_jobs_table', 1),
	(48, '2026_05_08_130333_create_products_table', 1);

-- Dumping structure for table diena_parfum.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table diena_parfum.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.products: ~30 rows (approximately)
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `stock`, `category`, `created_at`, `updated_at`) VALUES
	(1, 'Diena Parfume | Orchid & Midnight Jasmine', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Oud with base notes of Oud for a truly unique and unforgettable experience.', 3400000, '/images/elysian_scent.png', 23, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(2, 'Diena Parfume | Ancient Agarwood', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Tonka Bean with base notes of Bergamot for a truly unique and unforgettable experience.', 2300000, '/images/oud_imperial.png', 7, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(3, 'Diena Parfume | Amber & Black Pepper', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Jasmine with base notes of Musk for a truly unique and unforgettable experience.', 5200000, '/images/midnight_rose.png', 7, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(4, 'Diena Parfume | Sandalwood & Cacao', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Cardamom for a truly unique and unforgettable experience.', 5000000, '/images/santal_majuscule.png', 20, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(5, 'Diena Parfume | Silver Reflections', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Neroli with base notes of Cardamom for a truly unique and unforgettable experience.', 4200000, '/images/noir_crystal.png', 24, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(6, 'Diena Parfume | Carrara Legacy', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Oud with base notes of Patchouli for a truly unique and unforgettable experience.', 2400000, '/images/royal_gold.png', 8, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(7, 'Diena Parfume | Crimson Silk', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Ylang-Ylang with base notes of Leather for a truly unique and unforgettable experience.', 1900000, '/images/rose_velvet.png', 8, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(8, 'Diena Parfume | Morning Stone', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Neroli with base notes of Rose for a truly unique and unforgettable experience.', 3400000, '/images/ocean_breeze.png', 22, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(9, 'Diena Parfume | Misty Emerald', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Sandalwood with base notes of Rose for a truly unique and unforgettable experience.', 3600000, '/images/forest_essence.png', 24, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(10, 'Diena Parfume | Teardrop Horizon', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Neroli with base notes of Rose for a truly unique and unforgettable experience.', 4400000, '/images/amber_sun.png', 16, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(11, 'Diena Parfume | Violet Lavender', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Neroli for a truly unique and unforgettable experience.', 1800000, '/images/midnight_lavender.png', 25, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(12, 'Diena Parfume | Imperial Elixir', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Tonka Bean with base notes of Sandalwood for a truly unique and unforgettable experience.', 2800000, '/images/elysian_scent.png', 19, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(13, 'Diena Parfume | Celestial Aura', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Neroli with base notes of Bergamot for a truly unique and unforgettable experience.', 5300000, '/images/oud_imperial.png', 10, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(14, 'Diena Parfume | Velvet Soul', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Sandalwood with base notes of Oud for a truly unique and unforgettable experience.', 4500000, '/images/midnight_rose.png', 16, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(15, 'Diena Parfume | Divine Dreams', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Musk with base notes of Sandalwood for a truly unique and unforgettable experience.', 5200000, '/images/santal_majuscule.png', 16, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(16, 'Diena Parfume | Radiant Spirit', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Vetiver for a truly unique and unforgettable experience.', 4600000, '/images/noir_crystal.png', 8, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(17, 'Diena Parfume | Sacred Grace', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Ylang-Ylang with base notes of Ylang-Ylang for a truly unique and unforgettable experience.', 5300000, '/images/royal_gold.png', 7, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(18, 'Diena Parfume | Infinite Light', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Sandalwood with base notes of Leather for a truly unique and unforgettable experience.', 4100000, '/images/rose_velvet.png', 12, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(19, 'Diena Parfume | Royal Scent', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Vetiver with base notes of Jasmine for a truly unique and unforgettable experience.', 2500000, '/images/ocean_breeze.png', 10, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(20, 'Diena Parfume | Pure Mist', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Tonka Bean for a truly unique and unforgettable experience.', 4100000, '/images/forest_essence.png', 9, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(21, 'Diena Parfume | Midnight Glow', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Neroli with base notes of Rose for a truly unique and unforgettable experience.', 5000000, '/images/amber_sun.png', 25, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(22, 'Diena Parfume | Golden Heart', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Tonka Bean for a truly unique and unforgettable experience.', 3300000, '/images/midnight_lavender.png', 5, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(23, 'Diena Parfume | Mystic Essence', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Vanilla with base notes of Neroli for a truly unique and unforgettable experience.', 6000000, '/images/elysian_scent.png', 13, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(24, 'Diena Parfume | Bergamot Noir', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Cardamom with base notes of Sandalwood for a truly unique and unforgettable experience.', 3500000, '/images/oud_imperial.png', 12, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(25, 'Diena Parfume | Neroli Bloom', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Musk with base notes of Bergamot for a truly unique and unforgettable experience.', 5500000, '/images/midnight_rose.png', 7, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(26, 'Diena Parfume | Vetiver Smoke', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Patchouli with base notes of Tonka Bean for a truly unique and unforgettable experience.', 5300000, '/images/santal_majuscule.png', 12, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(27, 'Diena Parfume | Cardamom Spice', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Leather with base notes of Patchouli for a truly unique and unforgettable experience.', 5500000, '/images/noir_crystal.png', 23, 'vanilla', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(28, 'Diena Parfume | Tonka Vanilla', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Tonka Bean with base notes of Jasmine for a truly unique and unforgettable experience.', 3800000, '/images/royal_gold.png', 24, 'sweet', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(29, 'Diena Parfume | Leather Oud', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Ylang-Ylang with base notes of Tonka Bean for a truly unique and unforgettable experience.', 4100000, '/images/rose_velvet.png', 6, 'strong', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(30, 'Diena Parfume | Rose Absolute', 'A masterfully crafted signature scent by Diena Parfume, blending top notes of Oud with base notes of Bergamot for a truly unique and unforgettable experience.', 5900000, '/images/ocean_breeze.png', 18, 'vanilla', '2026-05-08 08:46:52', '2026-05-08 08:46:52');

-- Dumping structure for table diena_parfum.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.sessions: ~8 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('0m9nMJ3tGA2nJHKbcztNbN9s60dW70RZsHa1p7va', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI3eERBYWpzY1VqMFJjODdnUHF3NDhzb2pMa3N6enVoWVFDYlBqaFE1IiwidXJsIjpbXSwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoyLCJwYXNzd29yZF9oYXNoX3dlYiI6IjAxOWMwMmJiMDhhY2IyOGQ3ODU5ZjllYTIzNGM4ZWNiN2RhMmU2MTRlYWMwYmE1ZjYwY2QzMDFmMmM4NTEwMTkiLCJ0YWJsZXMiOnsiOGZhYzZlYjFjZWMyNjgwM2IzZjdmYjQ0MGEyNzExMWJfY29sdW1ucyI6W3sidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJpbWFnZSIsImxhYmVsIjoiRm90byIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJuYW1lIiwibGFiZWwiOiJOYW1hIEFyb21hIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InByaWNlIiwibGFiZWwiOiJIYXJnYSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJzdG9jayIsImxhYmVsIjoiU3RvayIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJjYXRlZ29yeSIsImxhYmVsIjoiS2F0ZWdvcmkiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiVGVyZGFmdGFyIFBhZGEiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6ZmFsc2UsImlzVG9nZ2xlYWJsZSI6dHJ1ZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0Ijp0cnVlfV19fQ==', 1778261348),
	('2bxnAmsKC0Xagvkm4m53u8eitATnOQCDmNM6VHV3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJOZk45dlBaNW9xRXAwZGprelZoczhNSVNRNGppWFJWV0JVS0xhT3ljIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1781190781),
	('5wPBB2UCUdhI672kCdzJ6HIcSaqUu66S2huq7gcZ', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJDSERzNnFMVWdxWjhXRDh3Q0ptTkpZYmtMeGR1YTQ2MVBtOE9jOVRwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hZG1pblwvcHJvZHVjdHMiLCJyb3V0ZSI6ImZpbGFtZW50LmFkbWluLnJlc291cmNlcy5wcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoyLCJwYXNzd29yZF9oYXNoX3dlYiI6IjAxOWMwMmJiMDhhY2IyOGQ3ODU5ZjllYTIzNGM4ZWNiN2RhMmU2MTRlYWMwYmE1ZjYwY2QzMDFmMmM4NTEwMTkiLCJ0YWJsZXMiOnsiOGZhYzZlYjFjZWMyNjgwM2IzZjdmYjQ0MGEyNzExMWJfY29sdW1ucyI6W3sidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJpbWFnZSIsImxhYmVsIjoiRm90byIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJuYW1lIiwibGFiZWwiOiJOYW1hIEFyb21hIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InByaWNlIiwibGFiZWwiOiJIYXJnYSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJzdG9jayIsImxhYmVsIjoiU3RvayIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJjYXRlZ29yeSIsImxhYmVsIjoiS2F0ZWdvcmkiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiVGVyZGFmdGFyIFBhZGEiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6ZmFsc2UsImlzVG9nZ2xlYWJsZSI6dHJ1ZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0Ijp0cnVlfV19fQ==', 1778261125),
	('6gwSDjaIzVMvFP1Eni2eXkDINqIRLKpAmh1MUF2U', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.119.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJoY1Q5U1p0bk9VRjJ2bXJtM1JFSzZmcWVPMzBMeEh0ZnZaMkg2MHVKIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1778681569),
	('JlizzTu4rSBIAiJDWWqWjPD4Admn6cP4PG1PoPHc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJteXVwVXRiY2dHeUNtcXRyd1FQczZzOTFKZGVpZlVmdHEyWWFFWmhmIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1780646082),
	('Mbsm9jARcVtEXqwSVpFLMkz2bpAAakXRQo9IBqUi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.120.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'eyJfdG9rZW4iOiJmSk5nMklubVBtR3ZzZUFrNFFmcU1IQld1Z2tDYXBYUTRGalhKcHBkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1781191942),
	('S8KNqeJc8cRfRDTQbRLXVFznxIUOhkVBtL0sUDlu', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ6UE5sa1JXdW8wNEY0VkJQVnNmOXJwUHVMb2VPRG9rMU53RkZqcEd5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sInVybCI6W10sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoyLCJwYXNzd29yZF9oYXNoX3dlYiI6IjAxOWMwMmJiMDhhY2IyOGQ3ODU5ZjllYTIzNGM4ZWNiN2RhMmU2MTRlYWMwYmE1ZjYwY2QzMDFmMmM4NTEwMTkiLCJ0YWJsZXMiOnsiOGZhYzZlYjFjZWMyNjgwM2IzZjdmYjQ0MGEyNzExMWJfY29sdW1ucyI6W3sidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJpbWFnZSIsImxhYmVsIjoiRm90byIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJuYW1lIiwibGFiZWwiOiJOYW1hIEFyb21hIiwiaXNIaWRkZW4iOmZhbHNlLCJpc1RvZ2dsZWQiOnRydWUsImlzVG9nZ2xlYWJsZSI6ZmFsc2UsImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI6bnVsbH0seyJ0eXBlIjoiY29sdW1uIiwibmFtZSI6InByaWNlIiwibGFiZWwiOiJIYXJnYSIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJzdG9jayIsImxhYmVsIjoiU3RvayIsImlzSGlkZGVuIjpmYWxzZSwiaXNUb2dnbGVkIjp0cnVlLCJpc1RvZ2dsZWFibGUiOmZhbHNlLCJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiOm51bGx9LHsidHlwZSI6ImNvbHVtbiIsIm5hbWUiOiJjYXRlZ29yeSIsImxhYmVsIjoiS2F0ZWdvcmkiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6dHJ1ZSwiaXNUb2dnbGVhYmxlIjpmYWxzZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjpudWxsfSx7InR5cGUiOiJjb2x1bW4iLCJuYW1lIjoiY3JlYXRlZF9hdCIsImxhYmVsIjoiVGVyZGFmdGFyIFBhZGEiLCJpc0hpZGRlbiI6ZmFsc2UsImlzVG9nZ2xlZCI6ZmFsc2UsImlzVG9nZ2xlYWJsZSI6dHJ1ZSwiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0Ijp0cnVlfV19LCJmaWxhbWVudCI6W119', 1778268100),
	('WEhUd0BIkcmM5sXsTYL44wEP7DnIKY19ZyqZjW5J', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJFd0Nwa1VrcUhXVDJ1NmNQeFM0c2JqSjk1eGg0NkZQaFdPT1N0dVJxIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoyfQ==', 1778681657);

-- Dumping structure for table diena_parfum.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table diena_parfum.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Test User', 'test@example.com', '2026-05-08 08:46:51', '$2y$12$g7/u/YX.1.qt659aGmwxt.NxpG9.txWCQpgrRahHxRnlCNQ0BDcAe', 'LevKCQIKDf', '2026-05-08 08:46:51', '2026-05-08 08:46:51'),
	(2, 'Admin', 'admin@dienaparfum.com', NULL, '$2y$12$fk1xaVBGGXBAa5MeJxhk1..PVb5YuzqSsdCQwd5wN.vHBx.Tl10hq', NULL, '2026-05-08 09:42:54', '2026-05-08 09:42:54');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

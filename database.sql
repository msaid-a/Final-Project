-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: workManage
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `divisi`
--

DROP TABLE IF EXISTS `divisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisi` (
  `id` varchar(50) NOT NULL,
  `divisi` varchar(20) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `divisi_UNIQUE` (`divisi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisi`
--

LOCK TABLES `divisi` WRITE;
/*!40000 ALTER TABLE `divisi` DISABLE KEYS */;
INSERT INTO `divisi` VALUES ('1EkZ6lozLBOwfIsQqzKX','admin',0),('6dESnbqT4gFCT3Ht4sc0','Marketing',0),('9GflUPbEZZ6ARbnsvbSN','gfaga',1),('9TIqpj61qjJHKX7IBKRS','Aplikasi',0),('jIYanCvI2p7aJdufloMX','Content',0),('l3JYUok4c2OzcUk2EyZ3','',1),('mkOyYj3ouTmybsOxttqU','asdasc',1),('OdxlEIhTDCQSv1jVyVdK','Musician',0),('QDSCs8nGyzZbinUzsHfB','Help Desk',1),('TROseGlTJBedQanHpUfX','Networking',0),('utmGBMIMqvbaFCNIhrAo','IT Support',1),('VbXRED2EPlqCFLyHnyxF','haha',1),('X7gSj6KRpnAC7nBKw9Ut','asdasd',1);
/*!40000 ALTER TABLE `divisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gaji`
--

DROP TABLE IF EXISTS `gaji`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gaji` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(30) DEFAULT NULL,
  `bulan` varchar(20) DEFAULT NULL,
  `tahun` varchar(20) DEFAULT NULL,
  `gaji` int(20) DEFAULT NULL,
  `tunjanganKeluarga` int(20) DEFAULT NULL,
  `tunjanganTransportasi` int(20) DEFAULT NULL,
  `bonus` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userId` (`user_id`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`user_id`) REFERENCES `karyawan` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gaji`
--

LOCK TABLES `gaji` WRITE;
/*!40000 ALTER TABLE `gaji` DISABLE KEYS */;
INSERT INTO `gaji` VALUES ('0RENfqPjWjKRA47a3baB','QNxeVoQpA34adxC4v0f0','Januari','2019',100000000,100000000,100000000,100000000),('6uLZ9lBvxoj5V6xWTwnc','hl9kC7xqGEG2nfqb5Mhx','Januari','20220',1000000,100000,1000000,1000000),('7LpoUU7ySABlj4DlF2lm','u6Yfxe0wPwn4k4EHidhp','Januari','2020',100000,100000,200000,100000),('AKr9eJBoledfELD64g7h','QNxeVoQpA34adxC4v0f0','Januari','2013',2000000,2000000,2000000,2000000),('JmXHA4zXnJJe3u5iDtCF','WdSp5uqzKFvE5OklyXvv','Januari','2020',10000,10000,10000,10000),('jS0pbR56iPP3sA1KiDZ0','vTLNMndkUJ7apQIBZMsq','Januari','2019',2000000,2000000,2000000,2000000),('MGIb9S8Wu67WxrMo91Sb','Oxgnnu78VeEiKRQj1iP4','Januari','2020',10000000,1000000,1000000,1000000),('nYoR9tFnjhu47BxAWnEe','hl9kC7xqGEG2nfqb5Mhx','Januari','2020',20000,20000,20000,20000);
/*!40000 ALTER TABLE `gaji` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `description` varchar(75) DEFAULT NULL,
  `divisi` varchar(30) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_history_1_idx` (`user_id`),
  CONSTRAINT `fk_history_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES ('0AIsQTcvmXLZIbwS9QNp','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul asdasda',NULL,'2019-11-21 16:20:49'),('0G5D9FRvazZOy8KPVmuC','zxtmS6jM8vIHukvQw7Fs','merevisi pada judul 123123','Aplikasi','2019-11-26 16:39:05'),('12n7plQ1Wco7Ra0YjDUK','Wp2g1ld0hkZkpj0R1qNg','Telah memberi Tugas kepada el','Musician','2019-11-28 10:28:32'),('1LcRa81ZXm5Se7qfWJWI','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul asdasda',NULL,'2019-11-21 16:23:34'),('2YcbZgnx1BGMkYMDL5uH','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul Roter','Networking','2019-11-21 16:23:16'),('3yfOFpRdL0GBjxH3n8mI','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  asdasdsa','admin','2019-11-27 19:10:05'),('4aPxX8i4uWBVk1i6hRQC','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Network Engineer','admin','2019-11-21 15:38:09'),('4FKIxd5vWku2igIWKK1e','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Gitaris','admin','2019-11-28 10:08:13'),('4jQWeZgTQNC8K7GfA4vV','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul Server','Networking','2019-11-21 16:19:03'),('5JInmSMtdoy6L43xo5ti','Wp2g1ld0hkZkpj0R1qNg','merevisi pada judul Tampil di bandung','Musician','2019-11-28 10:29:44'),('5YrDgMSu6C1wah7VACvR','SHbLWxLAmMUwbtGWUqDe','Telah Menghapus Karyawan dengan username renz','admin','2019-11-19 16:01:51'),('6SYJv5CGnWmpzgvJgrhy','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul kjlkjlds','Networking','2019-11-22 15:28:41'),('72odBEsMPjP6T7qAs4oh','zxtmS6jM8vIHukvQw7Fs','merevisi pada judul Halaman Awal','Aplikasi','2019-11-29 10:47:15'),('7MV1TJe8suxKGJMDLYN2','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:07:50'),('871eHXl5lxrkPYzX5YeA','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Front End Developer','admin','2019-11-19 15:43:13'),('8j5jM2V6c7Sq9jgindyC','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada ucup','Networking','2019-11-21 16:15:28'),('8lkUhWRmTCScJLE1rlmV','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username ucup','admin','2019-11-21 15:46:05'),('9BJ61pkuwpWKsXXWav33','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul Server',NULL,'2019-11-21 16:17:44'),('Agbb5q7gwePRdBItWQ2l','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:12:36'),('ARygEg9Rk2C1oGo4F6Ks','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu IT Support','admin','2019-11-21 15:35:56'),('aTrnRk2M1f0NkWdf2aJQ','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu Help Desk','admin','2019-11-21 15:37:48'),('b4jaZO94VQIgvIgxoBVQ','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu asdasc','admin','2019-11-26 16:18:43'),('BeAFHULOJkGgMG2LD43G','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul 23132','Networking','2019-11-21 16:23:18'),('bfIQvZyL8Qp7vFJqHcPm','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username deri','admin','2019-11-28 10:09:18'),('C74L2S6uXyzPFdTzO6qw','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu ','admin','2019-11-28 09:43:32'),('c7au7s0ZSvsAx24sf5n8','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada asep','admin','2019-11-26 16:28:29'),('c7eYNE3UuuUfKvvGZYxM','Ngi2zAv02tf0mHAku1JB','merevisi pada judul asdasda','Networking','2019-11-21 16:23:03'),('cCcl07Y4tMfbDdxvRupB','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username renz','admin','2019-11-19 15:52:02'),('cfVDZc9yraMPu81bIwjb','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu Musician','admin','2019-11-28 10:08:01'),('CuDMQV5u8KmOz31pthI7','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  renz','admin','2019-11-19 16:01:16'),('cv4uyRulHNwIKi020C71','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada asep','admin','2019-11-19 16:02:40'),('CWyo1mhr7TyT8xd5RFAS','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu haha','admin','2019-11-26 16:18:52'),('CYxr2dfxJljyUphIHsll','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Sales','admin','2019-11-26 16:19:38'),('d3IEpJotbe2AqS1sgrdq','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada farel','Networking','2019-11-21 16:15:50'),('d499ET7Hyx6CFDzYhb0p','zxtmS6jM8vIHukvQw7Fs','menyatakan tugas selesai pada judul Makan Malam','Aplikasi','2019-11-19 16:04:51'),('ddiLJutctkvf9ELvZEUB','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada deri','admin','2019-11-28 10:16:29'),('dMILVlB56lR27t9tVE2d','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:07:39'),('dtDPJFPKyN2SQAi5Ya0W','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username elwin','admin','2019-11-22 13:40:48'),('dVdN5GQtR8wTFyowqUMm','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  asdasd','admin','2019-11-27 19:52:51'),('en7DSBf76Dc4hWKqalov','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  renz','admin','2019-11-21 14:24:02'),('eoCD7WdWRunDRVifsu2m','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username dev','admin','2019-11-28 10:10:22'),('FisolAl2gFXo7QgSWkuP','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul kjlkjlds',NULL,'2019-11-21 16:25:13'),('FweAdPMSQanSvDt3LmFC','zxtmS6jM8vIHukvQw7Fs','Telah mengupdate user asep','Aplikasi','2019-11-26 16:39:24'),('g3J1I0eHHgdtbcZEFyQ9','mmj3mt8ZV4xVwojFNc5w','Telah menguload tugas dengan judul Tampil di bandung',NULL,'2019-11-28 10:30:59'),('Gcm4YMKODDItXp4PCNsP','EJxMGKxAZnhSdKx8XRGR','Telah menguload tugas dengan judul 23132',NULL,'2019-11-21 16:19:51'),('GDy9P4Q5TctcSdk5WaZd','yAuarSSaom5iY8zZd2OV','Telah menguload tugas dengan judul Makan Malam',NULL,'2019-11-19 16:07:04'),('gmbxqvGRpbVnKhQ0VMUt','Wp2g1ld0hkZkpj0R1qNg','Telah memberi Tugas kepada ajis','Musician','2019-11-29 14:16:16'),('GUzVx31KY6feJ5S9Qid0','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  said','admin','2019-11-27 19:09:22'),('H8VZQ3vgTY0l2qFB0kys','Wp2g1ld0hkZkpj0R1qNg','Telah memberi Tugas kepada el','Musician','2019-11-29 14:15:53'),('HcGiX8Rsoj0WjElkdmkd','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu Networking','admin','2019-11-21 15:33:14'),('HmNMfVm5ynatj6uqPcVW','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Youtube','admin','2019-11-19 15:46:20'),('HV1MaU6EarI78WTA9vMM','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada ucup','Networking','2019-11-21 16:24:52'),('I97h3IiyqYIqyucsW3WK','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada Ujang','Aplikasi','2019-11-29 11:02:12'),('Ici81mZAkYymWJSDvS5a','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user farel','Networking','2019-11-21 16:07:45'),('Id4sSpEX9J5TjMPyMUDb','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username asdasdsa','admin','2019-11-26 16:36:46'),('iiD63MjgUXL0f1KJHH4H','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username farel','admin','2019-11-21 15:48:24'),('IOpyF3oAzhpW4kkLMaba','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Help Desk','admin','2019-11-21 15:38:00'),('JFdq3qRr3wD1u0WGms5N','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada ucup','Networking','2019-11-21 16:15:59'),('jT3Ohx9uETtRCStsYygO','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada asep','admin','2019-11-28 10:14:14'),('kClvwFHz8N6WMisikWih','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu asdasd','admin','2019-11-26 16:18:46'),('KEQrINfXS4pZq6QiDbV1','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada asep','Aplikasi','2019-11-26 16:39:52'),('kTPgiHPv0ScrMMkKktV8','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Drumer','admin','2019-11-28 10:08:20'),('kwAFr7Qeyn5tLnzR0Vkn','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada komar','admin','2019-11-21 16:02:59'),('KYrwukJBHhQIvRb1kzLN','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu gfaga','admin','2019-11-21 15:39:46'),('l3a1IuK7mEo87aCuEUJe','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu Aplikasi','admin','2019-11-19 15:42:52'),('lE4RsplAo6h992aIog8N','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul asdasda',NULL,'2019-11-21 16:17:53'),('liOS5BkbCqlIGchwmPah','yAuarSSaom5iY8zZd2OV','Telah menguload tugas dengan judul q3123131',NULL,'2019-11-26 16:40:09'),('LlbVbBBbJJ0RM6ERFeNg','zxtmS6jM8vIHukvQw7Fs','menyatakan tugas selesai pada judul Makan Malam','Aplikasi','2019-11-21 15:08:46'),('lrcaBZYzT2JdCfeOADny','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu asdasc','admin','2019-11-26 16:16:05'),('LRHLi26zgHPXJtylvhHe','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada asep','Aplikasi','2019-11-19 16:04:19'),('LW96lucKIVXWHLe8gEUl','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu Help Desk','admin','2019-11-21 15:37:52'),('lyyI7iXrPuWuBK7fRHSD','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Back End Developer','admin','2019-11-19 15:46:28'),('m0im7BRdK6W5o9wInXwn','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username el','admin','2019-11-28 10:11:38'),('MFcWb4it7alTearBe3z3','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada lili','admin','2019-11-27 14:17:11'),('MFhaZtfO91L4NYWveVVE','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada asep','Aplikasi','2019-11-26 16:37:35'),('MKTZD8pOHTeVmUpc2XD3','SHbLWxLAmMUwbtGWUqDe','Telah Menghapus Karyawan dengan username elwin','admin','2019-11-22 15:16:27'),('mkXwNyM2sSV9EoPgj3rb','mmj3mt8ZV4xVwojFNc5w','Telah menguload tugas dengan judul Tampil di bandung',NULL,'2019-11-28 10:29:10'),('Mlsvn4qzPPSUm2shQ3sV','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada lili','admin','2019-11-22 15:18:48'),('NuM6N7anpGR7bL6vUPx4','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:13:35'),('O9rGbAoQpQrFfmCVjoef','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu gfaga','admin','2019-11-21 15:39:41'),('odJ9WrBq52sfuXlQ3MrC','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:05:51'),('oICD1MUimtrPCc9Bzgf5','yAuarSSaom5iY8zZd2OV','Telah menguload tugas dengan judul Halaman Awal',NULL,'2019-11-29 10:46:33'),('OPd1EwWdwPaO5QYZSojl','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul Konfigurasi Cisco ',NULL,'2019-11-22 15:25:30'),('PyuvysnAWidWqvCsEQw1','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada Ujang','Aplikasi','2019-11-29 11:02:58'),('QefytTDX0j9VNwReTLKo','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada farel','Networking','2019-11-21 16:16:05'),('Qjs3Ntk5r0xPzmiYrkGm','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Vocalis','admin','2019-11-28 10:08:26'),('qpPIacee7Pi3W1sG29bH','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu Instagram','admin','2019-11-19 15:46:14'),('QSzumzzN5azSiwU97CKQ','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  ujang','admin','2019-11-29 10:58:53'),('r0Whq3PLXFVqnZjazxpl','Wp2g1ld0hkZkpj0R1qNg','menyatakan tugas selesai pada judul Tampil di bandung','Musician','2019-11-28 10:31:24'),('r16q0tmKF9s1bHqbgR7T','SHbLWxLAmMUwbtGWUqDe','Telah Menghapus Karyawan dengan username msaid-a','admin','2019-11-27 14:09:35'),('rfgQa6oWhPp16cXI4g0M','Ngi2zAv02tf0mHAku1JB','merevisi pada judul asdasda','Networking','2019-11-21 16:19:14'),('rLQ11sOzttyyUDpFDfXJ','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  mamat','admin','2019-11-22 15:21:32'),('rV4UV9iIXb2WKYBcvS1d','SHbLWxLAmMUwbtGWUqDe','Telah mengupdate user reyhan','admin','2019-11-26 16:34:19'),('s2n3ztxnIlx7D9BQULSg','Ngi2zAv02tf0mHAku1JB','Telah memberi Tugas kepada ucup','Networking','2019-11-22 15:23:28'),('SOyat4wJP5WTxwvBhFib','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username ajis','admin','2019-11-28 10:13:20'),('Sp9U1CEuMqYQ1lgZlYSc','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username asdasd','admin','2019-11-27 14:06:06'),('TSRQ7ytcYPFzUHoqixAm','Ngi2zAv02tf0mHAku1JB','Telah mengupdate user komar','Networking','2019-11-21 16:11:48'),('Ubw4dppwGWJj4Lcl9BA0','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul asdasda','Networking','2019-11-21 16:24:30'),('UkjG1OONglueMXmXZ9uY','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username msaid-a','admin','2019-11-27 14:08:46'),('ULaAO6jxVMyIU2Dj7Cd0','Ngi2zAv02tf0mHAku1JB','menyatakan tugas selesai pada judul Konfigurasi Cisco ','Networking','2019-11-22 15:26:28'),('UNd5GqCAMyIGusR0Wlu3','SHbLWxLAmMUwbtGWUqDe','Telah memberi gaji kepada reyhan','admin','2019-11-22 15:17:56'),('UQ2pF9rGQH5hqRZB3paa','SHbLWxLAmMUwbtGWUqDe','telah mengahpus divisi yaitu IT Support','admin','2019-11-21 15:36:04'),('UTHEs1snMrokCZcWqtfV','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username ujang','admin','2019-11-19 15:49:42'),('uYeSRSXjo4N6tV9PWzgz','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username reyhan','admin','2019-11-22 15:00:45'),('vjFdYLmHLf02eDspkkl7','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada asep','Aplikasi','2019-11-29 10:49:53'),('VKk2gtjvmKpb6hKXtUcM','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username mamat','admin','2019-11-19 15:51:22'),('vXybNsg3T2jsKdGsVkml','mmj3mt8ZV4xVwojFNc5w','Telah menguload tugas dengan judul Tampil di bandung',NULL,'2019-11-28 10:29:10'),('WAu24FTI411Zeyun0vQW','zxtmS6jM8vIHukvQw7Fs','merevisi pada judul Makan Malam','Aplikasi','2019-11-19 16:04:44'),('WrhUK4ncksL5Xw8ucQlg','SHbLWxLAmMUwbtGWUqDe','Telah Menghapus Karyawan dengan username renz','admin','2019-11-26 16:28:11'),('x8aPBMHlKdfWMKsEuiig','SHbLWxLAmMUwbtGWUqDe','telah menambahkan subdivisi baru yaitu IT Support','admin','2019-11-21 15:36:14'),('xRPOIWp5HJ1mhHXggK40','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu ','admin','2019-11-28 09:43:25'),('yAS4UrousYUBySX1wDZn','Wp2g1ld0hkZkpj0R1qNg','Telah memberi Tugas kepada dev','Musician','2019-11-29 14:16:05'),('yExO4ywo3kyD9fWv4LIU','zxtmS6jM8vIHukvQw7Fs','menyatakan tugas selesai pada judul 123123','Aplikasi','2019-11-26 16:39:07'),('yFwClt41ecJjJnl4l0yO','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username komar','admin','2019-11-21 15:42:55'),('ymmOMxnsESwwvJrGSAKV','lssG65uyt7agkN8HI2mM','Telah menguload tugas dengan judul Konfigurasi Cisco ',NULL,'2019-11-22 15:25:51'),('YopjzysuKmVCmFw48ImU','SHbLWxLAmMUwbtGWUqDe','telah menambahkan karyawan baru dengan username asep','admin','2019-11-19 15:48:54'),('yv7trqehFZoRmVL8KIQ4','SHbLWxLAmMUwbtGWUqDe','telah menambahkan divisi baru yaitu Content','admin','2019-11-19 15:46:07'),('zgSMq8ACCMvYGEErm7qP','zxtmS6jM8vIHukvQw7Fs','Telah memberi Tugas kepada asep','Aplikasi','2019-11-29 10:42:09'),('ZpOTcRDOzqzP6qiaZ2jS','EJxMGKxAZnhSdKx8XRGR','Telah menguload tugas dengan judul Roter',NULL,'2019-11-21 16:19:44'),('zpTuhYYYUmtz6YmmtOQS','SHbLWxLAmMUwbtGWUqDe','Telah Meng edit profile Karyawan  mamat','admin','2019-11-22 15:21:50');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `karyawan`
--

DROP TABLE IF EXISTS `karyawan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `karyawan` (
  `id` varchar(50) NOT NULL,
  `id_user` varchar(45) NOT NULL,
  `nik` varchar(30) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `gender` enum('Pria','Wanita') NOT NULL,
  `tanggal_lahir` datetime DEFAULT NULL,
  `agama` varchar(20) DEFAULT NULL,
  `pendidikan` varchar(20) NOT NULL,
  `divisi_id` varchar(30) NOT NULL,
  `subdivisi_id` varchar(45) NOT NULL,
  `jabatan` varchar(30) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_karyawan_1_idx` (`id_user`),
  KEY `fk_karyawan_1_idx1` (`divisi_id`),
  KEY `fk_karyawan_1_idx2` (`subdivisi_id`),
  CONSTRAINT `fk_karyawan_1` FOREIGN KEY (`subdivisi_id`) REFERENCES `subDivisi` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_karyawan_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `karyawan_FK` FOREIGN KEY (`divisi_id`) REFERENCES `divisi` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `karyawan`
--

LOCK TABLES `karyawan` WRITE;
/*!40000 ALTER TABLE `karyawan` DISABLE KEYS */;
INSERT INTO `karyawan` VALUES ('3RLAqiucsKsYnMQbPtqB','mmj3mt8ZV4xVwojFNc5w','12313212','el','Pria','1998-02-09 07:00:00','Kristen','S1','OdxlEIhTDCQSv1jVyVdK','ndEGZyohvM9xOMCZ4kax','Karyawan','879879817223','default_avatar.png',0),('5Taa14YEzblTFfEVnVCY','46ipd96FiZnZmgIYkgZP','34345345123454','dev','Pria','1999-06-27 07:00:00','Islam','S1','OdxlEIhTDCQSv1jVyVdK','ndEGZyohvM9xOMCZ4kax','Karyawan','797986787987','default_avatar.png',0),('7nZf9F5iNk9sUUgWHo7G','bR2e7zCrWqIMsVyRnsgI','32134132','mamat','Pria','2019-10-27 07:00:00','Islam','SMA/SMK','jIYanCvI2p7aJdufloMX','0UMDu1OVHjrxcJMzjV7C','Manager','234455234','default_avatar.png',0),('aSzqWMZPojqdTFEMSjY9','IDiQBoJIulEw74VRg6ei','131232131','asdads','Pria','2019-11-24 07:00:00','Konghuchu','S1','6dESnbqT4gFCT3Ht4sc0','5vA75FEQG7TYMMJcPlYT','Manager','321321321','1574835096107-aSzqWMZPojqdTFEMSjY9-avatar.jpg',0),('dUFMy34HGnlZMjms5LQN','lssG65uyt7agkN8HI2mM','131243141','ucup','Wanita','2019-10-27 07:00:00','Kristen','S1','TROseGlTJBedQanHpUfX','Dfj73r2cBsveeGcXR1xb','Karyawan','8978787123','1574835213257-dUFMy34HGnlZMjms5LQN-avatar.png',0),('hl9kC7xqGEG2nfqb5Mhx','zxtmS6jM8vIHukvQw7Fs','1313123','asep','Pria','2001-02-01 07:00:00','Islam','S2','9TIqpj61qjJHKX7IBKRS','yxhMjY5aOcvGI0HE0s5I','Manager','876235165213','default_avatar.png',0),('k2wfuBKJXQXbD9RMNHxp','EJxMGKxAZnhSdKx8XRGR','3213432424','farel','Pria','2019-10-27 07:00:00','Budha','S2','TROseGlTJBedQanHpUfX','HDgWBj4pFvCPxAlmoKx5','Karyawan','87873213','default_avatar.png',0),('lx51pScvDOs4XS8hWEJd','ZcwHUGtfXapqzpXTgkNl','1243242','elwin','Pria','2019-11-21 07:00:00','Kristen','S1','jIYanCvI2p7aJdufloMX','2KotzJ0pHxO0bBdc4kXf','Karyawan','4243234242','default_avatar.png',1),('MdvOo10X8Z1bxTdzn82L','SHbLWxLAmMUwbtGWUqDe','321012390842','said','Pria','2001-04-06 00:00:00','Islam','SMA/SMK','1EkZ6lozLBOwfIsQqzKX','ip98ET1iZZczqjA7huqp','admin','undefined','default_avatar.png',0),('Oxgnnu78VeEiKRQj1iP4','Wp2g1ld0hkZkpj0R1qNg','1243454125346','deri','Pria','1999-02-26 07:00:00','Islam','S1','OdxlEIhTDCQSv1jVyVdK','tUA86AiZgL0516gf2r4G','Manager','8787283768712','default_avatar.png',0),('QNxeVoQpA34adxC4v0f0','3ZDqqOVPK0SR4ti8rdU4','12312321312','lili','Pria','2019-11-23 07:00:00','Hindu','S3','jIYanCvI2p7aJdufloMX','0UMDu1OVHjrxcJMzjV7C','Manager','2141232313123','default_avatar.png',0),('S3mdbhOCwUw2CA4oTgrs','Ny4EV7HJ0ztVT4ZKAMlx','32134132','renz','Pria','2019-10-27 07:00:00','Islam','S2','jIYanCvI2p7aJdufloMX','2KotzJ0pHxO0bBdc4kXf','Karyawan','234455234','1574153738213-S3mdbhOCwUw2CA4oTgrs-avatar.jpg',1),('u6Yfxe0wPwn4k4EHidhp','Ngi2zAv02tf0mHAku1JB','3123113131322','komar','Pria','2002-02-20 07:00:00','Islam','SMA/SMK','TROseGlTJBedQanHpUfX','keirr0iHA5lONb7EcqtP','Manager','123124123','1574327142857-u6Yfxe0wPwn4k4EHidhp-avatar.png',0),('vTLNMndkUJ7apQIBZMsq','zi38MqJWdPlYXjROX8gm','12313221231313','reyhan','Pria','2019-10-27 07:00:00','Islam','S2','jIYanCvI2p7aJdufloMX','0UMDu1OVHjrxcJMzjV7C','Manager','2313123','1574760550779-vTLNMndkUJ7apQIBZMsq-avatar.jpg',0),('WdSp5uqzKFvE5OklyXvv','yAuarSSaom5iY8zZd2OV','123321123','Ujang','Pria','2001-02-01 07:00:00','Islam','SMA/SMK','9TIqpj61qjJHKX7IBKRS','djhKglHLvsbSOmqF2izP','Karyawan','876235165213','default_avatar.png',0),('wruDmc0TXgq4oNRemnAA','6467QxveqgVBaWc3WZm5','321313132131321','Muhammad Said Arrafi','Pria','2001-04-06 07:00:00','Islam','SMA/SMK','9TIqpj61qjJHKX7IBKRS','yxhMjY5aOcvGI0HE0s5I','Manager','87825131005','default_avatar.png',1),('x9Qck3k3xUVNsYQn18Jn','egp3FSREDgQ1dAKJIVuf','1321231','asdads','Pria','2008-09-02 07:00:00','Islam','SMA/SMK','jIYanCvI2p7aJdufloMX','kZOU41WKLGMVNaBmW5CZ','Karyawan','1321313213','default_avatar.png',0),('YYpgFVRwtXYWE7hr6zcY','65DKf5Nrf6W9YAmJRBqI','13187236871','ajis','Pria','2001-02-02 07:00:00','Islam','SMA/SMK','OdxlEIhTDCQSv1jVyVdK','Ui4LRSjDjrmYL4RWE511','Karyawan','89787298273','default_avatar.png',0);
/*!40000 ALTER TABLE `karyawan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subDivisi`
--

DROP TABLE IF EXISTS `subDivisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subDivisi` (
  `id` varchar(50) NOT NULL,
  `subDivisi` varchar(30) DEFAULT NULL,
  `divisi_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_divisiId` (`divisi_id`),
  CONSTRAINT `FK_divisiId` FOREIGN KEY (`divisi_id`) REFERENCES `divisi` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subDivisi`
--

LOCK TABLES `subDivisi` WRITE;
/*!40000 ALTER TABLE `subDivisi` DISABLE KEYS */;
INSERT INTO `subDivisi` VALUES ('0UMDu1OVHjrxcJMzjV7C','Manager Content','jIYanCvI2p7aJdufloMX'),('2KotzJ0pHxO0bBdc4kXf','Instagram','jIYanCvI2p7aJdufloMX'),('5vA75FEQG7TYMMJcPlYT','Manager Marketing','6dESnbqT4gFCT3Ht4sc0'),('8nZf16WUHt7FQCY4TAy8','Manager Help Desk','QDSCs8nGyzZbinUzsHfB'),('a7LS31BDCcvC8bp8kSDS','Manager IT Support','utmGBMIMqvbaFCNIhrAo'),('BohuF60YR8wH0KE56H74','Manager asdasc','mkOyYj3ouTmybsOxttqU'),('Dfj73r2cBsveeGcXR1xb','IT Support','TROseGlTJBedQanHpUfX'),('djhKglHLvsbSOmqF2izP','Front End Developer','9TIqpj61qjJHKX7IBKRS'),('eayzoccOwa9OdHCc8Nx4','Sales','6dESnbqT4gFCT3Ht4sc0'),('G79wXUhjHa4n3WfIWghy','Drumer','OdxlEIhTDCQSv1jVyVdK'),('h9NUPRjQEbEoyvwMfwN6','Manager gfaga','9GflUPbEZZ6ARbnsvbSN'),('HDgWBj4pFvCPxAlmoKx5','Network Engineer','TROseGlTJBedQanHpUfX'),('HMKb53NQEEwEBb0lJcXu','Manager ','l3JYUok4c2OzcUk2EyZ3'),('ip98ET1iZZczqjA7huqp','admin','1EkZ6lozLBOwfIsQqzKX'),('keirr0iHA5lONb7EcqtP','Manager Networking','TROseGlTJBedQanHpUfX'),('kZOU41WKLGMVNaBmW5CZ','Youtube','jIYanCvI2p7aJdufloMX'),('ndEGZyohvM9xOMCZ4kax','Gitaris','OdxlEIhTDCQSv1jVyVdK'),('OEJ9DEOFFHXzHf2NFsBC','Manager asdasd','X7gSj6KRpnAC7nBKw9Ut'),('tUA86AiZgL0516gf2r4G','Manager Musician','OdxlEIhTDCQSv1jVyVdK'),('UGxf2CuUvfFq7VA20dG8','Help Desk','TROseGlTJBedQanHpUfX'),('Ui4LRSjDjrmYL4RWE511','Vocalis','OdxlEIhTDCQSv1jVyVdK'),('uXafPF0M2L1OrjanDfO8','Back End Developer','9TIqpj61qjJHKX7IBKRS'),('w9hUswNPEcIlvbnmzV0M','Manager haha','VbXRED2EPlqCFLyHnyxF'),('yxhMjY5aOcvGI0HE0s5I','Manager Aplikasi','9TIqpj61qjJHKX7IBKRS');
/*!40000 ALTER TABLE `subDivisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tugas`
--

DROP TABLE IF EXISTS `tugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tugas` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `pengirim` varchar(20) DEFAULT NULL,
  `hasil` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userId_2` (`user_id`),
  CONSTRAINT `FK_userId_2` FOREIGN KEY (`user_id`) REFERENCES `karyawan` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tugas`
--

LOCK TABLES `tugas` WRITE;
/*!40000 ALTER TABLE `tugas` DISABLE KEYS */;
INSERT INTO `tugas` VALUES ('1hiPKBGMIo8cg3BzmOoZ','YYpgFVRwtXYWE7hr6zcY','Music 3','Music 3','2019-12-07 07:00:00','deri','','Belum di kumpulkan'),('A8ntlvxpyDWe754WS8BF','dUFMy34HGnlZMjms5LQN','Server','Kerjakan server untuk client Purwadhika','2019-11-23 07:00:00','komar','1574327864481-A8ntlvxpyDWe754WS8BF-hasil.pdf','Selesai'),('Bxqdy05mfd7ZXn9Yf6c6','WdSp5uqzKFvE5OklyXvv','123123','asdads','2019-10-31 00:00:00','asep','','Selesai'),('CwcP8bgWtPhW2rCX5EVp','WdSp5uqzKFvE5OklyXvv','From','Kerjakan From ','2019-11-30 07:00:00','asep','','Belum di kumpulkan'),('EcJ4IvLTSe1UjAdwSrip','3RLAqiucsKsYnMQbPtqB','Tampil di bandung','Ulangi dari awal','2019-11-30 00:00:00','deri','1574911859492-EcJ4IvLTSe1UjAdwSrip-hasil.docx','Selesai'),('EgWdwkFmSKDBt9XeZPVB','k2wfuBKJXQXbD9RMNHxp','Roter','konfigurasi Router yang menyambukan Jawa dan Bali','2019-11-23 07:00:00','komar','1574327984019-EgWdwkFmSKDBt9XeZPVB-hasil.pdf','Selesai'),('g7xh8Oy46l2ZxZuA6XTL','WdSp5uqzKFvE5OklyXvv','Makan Malam','asdasd','2019-11-20 00:00:00','asep','1574154423937-g7xh8Oy46l2ZxZuA6XTL-hasil.pdf','Selesai'),('KFrJHTBPrUvplWqbN8ch','WdSp5uqzKFvE5OklyXvv','q3123131','addsa','2019-11-25 07:00:00','asep','1574761209077-KFrJHTBPrUvplWqbN8ch-hasil.zip','Terupload'),('kQiH9CxIpiBMKMHlwsnc','3RLAqiucsKsYnMQbPtqB','Music 1','music 1','2019-11-30 07:00:00','deri','','Belum di kumpulkan'),('nBk66XCtV2raG0rZQ23J','dUFMy34HGnlZMjms5LQN','Konfigurasi Cisco ','tolong konfigurasi cisco yang ada di server dengan no seri c2091','2019-11-23 07:00:00','komar','1574411151376-nBk66XCtV2raG0rZQ23J-hasil.pdf','Selesai'),('Oj71XKVldo4iBCbd2cVW','WdSp5uqzKFvE5OklyXvv','Kejakan Search','search validasi yang ada di halaman utama','2019-11-30 07:00:00','asep','','Belum di kumpulkan'),('op2noJpjBT2tZkkgvKTd','WdSp5uqzKFvE5OklyXvv','E Commers','Terimakasih sudah mengerjakan semoga lancar','2019-11-28 07:00:00','asep','','Terlambat'),('QxNbtbENgyYL0MDfjhYi','5Taa14YEzblTFfEVnVCY','Music 2','Music 2','2019-11-28 07:00:00','deri','','Terlambat'),('TZGJdIScBucMrMPttN3x','k2wfuBKJXQXbD9RMNHxp','23132','123132','2019-11-20 07:00:00','komar','1574327991062-TZGJdIScBucMrMPttN3x-hasil.pdf','Selesai'),('u9srer0p3Gj2xvssyWDn','WdSp5uqzKFvE5OklyXvv','Halaman Awal','Tambahkan dominasi warna merah','2019-12-01 00:00:00','asep','1574999193356-u9srer0p3Gj2xvssyWDn-hasil.zip','REVISI'),('V9vOkOcbFCA0VyGAV1QZ','dUFMy34HGnlZMjms5LQN','kjlkjlds','sdasdad','2019-11-20 07:00:00','komar','1574328312932-V9vOkOcbFCA0VyGAV1QZ-hasil.zip','Selesai'),('x9dG3aVIZug2NKpET5pe','dUFMy34HGnlZMjms5LQN','asdasda','hgjhjghjjh','2019-11-22 00:00:00','komar','1574328214204-x9dG3aVIZug2NKpET5pe-hasil.pdf','Selesai');
/*!40000 ALTER TABLE `tugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(30) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('3ZDqqOVPK0SR4ti8rdU4','lili','lili@gmail.com','$2b$08$zMMVWc5qDB3gOkbt2XZl/OHSEWScozpBCWbnfDKs7XSWGB.wLSn5.',0),('46ipd96FiZnZmgIYkgZP','dev','dev@dev.com','$2b$08$UlgRXd.Xo7pxp0mw0smVoejCimv9L1iSkuFwCelQ1IDeZIOx40K5u',0),('6467QxveqgVBaWc3WZm5','msaid-a','muhammadsaidarrafi@gmail.com','$2b$08$LOAkWcVuQ8cc2Y1DypwQCerJDEGSoYy5puN0HMp3RRuTblXqcLzYG',1),('65DKf5Nrf6W9YAmJRBqI','ajis','ajis@gmail.com','$2b$08$eXqWw81N4io4W5WhFr25G.wo9rw8WxsRucSUZTGWdng4F64BS12uu',0),('bR2e7zCrWqIMsVyRnsgI','mamat','mamat@mamat.com','$2b$08$FYBMUci6o1FaHTloOLzISO2g7K.L6l0ZDM302WqkN8KtmVCsYXikG',0),('egp3FSREDgQ1dAKJIVuf','asdasd','asdd@adsa.com','$2b$08$8UE8FNgzx4eHh5oScXn6wO.UU7avFO2y5BohskbpN.9kmcsiLk8ZK',0),('EJxMGKxAZnhSdKx8XRGR','farel','farel@gmail.com','$2b$08$kbVpOVnxXgP8/21./KPFLe2nfH6NSHOG0626NrF2fkWaycicxbMOy',0),('IDiQBoJIulEw74VRg6ei','asdasdsa','asdsada@asdsa.com','$2b$08$It6Fk0sFzsVjUfSPUKqla.QAPNy/sOxSveDYCXEU6HPTKFstQwysS',0),('lssG65uyt7agkN8HI2mM','ucup','ucup@ucup.com','$2b$08$.qXjAx61K90DnqorweMCdOUwG/CASGiGxPp9MfPKl1645JmoPtPeu',0),('mmj3mt8ZV4xVwojFNc5w','el','el@el.com','$2b$08$.QPDbRbLcrGQ8LfSmsZuUec1wVX7.aadO0ncZfcd6Ei9Fz1KvZ2wG',0),('Ngi2zAv02tf0mHAku1JB','komar','komar@gmail.com','$2b$08$AwdtNCXzro7hZ2UplZESkuFNz63VJniLvo0CLzpMJmc5nHeOKFMiW',0),('Ny4EV7HJ0ztVT4ZKAMlx','renz','renz@mamat.com','$2b$08$nmDGjDI5XrtGLSxrgMXA9exIw1zWQqUZaSg66p621mJobMCWUX/ra',1),('SHbLWxLAmMUwbtGWUqDe','said','said@ujang.com','$2b$08$4qzlsXWK2VGBR8KQGkzU.uOZFw.3HbTlKtZU5Zg66x0Tb/48SjzVm',0),('Wp2g1ld0hkZkpj0R1qNg','deri','deri@gmail.com','$2b$08$aN6cXXlImimF775YfOQRKe/Lr/KTnIRlucIgvbltKAOl.I0Qmvp7.',0),('yAuarSSaom5iY8zZd2OV','ujang','ujang@gmail.com','$2b$08$XsLLq6Wz/e1zB7d8M83bwup6pCF0dYIw7GEs115/camp1qsNe9c2S',0),('ZcwHUGtfXapqzpXTgkNl','elwin','elwin@elwin.com','$2b$08$DYrWw8LA/ELzIU72i/aO0uTKVn/UnMCjzGU5UM4VCjVZ4JflZI2NW',1),('zi38MqJWdPlYXjROX8gm','reyhan','reyhan@gmail.com','$2b$08$9rITNt75gmD0.XjomZR9cuPKWDxVkQJvL/rSX07K8TeppvhvM4VKa',0),('zxtmS6jM8vIHukvQw7Fs','asep','asep@gmail.com','$2b$08$aHQUv4jvrn0Rl9C484boRepN4yqYWNdLHVT2WK62QXd6SzyNJ4Fre',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-30  7:48:03

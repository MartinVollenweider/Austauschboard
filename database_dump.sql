-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2019 at 07:44 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `537449_28_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mb`
--

CREATE TABLE `tbl_mb` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'key field',
  `x` smallint(5) NOT NULL COMMENT 'x position',
  `y` smallint(5) NOT NULL COMMENT 'y position',
  `w` smallint(5) NOT NULL COMMENT 'width',
  `h` smallint(5) NOT NULL COMMENT 'height',
  `rot` smallint(3) NOT NULL COMMENT 'rotation',
  `cont` text COLLATE latin1_general_ci NOT NULL COMMENT 'content'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `tbl_mb`
--

INSERT INTO `tbl_mb` (`id`, `x`, `y`, `w`, `h`, `rot`, `cont`) VALUES
(233, 420, 90, 150, 39, 90, 'bellsprout.gif'),
(234, 715, 35, 270, 189, 90, 'MVC-479L.JPG'),
(235, 130, 150, 150, 39, -90, 'MVC-494L.JPG'),
(236, 1110, 170, 210, 119, 0, 'MVC-477L.JPG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_mb`
--
ALTER TABLE `tbl_mb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_mb`
--
ALTER TABLE `tbl_mb`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'key field', AUTO_INCREMENT=237;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

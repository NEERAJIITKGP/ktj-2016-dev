-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2015 at 02:04 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ktj15db`
--

-- --------------------------------------------------------

--
-- Table structure for table `event_genre`
--

CREATE TABLE IF NOT EXISTS `event_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_genre`
--

INSERT INTO `event_genre` (`id`, `name`, `image`) VALUES
(1, 'Genesis', 'http://ktj.in/static/images/events/genre/42.png'),
(2, 'Quizzard', 'http://ktj.in/static/images/events/genre/43.png'),
(3, 'Conceptualize', 'http://ktj.in/static/images/events/genre/44.png'),
(4, 'Theories N Core', 'http://ktj.in/static/images/events/genre/45.png'),
(5, 'Robotix', 'http://ktj.in/static/images/events/genre/46.png'),
(6, 'Ab-Initio', 'http://ktj.in/static/images/events/genre/47.png'),
(7, 'Strategia', 'http://ktj.in/static/images/events/genre/48.png'),
(8, 'Tech4Fun', 'http://ktj.in/static/images/events/genre/50.png'),
(9, 'IDP', 'http://ktj.in/static/images/events/genre/49.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event_genre`
--
ALTER TABLE `event_genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_genre`
--
ALTER TABLE `event_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

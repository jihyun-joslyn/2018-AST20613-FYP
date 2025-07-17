-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2019 at 01:18 AM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `articleID` varchar(10) NOT NULL,
  `title` text NOT NULL,
  `salesID` varchar(15) NOT NULL,
  `URL` varchar(255) NOT NULL,
  `eventID` varchar(10) NOT NULL,
  `postTime` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  `noPPLread` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`articleID`, `title`, `salesID`, `URL`, `eventID`, `postTime`, `status`, `noPPLread`) VALUES
('1', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', 'apetegreeh', 'npr.org/odio/justo/sollicitudin/ut.jsp', '1', '2018-12-01 13:43:33', 0, 86),
('10', 'Nam tristique tortor eu pede.', 'bagnewf', 'youtu.be/erat/quisque/erat.xml', '2', '2018-12-01 09:07:55', 0, 91),
('11', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', 'bgehrts0', 'adobe.com/in/magna.html', '3', '2018-11-01 21:23:34', 1, 59),
('12', 'Morbi ut odio.', 'bkubasekg', 'utexas.edu/aenean/auctor/gravida/sem.jsp', '4', '2018-12-01 00:04:28', 1, 74),
('13', 'Morbi non quam nec dui luctus rutrum.', 'cmcquillena', 'sina.com.cn/purus/sit/amet.json', '5', '2018-06-14 20:59:12', 0, 74),
('14', 'Aliquam sit amet diam in magna bibendum imperdiet.', 'dbuckiej', 'bbb.org/nisl.png', '6', '2018-11-13 19:33:30', 0, 38),
('15', 'Aenean fermentum.', 'echeetham8', 'phpbb.com/duis/mattis/egestas/metus.png', '7', '2018-11-15 19:21:05', 0, 21),
('16', 'Etiam justo.', 'fgrabert9', 'oracle.com/ultrices/posuere/cubilia/curae/mauris.jsp', '8', '2018-11-21 13:45:28', 0, 74),
('17', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'gfellenor5', 'cnbc.com/pellentesque.jpg', '9', '2018-11-07 20:23:10', 1, 50),
('18', 'Nulla mollis molestie lorem.', 'hmaccorkell1', 'tumblr.com/in/hac.html', '10', '2018-11-14 02:03:16', 0, 92),
('19', 'Ut tellus.', 'apetegreeh', 'bbc.co.uk/felis/donec/semper/sapien/a/libero/nam.html', '1', '2018-11-06 06:04:31', 1, 49),
('2', 'In hac habitasse platea dictumst.', 'bagnewf', 'sun.com/volutpat/quam/pede/lobortis/ligula/sit/amet.png', '2', '2018-10-23 17:22:58', 1, 81),
('20', 'In hac habitasse platea dictumst.', 'bgehrts0', 'flickr.com/integer/tincidunt/ante/vel/ipsum/praesent/blandit.aspx', '3', '2018-09-23 15:16:53', 0, 3),
('3', 'Nulla tempus.', 'bkubasekg', 'census.gov/turpis/donec/posuere/metus/vitae.html', '4', '2018-12-01 00:14:59', 0, 49),
('4', 'Morbi non quam nec dui luctus rutrum.', 'cmcquillena', 'gnu.org/quis/orci/eget/orci/vehicula/condimentum/curabitur.html', '5', '2018-10-14 17:32:47', 0, 40),
('5', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 'dbuckiej', 'state.gov/pede/lobortis/ligula/sit/amet/eleifend/pede.xml', '6', '2018-11-02 08:48:19', 1, 98),
('6', 'Nulla ut erat id mauris vulputate elementum.', 'echeetham8', 'businessweek.com/nulla/eget/eros.json', '7', '2018-09-14 23:45:08', 1, 13),
('7', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 'fgrabert9', 'cargocollective.com/maecenas.xml', '8', '2018-07-24 04:50:46', 1, 12),
('8', 'Nunc purus.', 'gfellenor5', 'dion.ne.jp/aliquam/convallis/nunc/proin.js', '9', '2018-12-01 21:22:57', 1, 29),
('9', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 'hmaccorkell1', 'quantcast.com/sit/amet/sapien/dignissim/vestibulum.jpg', '10', '2018-07-18 06:39:25', 0, 54);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `companyID` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`companyID`, `password`, `companyName`, `website`) VALUES
('cdinisco4', 'dPwl5apwXckN', 'Dabfeed', 'naver.com'),
('dletham8', 'PGLLcfQinN1K', 'BlogXS', 'quantcast.com'),
('elegertonj', '0boq1Q', 'Thoughtbeat', 'amazon.com'),
('eweymontd', 'v2HLra', 'Photospace', 'privacy.gov.au'),
('gchessili', 'xWJFo1', 'Zoomdog', 'exblog.jp');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventID` varchar(10) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `eventDes` text NOT NULL,
  `companyID` varchar(15) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  `resStart` date NOT NULL,
  `resEnd` date NOT NULL,
  `eventCap` int(3) NOT NULL,
  `resLength` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventID`, `eventName`, `location`, `eventDes`, `companyID`, `startDateTime`, `endDateTime`, `resStart`, `resEnd`, `eventCap`, `resLength`) VALUES
('1', 'Transform back-end eyeballs', '472 Becker Center', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'cdinisco4', '2019-01-08 13:00:00', '2019-05-12 17:00:00', '2018-12-03', '2019-03-19', 50, 15),
('10', 'Enable holistic infrastructures', '242 Dawn Point', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'dletham8', '2019-01-20 11:00:00', '2019-02-10 20:00:00', '2018-12-20', '2019-01-19', 30, 30),
('2', 'Scale cross-platform networks', '5 Dwight Parkway', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'elegertonj', '2019-01-25 10:00:00', '2019-02-18 17:45:00', '2018-12-08', '2019-01-20', 50, 15),
('3', 'E-enable cross-platform bandwidth', '8 Old Gate Road', 'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'eweymontd', '2018-12-18 12:00:00', '2019-03-27 17:00:00', '2018-11-20', '2019-01-31', 80, 45),
('4', 'Seize viral web-readiness', '86 Rutledge Drive', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'gchessili', '2019-01-23 12:30:00', '2019-05-01 16:00:00', '2018-12-20', '2019-04-01', 70, 45),
('5', 'Integrate virtual solutions', '724 Declaration Junction', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'cdinisco4', '2019-01-09 11:00:00', '2019-05-17 14:00:00', '2018-12-08', '2019-03-24', 60, 30),
('6', 'Recontextualize cross-platform methodologies', '82 Sauthoff Park', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 'dletham8', '2018-12-20 13:00:00', '2019-06-22 16:00:00', '2018-11-29', '2019-05-19', 80, 60),
('7', 'Target mission-critical action-items', '54 Pepper Wood Junction', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'elegertonj', '2019-01-16 13:00:00', '2019-03-18 19:00:00', '2018-12-21', '2019-02-04', 50, 15),
('8', 'Utilize enterprise e-services', '74 Westerfield Circle', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 'eweymontd', '2018-12-28 15:00:00', '2019-03-30 17:00:00', '2018-11-28', '2019-02-01', 60, 30),
('9', 'Incentivize cross-media experiences', '0751 Loftsgordon Hill', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'gchessili', '2019-01-24 15:00:00', '2019-05-26 13:30:00', '2018-12-11', '2019-04-10', 70, 30);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `resID` varchar(10) NOT NULL,
  `userID` varchar(15) NOT NULL,
  `eventID` varchar(10) NOT NULL,
  `resDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`resID`, `userID`, `eventID`, `resDate`, `startTime`, `endTime`, `status`) VALUES
('1', 'arizzardo8', '10', '2019-02-15', '15:45:00', '16:00:00', 0),
('10', 'jharsnipe9', '1', '2019-02-15', '15:45:00', '16:00:00', 1),
('2', 'asones2', '9', '2019-03-15', '15:00:00', '15:30:00', 0),
('3', 'bjervisd', '8', '2019-01-14', '15:15:00', '15:30:00', 0),
('4', 'bkryzhovi', '7', '2019-01-26', '14:15:00', '14:30:00', 1),
('5', 'btironea', '6', '2019-03-04', '15:00:00', '16:00:00', 1),
('6', 'cguwere', '5', '2018-09-22', '15:00:00', '15:00:00', 1),
('7', 'cshipley5', '4', '2018-12-22', '14:15:00', '15:00:00', 1),
('8', 'ctrill7', '3', '2019-01-31', '16:00:00', '16:15:00', 1),
('9', 'gmacgiany', '2', '2019-01-22', '13:00:00', '13:30:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `salesmen`
--

CREATE TABLE `salesmen` (
  `salesID` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `companyID` varchar(15) NOT NULL,
  `WeChatID` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telNo` varchar(11) NOT NULL,
  `engName` varchar(255) DEFAULT NULL,
  `chiName` varchar(10) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `profileIMG` varchar(255) DEFAULT NULL,
  `QRcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `salesmen`
--

INSERT INTO `salesmen` (`salesID`, `password`, `companyID`, `WeChatID`, `email`, `telNo`, `engName`, `chiName`, `introduction`, `profileIMG`, `QRcode`) VALUES
('apetegreeh', 'QlVphtFU4IR2', 'cdinisco4', 'apetegreeh', 'apetegreeh@is.gd', '49980101170', 'Avis Petegree', '??', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 'http://dummyimage.com/178x203.png/ff4444/ffffff', 'http://localhost:8080/#/salesInfoPage/apetegreeh'),
('bagnewf', 'PVzFLXSO', 'dletham8', 'bagnewf', 'bagnewf@sciencedaily.com', '9725843013', 'Berke Agnew', '??', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'http://dummyimage.com/239x179.bmp/ff4444/ffffff', 'http://localhost:8080/#/salesInfoPage/bagnewf'),
('bgehrts0', 'qaUbH7UfwP', 'elegertonj', 'bgehrts0', 'bgehrts0@vistaprint.com', '3398682404', 'Bat Gehrts', '??', 'Fusce consequat. Nulla nisl. Nunc nisl.', 'http://dummyimage.com/110x188.bmp/5fa2dd/ffffff', 'http://localhost:8080/#/salesInfoPage/bgehrts0'),
('bkubasekg', '8G3yVRE9', 'eweymontd', 'bkubasekg', 'bkubasekg@surveymonkey.com', '7703495664', 'Buddie Kubasek', '??', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'http://dummyimage.com/140x150.jpg/cc0000/ffffff', 'http://localhost:8080/#/salesInfoPage/bkubasekg'),
('cmcquillena', 'rLZNgcVill', 'gchessili', 'cmcquillena', 'cmcquillena@yelp.com', '1085392448', 'Cathleen McQuillen', '??', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'http://dummyimage.com/120x109.jpg/5fa2dd/ffffff', 'http://localhost:8080/#/salesInfoPage/cmcquillena'),
('dbuckiej', 'OQo8hn00dI', 'cdinisco4', 'dbuckiej', 'dbuckiej@sina.com.cn', '4436961295', 'Dominica Buckie', '??', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'http://dummyimage.com/121x249.jpg/5fa2dd/ffffff', 'http://localhost:8080/#/salesInfoPage/dbuckiej'),
('echeetham8', 'GLN2O8YNDhM', 'dletham8', 'echeetham8', 'echeetham8@gov.uk', '6802495051', 'Elvyn Cheetham', '??', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 'http://dummyimage.com/177x130.bmp/dddddd/000000', 'http://localhost:8080/#/salesInfoPage/echeetham8'),
('fgrabert9', 'fzjEnz', 'elegertonj', 'fgrabert9', 'fgrabert9@newsvine.com', '1186414338', 'Fionnula Grabert', '??', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'http://dummyimage.com/236x234.png/ff4444/ffffff', 'http://localhost:8080/#/salesInfoPage/fgrabert9'),
('gfellenor5', 'IVyEc4QfkF', 'eweymontd', 'gfellenor5', 'gfellenor5@soup.io', '7319921550', 'Gabe Fellenor', '??', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 'http://dummyimage.com/170x222.bmp/5fa2dd/ffffff', 'http://localhost:8080/#/salesInfoPage/gfellenor5'),
('hmaccorkell1', 'RI8Buyp', 'gchessili', 'hmaccorkell1', 'hmaccorkell1@yandex.ru', '7535668256', 'Harley MacCorkell', '??', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'http://dummyimage.com/159x142.bmp/5fa2dd/ffffff', 'http://localhost:8080/#/salesInfoPage/hmaccorkell1');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `WeChatID` varchar(255) DEFAULT NULL,
  `engName` varchar(255) DEFAULT NULL,
  `chiName` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `telNo` varchar(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `profileIMG` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `password`, `WeChatID`, `engName`, `chiName`, `telNo`, `email`, `profileIMG`) VALUES
('arizzardo8', 'ppDUWK2Tu', 'arizzardo8', 'Aurelia Rizzardo', '欣妍', '4458386846', 'arizzardo8@princeton.edu', 'http://dummyimage.com/163x212.png/cc0000/ffffff'),
('asones2', '2b7igVBY', 'asones2', 'Allegra Sones', '婧琪', '60013503100', 'asones2@nydailynews.com', 'http://dummyimage.com/231x245.bmp/5fa2dd/ffffff'),
('bjervisd', 'xvLNX1k6xa0f', 'bjervisd', 'Bonnee Jervis', '笑薇', '6759123122', 'bjervisd@arstechnica.com', 'http://dummyimage.com/143x183.bmp/cc0000/ffffff'),
('bkryzhovi', 'qI7XAHz', 'bkryzhovi', 'Bab Kryzhov', '彦军', '3753284635', 'bkryzhovi@yellowbook.com', 'http://dummyimage.com/152x118.png/cc0000/ffffff'),
('btironea', 'JdGyXcLinZnH', 'btironea', 'Beck Tirone', '冠泽', '50784934520', 'btironea@si.edu', 'http://dummyimage.com/211x196.bmp/dddddd/000000'),
('cguwere', 'lWAyfKFoDK', 'cguwere', 'Cece Guwer', '思翰', '9733868924', 'cguwere@cbslocal.com', 'http://dummyimage.com/178x246.jpg/ff4444/ffffff'),
('cshipley5', 'cshddbx', 'cshipley5', 'Colin Shipley', '昕磊', '6828410917', 'cshipley5@hubpages.com', 'http://dummyimage.com/195x102.bmp/ff4444/ffffff'),
('ctrill7', '07MD5w0pCz', 'ctrill7', 'Coleman Trill', '可馨', '8223060709', 'ctrill7@jimdo.com', 'http://dummyimage.com/143x215.jpg/ff4444/ffffff'),
('gmacgianyg', '1kl8tMJJ', 'gmacgianyg', 'Giustino MacGiany', '羽彤', '4064657440', 'gmacgianyg@github.io', 'http://dummyimage.com/177x233.bmp/dddddd/000000'),
('jharsnipe9', 'T4DV6lZ1', 'jharsnipe9', 'Jesselyn Harsnipe', '晓晴', '7544534505', 'jharsnipe9@sina.com.cn', 'http://dummyimage.com/211x122.bmp/5fa2dd/ffffff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`articleID`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`companyID`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`resID`);

--
-- Indexes for table `salesmen`
--
ALTER TABLE `salesmen`
  ADD PRIMARY KEY (`salesID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

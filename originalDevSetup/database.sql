SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema group5
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema group5
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `group5` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema group5
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema group5
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `group5` DEFAULT CHARACTER SET utf8 ;
USE `group5` ;

--
-- Table structure for table `Ban`
--

DROP TABLE IF EXISTS `Ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ban` (
  `BanID` int(11) NOT NULL AUTO_INCREMENT,
  `StudentID` int(11) DEFAULT NULL,
  `ClassID` int(11) DEFAULT NULL,
  `DateBanned` date DEFAULT NULL,
  PRIMARY KEY (`BanID`),
  KEY `fk_Ban_Class1_idx` (`ClassID`),
  KEY `fk_Ban_Student1_idx` (`StudentID`),
  CONSTRAINT `fk_Ban_Class1` FOREIGN KEY (`ClassID`) REFERENCES `class` (`classid`),
  CONSTRAINT `fk_Ban_Student1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Class` (
  `ClassID` int(11) NOT NULL AUTO_INCREMENT,
  `Professor` int(11) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ClassID`),
  KEY `fk_Class_Professor1_idx` (`Professor`),
  CONSTRAINT `fk_Class_Professor1` FOREIGN KEY (`Professor`) REFERENCES `professor` (`professorid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Poll`
--

DROP TABLE IF EXISTS `Poll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Poll` (
  `PollID` int(11) NOT NULL AUTO_INCREMENT,
  `SessionID` int(11) DEFAULT NULL,
  `QuestionText` varchar(100) DEFAULT NULL,
  `Answers` varchar(100) DEFAULT NULL,
  `DateCreated` varchar(45) DEFAULT NULL,
  `IsArchived` tinyint(4) DEFAULT 0,
  `DateArchived` varchar(45) DEFAULT NULL,
  `NumAnswers` int(11) DEFAULT 0,
  `Pollcol` int(11) DEFAULT 0,
  `Answer1` varchar(45) DEFAULT NULL,
  `Answer2` varchar(45) DEFAULT NULL,
  `Answer3` varchar(45) DEFAULT NULL,
  `Answer4` varchar(45) DEFAULT NULL,
  `Answer5` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PollID`),
  KEY `fk_Poll_Session1_idx` (`SessionID`),
  CONSTRAINT `fk_Poll_Session1` FOREIGN KEY (`SessionID`) REFERENCES `session` (`sessionid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Professor`
--

DROP TABLE IF EXISTS `Professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Professor` (
  `professorID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`professorID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Question` (
  `QuestionID` int(11) NOT NULL AUTO_INCREMENT,
  `SessionID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Text` varchar(100) DEFAULT NULL,
  `User` varchar(45) DEFAULT NULL,
  `IsRead` varchar(45) DEFAULT NULL,
  `DateTime` date DEFAULT NULL,
  PRIMARY KEY (`QuestionID`),
  KEY `fk_Question_Session1_idx` (`SessionID`),
  KEY `fk_Question_Student1_idx` (`UserID`),
  CONSTRAINT `fk_Question_Session1` FOREIGN KEY (`SessionID`) REFERENCES `session` (`sessionid`),
  CONSTRAINT `fk_Question_Student1` FOREIGN KEY (`UserID`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Registration`
--

DROP TABLE IF EXISTS `Registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Registration` (
  `RegID` int(11) NOT NULL AUTO_INCREMENT,
  `StudentID` int(11) DEFAULT NULL,
  `ClassID` int(11) DEFAULT NULL,
  `DateJoined` date DEFAULT NULL,
  PRIMARY KEY (`RegID`),
  KEY `fk_Registration_Class1_idx` (`ClassID`),
  KEY `fk_Registration_Student1_idx` (`StudentID`),
  CONSTRAINT `fk_Registration_Class1` FOREIGN KEY (`ClassID`) REFERENCES `class` (`classid`),
  CONSTRAINT `fk_Registration_Student1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Session` (
  `SessionID` int(11) NOT NULL AUTO_INCREMENT,
  `ClassID` int(11) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `DateCreated` varchar(45) DEFAULT NULL,
  `DateArchived` varchar(45) DEFAULT NULL,
  `Archived` int(11) DEFAULT 0,
  PRIMARY KEY (`SessionID`),
  KEY `fk_Session_Class1_idx` (`ClassID`),
  CONSTRAINT `fk_Session_Class1` FOREIGN KEY (`ClassID`) REFERENCES `class` (`classid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `studentID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Vote`
--

DROP TABLE IF EXISTS `Vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vote` (
  `VoteID` int(11) NOT NULL AUTO_INCREMENT,
  `PollID` int(11) DEFAULT NULL,
  `StudentID` int(11) DEFAULT NULL,
  `Answer` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`VoteID`),
  KEY `fk_Vote_Poll1_idx` (`PollID`),
  KEY `fk_Vote_Student1_idx` (`StudentID`),
  CONSTRAINT `fk_Vote_Poll1` FOREIGN KEY (`PollID`) REFERENCES `poll` (`PollID`),
  CONSTRAINT `fk_Vote_Student1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-15 13:18:38

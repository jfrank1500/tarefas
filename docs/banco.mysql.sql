-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: tarefas
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projeto` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'Supermercado'),(2,'Escola'),(3,'Trabalho'),(4,'Saúde');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarefa`
--

DROP TABLE IF EXISTS `tarefa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarefa` (
  `id` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `previsao` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `projeto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f7cb73dd1f620c38b7e0402406` (`usuario_id`),
  KEY `FK_3c71586474c6838dca714de78ab` (`projeto_id`),
  CONSTRAINT `FK_3c71586474c6838dca714de78ab` FOREIGN KEY (`projeto_id`) REFERENCES `projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_3f7cb73dd1f620c38b7e0402406` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefa`
--

LOCK TABLES `tarefa` WRITE;
/*!40000 ALTER TABLE `tarefa` DISABLE KEYS */;
INSERT INTO `tarefa` VALUES (1,'Comprar pizza','2019-05-25',3,1),(2,'Fazer trabalho de história','2019-05-27',4,2),(3,'Fazer trabalho de história','2019-06-20',5,2),(4,'Fazer um checkup','2019-06-28',10,4),(5,'Clarear os dentes','2019-07-10',13,4),(6,'Retirar as manchas da pele','2019-06-27',14,4),(7,'Ver o eclipse solar','2019-07-02',11,2),(8,'Sair de alguma rede social','2019-06-14',4,4),(9,'Brincar com o filho','2019-06-13',4,4),(10,'Tomar um porre','2019-06-17',6,4),(11,'Limpar a área','2019-06-15',10,3),(12,'Levar o filho a escola','2019-06-17',8,2),(13,'Organizar o seu dia','2019-06-19',9,4),(14,'Fazer uma viagem a pé','2019-08-01',3,4),(15,'Saltar de paraquedas','2019-06-14',5,4),(16,'Atualizar seus conhecimentos de ortografia','2019-06-20',7,2),(17,'Começar a estudar um idioma estrangeiro','2019-07-01',9,2),(18,'Poupar um percentual de seus ganhos','2019-06-26',11,3),(19,'Ouvir música','2019-06-28',12,4),(20,'Sair pra dançar','2019-06-30',12,4),(21,'Vender o carro','2019-06-30',13,3),(22,'Escrever um livro','2019-06-27',8,3),(23,'Almoçar com os pais','2019-06-16',12,4);
/*!40000 ALTER TABLE `tarefa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','Administrador','admin','ADMINISTRADOR'),(3,'alfredo','Alfredo','123','USUARIO'),(4,'barbara','Bárbara','123','USUARIO'),(5,'carlos','Carlos','123','USUARIO'),(6,'davi','Davi','123','USUARIO'),(7,'edna','Edna','123','USUARIO'),(8,'fabiola','Fabíola','123','USUARIO'),(9,'geraldo','Geraldo','123','USUARIO'),(10,'hebert','Hebert','123','USUARIO'),(11,'iara','Iara','123','USUARIO'),(12,'jose','José','123','USUARIO'),(13,'kleber','Kléber','123','USUARIO'),(14,'lucio','Lúcio','123','USUARIO');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tarefas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


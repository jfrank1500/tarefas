BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `usuario` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`login`	varchar NOT NULL,
	`nome`	varchar NOT NULL,
	`senha`	varchar NOT NULL,
	`perfil`	varchar NOT NULL
);
INSERT INTO `usuario` (id,login,nome,senha,perfil) VALUES (1,'admin','Administrador','admin','ADMINISTRADOR'),
 (3,'alfredo','Alfredo','123','USUARIO'),
 (4,'barbara','Bárbara','123','USUARIO'),
 (5,'carlos','Carlos','123','USUARIO'),
 (6,'davi','Davi','123','USUARIO'),
 (7,'edna','Edna','123','USUARIO'),
 (8,'fabiola','Fabíola','123','USUARIO'),
 (9,'geraldo','Geraldo','123','USUARIO'),
 (10,'hebert','Hebert','123','USUARIO'),
 (11,'iara','Iara','123','USUARIO'),
 (12,'jose','José','123','USUARIO'),
 (13,'kleber','Kléber','123','USUARIO'),
 (14,'lucio','Lúcio','123','USUARIO');
CREATE TABLE IF NOT EXISTS `tarefa` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`descricao`	varchar NOT NULL,
	`previsao`	varchar,
	`usuario_id`	integer NOT NULL,
	`projeto_id`	integer NOT NULL,
	CONSTRAINT `FK_3f7cb73dd1f620c38b7e0402406` FOREIGN KEY(`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT `FK_3c71586474c6838dca714de78ab` FOREIGN KEY(`projeto_id`) REFERENCES `projeto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `tarefa` (id,descricao,previsao,usuario_id,projeto_id) VALUES (1,'Comprar pizza','2019-05-25',3,1),
 (2,'Fazer trabalho de história','2019-05-27',4,2),
 (3,'Fazer trabalho de história','2019-06-20',5,2),
 (4,'Fazer um checkup','2019-06-28',10,4),
 (5,'Clarear os dentes','2019-07-10',13,4),
 (6,'Retirar as manchas da pele','2019-06-27',14,4),
 (7,'Ver o eclipse solar','2019-07-02',11,2),
 (8,'Sair de alguma rede social','2019-06-14',4,4),
 (9,'Brincar com o filho','2019-06-13',4,4),
 (10,'Tomar um porre','2019-06-17',6,4),
 (11,'Limpar a área','2019-06-15',10,3),
 (12,'Levar o filho a escola','2019-06-17',8,2),
 (13,'Organizar o seu dia','2019-06-19',9,4),
 (14,'Fazer uma viagem a pé','2019-08-01',3,4),
 (15,'Saltar de paraquedas','2019-06-14',5,4),
 (16,'Atualizar seus conhecimentos de ortografia','2019-06-20',7,2),
 (17,'Começar a estudar um idioma estrangeiro','2019-07-01',9,2),
 (18,'Poupar um percentual de seus ganhos','2019-06-26',11,3),
 (19,'Ouvir música','2019-06-28',12,4),
 (20,'Sair pra dançar','2019-06-30',12,4),
 (21,'Vender o carro','2019-06-30',13,3),
 (22,'Escrever um livro','2019-06-27',8,3),
 (23,'Almoçar com os pais','2019-06-16',12,4);
CREATE TABLE IF NOT EXISTS `projeto` (
	`id`	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	`nome`	varchar NOT NULL
);
INSERT INTO `projeto` (id,nome) VALUES (1,'Supermercado'),
 (2,'Escola'),
 (3,'Trabalho'),
 (4,'Saúde');
COMMIT;

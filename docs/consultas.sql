-- Lista de tabelas
SELECT 
    *
FROM
    `INFORMATION_SCHEMA`.`TABLES`
WHERE
    (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'tarefa')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'responsavel')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'usuario');

-- Lista de colunas
SELECT 
    *
FROM
    `INFORMATION_SCHEMA`.`COLUMNS`
WHERE
    (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'tarefa')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'responsavel')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'usuario');

-- Lista de chaves primarias
SELECT 
    *
FROM
    `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE`
WHERE
    `CONSTRAINT_NAME` = 'PRIMARY'
        AND ((`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'tarefa')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'responsavel')
        OR (`TABLE_SCHEMA` = 'todo'
        AND `TABLE_NAME` = 'usuario'));

-- Charset e collation
SELECT 
    `SCHEMA_NAME`,
    `DEFAULT_CHARACTER_SET_NAME` AS `CHARSET`,
    `DEFAULT_COLLATION_NAME` AS `COLLATION`
FROM
    `INFORMATION_SCHEMA`.`SCHEMATA`;
    
-- Estatisticas?
SELECT 
    `s`.*
FROM
    `INFORMATION_SCHEMA`.`STATISTICS` `s`
        LEFT JOIN
    `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `s`.`INDEX_NAME` = `rc`.`CONSTRAINT_NAME`
WHERE
    ((`s`.`TABLE_SCHEMA` = 'todo'
        AND `s`.`TABLE_NAME` = 'tarefa')
        OR (`s`.`TABLE_SCHEMA` = 'todo'
        AND `s`.`TABLE_NAME` = 'responsavel')
        OR (`s`.`TABLE_SCHEMA` = 'todo'
        AND `s`.`TABLE_NAME` = 'usuario'))
        AND `s`.`INDEX_NAME` != 'PRIMARY'
        AND `rc`.`CONSTRAINT_NAME` IS NULL;

-- Relacionamentos entre tabelas (chaves estrangeiras)
SELECT 
    `kcu`.`TABLE_SCHEMA`,
    `kcu`.`TABLE_NAME`,
    `kcu`.`CONSTRAINT_NAME`,
    `kcu`.`COLUMN_NAME`,
    `kcu`.`REFERENCED_TABLE_SCHEMA`,
    `kcu`.`REFERENCED_TABLE_NAME`,
    `kcu`.`REFERENCED_COLUMN_NAME`,
    `rc`.`DELETE_RULE` `ON_DELETE`,
    `rc`.`UPDATE_RULE` `ON_UPDATE`
FROM
    `INFORMATION_SCHEMA`.`KEY_COLUMN_USAGE` `kcu`
        INNER JOIN
    `INFORMATION_SCHEMA`.`REFERENTIAL_CONSTRAINTS` `rc` ON `rc`.`constraint_name` = `kcu`.`constraint_name`
WHERE
    (`kcu`.`TABLE_SCHEMA` = 'todo'
        AND `kcu`.`TABLE_NAME` = 'tarefa')
        OR (`kcu`.`TABLE_SCHEMA` = 'todo'
        AND `kcu`.`TABLE_NAME` = 'responsavel')
        OR (`kcu`.`TABLE_SCHEMA` = 'todo'
        AND `kcu`.`TABLE_NAME` = 'usuario');


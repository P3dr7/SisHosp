CREATE TABLE Funcionario (
    Idade_Funcionario int(3),
    Nome_Funcionario varchar(255),
    Id_funcionario bigint(255) PRIMARY KEY,
    Cargo varchar(255)
);

CREATE TABLE Prontuario (
    Id_Prontuario bigint(255) PRIMARY KEY,
    Horario_Entrada datetime,
    Horario_Saida datetime,
    Receita varchar(255),
    Observacoes varchar(255),
    Pressao_Paciente float(10,2)
);

CREATE TABLE Remedios (
    Id_Remedio bigint(255) PRIMARY KEY,
    Quantidade_Remedio int(4),
    Nome_Remedio varchar(255)
);

CREATE TABLE Paciente (
    Id_Paciente bigint(255) PRIMARY KEY,
    Nome_Paciente varchar(255),
    Peso_Paciente int(3),
    Prontuario varchar(50),
    fk_Prontuario_Id_Prontuario bigint(255)
);

CREATE TABLE Cadastro(
ID bigint(255) PRIMARY KEY,
email varchar(255),
senha varchar(255)
);
 
ALTER TABLE Paciente ADD CONSTRAINT FK_Paciente_2
    FOREIGN KEY (fk_Prontuario_Id_Prontuario)
    REFERENCES Prontuario (Id_Prontuario);
    
CREATE TABLE `app_saude`.`farmaceutico` (
  `fk_cadastro_ID` BIGINT(255) ,
  `fk_funcionario_Id_funcionario` BIGINT(255) ,
  INDEX `fk_cadastro_ID_idx` (`fk_cadastro_ID` ASC) ,
  INDEX `fk_funcionario_Id_funcionario_idx` (`fk_funcionario_Id_funcionario` ASC) ,
  CONSTRAINT `fk_cadastro_ID`
    FOREIGN KEY (`fk_cadastro_ID`)
    REFERENCES `app_saude`.`cadastro` (`ID`),
  CONSTRAINT `fk_funcionario_Id_funcionario`
    FOREIGN KEY (`fk_funcionario_Id_funcionario`)
    REFERENCES `app_saude`.`funcionario` (`Id_funcionario`)
    );
    
CREATE TABLE `app_saude`.`medicos` (
  `fk_medicos_cadastro_ID` BIGINT(255),
  `fk_medicos_funcionario_Id_funcionario` BIGINT(255),
  INDEX `fk_cadastro_ID_idx` (`fk_medicos_cadastro_ID` ASC),
  INDEX `fk_funcionario_Id_funcionairo_idx` (`fk_medicos_funcionario_Id_funcionario` ASC),
  CONSTRAINT `fk_medicos_cadastro_ID`
    FOREIGN KEY (`fk_medicos_cadastro_ID`)
    REFERENCES `app_saude`.`cadastro` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medicos_funcionario_Id_funcionairo`
    FOREIGN KEY (`fk_medicos_funcionario_Id_funcionario`)
    REFERENCES `app_saude`.`funcionario` (`Id_funcionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `app_saude`.`enfermeiro` (
  `fk_enfermeiro_cadastro_ID` BIGINT(255),
  `fk_enfermeiro_funcionario_Id_funcionario` BIGINT(255),
  INDEX `fk_enfermeiro_cadastro_ID_idx` (`fk_enfermeiro_cadastro_ID` ASC),
  INDEX `fk_enfermeiro_funcionario_Id_funcionario_idx` (`fk_enfermeiro_funcionario_Id_funcionario` ASC),
  CONSTRAINT `fk_enfermeiro_cadastro_ID`
    FOREIGN KEY (`fk_enfermeiro_cadastro_ID`)
    REFERENCES `app_saude`.`cadastro` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_enfermeiro_funcionario_Id_funcionario`
    FOREIGN KEY (`fk_enfermeiro_funcionario_Id_funcionario`)
    REFERENCES `app_saude`.`funcionario` (`Id_funcionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    
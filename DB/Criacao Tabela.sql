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
 
ALTER TABLE Paciente ADD CONSTRAINT FK_Paciente_2
    FOREIGN KEY (fk_Prontuario_Id_Prontuario)
    REFERENCES Prontuario (Id_Prontuario);
    
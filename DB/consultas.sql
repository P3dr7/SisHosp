use app_saude;
select * from cadastro;
select * from funcionario;
select * from farmaceutico;
select * from medicos;
select * from enfermeiro;
select * from prontuario;
select * from paciente;
select * from tem;
select * from remedios;
select * from receitas;
select * from funcionario;
select * from login;
delete from remedios;
SET SQL_SAFE_UPDATES = 1;

select Nome_Funcionario from funcionario where Id_funcionario = "67666949978657220";
select fk_enfermeiro_funcionario_Id_funcionario from enfermeiro where fk_enfermeiro_cadastro_ID = "175295524527288300";

select Id_Paciente from paciente where Nome_Paciente = "Pedro";
select Quantidade_Remedio from remedios where Id_Remedio = 499137648962152600;


SELECT cadastro.ID
FROM cadastro
JOIN farmaceutico ON cadastro.ID = farmaceutico.fk_cadastro_ID
UNION
SELECT cadastro.ID
FROM cadastro
JOIN farmaceutico ON cadastro.ID = farmaceutico.fk_cadastro_ID
JOIN funcionario ON farmaceutico.fk_funcionario_Id_funcionario = funcionario.Id_funcionario
WHERE funcionario.Nome_Funcionario = 'Eduardo';

SELECT cadastro.ID
FROM cadastro
JOIN enfermeiro ON cadastro.ID = enfermeiro.fk_enfermeiro_cadastro_ID
JOIN funcionario ON enfermeiro.fk_enfermeiro_funcionario_Id_funcionario = funcionario.Id_funcionario
WHERE funcionario.Nome_Funcionario = 'Pedro';

SELECT cadastro.ID
FROM cadastro
JOIN medicos ON cadastro.ID = medicos.fk_medicos_cadastro_ID
JOIN funcionario ON medicos.fk_medicos_funcionario_Id_funcionario = funcionario.Id_funcionario
WHERE funcionario.Nome_Funcionario = 'Pedro He';

select cadastro.ID from cadastro where email = "Pedro@gmail.com"
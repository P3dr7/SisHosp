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

UPDATE prontuario
SET Horario_Entrada = '2023-11-08 10:21:10'
WHERE Id_Prontuario = 149241024694285630 AND paciente = 'lucas';

select Nome_Funcionario from funcionario where Id_funcionario = "67666949978657220";
select fk_enfermeiro_funcionario_Id_funcionario from enfermeiro where fk_enfermeiro_cadastro_ID = "599283424408822300";

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
WHERE funcionario.Nome_Funcionario = '';

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

select cadastro.ID from cadastro where email = "Pedro@gmail.com";

SELECT cadastro.ID FROM cadastro JOIN farmaceutico ON cadastro.ID = farmaceutico.fk_cadastro_ID JOIN funcionario ON farmaceutico.fk_funcionario_Id_funcionario = funcionario.Id_funcionario WHERE funcionario.Nome_Funcionario = "Eduardo";
        
select fk_funcionario_Id_funcionario from farmaceutico where fk_cadastro_ID = '599283424408822300';

select verificacao from cadastro where ID = "175295524527288300";

select Id_Prontuario, Horario_Entrada, Horario_Saida, Receita, Observacoes, Pressao_Paciente, farm_resp from prontuario where Id_Prontuario = "9290034432768134";
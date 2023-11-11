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
delete from remedios;
SET SQL_SAFE_UPDATES = 1;

select fk_enfermeiro_funcionario_Id_funcionario from enfermeiro where fk_enfermeiro_cadastro_ID = "175295524527288300";

select Id_Paciente from paciente where Nome_Paciente = "Pedro";
select Quantidade_Remedio from remedios where Id_Remedio = 499137648962152600;
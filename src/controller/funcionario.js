import { DatabaseSQL } from "../db/funcionario.js";
import { recuperarDoCache } from "../config/cache.js";
import { DatabaseSQLFarmaceutico } from "../db/farmaceutico.js";
import { DatabaseSQLMedico } from "../db/medico.js";
import { verificaFuncExists } from "../config/Verifica.js";
import { DatabaseSQLEnfermeiro } from "../db/enfermeiro.js";


const dbEnfermeiro = new DatabaseSQLEnfermeiro();
const dbMedico = new DatabaseSQLMedico();
const dbFarmacia = new DatabaseSQLFarmaceutico();
const database = new DatabaseSQL();

export const cadastra = async (request, reply) => {
	
	try {
		const cache = await recuperarDoCache();
		if(cache.auth === false || !cache){
			return reply.status(401).send({ error: "Nao esta Logado" });
		}
		const idEmail = cache.userId;
		//puxa os dados do cadastro
		const dadosRecebidos = request.body;
		console.log(dadosRecebidos)
		const { idade, nome, cargo } = dadosRecebidos;

		//Verifica se esta logado
		if (!cache) {
			return reply.status(400).send({ error: "Usuário não autenticado" });
		}

		//Verifica se o nome ja existe no banco de dados
		const verFunc = await verificaFuncExists(nome);
		if (verFunc) {
			return reply.status(400).send({ error: "Funcionairo Ja existente" });
		}

		await database.create({
			idade,
			nome,
			cargo,
		});

		if (cargo == "farmaceutico") {
			const idFunc = await verificaFuncExists(nome);
			await dbFarmacia.create({
				idCadastro: idEmail,
				idFuncionario: idFunc,
			});
			return reply.status(200).send({ message: "Farmaceutico" });
		}
		if (cargo == "medico") {
			const idFunc = await verificaFuncExists(nome);
			await dbMedico.create({
				idCadastro: idEmail,
				idFuncionario: idFunc,
			});
			return reply.status(200).send({ message: "Medico" });
		}
		if (cargo == "enfermeiro") {
			const idFunc = await verificaFuncExists(nome);
			await dbEnfermeiro.create({
				idCadastro: idEmail,
				idFuncionario: idFunc,
			});
			return reply.status(200).send({ message: "enfermeiro" });
		}

		return reply.status(200).send({ message: "Certo" });
	} catch (error) {
		console.error("Erro ao Inserir Funcionário:", error);
		return reply.status(500).send({ error: "Erro interno do servidor" });
	}
};

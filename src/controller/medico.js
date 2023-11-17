import { DatabaseSQLReceitas } from "../db/receita.js";
import {
	verificaMedico,
	getIDbyNomeMed,
	verificaPacienteExists,
	verificaRemedioExists,
	diminuiRem,
} from "../config/Verifica.js";
import { recuperarDoCache } from "../config/cache.js";

const database = new DatabaseSQLReceitas();

export const createReceita = async (request, reply) => {
	try {
		const cache = await recuperarDoCache();
		if (cache.auth === false || !cache ) {
			return reply.status(401).send({ error: "Nao esta Logado" });
		}
		const { dataVenc, Medc, Poso, Paci } = request.body;

		const idCadastro = cache.userId;

		const verMed = await verificaMedico(idCadastro);
		if (!verMed) {
			return reply.status(401).send({ error: "Funcionario nao e medico" });
		}

		const verRemd = await verificaRemedioExists(Medc);
		if (!verRemd) {
			return reply.status(401).send({ error: "Remedio nao listado" });
		}

		const verPac = await verificaPacienteExists(Paci);

		if (!verPac) {
			return reply.status(401).send({ error: "Paciente nao existe" });
		}

		await diminuiRem(verRemd.Id_Remedio, Poso);

		database.createReceita({
			dataVenc,
			Medc,
			Poso,
			fkMed: verMed,
			fkPac: verPac,
		});
	} catch (error) {
		console.error("Erro ao passar remedios:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

//parte de alterar prontuario

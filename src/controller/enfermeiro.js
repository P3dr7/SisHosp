import {
	verificaEnfermerio,
	verificaEmailExists,
	verificaPacienteExists,
	verificaProntuario,
} from "../config/Verifica.js";
import { DatabaseSQLProntuario } from "../db/prontuario.js";
import { DatabaseSQLTem } from "../db/tem.js";
import { DatabaseSQLPaciente } from "../db/paciente.js";

const dbPaciente = new DatabaseSQLPaciente();
const dbTem = new DatabaseSQLTem();
const database = new DatabaseSQLProntuario();

export const cadastraProntuario = async (request, reply) => {
	try {
		//verificacao ta cadastrado
		const authHeader = request.headers.authorization;
		const authData = Buffer.from(authHeader.split(" ")[1], "base64").toString(
			"utf-8"
		);
		const [email, senha] = authData.split(":");
		// console.log(email)
		const idCadstro = await verificaEmailExists(email);
		// console.log(idCadstro)
		const verEnf = await verificaEnfermerio(idCadstro);
		// console.log(verEnf)
		if (!verEnf) {
			return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
		}

		const { Hentrada, HSaida, Receita, Obs, PresPac, nomePac } = request.body;
		const verPacExists = await verificaPacienteExists(nomePac);
		if (!verPacExists) {
			return reply.status(401).send({ error: "Nao Existe Esse paciente" });
		}
		database.create({
			Hentrada,
			HSaida,
			Receita,
			Obs,
			PresPac,
			nomePac,
		});

		if (verPacExists) {
			const idPront = await verificaProntuario(Hentrada);
			dbTem.create({
				idProntuario: idPront,
				idPaciente: verPacExists,
			});
		}
	} catch (error) {
		console.error("Erro ao criar protocolo:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

export const cadastraPaciente = async (request, reply) => {
	try {
		//verificacao se e enfermeiro
		const authHeader = request.headers.authorization;
		const authData = Buffer.from(authHeader.split(" ")[1], "base64").toString(
			"utf-8"
		);
		const [email, senha] = authData.split(":");
		// console.log(email)
		const idCadstro = await verificaEmailExists(email);
		// console.log(idCadstro)
		const verEnf = await verificaEnfermerio(idCadstro);
		// console.log(verEnf)
		if (!verEnf) {
			return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
		}

		const { nome, peso } = request.body;

		const verPacExists = await verificaPacienteExists(nome);
		if (verPacExists) {
			return reply.status(401).send({ error: "Paciente Ja existe" });
		}

		dbPaciente.create({
			nome,
			peso,
		});
	} catch (error) {
		console.error("Erro ao criar protocolo:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

import {
	verificaEnfermerio,
	verificaPacienteExists,
	verificaProntuario,
	getNameById,
	getProntuarioById
} from "../config/Verifica.js";
import { DatabaseSQLProntuario } from "../db/prontuario.js";
import { DatabaseSQLTem } from "../db/tem.js";
import { DatabaseSQLPaciente } from "../db/paciente.js";
import { recuperarDoCache } from "../config/cache.js";

const dbPaciente = new DatabaseSQLPaciente();
const dbTem = new DatabaseSQLTem();
const database = new DatabaseSQLProntuario();

export const cadastraProntuario = async (request, reply) => {
	try {
		const { Hentrada, HSaida, Receita, Obs, PresPac, nomePac } = request.body;

		const cache = await recuperarDoCache();
		if(cache.auth === false || !cache){
			return reply.status(401).send({ auth:false, error: "Nao esta Logado" });
		}
		const auth = cache.auth
		const idCadstro = cache.userId
		// console.log(cache)
		const verEnf = await verificaEnfermerio(idCadstro);
		
		if (!verEnf) {
			return reply.status(401).send({ auth, error: "Funcionario nao e enfermeiro" });
		}

		const enfResp = await getNameById(verEnf)
		// console.log(enfResp)
		const verPacExists = await verificaPacienteExists(nomePac);
		if (!verPacExists) {
			return reply.status(401).send({ auth, error: "Nao Existe Esse paciente" });
		}
		database.create({
			Hentrada,
			HSaida,
			Receita,
			Obs,
			PresPac,
			nomePac,
			enfResp
		});
		

		if (verPacExists) {
			const idPront = await verificaProntuario(Hentrada);
			dbTem.create({
				idProntuario: idPront,
				idPaciente: verPacExists,
			});
		}
		return reply.status(401).send({ auth, "mensage":"Prontuario cadastrado com sucesso" });

	} catch (error) {
		console.error("Erro ao criar protocolo:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

export const cadastraPaciente = async (request, reply) => {
	try {
		const cache = recuperarDoCache();
		if(cache.auth = false || !cache){
			return reply.status(401).send({ error: "Nao esta Logado" });
		}
		const idCadstro = cache.userId;
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
export const recuperaPaciente = async (request, reply) => {
	try {
		const id = request.body.id
		
		const data = await getProntuarioById(id)
	
		reply.send(data)
	}catch (error) {
		console.error("Erro ao atualizar paciente:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

export const atualizaPaciente = async(request, reply) => {
	try{
	const dadosRecebidos = request.body
	console.log(dadosRecebidos)
	const { IdPront, HEntrada, HSaida, Receita, Obs, Pressao, farmResp } = dadosRecebidos
	
	reply.send(dadosRecebidos)
	}catch (error) {
		console.error("Erro ao atualizar paciente:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
}

export const deleteProntuario = async(request, reply) =>{
	try{
		const id = request.body
		console.log(id)
		database.delete(id)
	reply.status(200).send(OK)
	}catch (error) {
		console.error("Erro ao atualizar paciente:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
}


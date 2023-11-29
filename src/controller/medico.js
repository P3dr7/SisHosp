import { DatabaseSQLReceitas } from "../db/receita.js";
import { DatabaseSQLPaciente } from "../db/paciente.js";
import {
	verificaMedico,
	verificaPacienteExists,
	verificaRemedioExists,
	diminuiRem,
} from "../config/Verifica.js";
import { recuperarDoCache } from "../config/cache.js";

const databasePaci = new DatabaseSQLPaciente
const database = new DatabaseSQLReceitas();

export const createReceita = async (request, reply) => {
	try {
		const cache = await recuperarDoCache();
		if (cache.auth === false || !cache ) {
			return reply.status(401).send({ error: "Nao esta Logado" });
		}
		const { dataVenc, Medc, Poso, Paci } = request.body;
		const auth = cache.auth
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
		reply.send({auth, "mensage":"Dados Enviado com Sucesso"})
	} catch (error) {
		console.error("Erro ao passar remedios:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

export const getPac = async (request, reply) => {
	try {
		const dataPac = await databasePaci.getPacientes();
		const dataPront = await databasePaci.getProntuarios();
		delete dataPac.Id_Paciente;

		delete dataPront.Id_Prontuario
		delete dataPront.Id_Prontuario

		// Criar um mapa de pacientes pelo nome
		const pacientesPorNome = {};
		dataPac.forEach(paciente => {
			const { Id_Paciente, Peso_Paciente, ...pacienteSemIdPeso } = paciente;
			pacientesPorNome[paciente.Nome_Paciente] = {
				...pacienteSemIdPeso,
				prontuarios: [] // Inicializar a lista de prontuários
			};
		});
	
		// Adicionar prontuários aos pacientes correspondentes
		dataPront.forEach(prontuario => {
			const { paciente, ...prontuarioSemPaciente } = prontuario;
			if (pacientesPorNome[paciente]) {
				pacientesPorNome[paciente].prontuarios.push(prontuarioSemPaciente);
			}
		});
	
		// Converter o mapa de pacientes de volta para um array
		const dataCombine = Object.values(pacientesPorNome);
		reply.send(dataCombine);
	} catch (error) {
		console.error("Erro ao inserir no banco de dados:", error);
	}

}

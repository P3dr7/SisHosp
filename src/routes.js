import * as cadastro from "./controller/cadastro.js";
import * as funcionario from "./controller/funcionario.js";
import * as enfermeiro from "./controller/enfermeiro.js";
import * as farmaceutico from "./controller/farmaceutico.js";
import * as medicos from "./controller/medico.js"
import { verificaLogado } from "./config/verificaLogin.js";

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/cadastro", cadastro.cadastra);

	fastify.post("/funcionario", funcionario.cadastra);
	fastify.post("/paciente", enfermeiro.cadastraPaciente);
	fastify.post("/prontuario", enfermeiro.cadastraProntuario);
	fastify.post("/farmaceutico", farmaceutico.createRemedios);
	fastify.post("/receitas", medicos.createReceita)
	fastify.post("/verificaLogin", verificaLogado)

	done();
}

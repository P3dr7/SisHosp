import * as cadastro from "./controller/cadastro.js";
import * as funcionario from "./controller/funcionario.js";
import * as enfermeiro from "./controller/enfermeiro.js";
import * as farmaceutico from "./controller/farmaceutico.js";
import * as medicos from "./controller/medico.js"
import { verificaLogado } from "./config/verificaLogin.js";
import { recuperarDoCache } from "./config/cache.js";
import { veriCadastrado } from "./config/verificaCadastrado.js";
import { verificarCargo } from "./config/verificaCargo.js"

export default function (fastify, options, done) {
	// POST
	fastify.post("/cadastro", cadastro.cadastra);
	fastify.post("/funcionario", funcionario.cadastra);
	fastify.post("/paciente", enfermeiro.cadastraPaciente);
	fastify.post("/prontuario", enfermeiro.cadastraProntuario);
	fastify.post("/farmaceutico", farmaceutico.createRemedios);
	fastify.post("/receitas", medicos.createReceita)
	fastify.post("/verificaLogin", verificaLogado)
	fastify.post("/removeRem", farmaceutico.deleteRemedios)
	fastify.post("/getPront", enfermeiro.recuperaPaciente)
	fastify.post("/verificaCargos", verificarCargo)
	// GET
	fastify.get("/verificaLogin", verificaLogado)
	fastify.get("/teste", recuperarDoCache)
	fastify.get("/verificaCadastro", veriCadastrado)
	fastify.get("/getPaci", medicos.getPac)
	
	// PUT
	fastify.post("/atualizaPaciente", enfermeiro.atualizaPaciente)

	//DELETE
	fastify.delete("/deletePronturio", enfermeiro.deleteProntuario)

	done();
}

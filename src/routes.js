import * as cadastro from "./controller/cadastro.js";
import * as funcionario from "./controller/funcionario.js";
import * as enfermeiro from "./controller/enfermeiro.js";
import * as farmaceutico from "./controller/farmaceutico.js";
import * as medicos from "./controller/medico.js"
import { verificaLogado } from "./config/verificaLogin.js";
import { recuperarDoCache } from "./config/cache.js";
import { veriCadastrado } from "./config/verificaCadastrado.js";

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/cadastro", cadastro.cadastra);

	fastify.post("/funcionario", funcionario.cadastra);
	fastify.post("/paciente", enfermeiro.cadastraPaciente);
	fastify.post("/prontuario", enfermeiro.cadastraProntuario);
	fastify.post("/farmaceutico", farmaceutico.createRemedios);
	fastify.post("/receitas", medicos.createReceita)
	fastify.post("/verificaLogin", verificaLogado)
	fastify.get("/verificaLogin", verificaLogado)
	fastify.get("/teste", recuperarDoCache)
	fastify.get("/verificaCadastro", veriCadastrado)

	done();
}

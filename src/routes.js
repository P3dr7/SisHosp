import * as cadastro from "./controller/cadastro.js";
import * as funcionario from "./controller/funcionario.js"

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/cadastro", cadastro.cadastra);
	
	fastify.post("/funcionario", funcionario.cadastra);

	done();
}

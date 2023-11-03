import * as cadastro from "./controller/cadastro.js";

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/cadastro", cadastro.cadastra);
	
	done();
}

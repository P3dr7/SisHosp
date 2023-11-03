import { DatabaseSQL } from "../db/cadastro.js";
import { verificaEmail, verificaSenha } from "../config/Verifica.js";

const database = new DatabaseSQL(); 

export const cadastra = async (request, reply) => {
	const { email, confEmail, senha, confSenha } = request.body;
    try{
    const veriEmail = verificaEmail(email, confEmail);
    const veriSenha = verificaSenha(senha, confSenha);
    if (!veriEmail) {
        return reply.status(400).send({ error: "Email Informados Diferentes" });
    }
    if (!veriSenha) {
        return reply.status(400).send({ error: "Senhas Informados Diferentes" });
    }

	await database.create({
		email, 
        senha,
	});
	return reply.status(201).send();
    }catch (error) {
		console.error('Erro ao criar cadastro:', error);
		return reply.status(500).send({ error: "Ocorreu um erro interno do servidor." });
	}
};


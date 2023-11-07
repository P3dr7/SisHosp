import { DatabaseSQL } from "../db/cadastro.js";
import {
	verificaEmail,
	verificaSenha,
	verificaEmailExists,
} from "../config/Verifica.js";
import bcrypt from "bcrypt";

const database = new DatabaseSQL();

export const cadastra = async (request, reply) => {
	const { email, confEmail, senha, confSenha} = request.body;
	try {
		const veriEmailExists = await verificaEmailExists(email);
		const veriEmail = verificaEmail(email, confEmail);
		const veriSenha = verificaSenha(senha, confSenha);

		if (veriEmailExists) {
			return reply.status(400).send({ error: "Email já cadastrado" });
		}
		if (!veriEmail) {
			return reply
				.status(400)
				.send({ error: "Emails informados são diferentes" });
		}
		if (!veriSenha) {
			return reply
				.status(400)
				.send({ error: "Senhas informadas são diferentes" });
		}

		// Criptografar a senha
		const senhaHash = await bcrypt.hash(senha, 10); // 10 é o número de rounds de salting

		await database.create({
			email,
			senha: senhaHash,  // Armazenar a senha criptografada
		});

		return reply.status(201).send();
	} catch (error) {
		console.error("Erro ao criar cadastro:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

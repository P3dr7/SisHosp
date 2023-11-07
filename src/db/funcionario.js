import { GenerateID } from "../config/ID.js";
import { connection } from "./db.js";

export class DatabaseSQL {
	async create(infos) {
		const idFuncionario = GenerateID();
		// Puxa os dados passado pelo post
		const { nome, idade, cargo } = infos;
		// insere no banco de dados
		const sql =
			"INSERT INTO funcionario (Idade_Funcionario, Nome_Funcionario, Id_funcionario, Cargo) VALUES (?, ?, ?, ?)";
		const values = [idade, nome, idFuncionario, cargo];

		// Aqui executa a inserção
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
	}
}

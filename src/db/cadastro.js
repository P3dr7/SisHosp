import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async create(infos) {
		const idCadastro = GenerateID();
		// Puxa os dados passado pelo post
		const {email, senha} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO cadastro (ID, email, senha) VALUES (?, ?, ?)';
        const values = [idCadastro, email, senha];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}

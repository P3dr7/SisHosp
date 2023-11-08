import { connection } from './db.js';

export class DatabaseSQLEnfermeiro {
	async create(infos) {
		// Puxa os dados passado pelo post
		const {idCadastro, idFuncionario} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO enfermeiro (fk_enfermeiro_cadastro_ID, fk_enfermeiro_funcionario_Id_funcionario) VALUES (?, ?)';
        const values = [idCadastro, idFuncionario];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}

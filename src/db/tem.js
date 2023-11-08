import { connection } from './db.js';

export class DatabaseSQLTem {
	async create(infos) {
		// Puxa os dados passado pelo post
		const {idProntuario, idPaciente} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO tem (fk_tem_prontuario_id, fk_tem_paciente_id) VALUES (?, ?)';
        const values = [idProntuario, idPaciente];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
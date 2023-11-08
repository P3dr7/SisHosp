import { connection } from "./db.js";
import { GenerateID } from "../config/ID.js";

export class DatabaseSQLPaciente{
    async create(infos) {
		// Puxa os dados passado pelo post
		const {nome, peso} = infos;

        const paciId = GenerateID();
		// insere no banco de dados
        const sql = 'INSERT INTO paciente (Id_Paciente, Nome_Paciente, Peso_Paciente) VALUES (?, ?, ?)';
        const values = [paciId, nome, peso];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
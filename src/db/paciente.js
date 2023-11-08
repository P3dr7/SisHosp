import { connection } from "./db";
import { GenerateID } from "../config/ID";

export class DatabaseSQL{
    async create(infos) {
		// Puxa os dados passado pelo post
		const {nome, peso, pront, fkPront} = infos;

        const paciId = new GenerateID();
		// insere no banco de dados
        const sql = 'INSERT INTO pacientes (Id_Pacientes, Nome_Paciente, Peso_Paciente, Prontuario, fk_Prontuario_Id_Prontuario) VALUES (?, ?, ?, ?, ?)';
        const values = [paciId, nome, peso, pront, fkPront];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
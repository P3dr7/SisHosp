import { GenerateID } from "../config/ID.js";
import { connection } from "./db.js";

export class DatabaseSQLReceitas{
    async createReceita(infos) {
		// Puxa os dados passado pelo post
        const recID = GenerateID();
        const {dataVenc, Medc, Poso, fkMed, fkPac} = infos;

		// insere no banco de dados
        const sql = 'INSERT INTO receitas (Id_Receitas, Data_Vencimento, Medicamentos, Posologia, fk_receitas_medicos_Id_Medico, fk_receitas_paciente_Id_Paciente) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [recID, dataVenc, Medc, Poso, fkMed, fkPac];

        

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
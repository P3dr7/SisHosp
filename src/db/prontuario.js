import { connection } from './db.js';
import { GenerateID } from '../config/ID.js';


export class DatabaseSQLProntuario {
	async create(infos) {
		// Puxa os dados passado pelo post
		const {Hentrada, HSaida, Receita, Obs, PresPac, nomePac, farmResp} = infos;

        //cria um id 
        const prontID = GenerateID();
        // console.log(prontID)

		// insere no banco de dados
        const sql = 'INSERT INTO prontuario (Id_Prontuario, Horario_Entrada, Horario_Saida, Receita, Observacoes, Pressao_Paciente, paciente, farm_resp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [prontID, Hentrada, HSaida, Receita, Obs, PresPac,nomePac, farmResp];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
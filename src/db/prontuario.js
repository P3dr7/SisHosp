import { connection } from './db.js';
import { GenerateID } from '../config/ID.js';


export class DatabaseSQLProntuario {
	async create(infos) {
		// Puxa os dados passado pelo post
		const {Hentrada, HSaida, Receita, Obs, PresPac, nomePac, enfResp} = infos;

        //cria um id 
        const prontID = GenerateID();
        // console.log(prontID)

		// insere no banco de dados
        const sql = 'INSERT INTO prontuario (Id_Prontuario, Horario_Entrada, Horario_Saida, Receita, Observacoes, Pressao_Paciente, paciente, farm_resp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [prontID, Hentrada, HSaida, Receita, Obs, PresPac,nomePac, enfResp];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };

	async update(infos){
		const {Id_Prontuario, NomePac, Hentrada, HSaida, Receita, Obs, Pressao, farmResp} = infos;
		console.log(infos)
		console.log(Id_Prontuario)
		console.log(Hentrada)
		console.log(HSaida)
		console.log(Receita)
		console.log(Obs)
		console.log(Pressao)
		console.log(NomePac)
		console.log(farmResp)
		const sql = "UPDATE prontuario SET Horario_Entrada = ?, Horario_Saida = ?, Receita = ?, Observacoes = ?, Pressao_Paciente = ?, farm_resp = ? WHERE Id_Prontuario = ?  AND paciente = ?"
		const values = [Hentrada, HSaida, Receita, Obs, Pressao, farmResp, Id_Prontuario, NomePac]
		try{
			await connection.query(sql, values);
		}catch (error) {
			console.error("Erro ao atualizar dados do banco de dados:", error);
		}
	}

	async delete(idPront){
		const sql = "delete from prontuario where Id_Prontuario = ?"
		try{
			await connection.query(sql, idPront)
		}catch (error) {
			console.error("Erro ao excluir do banco de dados:", error);
		}
		
	}
}
import { connection } from "./db.js";
import { GenerateID } from "../config/ID.js";
import { verificaRemedioExists } from "../config/Verifica.js";

export class DatabaseSQLRemedios {
	async create(infos) {
		const { nome, qnt } = infos;
		const IDRemedios = GenerateID();
		const remedioExist = await verificaRemedioExists(nome);

		try {
			if (remedioExist && remedioExist.Id_Remedio) {
				const sqlUpdate =
					"UPDATE remedios SET Quantidade_Remedio = ? WHERE Nome_Remedio = ?";
				const somaFinal = parseInt(qnt) + remedioExist.Quantidade_Remedio;
				await connection.query(sqlUpdate, [somaFinal, nome]);
			} else {
				// Se o remédio não existir, insere no banco de dados
				const sqlInsert =
					"INSERT INTO remedios (Id_Remedio, Quantidade_Remedio, Nome_Remedio) VALUES (?, ?, ?)";
				const valuesInsert = [IDRemedios, qnt, nome];
				await connection.query(sqlInsert, valuesInsert);
			}
		} catch (error) {
			console.error("Erro ao interagir com o banco de dados:", error);
		}
	}
}

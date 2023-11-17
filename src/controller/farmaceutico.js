import { DatabaseSQLRemedios } from "../db/remedios.js";
import { verificaFarmaceutico, getIDbyNomeFarm} from "../config/Verifica.js";
import { recuperarDoCache } from "../config/cache.js";

const database = new DatabaseSQLRemedios();

export const createRemedios = async (request, reply)=>{
    try{
        const { nome, qnt , farmResp} = request.body;
        const cache = await recuperarDoCache();
		if(cache.auth === false || !cache){
			return reply.status(401).send({ error: "Nao esta Logado" });
		}
	const idCadstro = await getIDbyNomeFarm(farmResp)

    const verEnf = await verificaFarmaceutico(idCadstro);
    // console.log(verEnf)
    if(!verEnf){
        return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
    }

    database.create({
        nome, qnt,
    })

    } catch (error) {
        console.error("Erro ao passar remedios:", error);
        return reply
            .status(500)
            .send({ error: "Ocorreu um erro interno do servidor." });
    }

}
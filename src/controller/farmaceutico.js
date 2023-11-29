import { DatabaseSQLRemedios } from "../db/remedios.js";
import { verificaFarmaceutico, getIDbyNomeFarm, verificaRemedioExists} from "../config/Verifica.js";
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
    // console.log(idCadstro)
    const verEnf = await verificaFarmaceutico(idCadstro);
    // console.log(verEnf)
    if(!verEnf){
        return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
    }
    
    database.create({
        nome, qnt,
    })

    return reply.status(201)
    } catch (error) {
        console.error("Erro ao passar remedios:", error);
        return reply
            .status(500)
            .send({ error: "Ocorreu um erro interno do servidor." });
    }

}
export const deleteRemedios = async (request, reply)=>{
    try{
    const { nome, qnt , farmResp} = request.body;
        
    const cache = await recuperarDoCache();
	if(cache.auth === false || !cache){
		return reply.status(401).send({ error: "Nao esta Logado" });
	}
	const idCadstro = await getIDbyNomeFarm(farmResp)
    // console.log(idCadstro)
    const verEnf = await verificaFarmaceutico(idCadstro);
    // console.log(verEnf)
    if(!verEnf){
        return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
    }
    
    const valuesRem = await verificaRemedioExists(nome)
    const idRemedio = valuesRem.Id_Remedio
    const qntRem = valuesRem.Quantidade_Remedio
    database.remove({
        qnt, idRemedio, qntRem
    })

    return reply.status(201)
    } catch (error) {
        console.error("Erro ao passar remedios:", error);
        return reply
            .status(500)
            .send({ error: "Ocorreu um erro interno do servidor." });
    }

}
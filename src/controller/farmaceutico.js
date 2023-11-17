import { DatabaseSQLRemedios } from "../db/remedios.js";
import { verificaFarmaceutico, verificaEmailExists } from "../config/Verifica.js";

const database = new DatabaseSQLRemedios();

export const createRemedios = async (request, reply)=>{
    try{
    //verificacao ta cadastrado
    if (storedCredentials) {
    const authHeader = sessionStorage.getItem('userInfo');
    const authData = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [email, senha] = authData.split(':');
    // console.log(email)
    const idCadstro = await verificaEmailExists(email);
    // console.log(idCadstro)
    const verEnf = await verificaFarmaceutico(idCadstro);
    // console.log(verEnf)
    if(!verEnf){
        return reply.status(401).send({ error: "Funcionario nao e enfermeiro" });
    }
}
    const { nome, qnt } = request.body;

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
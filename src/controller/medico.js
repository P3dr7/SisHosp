import { DatabaseSQLReceitas } from "../db/receita.js";
import { verificaMedico, verificaEmailExists, verificaPacienteExists, verificaRemedioExists, diminuiRem } from "../config/Verifica.js";

const database = new DatabaseSQLReceitas();

export const createReceita = async (request, reply)=>{
    try{
    //verificacao ta cadastrado
    const authHeader = request.headers.authorization;
    const authData = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [email, senha] = authData.split(':');
    // console.log(email)
    const idCadstro = await verificaEmailExists(email);
    // console.log(idCadstro)
    const verMed = await verificaMedico(idCadstro);
    // console.log(verMed)
    if(!verMed){
        return reply.status(401).send({ error: "Funcionario nao e Medico" });
    }

    const { dataVenc, Medc, Poso, Paci} = request.body;
    const verRemd = await verificaRemedioExists(Medc);
    if(!verRemd){
        return reply.status(401).send({ error: "Remedio nao listado" });
    }

    const verPac = await verificaPacienteExists(Paci);

    if(!verPac){
        return reply.status(401).send({ error: "Paciente nao existe" });
    }
    
    await diminuiRem(verRemd.Id_Remedio);

    database.createReceita({
        dataVenc, Medc, Poso, fkMed: verMed, fkPac: verPac
    })

    

    } catch (error) {
        console.error("Erro ao passar remedios:", error);
        return reply
            .status(500)
            .send({ error: "Ocorreu um erro interno do servidor." });
    }

}

//parte de alterar prontuario 
import { DatabaseSQL } from "../db/funcionario.js";
import { verificaLogado } from "../config/verificaLogin.js";
import { DatabaseSQLFarmaceutico } from "../db/farmaceutico.js";
import { verificaEmailExists,verificaFuncExists } from "../config/Verifica.js";

const dbFarmacia = new DatabaseSQLFarmaceutico(); 
const database = new DatabaseSQL();

export const cadastra = async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({ error: "Credenciais de autenticação não fornecidas" });
    }
    // console.log(authHeader)
    // Decodificar as credenciais em base64
    const authData = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [email, senha] = authData.split(':');

    // console.log(email, senha);
    const idEmail = await verificaEmailExists(email);
    console.log(idEmail)
    try {
        const verLogado = await verificaLogado(email, senha);
        if (!verLogado) {
            return reply.status(400).send({ error: "Usuário não autenticado" });
        }
        // Mudar aqui para o resto do codigo 
        const {idade, nome, cargo } = request.body
        await database.create({
			idade,
			nome,
            cargo,
		});
        
        if(cargo == "farmaceutico"){
            const idFunc = await verificaFuncExists(nome)
            await dbFarmacia.create({
                idCadastro: idEmail, 
                idFuncionario: idFunc,
            })
            return reply.status(200).send({ message: "Farmaceutico" });
        }

        return reply.status(200).send({ message: "Certo" });
    } catch (error) {
        console.error('Erro ao Inserir Funcionário:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
}

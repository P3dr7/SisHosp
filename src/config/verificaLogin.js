import { connection } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { setRedis } from "../redisConfig.js";

export async function verificaLogado(request, reply){
    try {
        const dadosRecebidos = request.body;
        console.log('Dados recebidos do cliente:', dadosRecebidos);
        
        const { email, senha } = dadosRecebidos;
        console.log(email);

        // Buscar o usuário no banco de dados
        const [rows] = await connection.query ('SELECT * FROM cadastro WHERE email = ?', [email]);

        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return reply.status(400).send('Usuário não encontrado');

        }

        const user = rows[0];
        const id = user.id

        // Comparar a senha fornecida com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        // Verificar se a senha está correta
        if (!senhaCorreta) {
            return reply.status(400).send('Senha incorreta');
        }

        const token = jwt.sign({id}, 'chave_secreta');

        //user-id
        await setRedis('verificaUser', JSON.stringify(token));
        // console.log({token})
        return reply.send({token})
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        return reply.status(500).send('Erro interno do servidor');
    } 
}

// export async function funcionarioLogado(){

// }

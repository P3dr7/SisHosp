import { connection } from "../db/db.js";
import bcrypt from "bcrypt";

export async function verificaLogado(request, reply){
    try {
        
        const dadosRecebidos = request.body;
        console.log('Dados recebidos do cliente:', dadosRecebidos);

        const { email, senha} = dadosRecebidos;
        console.log(email);

        // Buscar o usuário no banco de dados
        const [rows] = await connection.query('SELECT * FROM cadastro WHERE email = ?', [email]);

        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return reply.status(400).send('Usuário não encontrado');

        }

        const user = rows[0];

        // Comparar a senha fornecida com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        // Verificar se a senha está correta
        if (!senhaCorreta) {
            return reply.status(400).send('Senha incorreta');
        }
        // Se tudo estiver correto, o usuário está autenticado
        return reply.status(200).send('Login bem-sucedido!');
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        return reply.status(500).send('Erro interno do servidor');
    }
}

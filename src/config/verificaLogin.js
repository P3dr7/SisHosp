import { connection } from "../db/db.js";
import bcrypt from "bcrypt";

export async function verificaLogado(email, senha){
    try {
        // Buscar o usuário no banco de dados
        const [rows] = await connection.query('SELECT * FROM cadastro WHERE email = ?', [email]);
        
        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return { status: 400, error: 'Usuário não encontrado' };
        }
        
        const user = rows[0];
        
        // Comparar a senha fornecida com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        
        // Verificar se a senha está correta
        if (!senhaCorreta) {
            return { status: 400, error: 'Senha incorreta' };
        }

        // Se tudo estiver correto, o usuário está autenticado
        return { status: 200, message: 'Login bem-sucedido!' };
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        return { status: 500, error: 'Erro interno do servidor' };
    }
}

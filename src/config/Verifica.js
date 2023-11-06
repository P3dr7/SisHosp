import { connection } from "../db/db.js";

export async function verificaEmailExists(email) {
    try {
        const resultEmail = await connection.query(
            "SELECT ID FROM cadastro WHERE email = ?",
            [email]
        ); 
        const emailExists = resultEmail && resultEmail.length > 0 && resultEmail[0].length > 0;
        return emailExists;
    } catch (error) {
        console.error("Erro ao verificar o email:", error);
        throw error;
    }
}

export function verificaSenha(senha, confSenha){
    return senha === confSenha;
}

export function verificaEmail(email, confEmail){
    return email === confEmail;
}
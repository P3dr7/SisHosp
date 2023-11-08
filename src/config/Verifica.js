import { connection } from "../db/db.js";

export async function verificaEmailExists(email) {
    try {
        const resultEmail = await connection.query(
            "SELECT ID FROM cadastro WHERE email = ?",
            [email]
        ); 
        const emailExists = resultEmail && resultEmail.length > 0 && resultEmail[0].length > 0;
        if(emailExists){
            return resultEmail[0][0].ID
        }
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

export async function verificaFuncExists(funcionario) {
    try {
        const resultFunc = await connection.query(
            "SELECT Id_funcionario FROM funcionario WHERE Nome_Funcionario = ?",
            [funcionario]
        ); 
        if(resultFunc && resultFunc.length > 0 && resultFunc[0].length > 0){
            return resultFunc[0][0].Id_funcionario  
        }
        return null;
    } catch (error) {
        console.error("Erro ao verificar o funcionario:", error);
        throw error;
    }
}

export async function verificaEnfermerio(idFunc){
    try{
        //Fazer logica de verificar o Id do enfermeiro para começar as funções dos enfermeiros 

    }catch (error) {
        console.error("Erro ao verificar o funcionario:", error);
        throw error;
    }

}
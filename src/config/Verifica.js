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

export async function verificaEnfermerio(idCad){
    try{
        const resultVerif =  await connection.query(
            "select fk_enfermeiro_funcionario_Id_funcionario from enfermeiro where fk_enfermeiro_cadastro_ID = ?",
            [idCad]
        );
        if(resultVerif && resultVerif.length > 0 && resultVerif[0].length > 0){
            return resultVerif[0][0].fk_enfermeiro_funcionario_Id_funcionario 
        }
        return null;

    }catch (error) {
        console.error("Erro ao verificar o enfermerio:", error);
        throw error;
    }

}

export async function verificaPacienteExists(nomePac){
    try{
        const resultVerifPac =  await connection.query(
            "select Id_Paciente from paciente where Nome_Paciente = ?",
            [nomePac]
        );
        if(resultVerifPac && resultVerifPac.length > 0 && resultVerifPac[0].length > 0){
            return resultVerifPac[0][0].Id_Paciente
        }
        return null;

    }catch (error) {
        console.error("Erro ao verificar o Paciente:", error);
        throw error;
    }
}

export async function verificaProntuario(HEntrada){
    try{

        const resultTemPront = await connection.query(
            "select Id_Prontuario from prontuario where Horario_Entrada = ?",
            [HEntrada]
        )
        if(resultTemPront && resultTemPront.length > 0 && resultTemPront[0].length > 0){
            return resultTemPront[0][0].Id_Prontuario
        }
        return null;

    }catch(error)
{
    console.error("Erro ao verificar o Paciente:", error);
    throw error;
}}

export async function verificaFarmaceutico(idCad){
    try{
        const resultVerif =  await connection.query(
            "select fk_enfermeiro_funcionario_Id_funcionario from enfermeiro where fk_enfermeiro_cadastro_ID = ?",
            [idCad]
        );
        if(resultVerif && resultVerif.length > 0 && resultVerif[0].length > 0){
            return resultVerif[0][0].fk_enfermeiro_funcionario_Id_funcionario 
        }
        return null;

    }catch (error) {
        console.error("Erro ao verificar o enfermerio:", error);
        throw error;
    }

}

export async function verificaRemedioExists(nome){
    try{
        const resultVerif =  await connection.query(
            "select Id_Remedio, Quantidade_Remedio from remedios where Nome_Remedio = ?",
            [nome]
        );
        if(resultVerif && resultVerif.length > 0 && resultVerif[0].length > 0){
            return resultVerif[0][0]
        }
        return null;
    }catch (error) {
        console.error("Erro ao verificar o enfermerio:", error);
        throw error;
    }
}

export async function verificaMedico(idCad){
    try{
        const resultVerif =  await connection.query(
            "select fk_medicos_funcionario_Id_funcionario from medicos where fk_medicos_cadastro_ID = ?",
            [idCad]
        );
        if(resultVerif && resultVerif.length > 0 && resultVerif[0].length > 0){
            return resultVerif[0][0].fk_medicos_funcionario_Id_funcionario 
        }
        return null;

    }catch (error) {
        console.error("Erro ao verificar o enfermerio:", error);
        throw error;
    }

}

export async function diminuiRem(idRem){
    try{
        const resultVerif =  await connection.query(
            "select Quantidade_Remedio from remedios where Id_Remedio = ?",
            [idRem]
        );
        if(resultVerif && resultVerif.length > 0 && resultVerif[0].length > 0){
            const result = resultVerif[0][0].Quantidade_Remedio;
            const resultFinal = result - 1;
            const values = [resultFinal, idRem]
            connection.query(
                "UPDATE remedios SET Quantidade_Remedio = ? WHERE Id_Remedio = ?", values
            )
        }

    }catch (error) {
        console.error(error);
        throw error;
    }

}
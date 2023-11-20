import { connection } from "../db/db.js";


export async function veriCadastrado(request, reply){

    const idCadastro = request.body;

    const result = await connection.query("SELECT verificacao FROM cadastro WHERE ID = ?", [idCadastro]);

    console.log(result[0]);

    if (result[0] === "[]") {
        return reply.send('Usuário não encontrado');
    }

    if (result[0].verificacao === "0") {
        return reply.send("Não cadastrado como funcionário");
    }

    reply.send("Usuário Cadastrado");
}

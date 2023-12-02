import { verificaEnfermerio, verificaFarmaceutico, verificaMedico } from "./Verifica.js";
export async function verificarCargo(request, reply) {
        try {
            const dadosRecebidos = request.body
            // console.log("dados Recebidos do FRont",dadosRecebidos)
            const id = dadosRecebidos
            const verFarm = await verificaFarmaceutico(id);
            if (verFarm) {
                return reply.send({"cargo":"farmaceutico"});
            }
    
            const verMed = await verificaMedico(id);
            if (verMed) {
                return reply.send({"cargo":"medico"});
            }
    
            const verEnf = await verificaEnfermerio(id);
            if (verEnf) {
                return reply.send({"cargo":"enfermeiro"});
            }
    
            // Se nenhum dos cargos for encontrado, você pode retornar algo padrão ou lançar um erro, dependendo do seu caso.
            return reply.send({"cargo":"cargo não encontrado"});
        } catch (error) {
            console.error("Erro ao verificar cargo:", error);
            return reply.send("erro");
        }
    }
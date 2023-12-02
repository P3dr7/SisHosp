async function main() {
	try {
		const dadosRecebidosGet = await fetchData();
		// console.log("dados recebidos do GET", dadosRecebidosGet);
        const id = dadosRecebidosGet.userId
		const response = await fetch("http://127.0.0.1:3333/verificaCargos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(id),
		}).then(response => response.json())
        .then(data => {
            // console.log(data.cargo);
            const cargoDoUsuario = data.cargo
            switch (cargoDoUsuario) {
                case "enfermeiro":
                    document.getElementById("farmaceuticoBtn").classList.add("d-none");
                    document.getElementById("medicoBtn").classList.add("d-none");
                    document.getElementById("funcionarioBtn").classList.add("d-none");
                    break;
                case "medico":
                    document.getElementById("enfermeiroBtn").classList.add("d-none");
                    document.getElementById("farmaceuticoBtn").classList.add("d-none");
                    document.getElementById("funcionarioBtn").classList.add("d-none");
                    break;
                case "farmaceutico":
                    document.getElementById("enfermeiroBtn").classList.add("d-none");
                    document.getElementById("medicoBtn").classList.add("d-none");
                    document.getElementById("funcionarioBtn").classList.add("d-none");
                    break;
                default:
                    document.getElementById("enfermeiroBtn").classList.add("d-none");
                    document.getElementById("farmaceuticoBtn").classList.add("d-none");
                    document.getElementById("medicoBtn").classList.add("d-none");
                    break;
            }
        })
        .catch(error => console.error('Erro ao obter dados do prontuário:', error));

	} catch (error) {
		console.error("Erro ao enviar dados para a API:", error);
		// Manipule o erro de maneira apropriada (exibir mensagem para o usuário, etc.)
	}
}

async function fetchData() {
	try {
		const response = await fetch("http://127.0.0.1:3333/teste");
		if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.status}`);
		}
		const data = await response.json();
		// console.log("Dados do backend:", { dadosRecebidos1: data });
		return data;
	} catch (error) {
		console.error("Erro na requisição:", error);
		throw error;
	}
}
document.addEventListener("DOMContentLoaded", () => {
    main();
  });
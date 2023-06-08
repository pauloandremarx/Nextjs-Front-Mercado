class TaxUpdateService {
    async update(id, data) {
        try {
            const response = await fetch("http://localhost:8080/tax/"+id, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { Authorization: localStorage.getItem("token") },
            });

            if (!response.ok) {
                return await response.json();
            }
            const responseData = await response.json();
            // Faça algo com a resposta (response) aqui
            console.log(responseData);
            return responseData;

        } catch (error) {
            if (error instanceof Error) {
                // Erro de rede ou erro lançado explicitamente
                console.log(error.message);
                const responseData = error.message;
                return responseData.json();
            } else {
                // Erro de resposta (error response)
                const errorResponse = JSON.parse(error);
                console.log(errorResponse);
                return errorResponse;
            }
        }
    }
}

const update_p = new TaxUpdateService();

export default update_p;


import axios from "axios"
import jwt_decode from "jwt-decode";
class TaxDeleteService{
    async delete(id) {
        try {
            const response = await fetch('http://localhost:8080/tax/' + id, {
                method: "DELETE",
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

const delete_p = new TaxDeleteService()

export default delete_p
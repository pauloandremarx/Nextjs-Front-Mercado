class CategoryPostService {
    async create(data) {
        let formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        try {
            const response = await fetch("http://localhost:8080/category/", {
                method: "POST",
                body: formData,
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

const create_p = new CategoryPostService();

export default create_p;

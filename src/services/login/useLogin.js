
import axios from "axios"

import jwt_decode from "jwt-decode";


class UsuarioService{


    async login(data){

        let formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        return axios({
            url: `http://localhost:8080/login/`,
            method: "POST",
            data: formData,
        

        }).then((response) => {
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('refleshToken', response.data.refleshToken);

            var decoded = jwt_decode(response.data.token);


            window.localStorage.setItem('nome', decoded.nome);
            window.localStorage.setItem('exp', decoded.exp);

            console.log(response.data)
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }


}

const user = new UsuarioService()

export default user
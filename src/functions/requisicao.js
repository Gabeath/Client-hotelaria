const URL = 'https://api-xyz-hotelaria.herokuapp.com/';

const requisicao = {

    /**
    * Efetua uma requisição do tipo Get e retorna a resposta em formato json
    * @param rota rota em que será feita a requisição
    * @param headers o cabeçalho da requisição. Parâmetro opcional
    */
    get: async (rota, headers = {}) =>{
        const req = await fetch(URL + rota, {
            headers
        } )
        const dados = await req.json();
        return dados;
    },
    /**
    * Efetua uma requisição do tipo Post e retorna a resposta em formato json
    * @param rota rota em que será feita a requisição
    * @param dados os dados que serão enviados a requisição
    */
    post: async(rota, dados) =>{
        const requisicao = await fetch(URL + rota, {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
                body: dados
        })
        const resposta = await requisicao.json();
        return resposta;
    },
    /**
    * Efetua uma requisição do tipo Delete e retorna a resposta em formato json
    * @param rota rota em que será feita a requisição
    * @param dados os dados que serão enviados a requisição
    */
    delete: async(rota, dados) =>{
        const requisicao = await fetch(URL + rota, {
                method: 'DELETE',
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
                body: dados
        })
        const resposta = await requisicao.json();
        return resposta;
    }
}

export default requisicao
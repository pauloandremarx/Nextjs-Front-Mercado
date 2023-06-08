export  function localStorageExpires()
{
    const oneHour = 60 * 60 * 1000; // 1 hora em milissegundos

    setInterval(() => {
        localStorage.clear();
        console.log('Local Storage zerado após 1 hora');
    }, oneHour);
}


/**
 * Função para adicionar itens no localStorage
 * @param {string} chave Chave que será usada para obter o valor posteriormente
 * @param {*} valor Quase qualquer tipo de valor pode ser adicionado, desde que não falhe no JSON.stringify
 * @param {number} Tempo de vida em minutos do item
 */
 export  function setLocalStorage(chave, valor, minutos)
{
    var expirarem = new Date().getTime() + (60000 * minutos);

    if (typeof window !== 'undefined') {

    window.localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
    }
}

/**
 * Função para obter itens do localStorage que ainda não expiraram
 * @param {string} chave Chave para obter o valor associado
 * @return {*} Retorna qualquer valor, se o item tiver expirado irá retorna undefined
 */
 export  function getLocalStorage(chave)
{

        if (typeof window !== 'undefined') {
        localStorageExpires();//Limpa itens

        var value = window.localStorage.getItem(chave);
            return value;

    }
}



/**
* Função para remover os itens do localstorage e do sessionstorage
@param {string} chave
 **@returns {*}
*/
export  function removeStorage(chave)
{
       if (typeof window !== 'undefined') {
       localStorageExpires();//Limpa itens

       window.localStorage.removeItem(chave);

   }
}


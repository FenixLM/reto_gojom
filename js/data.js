function retornarDataJson(path){
    const data = fetch(path).then(contenido => contenido.json());
    return data;

}

export default retornarDataJson;
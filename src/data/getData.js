//URL BASE
const baseUrl = "https://rickandmortyapi.com/api"

//TRAER SOLO UN PERSONAJE
// @param id = numero del persona solicitado
const getCharacter = async (id) => {
    const res = await fetch(`${baseUrl}/character/${id}`)
    const data = await res.json()

    return data
}

//TRAER TODO LOS PERSONAJES
// @param page = numero de pagina solicitada
const getCharacters = async (page = 1) => {
    const res = await fetch(`${baseUrl}/character/?page=${page}`)
    const data = await res.json()

    return data

}

//EXPORTO TODAS LAS FUNCIONAS
export { 
    getCharacter,
    getCharacters
}
//URL BASE
const baseUrl = "https://rickandmortyapi.com/api/character"

const container = document.querySelector("#characters");


//TRAER SOLO UN PERSONAJE
// @param id = numero del persona solicitado
const getCharacter = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`)
    const data = await res.json()
    return data
    
}

//TRAER TODO LOS PERSONAJES
// @param page = numero de pagina solicitada
const getCharacters = async (page) => {
    const res = await fetch(`${baseUrl}/?page=${page}`)
    const data = await res.json()

    return data

}

const getCharacterForFilter = async (name) => {

    const res = await fetch(`${baseUrl}/?name=${name}`)
    const data = await res.json()
    return data
    
}


//EXPORTO TODAS LAS FUNCIONAS
export { 
    getCharacter,
    getCharacterForFilter,
    getCharacters,
}
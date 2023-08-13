import { getCharacter } from "./data/getData.js";

const container = document.querySelector('#characters')
const loader = document.querySelector('.lds-facebook')

const id = localStorage.getItem('charId')

const listCharacter = async (id = 1) => {
    
    const data = await getCharacter(id)

    console.log(data);

    loader.style.display = "none"
 
    const article = document.createElement('article')

    article.innerHTML = `
    <div class="card card--personaje" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top" alt="imagen de ${data.name}">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="${data.status}">${data.status} - ${data.species}</p>
            <p>Genero: ${data.gender}</p>
            <p>Localizacion: ${data.location.name}</p>
            <p class="">Origen: ${data.origin.name}</p>
        </div>
    </div>
`

    container.appendChild(article)
}

listCharacter(id);
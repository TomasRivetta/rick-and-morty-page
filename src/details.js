import { getCharacter } from "./data/getData.js";

const container = document.querySelector('#characters')
const loader = document.querySelector('.lds-facebook')

const id = localStorage.getItem('charId')

const listCharacter = async (id = 1) => {
    
    const data = await getCharacter(id)

    console.log(data);

    loader.style.display = "none"
 
    const article = document.createElement('article')
    article.setAttribute('class','container-character')
    
    article.innerHTML = `


        <div class="container-character">
            <div class="container-img">
                <img src="${data.image}" class="character-img" alt="imagen de ${data.name}">
            </div>

            <div class="info-card">
                <div>
                    <h1 class="">${data.name}</h1>
                </div>
                
                <div>
                    <p class="${data.status}">${data.status} - ${data.species}</p>
                    <p>Genero: ${data.gender}</p>
                    <p>Localizacion: ${data.location.name}</p>
                    <p>Origen: ${data.origin.name}</p>
                </div>

            </div>
        </div>
    `

    container.appendChild(article)
}

listCharacter(id);
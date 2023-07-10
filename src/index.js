import { getCharacters } from "./data/getData.js";

const container = document.querySelector('#characters')

const loader = document.querySelector('.lds-facebook')

const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

let contador = 1;

const listCharacters = async (page = 1) => {
    
    const { results } = await getCharacters(page)

    //para que una vez que traiga toda la info se vaya el loader,
    //Lo muestra hasta que traiga la informacion
    loader.style.display = "none"

    results.forEach(character => {
        
        const article = document.createElement('article')
        article.setAttribute('class','container-tarjeta')

        article.innerHTML = `
            <div class="container-character">
                <div class="container-img">
                    <img src="${character.image}" class="character-img" alt="imagen de ${character.name}">
                </div>

                <div class="info-card">
                    <div>
                        <h1 class="">${character.name}</h1>
                    </div>
                    
                    <div>
                        <p class="">${character.status} - ${character.species}</p>
                        <p class="">${character.origin.name}</p>
                    </div>

                    <div>
                        <a href="/#/${character.id}" class="">Ver detalle</a>
                    </div>

                </div>
            </div>
        `

        container.appendChild(article)

    });
}

listCharacters();

//EVENTO QUE SE ACTIVA CUANDO HAY CAMBIO EN LA URL
window.addEventListener('hashchange', () => {
    //                      quita el primer caracter y ademas divide en un array
    const id = location.hash.slice(1).toLocaleLowerCase().split('/')[1];
    //guardar en el localStora el id del character
    localStorage.setItem('charId',id)
    //la siguiente linea me manda al pages de caracter
    window.location.replace('/pages/character.html')
})

// //PAGINACION
next.addEventListener('click', () =>{
    contador++
    listCharacters(contador);
})

prev.addEventListener('click', () =>{
    contador--
    listCharacters(contador);
})
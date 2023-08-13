import {getCharacters,getCharacterForFilter } from "./data/getData.js";


const container = document.querySelector('#characters')

const loader = document.querySelector('.lds-facebook')

const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

const btnSearch = document.querySelector(".btnSearch")

let contador = 1;

const listCharacters = async (page = 1) => {

    const { results } = await getCharacters(page)

    //para que una vez que traiga toda la info se vaya el loader,
    //Lo muestra hasta que traiga la informacion
    loader.style.display = "none"

    container.innerHTML = "";

    results.forEach(character => {

        const article = document.createElement('article')
        article.setAttribute('class', 'container-tarjeta')

        article.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${character.image}" class="card-img-top" alt="imagen de ${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="">${character.status} - ${character.species}</p>
                <p class="">${character.origin.name}</p>
            <a href="/#/${character.id}" class="btn-detail btn btn-secondary">Ver detalle</a>
            </div>
        </div>`

        container.appendChild(article)


    });
}

listCharacters();

//EVENTO QUE SE ACTIVA CUANDO HAY CAMBIO EN LA URL
window.addEventListener('hashchange', () => {
    //                      quita el primer caracter y ademas divide en un array
    const id = location.hash.slice(1).toLocaleLowerCase().split('/')[1];
    //guardar en el localStora el id del character
    localStorage.setItem('charId', id)
    //la siguiente linea me manda al pages de caracter
    window.location.replace('/pages/character.html')
})

//FILTRAR LOS PERSONAJES POR NOMBRE
const mostrar = async (name) => {

    contador = 1;

    container.innerHTML = "";

    loader.style.display = "inline-block";

    try {
        const { results, info } = await getCharacterForFilter(name)

        console.log(info);

        console.log(info.next);
        console.log(info.prev);

        if (info.count > 0) {

            loader.style.display = "none";

            results.forEach(character => {

                const article = document.createElement('article')
                article.setAttribute('class', 'container-tarjeta')

                article.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${character.image}" class="card-img-top" alt="imagen de ${character.name}">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="">${character.status} - ${character.species}</p>
                        <p class="">${character.origin.name}</p>
                    <a href="/#/${character.id}" class="btn-detail btn btn-primary">Ver detalle</a>
                    </div>
                </div>`
                container.appendChild(article)

            });
        }

    } catch (error) {
        console.log(error);
        swal({
            icon: "error",
            title: "No existe el personaje Buscado!",
        });
        next.style.display = "none";
        prev.style.display = "none";
    }

}

btnSearch.addEventListener("click", () => {
    const valorSearchInput = document.querySelector(".txtSearch").value
    mostrar(valorSearchInput);
    document.querySelector(".txtSearch").value = "";
    next.style.display = "inline-block";
    prev.style.display = "inline-block";
})

//PAGINACION
next.addEventListener('click', () => {
        if (contador > 42) {
            swal({
                icon: "error",
                title: "Llego al maximo de paginas!",
            });
        } else {
            contador++
            listCharacters(contador);
        }
    })

prev.addEventListener('click', () => {
        if (contador == 1) {
            swal({
                icon: "error",
                title: "No se puede retroceder!",
            });
        } else {
            contador--
            listCharacters(contador);
        }
    })
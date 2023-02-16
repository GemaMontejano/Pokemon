const carta = document.querySelector('[data-carta]');//creamos las constantes
const pokemonNombre = document.querySelector('[data-pokemonNombre]');// ponemos atributos data en el HTML a los elemntos para poder buscarlos aquí y poder utilizarlos.
const pokemonImg = document.querySelector('[data-pokemonImg]');// el querySelector nos devuelve el primer elemento coincidente con el selector dado.
const ImgContainer = document.querySelector('[data-img-container]');
const pokemonID = document.querySelector('[data-pokemonID]');
const pokemonTipos = document.querySelector('[data-pokemonTipos]');
const pokemonHabilidades = document.querySelector('[data-pokemonHabilidades]');



const buscarPokemon = event => {//con esta funcion conectamos con la API y nos devuelve los datos
    event.preventDefault();//cuando hacemos submit, por defecto se envía el form y se hace una nueva carga de la página.Con preventDefault evitamos esto
    const { value } = event.target.pokemon;//el valor del input lo obtenemos de event.target.pokemon porque dentro del event, tenemos un input al que hemos llamado pokemon en el HTML.
    const spinner = document.getElementById('cargar');// Creamos el spinner y lo mostramos por pantalla cuando se inicie el evento
    spinner.style.display = 'block';
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)//Aquí conectamos con la Api y obtenemos los datos del pokemon que se corresponden con el value del input.
        .then(data => data.json())//accedemos a la data del archivo.json de la Api.
        .then(response => mostrarPokemon(response))// mostramos los resultados de la función mostrarpokemon si la respuesta es correcta
        .catch(err => noEncontrado()) //si la respuesta da error, mostramos la funcion noEncontrado
        .finally(spinner.style.display = 'none')//escondemos el spinner cuando ha finalizado el evento.
}

const mostrarPokemon = data => {// esta función nos devuelve los datos almacenados como sprites que son nombre e imagen, los tipos y las stats que contienen las habilidades.
    const sprite = data.sprites.front_default;//los sprites son las imágenes del pokemon y cogemos la que viene en la Api como default.
    const { stats, types } = data;//de aquí vamos a coger los stats y los tipos que los cogemos directamente data de la Api.
    pokemonNombre.textContent = data.name; //nos muestra el name que viene en la data.
    pokemonImg.setAttribute('src', sprite);//para la imagen le damos un atributo source y utilizamos la imagen que contiene el sprite, seleccionada anteriormente.
    pokemonID.textContent = `Nº ${data.id}`;// ponemos un textContent de número y cogemos el id de la data para que nos lo muestre.
    tipos(types);// llamamos a las funcione stipo y habilidades para que nos muestre los datos.
    habilidades(stats);
}




const tipos = types => {//iteramos por cada uno de los tipos que tenga el pokémon(que pueden ser uno o dos).
    pokemonTipos.innerHTML = '';//le quitamos el contenido que tenga de una búsqueda anterior para poner los nuevos.
    types.forEach(type => {
        const typeTextElement = document.createElement("div");//creamos un nuevo elemento para el tipo al que le damos el nombre del type.type.name de la data.
        typeTextElement.textContent = type.type.name;
        pokemonTipos.appendChild(typeTextElement);//Si tiene dos tipos nos saldrán los dos y si tiene solo uno, devolverá uno
    });
}

const habilidades = stats => {//iteramos, nos devuelve todos los datos de las habilidades que coge de la API y borra los anteriores.
    pokemonHabilidades.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");//creamos los elementos del stat, del nombre y del valor de la habilidad.
        const statElementName = document.createElement("div"); //el nombre de la habilidad
        const statElementAmount = document.createElement("div"); // el valor de la habilidad
        statElementName.textContent = stat.stat.name;// así es como está nombrado en la API
        statElementAmount.textContent = stat.base_stat;// así es como está nombrado en la API
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonHabilidades.appendChild(statElement);//le hacemos los appendChild para que nos muestre los valores de cada habilidad, tantas veces como habilidades por el bucle.
    });
}
const noEncontrado = () => {//cuando escribimos algo erróneo, nos devuelve el mensaje y la imagen que hemos seleccionado.
    pokemonNombre.textContent = 'Pokémon no encontrado';//en el nombre nos muestra el mensaje de error.
    pokemonImg.setAttribute('src', 'PokeBall2.png');//ponemos una imagen por defecto y el resto de atributos se dejan vacíos.
    pokemonTipos.innerHTML = '';
    pokemonHabilidades.innerHTML = '';
    pokemonID.textContent = '';
}

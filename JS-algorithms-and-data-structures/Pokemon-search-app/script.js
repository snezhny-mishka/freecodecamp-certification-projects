const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const outputContainer = document.getElementById("output-container");
const userInputForm = document.getElementById("user-input-container");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imageContainer = document.getElementById("img-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchData = async () => {
   const userInput = input.value.toLowerCase();
    try {
      const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
      const data = await res.json();
    pokemonUrl = findPokemonURL(data.results, userInput); 
    fetchPokemonInfo(); 
    } catch (err) {
        console.log(err);
    }
  };

const findPokemonURL = (arr, input) => {
    let pokemonUrl = "";
    arr.map(el => {
        const {id, name, url} = el;
        if (input === name || Number(input) === id) {
            pokemonUrl = `${url}`;
        } 
    });
    return pokemonUrl;
}

const fetchPokemonInfo = async () => {
    try {
        const res = await fetch(`${pokemonUrl}`);
        const data = await res.json();
        displayData(data);
    } catch (err) {
        alert("Pokémon not found");
        clearData();
    }
};

const displayData = (data) => {
    pokemonName.innerText = `${(data.name).toUpperCase()}`;
    pokemonId.innerText = `#${data.id}`;
    weight.innerText = `Weight: ${data.weight}`;
    height.innerText = `Height: ${data.height}`;
    imageContainer.innerHTML = `
        <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}'s picture"/>
    `;
    types.innerHTML = data.types.map(el => `<span class="type ${el.type.name}">${el.type.name.toUpperCase()}</span>`).join(' ');
    hp.innerText = `${data.stats[0].base_stat}`;
    attack.innerText  = `${data.stats[1].base_stat}`;
    defense.innerText  = `${data.stats[2].base_stat}`;
    specialAttack.innerText  = `${data.stats[3].base_stat}`;
    specialDefense.innerText  = `${data.stats[4].base_stat}`;
    speed.innerText  = `${data.stats[5].base_stat}`;
}

const clearData = () => {
    pokemonName.innerText = "";
    pokemonId.innerText = "";
    weight.innerText = "";
    height.innerText = "";
    document.getElementById("sprite").remove();
    types.innerText = "";
    hp.innerText = "";
    attack.innerText  = "";
    defense.innerText  = "";
    specialAttack.innerText  = "";
    specialDefense.innerText  = "";
    speed.innerText  = "";
}

userInputForm.addEventListener("submit", e => {
    e.preventDefault();
    fetchData();
    }
);









  



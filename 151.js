const list = document.querySelector('#results');
let pokeName = "";
let score = 0;

// ajouter l'image du pokémon à la page
const insertPokemon = (data) => {
    const hiScore = JSON.parse(localStorage.getItem('pokeScore1')) || 0;
    const pokeTag = `<div class="score-info">
      <p class="score">${score} -- High ${hiScore}</p>
      </div>
      <div class="text-center">
      <img class="pokeImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="Pokemon image" />
      </div>`;
    list.insertAdjacentHTML('beforeend', pokeTag);
    if(data.names[3].language.name === "fr") {
      pokeName = data.names[3].name.toLowerCase();
    } else if (data.names[4].language.name === "fr") {
      pokeName = data.names[4].name.toLowerCase();
    }
}

// affichage du score sur en titre
const displayScore = () => {
  if(score == 0) {
    document.title = `Pas encore de bonne réponses ! Tu vas y arriver`;
  } else if(score == 1) {
    document.title = `Bravo ! Déjà une bonne réponse !`;
  } else {
    document.title = `Bravo ! ${score} bonnes réponses !`;
  }
}

// ajouter une aide avec le nombre de lettres du nom
const insertPokemonName = (data) => {
      const len = pokeName.length
      pokeHide = "_ ".repeat(len);
      const pokName = `<div class="info">
      <p class="pokehide text-center w-100">${pokeHide}(${(len)})</p>
      </div>`;
    list.insertAdjacentHTML('beforeend', pokName);
}

// le fetch
const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${query}`)
    .then(response => response.json())
    .then(insertPokemon)
    .then(insertPokemonName);
};

// au chargement de la page, il y a le premier test
window.addEventListener("load", fetchPokemon(Math.floor(Math.random() * 151)));


const answer = document.querySelector('#answer-form');

// prevent enter to reload
answer.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

// l'écouteur de réponse et la réinitialisation
answer.addEventListener('keyup', (event) => {
  event.preventDefault();
  const input = document.querySelector('#answer-input');
  if (input.value.toLowerCase() === pokeName) {
    score++;
    if(score > hiScore) {
      localStorage.setItem('pokeScore1', JSON.stringify(score));
    }
    list.innerHTML = '';
    pokeName = ""
    fetchPokemon(Math.floor(Math.random() * 151));
  }
});

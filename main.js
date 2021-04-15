const list = document.querySelector('#results');
let pokeName = "";
let score = 0;

const insertPokemon = (data) => {
      const pokeTag = `
      <p class="score">${score}</p>
      <div class="text-center">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="Pokemon image" />
      </div>`;
    list.insertAdjacentHTML('beforeend', pokeTag);
    if(data.names[3].language.name === "fr") {
      pokeName = data.names[3].name;
    } else if (data.names[4].language.name === "fr") {
      pokeName = data.names[4].name;
    }
}

const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${query}`)
    .then(response => response.json())
    .then(insertPokemon);
};

window.addEventListener("load", fetchPokemon(Math.floor(Math.random() * 898)));
// fetchPokemon(Math.floor(Math.random() * 898)); // on 1st page load

const answer = document.querySelector('#answer-form');
// prevent enter to relaod
answer.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

answer.addEventListener('keyup', (event) => {
  event.preventDefault();
  const input = document.querySelector('#answer-input');
  if (input.value === pokeName) {
    score++;
    list.innerHTML = '';
    fetchPokemon(Math.floor(Math.random() * 898));
  }
});

const list = document.querySelector('#results');
let pokeName = "";
let score = 0;

const insertPokemon = (data) => {
      const pokeTag = `
      <h3 class="score">${score}</h3>
      <li class="text-center">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="Pokemon image" />
      </li>`;
    list.insertAdjacentHTML('beforeend', pokeTag);
    pokeName = data.name;
}

const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => response.json())
    .then(insertPokemon);
};

fetchPokemon(Math.floor(Math.random() * 898)); // on 1st page load

const answer = document.querySelector('#answer-form');

answer.addEventListener('keyup', (event) => {
  event.preventDefault();
  const input = document.querySelector('#answer-input');
  if (input.value === pokeName) {
    score++;
    list.innerHTML = '';
    fetchPokemon(Math.floor(Math.random() * 898));
  }
});

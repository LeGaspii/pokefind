const list = document.querySelector('#results');

const insertPokemon = (data) => {
      const pokeTag = `<li class="text-center">
      <h3>${data.name}</h3>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="Pokemon image" />
      </li>`;
    list.insertAdjacentHTML('beforeend', pokeTag);
}

const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => response.json())
    .then(insertPokemon);
};

fetchPokemon(Math.floor(Math.random() * 898)); // on 1st page load

const form = document.querySelector('#search-form');

form.addEventListener('keyup', (event) => {
  event.preventDefault();
  list.innerHTML = '';
  const input = document.querySelector('#search-input');
  fetchPokemon(input.value);
});

const list = document.querySelector('#results');

const insertPokemon = (data) => {
      const pokeTag = `<li>
      <img src="${data.sprites.other.dream_world.front_default}" alt="Pokemon image" />
      <p>${data.name}</p>
    </li>`;
    list.insertAdjacentHTML('beforeend', pokeTag);
}

const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => response.json())
    .then(insertPokemon);
};

fetchPokemon(Math.floor(Math.random() * 118)); // on 1st page load

const form = document.querySelector('#search-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  list.innerHTML = '';
  const input = document.querySelector('#search-input');
  fetchPokemon(input.value);
});

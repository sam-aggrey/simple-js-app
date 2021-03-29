// New pokemonRepository IIFE
let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=99';

// Function to get the Pokémon’s details from the server
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

// Function for showModal with Bootstrap
  function showModal(pokemon) {
    // Add Pokemon name/title
    let modalTitle = document.querySelector('.modal-title');
    //modalTitle.innerHTML = ''; //to reset
    modalTitle.innerText = pokemon.name;

    // Add Pokemon details/content in the body
    let modal = document.querySelector('.modal-body');
    modal.innerHTML = '';

    let heightElement = document.createElement('p');
    heightElement.innerText = 'H: ' + pokemon.height + 'm';

    let weightElement = document.createElement('p');
    weightElement.innerText = 'W: ' + pokemon.weight + 'kg';

    let typesElement = document.createElement('p');
    typesElement.innerText = pokemon.types;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.style.height = '200px';

    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modal.appendChild(pokemonImage);
    modalContainer.classList.add('is-visible');
  }

// Function to close the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
    //if (window.confirm('Do you really want to close this?'));
  }

  // hiding the modal if it’s actually visible (with ESC key)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

// Function to add pokemon to the pokemonList - with data-type check
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('you need an object');
    }
  }

// Function to return pokemonList
  function getAll() {
    return pokemonList;
  }

// Function to filter array of objects
  function filterPokemon(value, property) {
    return pokemonList.filter(function (currentElement) {
      return currentElement[property] === value;
    });
  }

// Function to add items on the list with button for each item
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('col-12');
    listpokemon.classList.add('col-sm-4');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-outline-secondary');
    button.classList.add('btn-block');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

// Function to load pokemon list from pokeapi
function loadList() {
  showLoadingMessage();
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
              //Capitalize the first letter of each pokemonName
        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        detailsUrl: item.url
      };
      add(pokemon);
    });
    hideLoadingMessage();
  }).catch(function (e) {
    console.error(e);
    hideLoadingMessage();
  })
}

// Function to load details of Pokemon
function loadDetails(item) {
  showLoadingMessage();
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.other.dream_world.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = [];
      details.types.forEach(function(pokemon){
        item.types.push(pokemon.type.name.charAt(0).toUpperCase()+ pokemon.type.name.slice(1))
      })
      hideLoadingMessage();
  }).catch(function (e) {
    console.error(e);
    hideLoadingMessage();
  });
}

// Function to add loading message
function showLoadingMessage() {
  let message = document.querySelector('#loadingmessage');
  message.classList.add('is-visible');
}

function hideLoadingMessage() {
  let message = document.querySelector('#loadingmessage');
  message.classList.remove('is-visible');
}

  // Get input element and add event listener
  let searchfield = document.getElementById('pokemon-search');
  searchfield.addEventListener('keyup', search);

  function search() {
    // Declare variables
    let input, filter, li, list, button, txtValue;
    input = document.getElementById('pokemon-search');
    filter = input.value.toUpperCase();
    list = document.querySelector('.pokemon-list');
    li = list.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
      for (let i = 0; i < li.length; i++) {
      console.log(li);
      button = li[i].getElementsByTagName('button')[0];
      txtValue = button.textContent || button.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
      } else {
          li[i].style.display = 'none';
      }
    }
  }

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
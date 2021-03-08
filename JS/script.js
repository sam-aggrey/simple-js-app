let pokemonRepository = (function () {
  let pokemonList=[];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon //&&
      //"height" in pokemon &&
      //"types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
    
     function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

    
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function addListItem(pokemon){
    /* created a variable and assigned it to the class Pokemon-list which can be found in the html */
    let pokemonList = document.querySelector(".pokemon-list");
    /* Created a variable and assigned it to the new variable created which is li */
    let listpokemon = document.createElement("li");
    /* Created a button and with a name button */
    let button = document.createElement("button");
    /* Added the name of the pokemon to the button */
    button.innerText = pokemon.name;
    /* Add the class for the button which you have also styled using css */
    button.classList.add("button-class");
    /* put the button inside the li */
    listpokemon.appendChild(button);
    /* put the li inside the ul created */
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
      
  }
   function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}
    
   
   
   
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
   
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

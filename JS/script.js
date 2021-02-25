let pokemonRepository = (function () {
  let pokemonList=[
    
    {
        name: 'Charmander',
        height:0.6,
        type:["Monster", "Dragon"]
    },
    
    {
       name: 'Bulbasaur',
        height:0.7,
        type:["Monster", "Grass"]
    },
    
    {
        name: 'Blastoise',
        height:0.6,
        type:["Monster", "Water 1"]
    },
    
    {
        name: 'Ivysaur',
        height:1,
        type:["Monster", "Grass"]
    },
    
    {
        name: 'Venusaur',
        height:2,
        type:["Monster", "Grass"]
    },
    
    {
        name: 'Charizard',
        height:1.7,
        type:["Monster", "Dragon"]
    },
    
     {
        name: 'Nidoking',
        height:1.4,
        type:["Monster", "Field"]
    },
    
     {
        name: 'Nidorino',
        height:0.9,
        type:["Monster", "Field"]
    },
    
     {
        name: 'Charmeleon',
        height:1.1,
        type:["Monster", "Dragon"]
    },
    
    
    
];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
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
    
    function showDetails(pokemon){
      
        console.log(pokemon.name);
        
    }
   
   
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
   
  };
})();

pokemonRepository.add({ name: 'Ferrothorn', height: 1, types:['grass', 'mineral'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

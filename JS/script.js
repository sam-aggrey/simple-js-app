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

// IIFE pokemonRepository
let pokemonRepository = (function () {
   return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();

  pokemonRepository.add({ name: 'Ferrothorn', height: 1, types:['grass', 'mineral'] });
  pokemonRepository.getAll(); 

  // IIFE function to loop through the  pokemonList array 
(function () {
    pokemonList.forEach(function(pokemon) {
        let pokemonName = pokemon.name
        let pokemonHeight = pokemon.height
        /* This checks to see if a pokemon height is greater than or equal to 2 the add wow, that's big. Otherwise it should just print theri names and hight */
        if(pokemonHeight >= 2) {
            document.write("<p>" + pokemonName + ' (height : ' + pokemonHeight + ')' + ' - Wow, that\'s big!' + "</p>"); 
        } else {
            document.write("<p>" + pokemonName + ' (height : ' + pokemonHeight + ')' + "</p>"); 
        }
            
        });
})();





 



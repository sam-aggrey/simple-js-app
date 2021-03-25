let pokemonRepository = (function () {

  // Placed in the IIFE to make it accessible to all functions 
      let modalContainer = document.querySelector('#modal-container');
      let pokemonList=[];
      let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

      function add(pokemon) {

                  if (typeof pokemon === "object" && "name" in pokemon){

                      pokemonList.push(pokemon);
                  }else {
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
            detailsUrl: item.url,

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
        item.weight = details.weight;
      }).catch(function (e) {
        console.error(e);
      });
    }
      
      
      function addListItem(pokemon){
      /* created a variable and assigned it to the class Pokemon-list which can be found in the html */
      let pokemonList = document.querySelector(".list-group");
      /* Created a variable and assigned it to the new variable created which is li */
      let listpokemon = document.createElement("li");
      /* Created a button and with a name button */
      let button = document.createElement("button");
        button.classList.add('btn','btn-outline-secondary');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
     
        
        
    // Add Pokemon details/content in the body
      button.innerText = pokemon.name;
      /* Add the class for the button which you have also styled using css */
     // button.classList.add("btn-outline-secondary");
      
      listpokemon.classList.add("group-list-item");

      /* put the button inside the li */
      listpokemon.appendChild(button);
      /* put the li inside the ul created */
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click',  function () {
     showDetails(pokemon);
      });

    }
      
 //Function to enable specifying a title and content
    function showModal(pokemon) {
     
        let modal = document.querySelector('.modal-body');
          //clear the modal
        modal.innerHTML = '';
        let title = document.querySelector('.modal-title');
        title.innerHTML = pokemon.name;
        
        //display pokemon height
        let height = document.createElement("p");
        height.innerText = 'pokemon height: ' + pokemon.height;
        modal.appendChild(height);
        
        let weight = document.createElement("p");
        weight.innerText = 'pokemon weight: ' + pokemon.weight;
        modal.appendChild(weight);
        
        //element to display pokemon image
       let img = document.createElement("img");
       //attribute for the pokemon image
       img.setAttribute("src", pokemon.imageUrl);
       //attach image element to modal
       modal.appendChild(img);
   

    }
    
      
      function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal:showModal,
    };
  })();

  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
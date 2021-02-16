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



for (let i=0; i < pokemonList.length; i++){
    
// The loop first look for the statement in the first if statement and check if its true as iitialized above
// if true then run the code it should run the code in that bracket. If not true, then move to the next stamemet
    
  if (pokemonList[i].height < 2){
    document.write("<p>" + pokemonList[i].name + ": height is : " + pokemonList[i].height  +  " " + "</p>");

 }
//This will only run if the statement above is not true or if some part of the statement applies here. Which is any height taller than 2
  else {
    document.write(pokemonList[i].name + ": height is : " + pokemonList[i].height +  " - Wow! that is big. " + " ");
  }
}

 



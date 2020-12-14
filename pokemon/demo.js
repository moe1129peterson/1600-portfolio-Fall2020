const typesAPI = 'https://pokeapi.co/api/v2/type/';
const pokemonGrid = document.querySelector('.pokemonGrid');

// Inits on page load. Populates the type and limit picklists.
const initOptions = function (url, max, min) {

  // Get the types of pokemon and adds them to the picklist.
  axios.get(url).then((res) => {
    let pickListType = document.getElementById('type');
    let list = res.data.results;
    for (let i = 0; i < list.length; i++) {
      let option = document.createElement('option');
      option.text = list[i].name;
      option.value = list[i].name;
      pickListType.add(option);
    };
  }).catch((err) => {
    console.log(err);
  });

  // Populates the limit picklist.
  let pickListLimit = document.getElementById('limit');
  for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.text = i;
    option.value = i;
    pickListLimit.add(option);
  };

  // Populate event listener on button.
  let button = document.getElementById('popCards');
  button.addEventListener('click', () => {
    popCards(getInput());
  });

}(typesAPI, 50, 10);

// Get input from the DOM.
function getInput() {
  let input = {
    type: document.getElementById('type').value,
    limit: document.getElementById('limit').value
  }
  return input;
};

// Gets a list of pokemon based on the users selection 
const getPokemon = function (url, type, quantity) {
  let results = [];
  let selectedType;

  // Get json data of pokemon types.
  axios.get(url).then((res) =>{
    let outerList = res.data.results;
    for (let i = 0; i < outerList.length; i++) {

      // Iterate through each pokemon type and push all pokemon to the results array.
      if (type == 'all') {
        let iteration = outerList[i];
        axios.get(iteration.url).then((res) => {
          let innerList = res.data.pokemon;
          for (let ii = 0; ii < innerList.length; ii++) {
            if (ii < quantity) {
              axios.get(innerList[ii].pokemon.url).then((res) => {
                if (res.data.sprites.front_default) {
                  let pokemon = {
                    img: res.data.sprites.front_default, 
                    name: res.data.name,
                    weight: res.data.weight, 
                    height: res.data.height
                  };
                  results.push(pokemon);
                };
              }).catch((err) => {
                console.log(err);
              });
            };
          };
        }).catch((err) => {
          console.log(err);
        });
      };

      // Push pokemon from the selected type only into the results array.
      if (type == outerList[i].name) {
        selectedType = outerList[i]; 
        axios.get(selectedType.url).then((res) => {
          let innerList = res.data.pokemon;
          for (let ii = 0; ii < innerList.length; ii++) {
            if (ii < quantity) {
              axios.get(innerList[ii].pokemon.url).then((res) => {
                if (res.data.sprites.front_default) {
                  let pokemon = {
                    img: res.data.sprites.front_default, 
                    name: res.data.name,
                    weight: res.data.weight, 
                    height: res.data.height
                  };
                  results.push(pokemon);
                };
              }).catch((err) => {
                console.log(err);
              });
            };
          };
        }).catch((err) => {
          console.log(err);
        });
      };
    };
  }).catch((err) => {
    console.log(err);
  });
  return results;
}; 

const popCards = async (input) => {

  const deck = await getPokemon(typesAPI, input.type, input.limit);

  setTimeout(function() { buildDeck(deck) }, 1000);
  
  // Clear the grid of all previous content.
  const clearGrid = function() {
    while (pokemonGrid.firstChild) {
      pokemonGrid.removeChild(pokemonGrid.lastChild);
    };
    console.log('Grid cleared!');
  }();

  // Populate the front of the card.
  function popCardFront(pokemon) {
    let cardFront = document.createElement('div');
    cardFront.className = `card__face card__face--front`;
    let frontLabel = document.createElement('p');
    let frontImage = document.createElement('img');
    frontLabel.textContent = pokemon.name;
    frontImage.src = pokemon.img;
    cardFront.appendChild(frontImage);
    cardFront.appendChild(frontLabel);
    return cardFront;
  };

  // Popuate the back of the card.
  function popCardBack(pokemon) {
    let cardBack = document.createElement('div');
    cardBack.className = 'card__face card__face--back';
    let heightLabel = document.createElement('h3');
    let weightLabel = document.createElement('h3');
    heightLabel.textContent = pokemon.height;
    weightLabel.textContent = pokemon.weight;
    cardBack.appendChild(heightLabel);
    cardBack.appendChild(weightLabel);
    return cardBack;
  };

  const buildDeck = async (array) => {
    let list = await array;
    console.log(list)
    for (let i = 0; i < list.length; i++) {
      let pokeScene = document.createElement('div');
      pokeScene.className = 'scene';
      let pokeCard = document.createElement('div');
      pokeCard.className = 'card';
      pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
      });

      pokeCard.appendChild(popCardFront(list[i]));
      pokeCard.appendChild(popCardBack(list[i]));
      pokeScene.appendChild(pokeCard);
      pokemonGrid.appendChild(pokeScene);
    };
  };
};
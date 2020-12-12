const typesAPI = 'https://pokeapi.co/api/v2/type/'

function getTypes(url, type) {
  axios.get(url)
  .then(function(response) {
    let list = response.data;
    let selectedType;
    for (i = 0; i < list.results.length; i++) {
      if (list.results[i].name == type) {
        selectedType = list.results[i];
      };
    };
    console.log(selectedType);
    getPokemon(selectedType.url);
  })
  .catch(function(error) {
    console.log(error);
  });

  function getPokemon(url) {
    axios.get(url)
    .then(function(response) {
      let list = response.data;
      console.log(list.pokemon);
    })
    .catch(function(error) {
      console.log(error);
    });
  };
};

getTypes(typesAPI, 'fire');
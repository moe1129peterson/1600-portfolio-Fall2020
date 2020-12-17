import { films } from '../data/films.js';

const data = films.filter((r, a) => r + (a >= 4 && a <= 6), 0);


const getMovies = function (array, amt = array.length) {
  let listContainer = document.getElementById('list-container');
  let oldUl = document.getElementById('list');
  oldUl.remove(); // Removes old ul list element.
  let newUl = document.createElement('ul'); // Creates new ul element.
  newUl.id = 'list';
  listContainer.appendChild(newUl); // Adds new ul element to the parent container.
  for (let i = 0; i < amt; i++) { // Loops through response data and creates a new list item for each data object.
    let a = array[i];
    let li = document.createElement('li');
    let poster = document.createElement('img');
    poster.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`;
    newUl.appendChild(li);
    li.appendChild(poster);
  };
};

const callThisThing = function (id) {
  console.log(id.id);
  if(id.id == 'orgTri') {
    getMovies(data, 3);
  } else if (id.id == 'allMov') {
    getMovies(data);
  };
};


export default callThisThing;
import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'
console.log(films[0]["title"])

const cards = document.getElementById("cards")
const main = document.querySelector("main")
//let filterTest = films.filter(x => x["episode_id"] >= 4 || <= 6)
let filterTest = films.filter((r, a) => r + (a >= 4 && a <= 6), 0)
//let reduceTest = films.reduce((r, a) => r + (["episode_id"] >= 4 && ["edpisode_id"] <= 6), 0)
console.log(filterTest)

for(let i = 0; i < films; i ++){
  console.log(films[i])
}

function buttonAction(array){
  console.log(array)
}

CreateButton("Original Trilogy",main,CreateCards,filterTest,3,"button")

CreateButton("All Films",main,CreateCards,filterTest,films.length,"button")


//CreateCards(films,3)

function CreateCards(array,iteration){
  let oldContent = document.getElementById('content');
  oldContent.remove();
  let newContent = document.createElement('div');
  newContent.id = 'content';
  cards.appendChild(newContent);
  for (let step = 0; step < iteration; step++) {

      //create DOM elements
      let figure = document.createElement('figure')
      let figImg = document.createElement('img')
      figImg.src = `https://starwars-visualguide.com/assets/img/films/${step + 1}.jpg` 
      let figCaption = document.createElement('figcaption')
      const foundFilm = films.find(film => parseInt(getLastNumber(film.url)) === (step + 1))
      figCaption.textContent = foundFilm.title


      //put it into HTML
      figure.appendChild(figImg);
      figure.appendChild(figCaption);
      newContent.appendChild(figure);
    }
}

/* for (const film of films) {
    let newImg = document.createElement('img') // new image instance
    newImg.src = 'https://starwars-visualguide.com/assets/img/films/2.jpg' // set the source of it or nothing will show
    // now append the image to the DOM somehow
    main.appendChild(newImg)
    console.log(film.title)
  } */


function CreateButton(text,appendto,onClickMethod,array,amt,className){
  let btnDiv = document.getElementById('btns');
  let myButton = document.createElement('button')//create button in DOM
  //create event listener for click event
  myButton.className = className
  myButton.addEventListener('click', ()=>{
    onClickMethod(array,amt)//thing to do when clicked. This is using an argument so you can do anything
  })
  myButton.textContent = text//pass in button text
  btnDiv.appendChild(myButton)//put button in your HTML so it's visible. The method lets you choose where to put it
};
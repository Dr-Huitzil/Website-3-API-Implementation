const express = require('express');
const app = express();
const fetch = require("node-fetch");
const pokemon = require('pokemon');
var Pokedex = require('pokedex');

app.set("view engine", "ejs");
app.use(express.static("public"));

//Home
app.get('/', async (req, res) => {
  
  let url = "https://zoo-animal-api.herokuapp.com/animals/rand";

  let response = await fetch(url);
  let data = await response.json();


  res.render('home', { "data": data });
});

//animal tracker
app.get('/tracker', async (req, res) => {

  var randomNumber = Math.floor(Math.random() * 10);
  let location = req.query.location;

  let url = `https://ufo-sightings.p.rapidapi.com/search/${location}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '466d0f71fcmshd7940c00be71801p17aef4jsn3b19d151e7be',
      'X-RapidAPI-Host': 'ufo-sightings.p.rapidapi.com'
    }
  };

  let response = await fetch(url, options);
  let data = await response.json();

  let randomCase = data.content[randomNumber];

  res.render('tracker', { "randomCase": randomCase });
});

//?
app.get('/unknown', async (req, res) => {
  let url = "https://zoo-animal-api.herokuapp.com/animals/rand";

  let response = await fetch(url);
  let data = await response.json();
  
  res.render('unknown', { "data": data });
});

//something api
app.get('/dog', async(req, res) => {
  let url = "https://baconipsum.com/api/?type=all-meat&paras=5&start-with-lorem=1"

  let response = await fetch(url);
  let data = await response.json();

  res.render('dog', {"data": data});
});

//pokemon 
app.get('/cat', async(req, res) => {
  var randomID = Math.floor(Math.random() * 900);
  var randomNum = Math.floor(Math.random() * 759) + 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${randomID}/`;
  pokedex = new Pokedex();
  console.log(pokedex.pokemon(randomNum));

  let response = await fetch(url);
  let data = await response.json();

  pokemonInfo = pokedex.pokemon(randomNum);

  res.render('cat', {"data": pokemonInfo});
  
});


app.listen(3000, () => {
  console.log('server started');
});

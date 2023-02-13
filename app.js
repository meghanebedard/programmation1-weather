const key = "9f951321b1547740990c0fddbf0176c9"; // cle de l'API

let btnSearch = document.getElementById("btn-search");
let searchBar = document.getElementById("search-bar");

btnSearch.addEventListener("click", () => {
  weatherBallon(searchBar.value);
});

function handleKey(event) {
  let keyPress = event.keyCode || event.which;
  if (keyPress == 13) {
    weatherBallon(searchBar.value);
  }
}

// function weatherBallon(cityID) {
function weatherBallon(cityName) {
  // fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=metric&appid=' + key)
  if (searchBar.value !== "") {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=fr&units=metric&appid=" + key)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); // afficher les informations de l'API
        drawWeather(data); // Appel de la fonction drawWeather
      })
      .catch(function () {
        // recuperer les erreurs
        document.getElementById("description").innerHTML = "Veuillez entrer une ville existante.";
      });
  } else {
    document.getElementById("description").innerHTML = "Veuillez rechercher une ville.";
  }
};

function drawWeather(data) {
  let description = data.weather[0].description; // on recupere la description
  let icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

  document.getElementById("description").innerHTML = description + '<br/><img src="' + icon + '">'; // on affiche la description
  document.getElementById("temp").innerHTML = data.main.temp + "&deg;"; // on affiche la temperature
  document.getElementById("location").innerHTML = data.name; // on affiche la temperature
}

// window.onload = function () {
//weatherBallon('6167865'); // on appel la fonction weatherBallon avec le numero de la ville "toronto"
//weatherBallon('Laval'); // on appel la fonction weatherBallon avec le nom de la ville "quebec"
// }

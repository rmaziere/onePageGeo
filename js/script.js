var map = L.map("map").setView([48.856578, 2.351828], 10);

var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(map);

var layerMarkers = [];
var persistant = true;

function makeHomeActive() {
  navRemoveActive();
  var el = document.querySelector(".navbar-nav a");
  el.parentNode.className = "active";
}

//Add Marker on Map click
map.on('click', function(e){
	reverseGeocodding(e.latlng["lat"], e.latlng["lng"]);
});

makeHomeActive();

function makeActive(event) {
  navRemoveActive();
  var el = event.target;
  var selector = event.target.hash;
  el.parentNode.className = "active";
}

function navRemoveActive() {
  if (document.getElementsByClassName("active").length > 0) {
    document.getElementsByClassName("active")[0].removeAttribute("class");
  }
}

document.getElementById("persistantMarkerY").addEventListener("click", persistantMarkerY);
document.getElementById("persistantMarkerN").addEventListener("click", persistantMarkerN);

function mapSetView(lat, long, zoom) {
  if (zoom === undefined) {
    zoom = 10;
  }
  map.setView([lat, long], zoom);
}

function addMarker(lat, long, label, iconChoice) {
  removeLayer(layerMarkers);

  var marker = L.marker([lat, long], {icon: iconChoice});
  layerMarkers.push(marker);
  marker.addTo(map).bindPopup(label).openPopup();

  mapSetView(lat, long);
}

function persistantMarkerY(event) {
  document.getElementById("persistantMarkerY").innerHTML = "<span>&check;</span>Persistant";
  document.getElementById("persistantMarkerN").innerHTML = "Non Persistant";
  persistant = true;
}

function persistantMarkerN(event) {
  document.getElementById("persistantMarkerY").innerHTML = "Persistant";
  document.getElementById("persistantMarkerN").innerHTML = "<span>&check;</span>Non Persistant";
  persistant = false;
}

function removeLayer(layerName) {
  if (layerName !== undefined && layerName.length > 0 && !persistant) {
    for (var i = 0; i < layerName.length; i++) {
      layerName[i].remove();
    }
  }
}

function showResultDiv(selector) {
  var parentNode = document.getElementById(selector);
  var newPEl = document.createElement("p");
  var newStrongEl = document.createElement("strong");
  newStrongEl.innerHTML = "Veuillez selectionner un resultat";
  newPEl.appendChild(newStrongEl);
  parentNode.appendChild(newPEl);
}

function removeResultDiv(selector) {
  var parentNode = document.getElementById(selector);
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function showAddress(selector, text) {
  removeAddress(selector);
  var el = document.getElementById(selector + "Result");
  var elTitle = document.createElement("strong");
  elTitle.innerHTML = "L'adresse correspondante est :<br>";
  el.appendChild(elTitle);
  el.innerHTML = el.innerHTML + text;
}

function removeAddress(selector) {
  var el = document.getElementById(selector + "Result");
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

//Locate Me
document.getElementById("locate").addEventListener("click", locateMe);

function locateMe() {
  navigator.geolocation.getCurrentPosition(function(position) {
    reverseGeocodding(position.coords.latitude, position.coords.longitude, "geolocator");
  });
}

function selectResult(event) {
  var node = document.getElementById("adresse");
  var parentNode = node.parentNode;
  parentNode.removeChild(node);

  var el = event.target;
  var label = el.innerHTML;
  var lat = el.attributes.lat.value;
  var long = el.attributes.long.value;

  var newNode = document.createElement("textarea");
  newNode.setAttribute("name", "adresse");
  newNode.setAttribute("id", "adresse");
  newNode.setAttribute("style", "max-height: 150px");
  newNode.innerHTML = label;
  parentNode.appendChild(newNode);

  removeResultDiv("geocodding_result");
  addMarker(lat, long, label, blueIcon);
}

//Géocodage
document.getElementById("submit_address").addEventListener("click", geocodding);

function geocodding() {
  if (document.getElementById("adresse").value != "") {
    var valeur_adresse = document.getElementById("adresse").value;

    // création de l'objet xhr
    var ajax = new XMLHttpRequest();

    // destination et type de la requête AJAX (asynchrone ou non)
    ajax.open("GET", "http://api-adresse.data.gouv.fr/search/?q=" + valeur_adresse, true);

    // métadonnées de la requête AJAX
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // evenement de changement d'état de la requête
    ajax.addEventListener("readystatechange", function(e) {

      // si l'état est le numéro 4 et que la ressource est trouvée
      if (ajax.readyState == 4 && ajax.status == 200) {
        removeResultDiv("geocodding_result");
        // le texte de la réponse
        var result = JSON.parse(ajax.responseText);
        var parentNode = document.getElementById("geocodding_result");

        if (result.features.length > 1) {
          showResultDiv("geocodding_result");

          var liste = "";
          for (var i = 0; i < result.features.length; i++) {
            var newAdresseEl = document.createElement("p");
            newAdresseEl.setAttribute("onclick", "selectResult(event)");
            newAdresseEl.setAttribute("lat", result.features[i].geometry.coordinates[1]);
            newAdresseEl.setAttribute("long", result.features[i].geometry.coordinates[0]);
            newAdresseEl.innerHTML = result.features[i].properties.label;

            parentNode.appendChild(newAdresseEl);
          }
        } else {
          var feature = result.features[0];
          removeResultDiv("geocodding_result");
          addMarker(feature.geometry.coordinates[1], feature.geometry.coordinates[0], "<strong>Géocodage</strong><br>" + feature.properties.label, blueIcon);
        }
      }
    });
    // envoi de la requête
    ajax.send();
  }
}

//Reverse Geocodding
document.getElementById("submit_coordinates").addEventListener("click", formatCoordinates);

function formatCoordinates() {
  if (document.getElementById("coordonnees").value != "") {
    var coord = document.getElementById("coordonnees").value;
    var masque = new RegExp("\\d+[.]{1}\\d+(\\s)?(,|;|\\s){1}(\\s)?\\d+.{1}\\d+");

    if (test = coord.match(masque)) {
      var separateur = "";
      if (test[3] !== undefined) {
        separateur = test[3] + separateur;
      }
      if (test[2] !== undefined) {
        separateur = test[2] + separateur;
      }
      if (test[1] !== undefined) {
        separateur = test[1] + separateur;
      }

      var coordinates = coord.split(separateur);
      var lat = coordinates[0];
      var lon = coordinates[1];
      reverseGeocodding(lat, lon, "reverseGeocodding");
    }
  }
}

function reverseGeocodding(latitude, longitude, module) {
  // création de l'objet xhr
  var ajax = new XMLHttpRequest();

  // destination et type de la requête AJAX (asynchrone ou non)
  ajax.open("GET", "http://api-adresse.data.gouv.fr/reverse/?lon=" + longitude + "&lat=" + latitude, true);

  // métadonnées de la requête AJAX
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // evenement de changement d'état de la requête
  ajax.addEventListener("readystatechange", function(e) {

    // si l'état est le numéro 4 et que la ressource est trouvée
    if (ajax.readyState == 4 && ajax.status == 200) {
      // le texte de la réponse
      var result = JSON.parse(ajax.responseText);

      if (result.features.length == 1) {
          var feature = result.features[0];
          var labelTextTitle = "";
          iconColor = blackIcon;

        if (module == "reverseGeocodding") {
          showAddress(module, feature.properties.label);
          labelTextTitle = "<strong>Géocodage inverse</strong><br>";
          iconColor = greenIcon;
        } else if (module == "geolocator") {
          showAddress(module, feature.properties.label);
          labelTextTitle = "<strong>Votre position</strong><br>";
          iconColor = redIcon;
        }
        addMarker(feature.geometry.coordinates[1], feature.geometry.coordinates[0], labelTextTitle + feature.properties.label, iconColor);
      }
    }
  });
  // envoi de la requête
  ajax.send();
}

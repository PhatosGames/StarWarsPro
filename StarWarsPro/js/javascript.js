
var mappaUrlPersonaggi;
var mappaUrlSpeci;

//Funzioni Utility
function funzioneFiltro(value) {
	return value != undefined;
}

function caricamento() {
	document.getElementById("content").innerHTML = "CARICAMENTO...";
}

// Funzioni Pianeti

function pianeti() {
	var htmlDaJson = mostraPianeti();
	htmlGen += "document.getElementById('" + "content" + "').innerHTML=" +
		htmlDaJson;
}

function mostraPianeti() {
	console.log("Pianeti!");
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la risposta");
			var planets = JSON.parse(this.responseText);
			planets = planets.results;
			var htmlGen = "";
			for (var c of planets) {
				htmlGen += "<p>" + c.name + " Popolazione:" + c.population
					+ " Gravita':" + c.gravity + "</p>";
			}
			document.getElementById("content").innerHTML = htmlGen;
		}
	};
	xmlhttp.open("GET", "https://swapi.co/api/planets/",
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata");
}


//Funzioni Personaggi

function personaggi() {
	var htmlDaJson = mostraPersonaggi();
	htmlGen += "document.getElementById('" + "content" + "').innerHTML=" +
		htmlDaJson;
}

function mostraPersonaggi() {
	console.log("Personaggi!");
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la risposta");
			var personaggi = JSON.parse(this.responseText);
			personaggi = personaggi.results;
			var htmlGen = "";
			mappaUrlPersonaggi = new Object();
			mappaUrlSpeci = new Object();

			var i = 0;
			for (var c of personaggi) {
				mappaUrlPersonaggi[i] = c.url;
				mappaUrlSpeci[i] = c.species;

				htmlGen += "<h2 onclick='caricamento();dettaglioPersonaggio(" + i + ")' >"
					+ "Nome: " + c.name + "</h2>"
					+ "<p> Compleanno:" + c.birth_year + " Colore Occhi:" + c.eye_color + " Gender:" + c.gender + "</p>"
					+ "<p><span style=" + '"font-size: 8pt; color: darkviolet; font-family: "arial black", "avant garde";"'
					+ ">click the name for more info</span></p>";
				i++;
			}
			document.getElementById("content").innerHTML = htmlGen;
		}
	};
	xmlhttp.open("GET", "https://swapi.co/api/people/",
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata");
}

function dettaglioPersonaggio(urlPersonaggio) {
	console.log("Personaggio!" + urlPersonaggio);
	console.log("Personaggi!" + mappaUrlPersonaggi[urlPersonaggio]);
	var promises = [];

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la risposta");
			var infoPersonaggio = JSON.parse(this.responseText); //personaggio
			var htmlGen = "";

			htmlGen += "</h1>Nome:" + infoPersonaggio.name + "</h1>"
				+ "<p>" + "Compleanno:" + infoPersonaggio.birth_year + "</p>"
				+ "<p>" + "Gender:" + infoPersonaggio.gender + "</p>";


			for (i in infoPersonaggio.films) {
				promises[i] = new Promise(function (resolve, reject) {
					getFilms(infoPersonaggio.films[i], resolve);
				})
			}
			promises[i + 1] = new Promise(function (resolve, reject) {
				getSpecies(infoPersonaggio.species[0], resolve);
			})



			Promise.all(promises).then(function (values) {
				console.log(values);
				var filtered = values.filter(funzioneFiltro);
				console.log(filtered);
				htmlGen += "<p>" + "Films:" + filtered + "</p>";
				document.getElementById("content").innerHTML = htmlGen;

			});


		}


	};
	xmlhttp.open("GET", mappaUrlPersonaggi[urlPersonaggio],
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata");


}

//Estrai Films 
function getFilms(urlFilm, resolve) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la rispostaha");
			var films = JSON.parse(this.responseText);
			var htmlFilms = "";
			htmlFilms += films.title;
			console.log(films.title);

			resolve(htmlFilms);
		}
	}

	xmlhttp.open("GET", urlFilm,
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata alle speci");

};

//	estraiSpecie(personaggio)
function getSpecies(urlSpecie, resolve) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la rispostaha");
			var specie = JSON.parse(this.responseText);
			htmlSpecie = "<p> Specie:" + specie.name + "</p>";
			resolve(htmlSpecie);
		}
	}

	xmlhttp.open("GET", urlSpecie,
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata alle speci");

};


//Funzioni Navi

function navi() {
	var htmlDaJson = mostraNavi();
	htmlGen += "document.getElementById('" + "content" + "').innerHTML=" +
		htmlDaJson;
}

function mostraNavi() {
	console.log("Navi!");
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la risposta");
			var navi = JSON.parse(this.responseText);
			navi = navi.results;
			var htmlGen = "";
			for (var c of navi) {
				htmlGen += "<p>" + "Name:" + c.name + " Model:"
					+ c.model + " HyperdriveRating:" + c.hyperdrive_rating + "</p>";
			}
			document.getElementById("content").innerHTML = htmlGen;
		}
	};
	xmlhttp.open("GET", "https://swapi.co/api/starships/",
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata");
}

//Funzioni Veicoli

function veicoli() {
	var htmlDaJson = mostraVeicoli();
	htmlGen += "document.getElementById('" + "content" + "').innerHTML=" +
		htmlDaJson;
}

function mostraVeicoli() {
	console.log("Veicoli!");
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Ho ricevuto la risposta");
			var navi = JSON.parse(this.responseText);
			navi = navi.results;
			var htmlGen = "";
			for (var c of navi) {
				htmlGen += "<p>" + "Nome:" + c.name
					+ " Modello:" + c.model + " Creatore:"
					+ c.manufacturer + "</p>";
			}
			document.getElementById("content").innerHTML = htmlGen;
		}
	};
	xmlhttp.open("GET", "https://swapi.co/api/vehicles/",
		true);
	xmlhttp.send();
	console.log("Ho mandato la chiamata");

}
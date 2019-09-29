var juegoP = (function (win, doc) {
	var click = function () {
		var card = doc.getElementsByClassName("card");
		for (var cont = 0; cont < card.length; cont++) {
			triggerClick(card[cont]);
		}
	};
	var triggerClick = function (card) {
		card.addEventListener("click", function () {

			if (this.classList.contains("turn")) {
				this.classList.remove("turn", "locked");
			} else {
				this.classList.add("turn", "locked");
			}
			if (doc.getElementsByClassName("turn").length == 2) {
				var card = doc.getElementsByClassName("card");
				for (var cont = 0; cont < card.length; cont++) {
					card[cont].classList.add("locked");
				}
				setTimeout(function () {
					var turn = doc.getElementsByClassName("turn");
					if (turn[0].getAttribute("data-pair") == turn[1].getAttribute("data-pair")) {

						turn[0].children[0].style.opacity = 0
						turn[0].children[1].style.opacity = 0
						turn[0].style.opacity = 0;
						turn[0].classList.add("locked");
						turn[0].setAttribute("data-show", 0);
						turn[1].children[0].style.opacity = 0
						turn[1].children[1].style.opacity = 0
						turn[1].style.opacity = 0;
						turn[1].classList.add("locked");
						turn[1].setAttribute("data-show", 0);


					}
					var card = doc.getElementsByClassName("card");
					for (var cont = 0; cont < card.length; cont++) {
						card[cont].classList.remove("locked");
					}
					for (var cont = 0; cont <= turn.length; cont++) {
						turn[0].classList.remove("turn");
					}
					var locked = doc.querySelectorAll(".card[data-show='0']");
					for (var cont = 0; cont < locked.length; cont++) {
						locked[cont].classList.add("locked");
					}

					var endGame = card.length - locked.length;
					if (endGame == 0) {
						doc.getElementsByClassName("endGame")[0].classList.add("show");
					}

				}, 1000);
			}
		}, false);
	};


	var cards = function (totalCards) {
		var iconosUsados = [];
		var posicionCartas = [];
		var html = "";
		for (var cont = 0; cont < totalCards; cont++) {

			html += "<div class='card' data-show='1'>";
			html += "<div class='pareja mostrarP'></div>";
			html += "<img src='img/carta.png' class='flip-1'/>";
			html += "</div>";

		}
		doc.body.getElementsByClassName("container")[0].innerHTML = html;
		for (var cont = 0; cont < totalCards; cont++) {
			posicionCartas[cont] = cont;
		}
		posicionCartas[cont] = posicionCartas.sort(function () {
			return Math.random() - 0.5;
		});
		posicionCartas.pop();
		for (var cont = 0; cont < totalCards; cont += 2) {

			var cardA = doc.getElementsByClassName("card")[posicionCartas[cont]];
			var cardB = doc.getElementsByClassName("card")[posicionCartas[cont + 1]];
			var salir = 0;
			var imgX = Math.floor((Math.random() * (5 * 4)));
			do {
				if (iconosUsados.indexOf(imgX) !== -1) {
					imgX = Math.floor((Math.random() * (5 * 4)));
				} else {
					iconosUsados.push(imgX);
					salir = 1;
				}
			} while (salir == 0);

			var X;
			var Y;
			if (imgX <= 38) {
				X = imgX;
				Y = 0;
			} else {
				Y = Math.round(imgX / 39);
				X = imgX - (Y * 39);
			}
			var pos = (X * 64) + "px " + (Y * 64) + "px";
			cardA.getElementsByClassName("pareja")[0].style.backgroundPosition = pos;
			cardB.getElementsByClassName("pareja")[0].style.backgroundPosition = pos;
			cardA.setAttribute("data-pair", cont);
			cardB.setAttribute("data-pair", cont);
		}
		click();

	}
	return {
		init: function () {
			cards(20); //NUmero de cartas a mostrar, la cantidad de cartas debe ser PAR.
		}
	};
}(window, document));

window.addEventListener("DOMContentLoaded", juegoP.init(), false);

function volverJugar(){
	window.location.reload();
}
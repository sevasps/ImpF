const palabras = {
  jugador: [
     "Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Erling Haaland", "Andrés Iniesta",
  "Neymar", "Luka Modrić", "Mohamed Salah", "Antoine Griezmann", "Virgil van Dijk",
  "Robert Lewandowski", "Karim Benzema", "Kevin De Bruyne", "Harry Kane", "Vinícius Jr",
  "Rodri", "Jude Bellingham", "Pedri", "Gavi", "João Félix",
  "Sadio Mané", "Son Heung-min", "Marcus Rashford", "Bruno Fernandes", "Casemiro",
  "Di María", "Paulo Dybala", "Thiago Silva", "Raphaël Varane", "Gerard Piqué",
  "Sergio Ramos", "Toni Kroos", "Phil Foden", "Declan Rice", "Frenkie de Jong",
  "Christian Pulisic", "Zlatan Ibrahimović", "Edinson Cavani", "Luis Suárez", "James Rodríguez",
  "Marco Reus", "Thomas Müller", "Ilkay Gündogan", "Achraf Hakimi", "Riyad Mahrez",
  "Lamine Yamal", "Alexis Mac Allister", "Julián Álvarez", "Martínez", "Busquets"
  ],
  club: [
    "Real Madrid", "FC Barcelona", "Manchester United", "Liverpool", "Chelsea",
  "Arsenal", "Manchester City", "Tottenham", "Bayern Múnich", "Borussia Dortmund",
  "Juventus", "AC Milan", "Inter de Milán", "Roma", "Napoli",
  "Paris Saint-Germain", "Olympique de Marsella", "Lyon", "Ajax", "Feyenoord",
  "Porto", "Benfica", "Sporting CP", "Galatasaray", "Fenerbahçe",
  "Besiktas", "Zenit", "Spartak Moscú", "RB Leipzig", "Leverkusen",
  "Sevilla", "Atlético de Madrid", "Valencia", "Villarreal", "Real Sociedad",
  "Boca Juniors", "River Plate", "Flamengo", "Palmeiras",
  "Al-Nassr", "Al-Hilal", "Shakhtar Donetsk", "Celtic", "Rangers"
  ],
  competicion: [
    "Champions League", "Mundial", "Eurocopa", "Copa América", "Premier League",
    "LaLiga", "Serie A", "Bundesliga", "Libertadores", "Nations League", "Ligue 1",
    "Europa League", "Mundial de Clubes", "Copa del Rey"
  ],
  pais: [
    "Argentina", "Brasil", "España", "Francia", "Alemania",
  "Inglaterra", "Italia", "Portugal", "Uruguay", "Países Bajos",
  "Bélgica", "Croacia", "Suiza", "Dinamarca", "Suecia",
  "Noruega", "Polonia", "Serbia", "Hungría", "Austria",
  "Escocia", "Gales", "Grecia", "Turquía","Ucrania", "Estados Unidos", "México", "Canadá",
  "Japón", "Corea del Sur", "China", "Australia", "Irán",
  "Arabia Saudita", "Qatar", "Marruecos", "Egipto", "Nigeria",
  "Senegal", "Ghana", "Sudáfrica", "Chile", "Colombia",
  "Ecuador", "Perú", "Venezuela", "Paraguay"
  ],
  todas: [] // se llenará dinámicamente
};

// Generar la categoría "todas" combinando todas las demás
palabras.todas = [
  ...palabras.jugador,
  ...palabras.club,
  ...palabras.competicion,
  ...palabras.pais
];


let jugadores = [];
let palabraSecreta = "";
let impostorIndex = -1;
let jugadorActual = 0;

function iniciarPartida() {
  const num = parseInt(document.getElementById("numJugadores").value);
  const categoria = document.getElementById("categoria").value;

  // Si se elige "todas", combinamos todas las palabras
  let listaPalabras;
  if (categoria === "todas") {
    listaPalabras = [
      ...palabras.jugador,
      ...palabras.club,
      ...palabras.competicion,
      ...palabras.pais
    ];
  } else {
    listaPalabras = palabras[categoria];
  }

  palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
  impostorIndex = Math.floor(Math.random() * num);
  jugadores = Array(num).fill("").map((_, i) => ({
    nombre: `Jugador ${i + 1}`,
    rol: i === impostorIndex ? "Impostor" : "Normal",
    pista: ""
  }));
  jugadorActual = 0;
  mostrarJugador();
}

function mostrarJugador() {
  const pantalla = document.getElementById("pantallaJuego");
  pantalla.innerHTML = "";

  if (jugadorActual < jugadores.length) {
    const jugador = jugadores[jugadorActual];
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${jugador.nombre}</h3>
      <p>${jugador.rol === "Impostor" ? "Eres el IMPOSTOR. No sabes la palabra." : "La palabra secreta es: " + palabraSecreta}</p>
      <button onclick="siguienteJugador()">Siguiente</button>
    `;
    pantalla.appendChild(div);
  } else {
    pantalla.innerHTML = `<p>¡Todos han visto su rol! Comienza la ronda de pistas.</p>`;
  }
}

function siguienteJugador() {
  jugadorActual++;
  mostrarJugador();
}


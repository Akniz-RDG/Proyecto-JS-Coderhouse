// === index.js ===
// Simulador de combate entre un jugador y un dragón 🐉
// Este programa se ejecuta únicamente desde la consola del navegador.
// Diseñado como ejercicio para estudiantes principiantes de JavaScript.
// Contiene explicaciones detalladas para facilitar el aprendizaje.

// =====================================================
// 1. VARIABLES Y DATOS INICIALES
// =====================================================

// ✅ Tipo: let (variable numérica que se puede modificar)
// Representa la vida actual del jugador al iniciar el juego.
let playerHP = 30; // Se elige "let" porque su valor cambiará en el combate

// ✅ Tipo: let (variable numérica que se puede modificar)
// Representa la vida del dragón al comenzar.
let dragonHP = 70; // Igual que el jugador, este valor va disminuyendo

// ✅ Tipo: const (constante)
// Un array que contiene objetos, cada uno representa un ataque del dragón.
// Cada objeto tiene: nombre, tipo, descripción y secuencia de daños
const dragonAttacks = [
  {
    name: "Ráfaga de Garras",
    type: "physical",
    description: "4 golpes de 2 de daño cada uno",
    damageSequence: [2, 2, 2, 2] // Array literal de daños por golpe
  },
  {
    name: "Coletazo",
    type: "physical",
    description: "1 solo golpe de 10 de daño",
    damageSequence: [10]
  },
  {
    name: "Aliento de Fuego",
    type: "fire",
    description: "30 golpes de 1 de daño (fuego)",
    // FORMULA ASISTIDA POR CHATGPT: genera un array con 30 valores iguales a 1
    damageSequence: Array(30).fill(1)
  }
];

// =====================================================
// 2. FUNCIONES DEL JUEGO
// =====================================================

// Muestra el estado actual del jugador y del dragón en la consola
function mostrarEstado() {
  console.log("\n=============================");
  console.log(`🧑 Vida del jugador: ${playerHP} / 50`); // El máximo permitido es 50
  console.log(`🐉 Vida del dragón: ${dragonHP} / 70`);
  console.log("=============================\n");
}

// Solicita al jugador elegir una acción de defensa para el próximo ataque
function elegirAccion(ataque) {
  console.log(`📣 El dragón atacó con: ${ataque.name}`);
  console.log(`📜 Descripción: ${ataque.description}`);

  // prompt() recibe texto desde el usuario. Devuelve un string con la elección.
  const eleccion = prompt(
    "¿Cómo deseas defenderte?\n" +
    "1 - Bloquear (reduce daño físico)\n" +
    "2 - Esquivar (evita el primer golpe)\n" +
    "3 - Piel de Dragón (absorbe fuego y regenera vida)\n" +
    "Presiona otra tecla o Enter para no hacer nada."
  );

  // Se usa switch para evaluar las diferentes opciones posibles
  switch (eleccion) {
    case "1": return "block";
    case "2": return "dodge";
    case "3": return "skin";
    default:
      console.log("🤷 No realizaste ninguna acción.");
      return "none";
  }
}

// Ejecuta el ataque del dragón y aplica la lógica según la acción del jugador
function ejecutarAtaque(ataque, accionJugador) {
  let danoTotal = 0;   // Acumulador del daño recibido
  let mitigado = 0;    // Acumulador del daño evitado o reducido

  // Bucle que recorre cada golpe del ataque
  for (let i = 0; i < ataque.damageSequence.length; i++) {
    let dmg = ataque.damageSequence[i]; // Valor de daño por golpe

    // Si el jugador bloquea y el golpe está entre los primeros 4
    if (accionJugador === "block" && i < 4) {
      mitigado += dmg / 2;
      dmg *= 0.5;
    }
    // Si esquiva, evita el primer golpe completamente
    else if (accionJugador === "dodge" && i === 0) {
      mitigado += dmg;
      dmg = 0;
    }
    // Si usa piel de dragón contra ataque de fuego
    else if (accionJugador === "skin" && ataque.type === "fire") {
      mitigado += dmg;
      // FORMULA ASISTIDA POR CHATGPT: limita la vida a un máximo de 50
      playerHP = Math.min(playerHP + dmg / 2, 50);
      dmg = 0;
    }

    danoTotal += dmg; // Se acumula el daño recibido efectivamente
  }

  playerHP -= danoTotal; // Se resta el daño a la vida del jugador

  // FORMULA ASISTIDA POR CHATGPT: el dragón recibe el 50% del daño mitigado, redondeado
  const danoAlDragon = Math.floor(mitigado * 0.5);
  dragonHP -= danoAlDragon;

  console.log(`💥 Recibiste ${Math.round(danoTotal)} de daño.`);
  console.log(`🔥 Le devolviste ${danoAlDragon} de daño al dragón.`);
}

// =====================================================
// 3. FUNCIÓN PRINCIPAL DEL JUEGO
// =====================================================

// Inicia el bucle del juego. Se ejecuta escribiendo iniciarJuego() en la consola
function iniciarJuego() {
  console.clear(); // Limpia la consola para mayor claridad visual
  console.log("⚔️ ¡El combate contra el dragón ha comenzado!");

  mostrarEstado(); // Muestra el estado inicial

  // Bucle principal del juego: termina cuando uno de los dos llega a 0 de vida
  while (playerHP > 0 && dragonHP > 0) {
    const ataque = dragonAttacks[Math.floor(Math.random() * dragonAttacks.length)];
    const accion = elegirAccion(ataque);
    ejecutarAtaque(ataque, accion);
    mostrarEstado();
  }

  // Mensaje final según el resultado
  if (playerHP <= 0) {
    console.log("💀 Has sido derrotado por el dragón.");
  } else {
    console.log("🏆 Has vencido al dragón. Honor a la Casa del Código.");
  }

  console.log("🎮 Fin del juego.");
}

// Instrucción que se muestra al cargar el archivo, indicando cómo comenzar
console.log("🕹️ Juego listo. Escribe iniciarJuego() en la consola para comenzar.");
// Crear la ruleta usando Winwheel.js
let myWheel = new Winwheel({
  canvasId: "ruletaCanvas",
  numSegments: 6,
  outerRadius: 200,
  segments: [
    { fillStyle: "#3f3ab1", text: "Pañales" },
    { fillStyle: "#8e44ad", text: "Toallitas" },
    { fillStyle: "#2ecc71", text: "Tetero" },
    { fillStyle: "#f1c40f", text: "Babero" },
    { fillStyle: "#e67e22", text: "Cocoliso" },
    { fillStyle: "#e74c3c", text: "Semanario" },
  ],
  animation: {
    type: "spinToStop",
    duration: 10, // Duración del giro en segundos
    spins: 9, // Número de vueltas completas
    callbackFinished: "mostrarGanador()", // Llamada cuando termina el giro
    callbackSound: "actualizarOpcion()", // Llamada en cada sonido del segmento
    callbackAfter: "dibujarIndicador()",
    //soundTrigger: "segment",
  },
});

function dibujarIndicador() {
  var ctx = myWheel.ctx;
  ctx.strokeStyle = "navy";
  ctx.fillStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(250, 40);
  ctx.lineTo(230, 10);
  ctx.lineTo(270, 10);
  ctx.stroke();
  ctx.fill();
}

dibujarIndicador();

// Función para mostrar el ganador
function mostrarGanador() {
  let segment = myWheel.getIndicatedSegment();
  document.getElementById(
    "resultado-final"
  ).textContent = `¡Te toca regalar: ${segment.text}!`;
  document.getElementById("girar").disabled = true; // Deshabilitar botón después del giro
  localStorage.setItem("ruletaGirada", "true"); // Guardar en localStorage
  myWheel.stopAnimation(false);
  myWheel.draw();
  dibujarIndicador();
}

// Función para actualizar la opción mientras la rueda gira
function actualizarOpcion() {
  let segment = myWheel.getIndicatedSegment();
  document.getElementById(
    "opcion-actual"
  ).textContent = `Opción actual: ${segment.text}`;
}

// Comprobar si la rueda ya fue girada
window.onload = function () {
  if (localStorage.getItem("ruletaGirada")) {
    document.getElementById("girar").disabled = true;
  }
};

// Iniciar la animación de la ruleta cuando se hace clic en el botón
document.getElementById("girar").addEventListener("click", function () {
  myWheel.startAnimation();
});


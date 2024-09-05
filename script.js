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

// Function to resize the canvas based on the screen size
function resizeCanvas() {
  const canvas = document.getElementById("ruletaCanvas");
  const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);
  canvas.width = size;
  canvas.height = size;
}

// Call resizeCanvas on page load and window resize
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Initialize the wheel after the canvas is resized
function initWheel() {
  let myWheel = new Winwheel({
    canvasId: "ruletaCanvas",
    numSegments: 6,
    outerRadius: document.getElementById("ruletaCanvas").width / 2 - 20, // Make radius responsive
    segments: [
      { fillStyle: "#f1c40f", text: "Viaje" },
      { fillStyle: "#8e44ad", text: "Televisor" },
      { fillStyle: "#2ecc71", text: "Laptop" },
      { fillStyle: "#e67e22", text: "Bicicleta" },
      { fillStyle: "#e74c3c", text: "Cena para dos" },
      { fillStyle: "#3f3ab1", text: "Vale de compras" },
    ],
    animation: {
      type: "spinToStop",
      duration: 10,
      spins: 9,
      callbackFinished: "mostrarGanador()",
      callbackSound: "reproducirSonido()",
      callbackAfter: "dibujarIndicador()",
      soundTrigger: "segment",
    },
  });

  dibujarIndicador();
}

// Reinitialize the wheel after resizing
window.addEventListener('resize', initWheel);
initWheel();

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


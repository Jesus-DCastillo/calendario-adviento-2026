
/* =====================================
   31 DIAS CONTIGO - SISTEMA DE IDENTIDAD
===================================== */

// Identificar a la persona mediante el enlace
const parametros = new URLSearchParams(window.location.search);
const destinataria = parametros.get("para") || "milena";

// Personalidad de cada calendario
const calendarios = {
  milena: {
    nombre: "Milena",
    tema: "theme-milena",
    edicion: "UNA AMISTAD, MUCHOS CAPÍTULOS",
    titulo: "31 capítulos de nosotros",
    subtitulo: "Desde el primer semestre hasta todas las historias que todavía nos quedan por vivir.",
    simbolo: "✦",
    detalle: "Un álbum de recuerdos"
  },

  laura: {
    nombre: "Laura",
    tema: "theme-laura",
    edicion: "PEQUEÑOS DETALLES, GRANDES RECUERDOS",
    titulo: "31 pequeñas casualidades",
    subtitulo: "Porque algunas personas hacen más bonito el camino.",
    simbolo: "❀",
    detalle: "Un diario de momentos especiales"
  },

  luisa: {
    nombre: "Luisa",
    tema: "theme-luisa",
    edicion: "UNA HISTORIA QUE TODAVÍA NO SE HA ESCRITO",
    titulo: "31 razones para sospechar...",
    subtitulo: "Que nuestro futuro hipotético tiene demasiados capítulos.",
    simbolo: "✧",
    detalle: "Una colección de posibilidades"
  }
};

// Seleccionar el calendario correspondiente
const persona = calendarios[destinataria] || calendarios.milena;

// Aplicar identidad visual
document.body.classList.add(persona.tema);

// Personalizar portada
document.title = persona.titulo + " | Diciembre 2026";

document.getElementById("edition").textContent = persona.edicion;
document.getElementById("main-title").textContent = persona.titulo;
document.getElementById("subtitle").textContent = persona.subtitulo;

// Crear elemento decorativo de portada
const portada = document.createElement("div");
portada.className = "cover-art";
portada.innerHTML = `
  <span class="cover-symbol">${persona.simbolo}</span>
  <span class="cover-detail">${persona.detalle}</span>
`;

const bienvenida = document.getElementById("welcome");
bienvenida.insertBefore(portada, bienvenida.firstChild);

// Preparar acceso de demostración
const password = document.getElementById("password");
const enterButton = document.getElementById("enter-button");
const loginMessage = document.getElementById("login-message");

password.disabled = true;
password.placeholder = "Acceso privado en preparación";

document.querySelector(".login label").textContent =
  "Estamos preparando tu sorpresa";

enterButton.textContent = "Ver calendario de prueba";

// IMPORTANTE: este acceso es solo una demostración.
// Todavía no existe autenticación ni cifrado.
enterButton.addEventListener("click", () => {
  document.getElementById("welcome").hidden = true;
  document.getElementById("calendar-screen").hidden = false;

  document.getElementById("calendar-title").textContent =
    "Diciembre de " + persona.nombre;

  document.getElementById("calendar-subtitle").textContent =
    persona.detalle + " · 31 días especiales";

  loginMessage.textContent = "";
});

// Crear las 31 casillas
const calendar = document.getElementById("calendar");

const fechaPartes = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Bogota",
  day: "numeric",
  month: "numeric",
  year: "numeric"
}).formatToParts(new Date());

const diaActual = Number(
  fechaPartes.find(p => p.type === "day").value
);

const mesActual = Number(
  fechaPartes.find(p => p.type === "month").value
);

const anioActual = Number(
  fechaPartes.find(p => p.type === "year").value
);

for (let dia = 1; dia <= 31; dia++) {
  const puerta = document.createElement("button");

  puerta.className = "door";
  puerta.textContent = dia;
  puerta.type = "button";

  const disponible =
    anioActual > 2026 ||
    (anioActual === 2026 && mesActual > 12) ||
    (anioActual === 2026 && mesActual === 12 && dia <= diaActual);

  puerta.disabled = !disponible;

  if (disponible) {
    puerta.addEventListener("click", () => {
      alert("¡Pronto descubrirás tu sorpresa del día " + dia + "!");
    });
  }

  calendar.appendChild(puerta);
}

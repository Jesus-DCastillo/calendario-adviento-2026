
/* 31 DIAS CONTIGO - SISTEMA DE IDENTIDAD */

const parametros = new URLSearchParams(window.location.search);
const destinataria = parametros.get("para") || "milena";

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

const persona = calendarios[destinataria] || calendarios.milena;

document.body.classList.add(persona.tema);
document.title = persona.titulo + " | Diciembre 2026";

document.getElementById("edition").textContent = persona.edicion;
document.getElementById("main-title").textContent = persona.titulo;
document.getElementById("subtitle").textContent = persona.subtitulo;

/* PORTADA */

const portada = document.createElement("div");
portada.className = "cover-art";
portada.innerHTML = `
  <span class="cover-symbol">${persona.simbolo}</span>
  <span class="cover-detail">${persona.detalle}</span>
`;

const bienvenida = document.getElementById("welcome");
bienvenida.insertBefore(portada, bienvenida.firstChild);

/* ACCESO DE DEMOSTRACIÓN */

const password = document.getElementById("password");
const enterButton = document.getElementById("enter-button");

password.disabled = true;
password.placeholder = "Acceso privado en preparación";

document.querySelector(".login label").textContent =
  "Estamos preparando tu sorpresa";

enterButton.textContent = "Ver calendario de prueba";

enterButton.addEventListener("click", () => {
  document.getElementById("welcome").hidden = true;
  document.getElementById("calendar-screen").hidden = false;

  document.getElementById("calendar-title").textContent =
    "Diciembre de " + persona.nombre;

  document.getElementById("calendar-subtitle").textContent =
    persona.detalle + " · 31 días especiales";
});

/* VENTANA DE SORPRESAS */

const modal = document.getElementById("surprise-modal");
const closeModalButton = document.getElementById("close-modal");
const modalDay = document.getElementById("modal-day");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function abrirSorpresa(dia) {
  modalDay.textContent = "DÍA " + dia + " · DICIEMBRE 2026";
  modalTitle.textContent = "Una pequeña sorpresa";

  modalBody.textContent =
    "Estamos preparando algo especial para ti. " +
    "Pronto encontrarás aquí una sorpresa hecha pensando en ti.";

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function cerrarSorpresa() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

closeModalButton.addEventListener("click", cerrarSorpresa);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    cerrarSorpresa();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !modal.hidden) {
    cerrarSorpresa();
  }
});

/* CALENDARIO Y FECHAS */

const calendar = document.getElementById("calendar");

/* MODO DE PRUEBA TEMPORAL.
   Cambia a false antes de entregar los calendarios. */

const modoPrueba = true;

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
    modoPrueba ||
    anioActual > 2026 ||
    (anioActual === 2026 && mesActual > 12) ||
    (anioActual === 2026 && mesActual === 12 && dia <= diaActual);

  puerta.disabled = !disponible;

  if (disponible) {
    puerta.addEventListener("click", () => {
      abrirSorpresa(dia);
    });
  }

  calendar.appendChild(puerta);
}

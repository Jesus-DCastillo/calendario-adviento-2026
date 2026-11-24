
/* 31 DIAS CONTIGO - SISTEMA DE IDENTIDAD */

const parametros = new URLSearchParams(window.location.search);
const destinataria = parametros.get("para") || "milena";

const calendarios = {
  milena: {
  nombre: "Milena",
  tema: "theme-milena",
  soundtrack: "MKHtXovAejs",
    edicion: "UNA AMISTAD, MUCHOS CAPÍTULOS",
    titulo: "31 capítulos de nosotros",
    subtitulo: "Desde el primer semestre hasta todas las historias que todavía nos quedan por vivir.",
    simbolo: "✦",
    detalle: "Un álbum de recuerdos"
  },
  laura: {
    nombre: "Laura",
    tema: "theme-laura",
    soundtrack: "3WsufJe4YN8",
    edicion: "PEQUEÑOS DETALLES, GRANDES RECUERDOS",
    titulo: "31 pequeñas casualidades",
    subtitulo: "Porque algunas personas hacen más bonito el camino.",
    simbolo: "❀",
    detalle: "Un diario de momentos especiales"
  },
  luisa: {
    nombre: "Luisa",
    tema: "theme-luisa",
    soundtrack: "420h4EyO01w",
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

/* =====================================
   MÚSICA AMBIENTAL NAVIDEÑA
   ===================================== */

const musicButton = document.getElementById("music-button");
const musicStatus = document.getElementById("music-status");
const musicContainer = document.getElementById("music-player-container");

let musicaActiva = false;

musicButton.addEventListener("click", () => {

  // Detener la música si ya está reproduciéndose
  if (musicaActiva) {
    musicContainer.innerHTML = "";
    musicaActiva = false;

    musicButton.textContent = "♫ Activar música";
    musicStatus.textContent =
      "La música está pausada. Puedes volver a escucharla cuando quieras.";

    return;
  }

  // Obtener el video correspondiente a cada persona
  const videoId = persona.soundtrack;

  if (!videoId) {
    musicStatus.textContent =
      "No se encontró el soundtrack navideño.";

    return;
  }

  // Crear el reproductor de YouTube
  const reproductor = document.createElement("iframe");

  reproductor.src =
    "https://www.youtube-nocookie.com/embed/" +
    encodeURIComponent(videoId) +
    "?autoplay=1&controls=1&rel=0";

  reproductor.width = "100%";
  reproductor.height = "180";
  reproductor.title = "Soundtrack navideño";
  reproductor.allow =
    "autoplay; encrypted-media; picture-in-picture";
  reproductor.allowFullscreen = true;
  reproductor.loading = "lazy";
  reproductor.style.border = "0";
  reproductor.style.borderRadius = "12px";

  musicContainer.appendChild(reproductor);

  musicaActiva = true;

  musicButton.textContent = "♫ Detener música";
  musicStatus.textContent =
    "Tu soundtrack navideño está sonando.";
});

/* =====================================
   CONTENIDO DE LOS REGALOS
   ===================================== */

const regalos = {
  milena: {
    1: {
      titulo: "Un comienzo especial",
      elementos: [
        {
          tipo: "carta",
          contenido: "Aquí irá el primer mensaje especial para Milena."
        },
        {
  tipo: "foto",
  contenido: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800"
}
      ]
    }
  },

  laura: {
    1: {
      titulo: "Una pequeña casualidad",
      elementos: [
        {
          tipo: "carta",
          contenido: "Aquí irá el primer mensaje especial para Laura."
        }
      ]
    }
  },

  luisa: {
    1: {
      titulo: "Una posibilidad interesante",
      elementos: [
        {
          tipo: "carta",
          contenido: "Aquí irá el primer mensaje especial para Luisa."
        }
      ]
    }
  }
};

/* VENTANA DE SORPRESAS */

const modal = document.getElementById("surprise-modal");
const closeModalButton = document.getElementById("close-modal");
const modalDay = document.getElementById("modal-day");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function abrirSorpresa(dia) {
  // Buscar el regalo de la persona y el día seleccionado
  const regalo = regalos[destinataria]?.[dia];

  // Mostrar el número del día
  modalDay.textContent = "DÍA " + dia + " · DICIEMBRE 2026";

  // Si todavía no existe un regalo para ese día
  if (!regalo) {
    modalTitle.textContent = "Una sorpresa en preparación";
    modalBody.textContent = "Estamos preparando algo especial para ti.";
  } else {
    // Mostrar el título del regalo
    modalTitle.textContent = regalo.titulo;

    // Limpiar el contenido anterior
    modalBody.innerHTML = "";

    // Recorrer todos los elementos del regalo
    regalo.elementos.forEach(elemento => {
      const contenido = document.createElement("p");

     // Mostrar el contenido según su tipo
if (elemento.tipo === "carta") {
  contenido.textContent = elemento.contenido;
  contenido.className = "gift-letter";

} else if (elemento.tipo === "foto") {
  const imagen = document.createElement("img");

  imagen.src = elemento.contenido;
  imagen.alt = "Fotografía de la sorpresa";
  imagen.className = "gift-photo";

  modalBody.appendChild(imagen);
  return;

} else if (elemento.tipo === "cancion") {
  const reproductor = document.createElement("iframe");

  reproductor.src = elemento.contenido;
  reproductor.width = "100%";
  reproductor.height = "152";
  reproductor.style.border = "0";
  reproductor.style.borderRadius = "12px";
  reproductor.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  reproductor.loading = "lazy";

  modalBody.appendChild(reproductor);
  return;

} else {
  contenido.textContent = elemento.contenido;
}

modalBody.appendChild(contenido);
    });
  }

  // Abrir la ventana
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

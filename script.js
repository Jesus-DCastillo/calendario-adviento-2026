
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
  "La música está detenida. Puedes volver a escucharla cuando quieras.";

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
   ESTRUCTURA DE LOS 93 REGALOS
   ===================================== */

// Crea automáticamente los 31 días de un calendario
function crearDiasBase() {
  return Object.fromEntries(
    Array.from({ length: 31 }, (_, indice) => {
      const dia = indice + 1;

      let titulo = "Una sorpresa para ti";

      if (dia === 24) {
        titulo = "Una sorpresa de Navidad";
      }

      if (dia === 31) {
        titulo = "Un último capítulo";
      }

      return [
        dia,
        {
          titulo: titulo,
          elementos: [
            {
              tipo: "texto",
              contenido: "Este regalo está pendiente de preparar."
            }
          ]
        }
      ];
    })
  );
}

// Los tres calendarios
const regalos = {
  milena: crearDiasBase(),
  laura: crearDiasBase(),
  luisa: crearDiasBase()
};


/* VENTANA DE SORPRESAS */

const modal = document.getElementById("surprise-modal");
const closeModalButton = document.getElementById("close-modal");
const modalDay = document.getElementById("modal-day");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function abrirSorpresa(dia) {
  // Buscar el regalo correspondiente
  const regalo = regalos[destinataria]?.[dia];

  modalDay.textContent = "DÍA " + dia + " · DICIEMBRE 2026";
  modalBody.innerHTML = "";

  if (!regalo) {
    modalTitle.textContent = "Una sorpresa en preparación";
    modalBody.textContent = "Estamos preparando algo especial para ti.";
  } else {
    modalTitle.textContent = regalo.titulo;

    // Recorrer los elementos del regalo
    regalo.elementos.forEach(elemento => {

      // CARTAS
      if (elemento.tipo === "carta") {
        const carta = document.createElement("div");
        carta.className = "gift-letter";
        carta.textContent = elemento.contenido;
        modalBody.appendChild(carta);
      }

      // TEXTOS
      else if (elemento.tipo === "texto") {
        const texto = document.createElement("p");
        texto.className = "gift-text";
        texto.textContent = elemento.contenido;
        modalBody.appendChild(texto);
      }

      // FOTOGRAFÍAS
      else if (elemento.tipo === "foto") {
        const imagen = document.createElement("img");

        imagen.src = elemento.contenido;
        imagen.alt = elemento.descripcion || "Fotografía de la sorpresa";
        imagen.className = "gift-photo";
        imagen.loading = "lazy";

        modalBody.appendChild(imagen);
      }

      // CANCIONES
      else if (elemento.tipo === "cancion") {
        const reproductor = crearReproductor(
          elemento.contenido,
          "cancion"
        );

        if (reproductor) {
          modalBody.appendChild(reproductor);
        }
      }

      // VIDEOS
      else if (elemento.tipo === "video") {
        const reproductor = crearReproductor(
          elemento.contenido,
          "video"
        );

        if (reproductor) {
          modalBody.appendChild(reproductor);
        }
      }

      // CUPONES
      else if (elemento.tipo === "cupon") {
        const cupon = document.createElement("div");
        cupon.className = "gift-coupon";

        const titulo = document.createElement("h3");
        titulo.textContent = elemento.contenido;

        const descripcion = document.createElement("p");
        descripcion.textContent = elemento.descripcion || "";

        cupon.appendChild(titulo);
        cupon.appendChild(descripcion);

        if (elemento.nota) {
          const nota = document.createElement("small");
          nota.textContent = elemento.nota;
          cupon.appendChild(nota);
        }

        modalBody.appendChild(cupon);
      }

      // ENLACES EXTERNOS
      else if (elemento.tipo === "enlace") {
        try {
          const url = new URL(elemento.contenido);

          if (url.protocol !== "https:") {
            throw new Error("Enlace no seguro");
          }

          const enlace = document.createElement("a");
          enlace.href = url.href;
          enlace.target = "_blank";
          enlace.rel = "noopener noreferrer";
          enlace.className = "gift-link";
          enlace.textContent = elemento.texto || "Abrir sorpresa";

          modalBody.appendChild(enlace);
        } catch (error) {
          console.warn("Enlace no válido:", error);
        }
      }

      // TIPO DESCONOCIDO
      else {
        console.warn("Tipo de regalo no reconocido:", elemento.tipo);
      }
    });
  }

  // Abrir la ventana
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

/* =====================================
   CREACIÓN SEGURA DE REPRODUCTORES
   ===================================== */

function crearReproductor(enlace, tipo) {
  try {
    const url = new URL(enlace);

    if (url.protocol !== "https:") {
      throw new Error("El enlace debe usar HTTPS");
    }

    let direccion = "";

    // Convertir enlaces normales de YouTube a formato insertable
    if (
      tipo === "video" ||
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtu.be"
    ) {
      let videoId = "";

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      } else if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else if (
        url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/shorts/")
      ) {
        videoId = url.pathname.split("/")[2] || "";
      }

      if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        throw new Error("ID de YouTube no válido");
      }

      direccion =
        "https://www.youtube-nocookie.com/embed/" +
        videoId +
        "?rel=0";

    } else if (
      tipo === "cancion" &&
      url.hostname === "open.spotify.com" &&
      url.pathname.startsWith("/embed/")
    ) {
      direccion = url.href;

    } else {
      throw new Error("Proveedor de contenido no permitido");
    }

    const reproductor = document.createElement("iframe");

    reproductor.src = direccion;
    reproductor.title =
      tipo === "video" ? "Video de la sorpresa" : "Canción de la sorpresa";
    reproductor.className =
      tipo === "video" ? "gift-media video" : "gift-media";
    reproductor.height = tipo === "video" ? "220" : "152";
    reproductor.allow =
      "autoplay; encrypted-media; picture-in-picture";
    reproductor.allowFullscreen = true;
    reproductor.loading = "lazy";

    return reproductor;

  } catch (error) {
    console.warn("No se pudo cargar el reproductor:", error);

    const aviso = document.createElement("p");
    aviso.className = "gift-text";
    aviso.textContent =
      "No pudimos cargar este contenido. Comprueba el enlace.";

    return aviso;
  }
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

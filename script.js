
const calendar = document.getElementById("calendar");

// Obtener la fecha actual en Colombia
const fechaColombia = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Bogota",
  day: "numeric",
  month: "numeric",
  year: "numeric"
});

const partes = fechaColombia.formatToParts(new Date());

const diaActual = Number(
  partes.find(p => p.type === "day").value
);

const mesActual = Number(
  partes.find(p => p.type === "month").value
);

const anioActual = Number(
  partes.find(p => p.type === "year").value
);

// Crear las 31 casillas
for (let dia = 1; dia <= 31; dia++) {
  const puerta = document.createElement("button");

  puerta.className = "door";
  puerta.textContent = dia;
  puerta.type = "button";

  // Solo se abren los días que ya llegaron
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

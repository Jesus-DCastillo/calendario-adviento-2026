/* ===============================================
   31 DÍAS CONTIGO
   SISTEMA PRINCIPAL · DICIEMBRE 2026
   Tres calendarios · 93 regalos · Experiencia personalizada
========================================================= */

"use strict";


/* =========================================================
   01. CONFIGURACIÓN E IDENTIDAD
========================================================= */

const parametros = new URLSearchParams(window.location.search);

const destinatariaSolicitada = parametros.get("para") || "milena";
const demoEspecial = parametros.get("demo");

const calendarios = {

  milena: {
    nombre: "Milena",
    tema: "theme-milena",
    soundtrack: "MKHtXovAejs",

    edicion: "UNA AMISTAD, MUCHOS CAPÍTULOS",
    titulo: "31 capítulos de nosotros",
    subtitulo:
      "Desde el primer semestre hasta todas las historias que todavía nos quedan por vivir.",

    simbolo: "✦",
    detalle: "Un álbum de recuerdos",

    pie:
      "Los mejores recuerdos siempre encuentran la forma de quedarse.",

    mensajeFinal:
      "Por todos los capítulos que ya vivimos y los que todavía nos faltan."
  },

  laura: {
    nombre: "Laura",
    tema: "theme-laura",
    soundtrack: "3WsufJe4YN8",

    edicion: "PEQUEÑOS DETALLES, GRANDES RECUERDOS",
    titulo: "31 pequeñas casualidades",
    subtitulo:
      "Porque algunas personas hacen más bonito el camino.",

    simbolo: "❀",
    detalle: "Un diario de momentos especiales",

    pie:
      "A veces los momentos más sencillos terminan siendo los favoritos.",

    mensajeFinal:
      "Por más conversaciones, películas y planes que todavía nos esperan."
  },

  luisa: {
    nombre: "Luisa",
    tema: "theme-luisa",
    soundtrack: "420h4EyO01w",

    edicion: "UNA HISTORIA QUE TODAVÍA NO SE HA ESCRITO",
    titulo: "31 razones para sospechar...",
    subtitulo:
      "Que nuestro futuro hipotético tiene demasiados capítulos.",

    simbolo: "✧",
    detalle: "Una colección de posibilidades",

    pie:
      "Hay historias que todavía no tienen título, pero ya tienen potencial.",

    mensajeFinal:
      "Por las casualidades, las conversaciones y las posibilidades."
  }

};

const destinataria = Object.hasOwn(
  calendarios,
  destinatariaSolicitada
)
  ? destinatariaSolicitada
  : "milena";

const persona = calendarios[destinataria];


/* =========================================================
   02. REFERENCIAS HTML
========================================================= */

const $ = (selector) => document.querySelector(selector);

const welcome = $("#welcome");
const calendarScreen = $("#calendar-screen");

const loginForm = $("#login-form");
const passwordInput = $("#password");
const togglePassword = $("#toggle-password");
const loginMessage = $("#login-message");
const enterButton = $("#enter-button");

const coverArt = $("#cover-art");

const calendar = $("#calendar");
const calendarTitle = $("#calendar-title");
const calendarSubtitle = $("#calendar-subtitle");

const progressBar = $("#progress-bar");
const progressFill = $("#progress-fill");
const progressCount = $("#progress-count");
const progressLabel = $("#progress-label");

const musicButton = $("#music-button");
const musicButtonText = $("#music-button-text");
const musicStatus = $("#music-status");
const musicContainer = $("#music-player-container");

const modal = $("#surprise-modal");
const modalContent = $(".modal-content");
const closeModalButton = $("#close-modal");
const modalDay = $("#modal-day");
const modalTitle = $("#modal-title");
const modalBody = $("#modal-body");
const modalFooterMessage = $("#modal-footer-message");

const notification = $("#notification");


/* =========================================================
   03. VALIDACIÓN DE ELEMENTOS HTML
========================================================= */

const elementosObligatorios = [
  welcome,
  calendarScreen,
  loginForm,
  passwordInput,
  togglePassword,
  enterButton,
  coverArt,
  calendar,
  calendarTitle,
  calendarSubtitle,
  musicButton,
  musicStatus,
  musicContainer,
  modal,
  closeModalButton,
  modalDay,
  modalTitle,
  modalBody
];

if (elementosObligatorios.some(elemento => !elemento)) {
  throw new Error(
    "Faltan elementos HTML necesarios. Comprueba index.html."
  );
}


/* =========================================================
   04. IDENTIDAD VISUAL DE LA PERSONA
========================================================= */

document.body.classList.add(persona.tema);

document.title = `${persona.titulo} | Diciembre 2026`;

$("#edition").textContent = persona.edicion;
$("#main-title").textContent = persona.titulo;
$("#subtitle").textContent = persona.subtitulo;

coverArt.innerHTML = `
  <span class="cover-symbol">${persona.simbolo}</span>
  <span class="cover-detail">${persona.detalle}</span>
`;

$("#footer-message").textContent = persona.pie;

if (modalFooterMessage) {
  modalFooterMessage.textContent = persona.mensajeFinal;
}

calendarTitle.textContent = `Diciembre de ${persona.nombre}`;

calendarSubtitle.textContent =
  `${persona.detalle} · 31 días especiales`;

$("#login-title").textContent =
  `Un pequeño rincón para ti, ${persona.nombre}`;

$("#login-description").textContent =
  "Hemos preparado algo especial para acompañarte este diciembre.";


/* =========================================================
   05. MODO DE PRUEBA Y ACCESO
========================================================= */

/*
  IMPORTANTE:
  Este acceso con contraseña es una barrera visual básica.
  No cifra ni protege realmente el contenido del JavaScript.
  No incluyas información privada hasta implementar cifrado real.
*/

const CONFIG = {
  // true permite abrir los 31 días durante las pruebas.
  // Cambiar a false antes de compartir el calendario.
  modoPrueba: true,
  anio: 2026,
  mes: 12,
  dias: 31
};

const accesos = {
  milena: {
    contrasena: "primersemestre",
    pista: "La etapa en la que comenzó esta amistad y todo lo que vino después."
  },
  laura: {
    contrasena: "patinodecine",
    pista: "Una broma recurrente sobre un plan de cine que todavía nos espera."
  },
  luisa: {
    contrasena: "futurohipotetico",
    pista: "Una posibilidad imaginaria con demasiados capítulos por escribir."
  }
};

let calendarioAbierto = false;

function normalizarContrasena(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function configurarAcceso() {
  const acceso = accesos[destinataria];

  passwordInput.disabled = false;
  passwordInput.required = true;
  passwordInput.type = "password";
  passwordInput.placeholder = "Escribe tu respuesta...";

  $("#password-label").textContent = "Resuelve la pista para entrar";
  $("#login-description").textContent = acceso.pista;

  togglePassword.hidden = false;
  enterButton.textContent = "Descubrir mi calendario";

  if (loginMessage) {
    loginMessage.textContent = "";
  }
}

loginForm.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const respuesta = normalizarContrasena(passwordInput.value);
  const correcta = normalizarContrasena(accesos[destinataria].contrasena);

  if (!respuesta) {
    loginMessage.textContent = "Primero debes resolver la pista.";
    return;
  }

  if (respuesta !== correcta) {
    loginMessage.textContent = "Esa no es la respuesta. Inténtalo otra vez.";
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  loginMessage.textContent = "";
  abrirCalendario();
});

function abrirCalendario() {
  if (calendarioAbierto) return;

  calendarioAbierto = true;

  welcome.hidden = true;
  calendarScreen.hidden = false;

  actualizarProgreso();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  revisarCelebracionPorFecha();
}

configurarAcceso();


/* =========================================================
   06. FECHA Y HORA DE COLOMBIA
========================================================= */

function obtenerFechaColombia() {

  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  const obtener = tipo =>
    Number(partes.find(parte => parte.type === tipo).value);

  return {
    anio: obtener("year"),
    mes: obtener("month"),
    dia: obtener("day")
  };
}

function diaDesbloqueado(dia) {

  if (CONFIG.modoPrueba) {
    return true;
  }

  const fecha = obtenerFechaColombia();

  if (fecha.anio > CONFIG.anio) {
    return true;
  }

  if (fecha.anio < CONFIG.anio) {
    return false;
  }

  if (fecha.mes > CONFIG.mes) {
    return true;
  }

  if (fecha.mes < CONFIG.mes) {
    return false;
  }

  return dia <= fecha.dia;
}


/* =========================================================
   07. CONTENIDO ORIGINAL DE LOS 93 REGALOS
========================================================= */

/*
  Cada persona tiene 31 mensajes diferentes.

  Los regalos se generan automáticamente combinando:
  - Mensajes
  - Cartas
  - Reflexiones
  - Cupones
  - Canciones
  - Videos
  - Enlaces

  Los textos son genéricos y se pueden personalizar.
*/


const mensajes = {

  milena: [

    "Hay amistades que empiezan como una casualidad y terminan convirtiéndose en parte de la historia de uno. Qué curioso que la nuestra comenzara en la universidad.",

    "No todas las personas conocen nuestras versiones buenas, malas, cansadas y dramáticas. Tú has conocido bastantes de las mías. Eso ya es bastante mérito.",

    "Si algo he aprendido de nuestra amistad es que no hace falta estar de acuerdo en todo para seguir estando presentes.",

    "Hay lugares que se sienten familiares por las personas que los acompañan. Algunas casas terminan siendo recuerdos que uno guarda con cariño.",

    "A veces me acuerdo de las conversaciones más absurdas que hemos tenido y me pregunto cómo logramos hablar de tantas cosas sin sentido.",

    "No sé si somos una amistad tranquila. Probablemente no. Pero aburrida, definitivamente, tampoco.",

    "Un pequeño recordatorio: no tienes que tener todo resuelto para estar haciendo las cosas bien.",

    "Me gusta pensar que dentro de unos años recordaremos esta etapa y tendremos muchas historias que contar.",

    "Hay personas con las que uno puede hablar de cualquier cosa. Y después estamos nosotros, que podemos pasar de un tema serio a una estupidez en segundos.",

    "Gracias por las veces que has estado, incluso cuando no había una solución sencilla ni una conversación perfecta.",

    "La universidad nos ha dejado tareas, desvelos y preocupaciones. Pero también nos dejó personas que valen la pena.",

    "Si alguna vez dudas de lo mucho que has avanzado, recuerda todo lo que has tenido que atravesar para llegar hasta aquí.",

    "Hay recuerdos que no necesitan fotografías. Basta con mencionar una frase para que vuelva toda una historia.",

    "No prometo dejar de molestarte. Sería una promesa poco realista. Pero sí espero seguir acompañándote en muchas etapas.",

    "Un día cualquiera puede convertirse en un recuerdo favorito sin que uno se dé cuenta. Ojalá tengamos muchos de esos.",

    "La amistad también consiste en poder desaparecer un rato, volver a hablar y sentir que no pasó nada.",

    "Espero que nunca pierdas esa capacidad de reírte incluso cuando las cosas se ponen complicadas.",

    "Hay personas que llegan a una etapa de la vida y terminan quedándose en muchas más. Me alegra que seas una de ellas.",

    "No todas las historias necesitan grandes acontecimientos. A veces basta con una tarde, una conversación y buena compañía.",

    "Si nuestra amistad fuera una asignatura, seguramente tendría demasiados créditos y un examen final bastante difícil.",

    "Ojalá nunca nos falten motivos para celebrar, lugares a los que ir y conversaciones que se alarguen más de lo previsto.",

    "Te deseo tranquilidad para los días difíciles, entusiasmo para los nuevos proyectos y paciencia para todo lo demás.",

    "Algunas personas conocen nuestras metas. Otras conocen también nuestros miedos. Las amistades importantes suelen conocer ambas cosas.",

    "La Navidad tiene algo bonito: hace que uno mire hacia atrás y recuerde a quienes hicieron más llevadero el año.",

    "No necesitas convertirte en otra persona para merecer cosas buenas. Sigue construyendo tu camino a tu manera.",

    "Me gustaría que dentro de muchos años sigamos teniendo anécdotas que probablemente no podamos contar delante de todo el mundo.",

    "Gracias por ser parte de una etapa que, con todo y sus complicaciones, también ha tenido momentos inolvidables.",

    "No sé qué nos espera después de la universidad, pero espero que la vida nos siga dando oportunidades para coincidir.",

    "Que nunca te falten motivos para sentir orgullo de ti misma, incluso por esas pequeñas cosas que nadie más ve.",

    "Si pudiera resumir esta amistad en una idea, sería esta: hemos tenido nuestras diferencias, pero también muchas razones para seguir aquí.",

    "Este último capítulo no es un final. Es simplemente una forma de agradecer por los anteriores y brindar por los que faltan."

  ],


  laura: [

    "Hay personas con las que conversar se siente fácil. No hace falta preparar el tema ni buscar demasiado las palabras. Simplemente sucede.",

    "A veces los mejores planes no son los más elaborados. Basta con salir, caminar un rato y tener buena compañía.",

    "Tengo la sospecha de que algunas películas se disfrutan más cuando uno va con la persona correcta.",

    "No sé si extraño más las películas o la costumbre de ir al cine contigo. Probablemente ambas cosas.",

    "Recordatorio amistoso: todavía tenemos salidas pendientes. No pienso dejar que todas se queden en planes.",

    "Hay amistades que no necesitan grandes explicaciones. Uno simplemente sabe que puede pasar un buen rato con esa persona.",

    "Ojalá nunca falten conversaciones espontáneas, risas inesperadas y planes que terminan siendo mejores de lo esperado.",

    "A veces una buena compañía hace que hasta el plan más sencillo termine siendo memorable.",

    "Hay personas que tienen una forma especial de hacer que los días normales se sientan un poquito mejores.",

    "No sé cuándo volveremos a tener nuestra próxima sesión de cine, pero espero que no tarde demasiado.",

    "Una pequeña misión para el futuro: encontrar una película que ambos queramos ver y hacer que el plan suceda.",

    "La vida universitaria puede ser bastante intensa. Por eso también hacen falta momentos para desconectarse y disfrutar.",

    "Espero que este mes te regale motivos para sonreír, descansar y hacer cosas que realmente disfrutes.",

    "Hay conversaciones que empiezan sin rumbo y terminan siendo las mejores. Esas son de mis favoritas.",

    "El patino de Cine Colombia sigue esperando su momento de gloria. No hemos olvidado ese asunto.",

    "Ojalá sigamos encontrando excusas para salir, comer algo rico y ponernos al día.",

    "No hace falta que cada salida sea un gran evento. A veces el mejor plan es simplemente coincidir.",

    "Espero que nunca te falten personas con las que puedas ser tú misma sin tener que pensar demasiado.",

    "Un día deberíamos hacer una lista de todas las películas que tenemos pendientes. Aunque probablemente terminemos discutiendo por la primera.",

    "Hay amistades que hacen más ligero el camino. Me alegra que esta sea una de ellas.",

    "Si este año tuvo días complicados, espero que también te haya dejado momentos que valga la pena recordar.",

    "Te deseo muchos planes espontáneos, buenas noticias y películas que realmente estén a la altura de las expectativas.",

    "Una amistad también se construye con pequeños detalles: preguntar cómo estás, compartir una risa o acordarse de un plan pendiente.",

    "La Navidad es una buena excusa para agradecer por las personas que hacen más agradable el año.",

    "No dejes que las obligaciones ocupen todo el espacio. También mereces tardes tranquilas y momentos divertidos.",

    "Espero que el próximo año nos encuentre con más tiempo para compartir y menos excusas para aplazar los planes.",

    "Hay recuerdos que se construyen sin darse cuenta. Una salida cualquiera puede terminar siendo uno de ellos.",

    "Que nunca falten los buenos lugares, las buenas películas y las personas con quienes disfrutarlos.",

    "Te dejo una invitación abierta: cuando quieras, recuperamos esa tradición cinematográfica.",

    "Al final, las mejores casualidades son las personas con las que uno tiene ganas de seguir coincidiendo.",

    "Este es el último día del calendario, pero no tiene por qué ser el último plan. Todavía tenemos mucho por compartir."

  ],


  luisa: [

    "Hay personas que tienen una forma curiosa de hacer que una conversación normal termine siendo bastante entretenida. Tú pareces tener ese talento.",

    "Admito que algunas conversaciones contigo tienen más capítulos de los que inicialmente esperaba.",

    "No sé si eres especialmente elocuente o si simplemente tienes la habilidad de dejarme pensando en lo que acabas de decir.",

    "Hay coincidencias que uno no planea. Algunas simplemente aparecen y hacen que el día sea más interesante.",

    "No voy a sacar conclusiones apresuradas. Por ahora, me basta con reconocer que conversar contigo es bastante agradable.",

    "Si algún día escribieran una historia sobre nuestras conversaciones, probablemente habría que clasificarla como comedia con elementos inesperados.",

    "Tienes una manera particular de expresarte que hace que incluso los temas más sencillos resulten interesantes.",

    "Una pregunta importante: ¿cuántas conversaciones curiosas hacen falta para que una coincidencia deje de ser casualidad?",

    "No todo tiene que tener una definición inmediata. A veces está bien disfrutar de las cosas mientras ocurren.",

    "Hay personas que llaman la atención por cómo se ven. Otras por cómo piensan. Algunas consiguen ambas cosas.",

    "No prometo tener siempre respuestas brillantes, pero sí puedo ofrecer conversaciones, curiosidad y algún comentario cuestionable.",

    "El futuro es bastante impredecible. Aunque debo admitir que algunas posibilidades resultan entretenidas de imaginar.",

    "Me gusta la gente con la que se puede hablar sin sentir que cada silencio necesita ser llenado.",

    "Hay algo atractivo en las personas que tienen criterio propio y no sienten la necesidad de estar de acuerdo con todo.",

    "Si nuestra historia fuera una película, todavía estaríamos en la parte donde los personajes se conocen y el guionista no ha decidido qué hacer.",

    "No todas las preguntas necesitan respuestas serias. Algunas existen solamente para provocar una buena conversación.",

    "Una pequeña observación: tienes una capacidad bastante interesante para hacer que uno quiera seguir escuchando.",

    "No voy a inventar un destino ni a escribir promesas. Prefiero dejar espacio para las sorpresas reales.",

    "A veces la mejor parte de conocer a alguien es descubrir poco a poco los detalles que no aparecen a primera vista.",

    "El futuro hipotético sigue siendo hipotético. Pero debo reconocer que tiene un departamento creativo bastante activo.",

    "Ojalá nunca pierdas esa forma de expresarte, cuestionar las cosas y encontrar humor donde otros no lo ven.",

    "Hay conversaciones que se recuerdan por lo que se dijo. Otras, simplemente, por la sensación agradable que dejaron.",

    "No todo lo interesante tiene que suceder de inmediato. Algunas cosas merecen tiempo y tranquilidad.",

    "Si algún día llegamos a tener una discusión sobre quién tenía razón, espero que al menos sea una discusión entretenida.",

    "Me parece una buena idea seguir acumulando conversaciones, risas y momentos sin necesidad de ponerles un nombre demasiado pronto.",

    "La curiosidad es una de las mejores razones para conocer a alguien. Y algunas personas consiguen mantenerla despierta.",

    "No sé qué capítulos tendrá el próximo año. Pero espero que incluya buenas conversaciones y algunas sorpresas agradables.",

    "A veces lo más bonito de una posibilidad es que todavía no sabemos qué forma va a tomar.",

    "Te deseo un año lleno de proyectos, buenas decisiones y personas que sepan apreciar tu manera de ver el mundo.",

    "Si alguna vez hacemos una lista de nuestras conversaciones más absurdas, sospecho que será bastante extensa.",

    "Y llegamos al último día. No hay promesas grandilocuentes ni finales de película. Solo un deseo: que sigan existiendo motivos para coincidir."

  ]

};


/* =========================================================
   08. TÍTULOS DE LOS REGALOS
========================================================= */

const titulos = {

  milena: [
    "El comienzo de nuestra historia",
    "Las pequeñas grandes cosas",
    "Una amistad poco convencional",
    "Un lugar entre los recuerdos",
    "Risas que no se olvidan",
    "Una amistad con carácter",
    "Un recordatorio necesario",
    "Lo que todavía nos espera",
    "Conversaciones sin sentido",
    "Estar cuando importa",
    "Lo bueno de coincidir",
    "Todo lo que has superado",
    "Recuerdos sin fotografía",
    "Una promesa realista",
    "Un día cualquiera",
    "La confianza de siempre",
    "No pierdas esa sonrisa",
    "Personas que se quedan",
    "Los planes sencillos",
    "Nuestra asignatura pendiente",
    "Más historias por contar",
    "Un deseo para ti",
    "Un pequeño archivo de recuerdos",
    "Tiempo de agradecer",
    "Una versión que sigue creciendo",
    "El futuro también cuenta",
    "Lo que nos ha dejado esta etapa",
    "Después de la universidad",
    "Un deseo sincero",
    "Una amistad que continúa",
    "Hasta el siguiente capítulo"
  ],

  laura: [
    "Una bonita casualidad",
    "La magia de conversar",
    "Una buena película",
    "Tradiciones pendientes",
    "Una salida pendiente",
    "La comodidad de coincidir",
    "Planes espontáneos",
    "Una buena compañía",
    "Los días más bonitos",
    "Nuestra próxima película",
    "Una pequeña misión",
    "Un descanso necesario",
    "Un deseo especial",
    "Conversaciones favoritas",
    "El patino nos espera",
    "Un plan sin complicaciones",
    "La próxima salida",
    "Ser uno mismo",
    "Nuestra lista de películas",
    "Una amistad agradable",
    "Un año para recordar",
    "Buenas noticias",
    "Pequeños detalles",
    "Un diciembre bonito",
    "Un momento para ti",
    "Más tiempo juntos",
    "Una historia cotidiana",
    "Buenos momentos",
    "Una invitación abierta",
    "Las mejores casualidades",
    "La siguiente salida"
  ],

  luisa: [
    "Una coincidencia curiosa",
    "Conversaciones con capítulos",
    "Una forma particular de pensar",
    "Casualidades interesantes",
    "Sin conclusiones apresuradas",
    "Una historia peculiar",
    "El arte de conversar",
    "Una pregunta curiosa",
    "Sin etiquetas innecesarias",
    "Una combinación interesante",
    "Una oferta conversacional",
    "El futuro hipotético",
    "Una buena conversación",
    "Criterio propio",
    "El primer acto",
    "Una pregunta sin respuesta",
    "Un detalle interesante",
    "Sin promesas",
    "Pequeños descubrimientos",
    "Una posibilidad divertida",
    "Una buena cualidad",
    "Conversaciones memorables",
    "Sin prisa",
    "Un guion inesperado",
    "La curiosidad",
    "Nuevos capítulos",
    "Una posibilidad abierta",
    "Lo que todavía no sabemos",
    "Un deseo para ti",
    "Una historia por escribir",
    "Continuará..."
  ]

};


/* =========================================================
   09. GENERADOR DE LOS 93 REGALOS
========================================================= */

function crearRegalos(personaId) {

  const listaMensajes = mensajes[personaId];
  const listaTitulos = titulos[personaId];

  return Object.fromEntries(

    Array.from({ length: 31 }, (_, indice) => {

      const dia = indice + 1;

      const elementos = [];

      const mensaje = listaMensajes[indice];

      // Días especiales
      if (dia === 24) {

        elementos.push({
          tipo: "carta",
          contenido:
            mensaje +
            "\n\nQue esta Navidad te encuentre rodeada de tranquilidad, cariño y motivos para sonreír."
        });

        elementos.push({
          tipo: "video",
          contenido: personaId === "milena"
            ? "https://www.youtube.com/watch?v=MKHtXovAejs"
            : personaId === "laura"
              ? "https://www.youtube.com/watch?v=3WsufJe4YN8"
              : "https://www.youtube.com/watch?v=420h4EyO01w"
        });

      }

      else if (dia === 31) {

        elementos.push({
          tipo: "carta",
          contenido:
            mensaje +
            "\n\nGracias por formar parte de este pequeño proyecto. Ojalá el año que viene nos regale nuevas historias."
        });

        elementos.push({
          tipo: "cupon",
          contenido: "Un plan pendiente",
          descripcion:
            personaId === "milena"
              ? "Una experiencia para compartir, reírnos y seguir acumulando recuerdos."
              : personaId === "laura"
                ? "Una salida, una buena película y una tarde para ponernos al día."
                : "Una conversación, un plan interesante y una nueva anécdota.",
          nota: "Canjeable sin fecha de vencimiento."
        });

      }

      // Cartas en días seleccionados
      else if ([1, 7, 14, 21, 28].includes(dia)) {

        elementos.push({
          tipo: "carta",
          contenido: mensaje
        });

        elementos.push({
          tipo: "texto",
          contenido:
            "No todos los regalos tienen que ser materiales. A veces unas palabras llegan en el momento indicado."
        });

      }

      // Cupones
      else if ([5, 10, 15, 20, 25, 30].includes(dia)) {

        elementos.push({
          tipo: "texto",
          contenido: mensaje
        });

        elementos.push({
          tipo: "cupon",
          contenido: obtenerCupon(personaId, dia),
          descripcion: obtenerDescripcionCupon(personaId, dia),
          nota: "Una invitación abierta para cuando ambos quieran."
        });

      }

      // Canciones
      else if ([3, 9, 18, 27].includes(dia)) {

        elementos.push({
          tipo: "texto",
          contenido: mensaje
        });

        elementos.push({
          tipo: "cancion",
          contenido: obtenerEnlaceCancion(personaId)
        });

      }

      // Días con reflexión y cita
      else if ([4, 12, 16, 22, 29].includes(dia)) {

        elementos.push({
          tipo: "texto",
          contenido: mensaje
        });

        elementos.push({
          tipo: "cita",
          contenido: obtenerCita(personaId, dia)
        });

      }

      // Regalos normales
      else {

        elementos.push({
          tipo: "texto",
          contenido: mensaje
        });

        if (dia % 2 === 0) {
          elementos.push({
            tipo: "texto",
            contenido: obtenerDetalleAdicional(personaId, dia)
          });
        }

      }

      return [
        dia,
        {
          titulo: dia === 24
            ? "Una Navidad especial"
            : dia === 31
              ? "El último capítulo del año"
              : listaTitulos[indice],

          elementos
        }
      ];

    })

  );

}


function obtenerCupon(personaId, dia) {

  const cupones = {

    milena: [
      "Una tarde de recuerdos",
      "Un café y una conversación",
      "Una salida sin mirar el reloj",
      "Una tarde de películas",
      "Una comida pendiente",
      "Una aventura improvisada"
    ],

    laura: [
      "Una tarde de cine",
      "Una salida para ponernos al día",
      "Una película y algo rico",
      "Una tarde de conversación",
      "Una nueva aventura cinematográfica",
      "Una salida sin excusas"
    ],

    luisa: [
      "Una conversación sin límite de tiempo",
      "Una salida interesante",
      "Un café y buenas preguntas",
      "Una tarde de risas",
      "Un plan inesperado",
      "Una nueva anécdota"
    ]

  };

  return cupones[personaId][Math.floor(dia / 5) - 1] ||
    cupones[personaId][0];
}


function obtenerDescripcionCupon(personaId, dia) {

  if (personaId === "milena") {
    return "Un espacio para compartir, recordar historias y crear algunas nuevas.";
  }

  if (personaId === "laura") {
    return "Una invitación a recuperar nuestros planes y disfrutar de una buena compañía.";
  }

  return "Una oportunidad para seguir conversando y descubrir qué otras coincidencias aparecen.";
}


function obtenerEnlaceCancion(personaId) {

  // Reutilizamos el soundtrack elegido para cada calendario.
  // Puedes reemplazarlo por un enlace Spotify Embed más adelante.

  return `https://www.youtube.com/watch?v=${calendarios[personaId].soundtrack}`;
}


function obtenerCita(personaId, dia) {

  const citas = {

    milena: [
      "Las buenas amistades también sobreviven a los días complicados.",
      "Los recuerdos más valiosos suelen ser los más sencillos.",
      "Crecer también significa aprender a agradecer a quienes estuvieron.",
      "Una amistad verdadera no necesita ser perfecta.",
      "Hay personas que hacen que una etapa valga la pena."
    ],

    laura: [
      "Los mejores planes empiezan con una buena compañía.",
      "Una conversación agradable puede cambiar un día entero.",
      "Las pequeñas casualidades también construyen historias.",
      "No hay mejor plan que disfrutar el momento.",
      "Algunos recuerdos comienzan con un simple: ¿vamos?"
    ],

    luisa: [
      "La curiosidad es una excelente forma de comenzar.",
      "No todas las posibilidades necesitan una respuesta inmediata.",
      "Las mejores conversaciones dejan preguntas interesantes.",
      "Una buena conexión también se construye con tranquilidad.",
      "A veces lo inesperado es lo más interesante."
    ]

  };

  return citas[personaId][Math.floor(dia / 6) % 5];
}


function obtenerDetalleAdicional(personaId, dia) {

  const detalles = {

    milena:
      "Y por si hoy necesitabas escucharlo: espero que estés orgullosa de todo lo que has conseguido, incluso de lo que todavía estás construyendo.",

    laura:
      "Ojalá hoy encuentres un motivo sencillo para sonreír. A veces eso basta para hacer que el día sea mejor.",

    luisa:
      "No pierdas esa curiosidad que te lleva a cuestionar, aprender y mirar las cosas desde perspectivas diferentes."

  };

  return detalles[personaId];
}


const regalos = {
  milena: crearRegalos("milena"),
  laura: crearRegalos("laura"),
  luisa: crearRegalos("luisa")
};


/* =========================================================
   10. ELEMENTOS DINÁMICOS DE LOS REGALOS
========================================================= */

function crearElemento(tag, clase, contenido) {

  const elemento = document.createElement(tag);

  if (clase) {
    elemento.className = clase;
  }

  if (contenido !== undefined) {
    elemento.textContent = contenido;
  }

  return elemento;
}


function crearReproductor(enlace, tipo) {

  try {

    const url = new URL(enlace);

    if (url.protocol !== "https:") {
      throw new Error("Solo se permiten enlaces HTTPS.");
    }

    let direccion = "";

    const esYouTube =
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "m.youtube.com" ||
      url.hostname === "youtu.be";

    if (esYouTube) {

      let videoId = "";

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.split("/")[1] || "";
      }

      else if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      }

      else if (
        url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/shorts/")
      ) {
        videoId = url.pathname.split("/")[2] || "";
      }

      if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        throw new Error("El identificador de YouTube no es válido.");
      }

      direccion =
        `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

    }

    else if (
      tipo === "cancion" &&
      url.hostname === "open.spotify.com" &&
      url.pathname.startsWith("/embed/")
    ) {

      direccion = url.href;

    }

    else {
      throw new Error("Proveedor de contenido no compatible.");
    }

    const reproductor = document.createElement("iframe");

    reproductor.src = direccion;

    reproductor.title =
      tipo === "video"
        ? "Video de la sorpresa"
        : "Canción de la sorpresa";

    reproductor.className =
      tipo === "video"
        ? "gift-media video"
        : "gift-media";

    reproductor.allow =
      "autoplay; encrypted-media; picture-in-picture";

    reproductor.allowFullscreen = true;
    reproductor.loading = "lazy";

    if (tipo === "cancion") {
      reproductor.height = "152";
    }

    return reproductor;

  }

  catch (error) {

    console.warn("Error al crear reproductor:", error);

    return crearElemento(
      "p",
      "gift-text",
      "No pudimos cargar este contenido. Comprueba el enlace."
    );

  }

}


/* =========================================================
   11. RENDERIZADOR DE ELEMENTOS
========================================================= */

function renderizarElemento(elemento) {

  switch (elemento.tipo) {

    case "carta": {

      const carta = crearElemento(
        "div",
        "gift-letter",
        elemento.contenido
      );

      return carta;

    }


    case "texto": {

      return crearElemento(
        "p",
        "gift-text",
        elemento.contenido
      );

    }


    case "encabezado": {

      return crearElemento(
        "h3",
        "gift-heading",
        elemento.contenido
      );

    }


    case "cita": {

      return crearElemento(
        "blockquote",
        "gift-quote",
        elemento.contenido
      );

    }


    case "foto": {

      const imagen = document.createElement("img");

      imagen.src = elemento.contenido;
      imagen.alt =
        elemento.descripcion || "Fotografía de la sorpresa";

      imagen.className = "gift-photo";
      imagen.loading = "lazy";

      imagen.addEventListener("error", () => {
        imagen.alt = "No se pudo cargar esta fotografía.";
        imagen.hidden = true;
      });

      return imagen;

    }


    case "galeria": {

      const galeria = crearElemento("div", "gift-gallery");

      elemento.fotos.forEach(foto => {

        const imagen = document.createElement("img");

        imagen.src = foto.url;
        imagen.alt = foto.descripcion || "Fotografía de la galería";
        imagen.loading = "lazy";

        imagen.addEventListener("error", () => {
          imagen.hidden = true;
        });

        galeria.appendChild(imagen);

      });

      return galeria;

    }


    case "cancion": {

      return crearReproductor(
        elemento.contenido,
        "cancion"
      );

    }


    case "video": {

      return crearReproductor(
        elemento.contenido,
        "video"
      );

    }


    case "cupon": {

      const cupon = crearElemento("div", "gift-coupon");

      const titulo = crearElemento(
        "h3",
        "",
        elemento.contenido
      );

      const descripcion = crearElemento(
        "p",
        "",
        elemento.descripcion || ""
      );

      cupon.appendChild(titulo);
      cupon.appendChild(descripcion);

      if (elemento.nota) {

        cupon.appendChild(
          crearElemento("small", "", elemento.nota)
        );

      }

      return cupon;

    }


    case "enlace": {

      try {

        const url = new URL(elemento.contenido);

        if (url.protocol !== "https:") {
          throw new Error("Enlace no seguro.");
        }

        const enlace = document.createElement("a");

        enlace.href = url.href;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";

        enlace.className = "gift-link";
        enlace.textContent =
          elemento.texto || "Descubrir sorpresa →";

        return enlace;

      }

      catch (error) {

        console.warn("Enlace inválido:", error);

        return crearElemento(
          "p",
          "gift-text",
          "Este enlace no está disponible."
        );

      }

    }


    default: {

      console.warn(
        "Tipo de regalo desconocido:",
        elemento.tipo
      );

      return null;

    }

  }

}


/* =========================================================
   12. APERTURA DE REGALOS
========================================================= */

let modalAnterior = null;

function abrirSorpresa(dia) {

  const regalo = regalos[destinataria]?.[dia];

  if (!regalo) {
    mostrarNotificacion("Esta sorpresa todavía no está disponible.");
    return;
  }

  if (!diaDesbloqueado(dia)) {
    mostrarNotificacion("Todavía no ha llegado el día de esta sorpresa.");
    return;
  }

  modalDay.textContent =
    `DÍA ${dia} · DICIEMBRE 2026`;

  modalTitle.textContent = regalo.titulo;

  modalBody.replaceChildren();

  regalo.elementos.forEach(elemento => {

    const nodo = renderizarElemento(elemento);

    if (nodo) {
      modalBody.appendChild(nodo);
    }

  });

  if (modalFooterMessage) {
    modalFooterMessage.textContent = persona.mensajeFinal;
  }

  modalAnterior = document.activeElement;

  modal.hidden = false;

  document.body.style.overflow = "hidden";

  closeModalButton.focus();

}


function cerrarSorpresa() {

  if (modal.hidden) return;

  // Detener videos y canciones al cerrar el regalo.
  modalBody.querySelectorAll("iframe").forEach(iframe => {
    iframe.src = "about:blank";
  });

  modal.hidden = true;

  document.body.style.overflow = "";

  if (modalAnterior && typeof modalAnterior.focus === "function") {
    modalAnterior.focus();
  }

}


/* =========================================================
   13. EVENTOS DEL MODAL
========================================================= */

closeModalButton.addEventListener(
  "click",
  cerrarSorpresa
);

modal.addEventListener("click", evento => {

  if (
    evento.target === modal ||
    evento.target.classList.contains("modal-backdrop")
  ) {
    cerrarSorpresa();
  }

});


document.addEventListener("keydown", evento => {

  if (modal.hidden) return;

  if (evento.key === "Escape") {
    cerrarSorpresa();
  }

  // Mantener el foco dentro de la ventana.
  if (evento.key === "Tab") {

    const controles = modal.querySelectorAll(
      'button:not([disabled]), a[href], iframe'
    );

    if (!controles.length) return;

    const primero = controles[0];
    const ultimo = controles[controles.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    }

    else if (
      !evento.shiftKey &&
      document.activeElement === ultimo
    ) {
      evento.preventDefault();
      primero.focus();
    }

  }

});


/* =========================================================
   14. CREACIÓN DE LAS 31 PUERTAS
========================================================= */

function construirCalendario() {

  calendar.replaceChildren();

  for (let dia = 1; dia <= CONFIG.dias; dia++) {

    const puerta = document.createElement("button");

    puerta.type = "button";
    puerta.className = "door";

    if (dia === 25 || dia === 31) {
      puerta.classList.add("door-special");
      puerta.setAttribute(
        "aria-label",
        dia === 25 ? "Día 25, especial de Navidad" : "Día 31, cierre de año"
      );
    }

    puerta.textContent = dia;

    puerta.setAttribute(
      "aria-label",
      `Día ${dia} de diciembre`
    );

    const disponible = diaDesbloqueado(dia);

    puerta.disabled = !disponible;

    if (disponible) {

      puerta.addEventListener("click", () => {
        abrirSorpresa(dia);
      });

    }

    else {

      puerta.setAttribute(
        "aria-label",
        `Día ${dia}, todavía bloqueado`
      );

    }

    calendar.appendChild(puerta);

  }

}

construirCalendario();


/* =========================================================
   15. BARRA DE PROGRESO
========================================================= */

function actualizarProgreso() {

  const desbloqueados = Array.from(
    { length: CONFIG.dias },
    (_, indice) => indice + 1
  ).filter(dia => diaDesbloqueado(dia)).length;

  const porcentaje =
    (desbloqueados / CONFIG.dias) * 100;

  if (progressFill) {
    progressFill.style.width = `${porcentaje}%`;
  }

  if (progressCount) {
    progressCount.textContent =
      `${desbloqueados} de ${CONFIG.dias} días`;
  }

  if (progressBar) {

    progressBar.setAttribute(
      "aria-valuenow",
      String(desbloqueados)
    );

  }

  if (progressLabel) {

    progressLabel.textContent =
      desbloqueados === 31
        ? "¡Has completado el calendario!"
        : "Tu recorrido";

  }

}


/* =========================================================
   16. MÚSICA AMBIENTAL
========================================================= */

let musicaActiva = false;

function detenerMusica() {

  musicContainer.replaceChildren();

  musicaActiva = false;

  musicButton.setAttribute("aria-pressed", "false");

  musicButtonText.textContent = "Activar música";

  musicStatus.textContent =
    "La música está detenida. Puedes volver a escucharla cuando quieras.";

}


function activarMusica() {

  const videoId = persona.soundtrack;

  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {

    musicStatus.textContent =
      "No se encontró una banda sonora válida.";

    return;

  }

  const reproductor = document.createElement("iframe");

  reproductor.src =
    `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;

  reproductor.title =
    `Banda sonora de ${persona.nombre}`;

  reproductor.width = "100%";
  reproductor.height = "180";

  reproductor.allow =
    "autoplay; encrypted-media; picture-in-picture";

  reproductor.allowFullscreen = true;
  reproductor.loading = "lazy";

  musicContainer.replaceChildren(reproductor);

  musicaActiva = true;

  musicButton.setAttribute("aria-pressed", "true");

  musicButtonText.textContent = "Detener música";

  musicStatus.textContent =
    "Tu banda sonora está lista para acompañarte.";

}


musicButton.addEventListener("click", () => {

  if (musicaActiva) {
    detenerMusica();
  }

  else {
    activarMusica();
  }

});


/* =========================================================
   17. MOSTRAR Y OCULTAR CONTRASEÑA
========================================================= */

togglePassword.addEventListener("click", () => {

  const mostrar = passwordInput.type === "password";

  passwordInput.type = mostrar ? "text" : "password";

  togglePassword.setAttribute(
    "aria-pressed",
    String(mostrar)
  );

  togglePassword.setAttribute(
    "aria-label",
    mostrar
      ? "Ocultar contraseña"
      : "Mostrar contraseña"
  );

});


/* =========================================================
   18. NOTIFICACIONES
========================================================= */

let temporizadorNotificacion = null;

function mostrarNotificacion(mensaje) {

  if (!notification) return;

  notification.textContent = mensaje;

  notification.hidden = false;

  if (temporizadorNotificacion) {
    clearTimeout(temporizadorNotificacion);
  }

  temporizadorNotificacion = setTimeout(() => {
    notification.hidden = true;
  }, 3500);

}


/* =========================================================
   19. ACTUALIZACIÓN DE FECHAS
========================================================= */

/*
  Recalcula las puertas y el progreso cuando la página
  vuelve a estar visible.

  No utiliza el reloj del servidor.
*/

document.addEventListener("visibilitychange", () => {

  if (!document.hidden) {

    construirCalendario();
    actualizarProgreso();

  }

});


/* =========================================================
   20. CELEBRACIONES ESPECIALES: NAVIDAD Y AÑO NUEVO
========================================================= */

const estilosCelebracion = document.createElement("style");
estilosCelebracion.textContent = `
  .celebration-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: grid;
    place-items: center;
    padding: 22px;
    overflow: hidden;
    color: #fff8ef;
    background: radial-gradient(circle at 50% 35%, #68465f 0%, #17101f 72%);
    animation: celebrationFade .8s ease both;
  }
  .celebration-overlay.new-year {
    background: radial-gradient(circle at 50% 35%, #354a76 0%, #080d20 72%);
  }
  .celebration-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .celebration-card {
    position: relative;
    z-index: 2;
    width: min(560px, 100%);
    padding: 36px 25px;
    text-align: center;
    border: 1px solid rgba(255,255,255,.28);
    border-radius: 24px;
    background: rgba(255,255,255,.10);
    box-shadow: 0 25px 90px rgba(0,0,0,.35);
    backdrop-filter: blur(14px);
    animation: celebrationRise 1s cubic-bezier(.2,.8,.2,1) both;
  }
  .celebration-kicker {
    margin: 0 0 16px;
    letter-spacing: .22em;
    font-size: 10px;
    text-transform: uppercase;
    opacity: .85;
  }
  .celebration-title {
    margin: 0 0 18px;
    font-family: Georgia, serif;
    font-size: clamp(38px, 10vw, 68px);
    line-height: 1.05;
    font-weight: 400;
  }
  .celebration-message {
    max-width: 430px;
    margin: 0 auto 18px;
    line-height: 1.75;
    font-size: 15px;
  }
  .celebration-close {
    margin-top: 8px;
    padding: 12px 24px;
    border: 1px solid rgba(255,255,255,.6);
    border-radius: 999px;
    background: rgba(255,255,255,.13);
    color: #fff8ef;
    cursor: pointer;
    font: inherit;
  }
  .celebration-close:hover { background: rgba(255,255,255,.24); }
  .celebration-sparkle {
    position: absolute;
    color: #f5d9a8;
    pointer-events: none;
    animation: sparkleFloat 3.5s ease-in-out infinite;
  }
  @keyframes celebrationFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes celebrationRise {
    from { opacity: 0; transform: translateY(24px) scale(.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes sparkleFloat {
    0%,100% { opacity: 0; transform: translateY(12px) scale(.6) rotate(0); }
    45% { opacity: .9; }
    70% { opacity: .5; transform: translateY(-22px) scale(1.1) rotate(45deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .celebration-overlay, .celebration-card, .celebration-sparkle { animation: none !important; }
  }
`;
document.head.appendChild(estilosCelebracion);

let celebracionActiva = false;
let animacionFuegos = null;
const celebracionesVistas = new Set();

function crearFuegosArtificiales(canvas) {
  const contexto = canvas.getContext("2d");
  if (!contexto) return () => {};

  const escala = Math.min(window.devicePixelRatio || 1, 2);
  let ancho = window.innerWidth;
  let alto = window.innerHeight;

  function ajustarCanvas() {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = Math.floor(ancho * escala);
    canvas.height = Math.floor(alto * escala);
    canvas.style.width = `${ancho}px`;
    canvas.style.height = `${alto}px`;
    contexto.setTransform(escala, 0, 0, escala, 0, 0);
  }

  ajustarCanvas();
  window.addEventListener("resize", ajustarCanvas);

  const particulas = [];
  const colores = ["#f7d794", "#f5b7c8", "#d8c4ff", "#ffffff", "#a9d8ff", "#f3a683"];

  function lanzarExplosion() {
    const x = Math.random() * ancho;
    const y = alto * (0.15 + Math.random() * 0.45);
    const color = colores[Math.floor(Math.random() * colores.length)];
    const cantidad = 65;

    for (let i = 0; i < cantidad; i++) {
      const angulo = (Math.PI * 2 * i) / cantidad;
      const velocidad = 1 + Math.random() * 3.5;
      particulas.push({
        x, y,
        vx: Math.cos(angulo) * velocidad,
        vy: Math.sin(angulo) * velocidad,
        vida: 65 + Math.random() * 40,
        vidaMaxima: 105,
        radio: 1 + Math.random() * 2,
        color
      });
    }
  }

  let cuadros = 0;
  let activo = true;

  function dibujar() {
    if (!activo) return;

    contexto.clearRect(0, 0, ancho, alto);
    cuadros++;

    if (cuadros % 38 === 0) lanzarExplosion();

    for (let i = particulas.length - 1; i >= 0; i--) {
      const p = particulas[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.018;
      p.vx *= 0.992;
      p.vy *= 0.992;
      p.vida--;

      contexto.globalAlpha = Math.max(0, p.vida / p.vidaMaxima);
      contexto.fillStyle = p.color;
      contexto.beginPath();
      contexto.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      contexto.fill();

      if (p.vida <= 0) particulas.splice(i, 1);
    }

    contexto.globalAlpha = 1;
    animacionFuegos = requestAnimationFrame(dibujar);
  }

  lanzarExplosion();
  lanzarExplosion();
  dibujar();

  return () => {
    activo = false;
    if (animacionFuegos) cancelAnimationFrame(animacionFuegos);
    animacionFuegos = null;
    window.removeEventListener("resize", ajustarCanvas);
    contexto.clearRect(0, 0, ancho, alto);
  };
}

function mostrarCelebracion(tipo) {
  if (celebracionActiva) return;
  celebracionActiva = true;

  const esNavidad = tipo === "navidad";
  const overlay = document.createElement("section");
  overlay.className = `celebration-overlay${esNavidad ? "" : " new-year"}`;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", esNavidad ? "Celebración de Navidad" : "Celebración de Año Nuevo");

  const canvas = document.createElement("canvas");
  canvas.className = "celebration-canvas";
  overlay.appendChild(canvas);

  const card = document.createElement("div");
  card.className = "celebration-card";

  const kicker = crearElemento(
    "p",
    "celebration-kicker",
    esNavidad ? "25 DE DICIEMBRE · 00:00" : "1 DE ENERO · 00:00"
  );

  const title = crearElemento(
    "h2",
    "celebration-title",
    esNavidad ? "Feliz Navidad" : "Feliz Año Nuevo"
  );

  const mensajePersonal = esNavidad
    ? `${persona.nombre}, espero que esta Navidad te regale tranquilidad, cariño y momentos que merezcan quedarse en la memoria.`
    : `${persona.nombre}, un nuevo capítulo empieza. Gracias por formar parte de este año y por todo lo bonito que todavía puede venir.`;

  const message = crearElemento("p", "celebration-message", mensajePersonal);

  const extra = crearElemento(
    "p",
    "celebration-message",
    esNavidad
      ? "Que esta noche esté llena de calma, cariño y momentos que merezcan quedarse."
      : persona.mensajeFinal
  );

  const cerrar = crearElemento(
    "button",
    "celebration-close",
    esNavidad ? "Guardar este momento" : "Comenzar el nuevo capítulo"
  );
  cerrar.type = "button";

  card.append(kicker, title, message, extra, cerrar);
  overlay.appendChild(card);

  for (let i = 0; i < 20; i++) {
    const estrella = crearElemento("span", "celebration-sparkle", i % 2 ? "✦" : "✧");
    estrella.style.left = `${Math.random() * 96 + 2}%`;
    estrella.style.top = `${Math.random() * 92 + 4}%`;
    estrella.style.animationDelay = `${Math.random() * 2.5}s`;
    estrella.style.fontSize = `${10 + Math.random() * 18}px`;
    overlay.appendChild(estrella);
  }

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const detenerFuegos = crearFuegosArtificiales(canvas);

  function cerrarOverlay() {
    detenerFuegos();
    overlay.remove();
    document.body.style.overflow = "";
    celebracionActiva = false;
  }

  cerrar.addEventListener("click", cerrarOverlay);
  overlay.addEventListener("keydown", evento => {
    if (evento.key === "Escape") cerrarOverlay();
  });
  cerrar.focus();
}

function mostrarUnaVez(clave, accion) {
  if (celebracionesVistas.has(clave)) return;

  const llave = `calendario-2026-${destinataria}-${clave}`;

  try {
    if (sessionStorage.getItem(llave) === "si") {
      celebracionesVistas.add(clave);
      return;
    }
    sessionStorage.setItem(llave, "si");
  } catch (error) {
    // Si sessionStorage está bloqueado, se usa el control en memoria.
  }

  celebracionesVistas.add(clave);
  accion();
}

function revisarCelebracionPorFecha() {
  if (!calendarioAbierto) return;

  const fecha = obtenerFechaColombia();

  if (demoEspecial === "navidad") {
    mostrarUnaVez("demo-navidad", () => mostrarCelebracion("navidad"));
    return;
  }

  if (demoEspecial === "ano-nuevo") {
    mostrarUnaVez("demo-ano-nuevo", () => mostrarCelebracion("ano-nuevo"));
    return;
  }

  if (fecha.anio === 2026 && fecha.mes === 12 && fecha.dia === 25) {
    mostrarUnaVez("navidad", () => mostrarCelebracion("navidad"));
  }

  if (fecha.anio === 2027 && fecha.mes === 1 && fecha.dia === 1) {
    mostrarUnaVez("ano-nuevo", () => mostrarCelebracion("ano-nuevo"));
  }
}

window.setInterval(revisarCelebracionPorFecha, 15000);


/* =========================================================
   21. INICIALIZACIÓN
========================================================= */

actualizarProgreso();

console.info(
  `%c31 DÍAS CONTIGO · ${persona.nombre}`,
  "font-size:16px;font-weight:bold;color:#C77D7E;"
);

console.info(
  "Calendario cargado correctamente."
);

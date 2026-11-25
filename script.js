/* =========================================================
   31 DÍAS CONTIGO — SCRIPT PRINCIPAL
   Tres experiencias: Milena, Laurel y Cata
   Diciembre de 2026
========================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------
     1. CONFIGURACIÓN
  ------------------------------------------------------- */

  // Déjalo en true mientras pruebas. Cámbialo a false antes
  // de publicar la versión que recibirán ellas.
  const MODO_PRUEBA = true;

  // Permite probar las celebraciones especiales sin esperar
  // a Navidad o Año Nuevo:
  // ?para=milena&demo=navidad
  // ?para=milena&demo=ano-nuevo
  const parametros = new URLSearchParams(window.location.search);
  const destinatariaSolicitada = (parametros.get("para") || "milena").toLowerCase();
  const demoEspecial = parametros.get("demo");

  const calendarios = {
    milena: {
      nombre: "Milena",
      apodo: "Milena",
      tema: "theme-milena",
      soundtrack: "MKHtXovAejs",
      edicion: "UNA AMISTAD, MUCHOS CAPÍTULOS",
      titulo: "31 capítulos de nosotros",
      subtitulo: "Desde el primer semestre hasta todas las historias que todavía nos quedan por vivir.",
      simbolo: "✦",
      detalle: "Un álbum de recuerdos",
      saludoNavidad: "Milena, gracias por tantos capítulos compartidos.",
      saludoAnio: "Que nos queden muchísimas historias por vivir."
    },
    laura: {
      nombre: "Laura",
      apodo: "Laurel",
      tema: "theme-laura",
      soundtrack: "3WsufJe4YN8",
      edicion: "PEQUEÑOS DETALLES, GRANDES RECUERDOS",
      titulo: "31 pequeñas casualidades",
      subtitulo: "Porque algunas personas hacen más bonito el camino.",
      simbolo: "❀",
      detalle: "Un diario de momentos especiales",
      saludoNavidad: "Laurel, que nunca nos falten las buenas conversaciones y los buenos parches.",
      saludoAnio: "Que este nuevo año venga con películas, planes y muchas risas."
    },
    luisa: {
      nombre: "Luisa",
      apodo: "Cata",
      tema: "theme-luisa",
      soundtrack: "420h4EyO01w",
      edicion: "UNA HISTORIA QUE TODAVÍA NO SE HA ESCRITO",
      titulo: "31 razones para sospechar...",
      subtitulo: "Que nuestro futuro hipotético tiene demasiados capítulos.",
      simbolo: "✧",
      detalle: "Una colección de posibilidades",
      saludoNavidad: "Cata, espero que esta Navidad te recuerde lo especial que eres.",
      saludoAnio: "Que el próximo capítulo traiga buenas sorpresas. Sin adelantar conclusiones."
    }
  };

  const destinataria = calendarios[destinatariaSolicitada]
    ? destinatariaSolicitada
    : "milena";
  const persona = calendarios[destinataria];

  /* -------------------------------------------------------
     2. CONTENIDO DE LOS REGALOS
     Formato: [título, contenido, tipo]
     Tipos: carta, texto, reto, cupon, foto, galeria,
            cancion, lista, especial
  ------------------------------------------------------- */

  const contenido = {
    milena: [
      ["Donde empezó todo", "Quién diría que de todas las personas que conoceríamos en primer semestre, terminaríamos construyendo una amistad como esta. Este es el primer capítulo de un pequeño álbum dedicado a nosotros.", "carta"],
      ["Una canción para acompañarte", "Hay canciones que no necesitan explicar demasiado. Simplemente acompañan ciertos momentos y terminan convirtiéndose en parte de nuestros recuerdos.", "cancion"],
      ["Un instante para guardar", "Aquí va una fotografía de nosotros. Elige una que te haga sonreír cada vez que la vuelvas a ver.", "foto"],
      ["Si pudieras repetir un día...", "¿Qué momento de todos los que hemos compartido volverías a vivir exactamente igual? Guárdate la respuesta; algún día quiero conocerla.", "reto"],
      ["Vale por una salida", "Una salida juntos, a elección de la beneficiaria. Incluye conversación, risas y tiempo de calidad. Sin fecha de vencimiento; solo hay que ponernos de acuerdo.", "cupon"],
      ["Nuestra pequeña galería", "Tres fotografías, tres momentos y un montón de historias. Aquí añadiremos imágenes reales de nuestras aventuras.", "galeria"],
      ["Banda sonora de diciembre", "Una pequeña selección para distintos estados de ánimo: una canción para reír, otra para recordar, otra para descansar y una para cantar sin importar quién escuche.", "texto"],
      ["Cosas que admiro de ti", "Valoro mucho la persona que eres. Admiro la confianza que hemos construido, la manera en que podemos compartir tanto los momentos buenos como los complicados y esa posibilidad de hablar sin fingir que todo está bien. Me alegra haberte encontrado en este camino.", "carta"],
      ["Una misión espontánea", "Tómate una fotografía de algo que haya hecho bonito tu día. Puede ser una persona, un lugar, una comida o simplemente un momento. La idea es compartir un pedacito de nuestro diciembre.", "reto"],
      ["Nosotros dentro de cinco años", "Imagina que estamos en diciembre de 2031. ¿Dónde crees que estaremos? ¿Ya habremos sobrevivido a Medicina? ¿Qué cosas habrán cambiado y qué crees que seguirá siendo igual entre nosotros?", "reto"],
      ["Certificado oficial", "Por su destacada capacidad para escuchar historias, compartir locuras, sobrevivir a conversaciones inesperadas y formar parte de capítulos importantes. Se otorga el título de: AMIGA DE CONFIANZA Y CÓMPLICE OFICIAL.", "texto"],
      ["Medicina nos presentó", "Empezamos compartiendo clases, trabajos y preocupaciones universitarias. No sabíamos que también estábamos empezando una amistad que iba mucho más allá. Aquí va una foto o recuerdo de aquellos primeros semestres.", "foto"],
      ["Vale por una tarde de películas", "Una tarde para elegir película, preparar algo rico y olvidarnos un rato de las responsabilidades. La película puede ser buena o terrible; la compañía ya está asegurada.", "cupon"],
      ["Cinco cosas que hacen especial nuestra amistad", "1. La confianza que construimos.\n2. Poder hablar de cualquier cosa.\n3. Reírnos incluso en días pesados.\n4. Saber que podemos contar el uno con el otro.\n5. Que, con todo y nuestras diferencias, seguimos aquí.", "lista"],
      ["¿Qué tanto nos conocemos?", "Reto: cada uno escribirá tres recuerdos favoritos de nuestra amistad. Después comparamos las respuestas. Se permite discutir por detalles, pero no cambiar la historia para ganar.", "reto"],
      ["Un recuerdo sin explicación", "Hay fotografías que no necesitan una descripción larga. Basta con verlas para recordar cómo nos sentíamos en ese momento. Aquí guardaremos una de esas.", "foto"],
      ["Compañera de aventuras", "Se reconoce oficialmente tu participación en múltiples conversaciones, planes improvisados, momentos memorables y episodios de supervivencia universitaria. El cargo es permanente y no admite renuncia.", "texto"],
      ["Una canción y una dedicatoria", "Esta canción es una pausa dentro del calendario. Escúchala con calma y quédate con lo que te haga sentir; a veces la música dice cosas que uno no sabe cómo explicar.", "cancion"],
      ["Un plan pendiente", "Elige una actividad que te gustaría que hiciéramos antes de que termine el año. No tiene que ser algo costoso ni complicado: lo importante es compartir el momento.", "reto"],
      ["Gracias por estar", "No siempre hace falta tener las palabras correctas. A veces basta con saber que hay alguien dispuesto a escuchar. Gracias por esos momentos y por la confianza que hemos construido.", "carta"],
      ["Un álbum de pequeños momentos", "Aquí añadiremos un collage con esos momentos cotidianos que terminan siendo importantes: una salida, una visita, una risa o cualquier recuerdo que merezca quedarse.", "galeria"],
      ["Cuéntame esa historia", "Elige una anécdota nuestra que siempre te haga reír y cuéntamela otra vez. Prometo escucharla como si no la hubiera oído, aunque probablemente recuerde hasta los detalles.", "reto"],
      ["Vale por una noche de parche", "Canjeable por comida rica, una conversación larga y cero presión por tener un plan extraordinario. La fecha la elegimos entre los dos.", "cupon"],
      ["Una Navidad para recordar", "Milena, gracias por tantos capítulos compartidos: por las risas, las visitas, la confianza y también por esos momentos en los que no pensamos igual. Te deseo una Navidad llena de cariño, tranquilidad y motivos para sonreír. Me alegra muchísimo tenerte en mi vida.", "especial"],
      ["Un mensaje escondido", "Pista: piensa en uno de nuestros momentos más espontáneos. La sorpresa de hoy es que todavía nos quedan muchísimas cosas por hacer y recuerdos por fabricar. Este álbum no se termina aquí.", "reto"],
      ["Música para distintos días", "Guarda esta idea: una canción para los días felices, una para cuando necesites desconectarte y otra para esos días en los que solo quieres recordar lo bonito que también tiene la vida.", "cancion"],
      ["Diez cosas que todavía debemos hacer", "1. Hacer una salida sin afanes.\n2. Ver una película.\n3. Probar un lugar nuevo.\n4. Tomarnos más fotografías.\n5. Tener una conversación larguísima.\n6. Hacer un plan improvisado.\n7. Reírnos hasta cansarnos.\n8. Celebrar un logro.\n9. Crear una anécdota absurda.\n10. Seguir sumando capítulos.", "lista"],
      ["Una memoria especial", "Este espacio queda reservado para una fotografía y su historia. No tiene que ser el día más espectacular: basta con que sea un recuerdo que quieras conservar.", "foto"],
      ["¿Qué recuerdas de nosotros?", "Tres preguntas: ¿cuál fue nuestra primera conversación que recuerdas?, ¿qué momento te hizo pensar que ya había confianza?, ¿qué plan repetirías? Puedes responderlas cuando quieras.", "reto"],
      ["Lo que espero que nunca cambie", "Ojalá nunca perdamos la confianza para hablar, la libertad de molestarnos, la capacidad de reírnos de nosotros mismos y las ganas de estar presentes incluso cuando la vida se complique. Gracias por estos capítulos.", "carta"],
      ["El último capítulo... por ahora", "Treinta y un días no alcanzan para resumir una amistad. Gracias por las risas, las conversaciones, las visitas, la confianza y hasta por las discusiones. Todo eso también forma parte de nosotros. Por todos los capítulos que ya vivimos y por los que todavía nos faltan. Feliz Año Nuevo, Milena.", "especial"]
    ],

    laura: [
      ["Una bonita casualidad", "Qué curioso que algunas personas terminen formando parte de nuestra vida sin que uno lo haya planeado. Me alegra que tú seas una de ellas, Laurel. Bienvenida a este pequeño diciembre de sorpresas.", "carta"],
      ["Una canción para tu día", "Una melodía para acompañar este día. A veces una canción basta para cambiar el ambiente y hacer que una tarde normal se sienta un poquito más bonita.", "cancion"],
      ["Un recuerdo para guardar", "Aquí va una fotografía nuestra. Elige una que represente bien esos momentos sencillos que terminan siendo buenos recuerdos.", "foto"],
      ["Tu plan ideal", "Si mañana tuvieras una tarde libre, sin clases, trabajos ni pendientes, ¿qué plan escogerías? Puedes responder con el plan más tranquilo o con el más improvisado.", "reto"],
      ["Vale por un parche", "Una salida a elección de Laurel. Puede ser comer algo, caminar, hablar o simplemente salir de la rutina. Lo importante es encontrar el momento.", "cupon"],
      ["Pequeñas casualidades", "Una mini galería con tres momentos compartidos. No tienen que ser grandes eventos: a veces una foto espontánea dice más que mil planes.", "galeria"],
      ["Una playlist para desconectar", "Canciones para caminar, descansar, arreglarse, estudiar o simplemente dejar que pase la tarde. La música también puede ser una buena compañera.", "texto"],
      ["Algo que valoro de ti", "Me gusta tu forma de conversar, esa facilidad para compartir sin complicaciones y la comodidad que se siente cuando coincidimos. Gracias por ser una compañía tan agradable.", "carta"],
      ["La foto del día", "Reto: toma una fotografía de algo que te haya alegrado el día. Puede ser cualquier cosa. La idea es compartir una pequeña casualidad bonita.", "reto"],
      ["Nuestra próxima película", "Elige una película que te gustaría ver. La misión es encontrar una fecha para volver a cumplir ese plan de cine que llevamos tiempo diciendo que deberíamos recuperar.", "reto"],
      ["Laurel, una pregunta importante", "¿Cuántos planes hemos dicho que deberíamos hacer y todavía no hemos concretado? No respondas demasiado rápido; podría ser preocupante.", "texto"],
      ["Un recuerdo de Medicina", "Aunque la universidad tenga su buena dosis de estrés, también nos ha permitido coincidir con personas y momentos agradables. Aquí va un espacio para una foto o recuerdo de esa etapa.", "foto"],
      ["Vale por cine", "Cupón válido por una ida al cine. La película se elige entre los dos y el patino de Cine Colombia queda bajo consideración especial. No prometo que no lo mencione.", "cupon"],
      ["Tres cosas que hacen bonito un parche", "1. Buena conversación.\n2. No tener que fingir ni forzar nada.\n3. Reírse incluso de las cosas más simples.\nCon eso ya tenemos una buena fórmula.", "lista"],
      ["¿Qué tanto coincidimos?", "Cada uno debe escoger una película, una comida y un lugar para salir. Después comparamos respuestas. Si coincidimos en todo, habrá que investigar esa casualidad.", "reto"],
      ["Una fotografía espontánea", "Aquí guardaremos una imagen de un momento compartido. La regla es sencilla: que sea real, que nos guste y que nos recuerde algo bonito.", "foto"],
      ["Reconocimiento a la buena compañía", "Se reconoce a Laurel por su destacada capacidad para hacer que una conversación fluya, un plan sencillo se disfrute y una tarde cualquiera tenga algo especial.", "texto"],
      ["Una canción para recordar", "No todas las canciones tienen que tener una historia detrás. Algunas simplemente se quedan porque acompañaron un momento bonito. Esta es una invitación a encontrar una de esas.", "cancion"],
      ["El siguiente parche", "Propón un plan que podamos hacer antes de que termine el año. Se aceptan planes sencillos, planes espontáneos y planes que incluyan comida.", "reto"],
      ["Gracias por coincidir", "Me alegra que hayamos coincidido y que podamos compartir conversaciones, salidas y momentos sin demasiadas formalidades. Tu amistad es de esas pequeñas cosas que hacen más agradable el camino.", "carta"],
      ["Un diario de momentos", "Tres espacios para fotografías, frases o recuerdos de nuestras salidas. Este diario puede seguir creciendo con el tiempo.", "galeria"],
      ["La película que nos representa", "Si nuestra amistad fuera una película, ¿qué género sería: comedia, drama, aventura o una mezcla difícil de explicar? Elige el género y defiende tu respuesta.", "reto"],
      ["Vale por una tarde sin afanes", "Una tarde para comer algo rico, hablar de todo y de nada y dejar que el tiempo pase. Sin agenda universitaria y sin necesidad de correr.", "cupon"],
      ["Una Navidad bonita", "Laurel, espero que esta Navidad esté llena de tranquilidad, cariño y momentos que te hagan sonreír. Gracias por tu compañía, por las conversaciones y por hacer más bonito este camino. Te deseo cosas muy buenas.", "especial"],
      ["Una pequeña lista de pendientes", "Pendientes oficiales: recuperar la costumbre del cine, probar un lugar nuevo, hacer una salida sin afanes y seguir acumulando historias que después podamos recordar.", "lista"],
      ["Música para el camino", "Una selección imaginaria para acompañar el trayecto: algo alegre, algo tranquilo y algo que te den ganas de cantar. Que nunca falte una buena banda sonora.", "cancion"],
      ["Un plan que sí vamos a cumplir", "Escoge una actividad que llevemos tiempo aplazando. Esta vez intentaremos ponerle fecha en lugar de dejarla viviendo eternamente en el «algún día».", "reto"],
      ["Un recuerdo que merece foto", "Aquí va una fotografía de un momento que quieras conservar. Puede ser una salida, una celebración o una escena cotidiana que te guste recordar.", "foto"],
      ["Tres preguntas rápidas", "¿Qué salida repetirías? ¿Qué película recomendarías sin dudar? ¿Qué plan nuevo te gustaría hacer? Quedan oficialmente abiertas las recomendaciones.", "reto"],
      ["Gracias por estos momentos", "Gracias por tu compañía, por las conversaciones y por esos momentos en los que simplemente compartimos sin necesitar una razón especial. Me alegra haberte conocido y espero que nos queden muchos planes, películas y buenos momentos.", "carta"],
      ["Una casualidad que vale la pena", "La vida está llena de coincidencias, pero algunas terminan convirtiéndose en personas que vale la pena conservar. Gracias por ser una de ellas, Laurel. Que este nuevo año nos regale más planes, películas y buenas conversaciones. Feliz Año Nuevo.", "especial"]
    ],

    luisa: [
      ["Una sospecha inicial", "Tengo una teoría: algunas personas aparecen en nuestra vida y, sin proponérselo, consiguen despertar una curiosidad bastante particular. Cata, tú eres parte de esa teoría. Bienvenida a estos 31 días.", "carta"],
      ["Una canción para el expediente", "Toda buena historia necesita banda sonora. Esta es una pausa musical para acompañar el día y, de paso, añadir una pista más a este expediente de coincidencias.", "cancion"],
      ["Una escena para recordar", "Aquí va una fotografía o imagen de un momento compartido. Las buenas historias también se construyen con escenas pequeñas.", "foto"],
      ["La hipótesis del día", "Si dos personas se entienden bien, se divierten juntas y disfrutan conversar, ¿eso es una simple coincidencia o hay algo interesante que investigar? No hace falta emitir un dictamen.", "reto"],
      ["Vale por una conversación", "Cupón canjeable por una conversación, un café o un plan tranquilo. Sin presión, sin letra pequeña y sin necesidad de definir absolutamente nada.", "cupon"],
      ["Pequeñas escenas", "Una galería de momentos, lugares o detalles que tengan una estética especial. Como en toda buena película, no todas las escenas necesitan diálogo.", "galeria"],
      ["Banda sonora de posibilidades", "Una selección para diferentes escenas: caminar sin rumbo, una conversación larga, una noche tranquila y un momento inesperadamente divertido.", "texto"],
      ["Una cualidad que admiro", "Admiro tu manera de expresarte, de desarrollar tus ideas y de hacer que una conversación sencilla termine siendo interesante. Me parece especialmente atractiva esa combinación de criterio, personalidad y elocuencia.", "carta"],
      ["Una misión: prestar atención", "Hoy el reto es encontrar algo pequeño que te haya llamado la atención: una frase, una canción, un lugar o una situación curiosa. Las mejores historias empiezan observando detalles.", "reto"],
      ["Una escena hipotética", "Imagina que dentro de cinco años nos encontramos por casualidad y empezamos a recordar este diciembre. ¿Qué crees que nos daría más risa de esta etapa?", "reto"],
      ["Diagnóstico preliminar", "Hallazgos: buena conversación, humor compatible y curiosidad persistente. Conclusión: el caso merece seguimiento. Pronóstico: reservado, pero entretenido.", "texto"],
      ["Una conversación memorable", "Hay conversaciones que se olvidan y otras que dejan pensando. Aquí puedes guardar una frase o un tema que te haya gustado de alguna de nuestras charlas.", "foto"],
      ["Vale por un plan", "Un plan elegido entre los dos: café, comida, paseo o cualquier actividad que nos permita conversar y pasar un buen rato. Sin expectativas adicionales.", "cupon"],
      ["Tres cosas interesantes", "1. Tu manera de expresarte.\n2. Tu sentido del humor.\n3. La facilidad con la que una conversación contigo puede tomar un rumbo inesperado.\nNo es una lista exhaustiva; solo algunos hallazgos.", "lista"],
      ["Compatibilidad de teorías", "Escoge una película, una comida y un destino para una salida ideal. Después comparamos respuestas. Si coincidimos, será un dato curioso; si no, tendremos temas para debatir.", "reto"],
      ["Una escena bonita", "Aquí guardaremos una fotografía o un pequeño recuerdo visual. No hace falta que sea perfecto; las escenas espontáneas suelen ser las mejores.", "foto"],
      ["Reconocimiento a la elocuencia", "Se reconoce a Cata por su capacidad de sostener conversaciones interesantes, defender sus ideas y convertir un intercambio cualquiera en algo que vale la pena escuchar.", "texto"],
      ["Una canción sin conclusiones", "Escúchala sin buscarle demasiadas interpretaciones. No todo tiene que ser una indirecta; a veces una canción simplemente merece sonar.", "cancion"],
      ["Una invitación sencilla", "Si te apetece, queda pendiente un plan para compartir algo fuera de la rutina. La idea es disfrutar el momento, no convertirlo en una negociación diplomática.", "reto"],
      ["Una confesión objetiva", "Sí, me pareces una mujer muy atractiva. Y no voy a fingir que esa fue una observación difícil de realizar. También me gusta lo que he podido conocer de tu manera de pensar.", "carta"],
      ["Un pequeño archivo de coincidencias", "Aquí puedes guardar tres detalles que te hayan hecho sonreír de este mes. Las coincidencias pequeñas también merecen un lugar en el archivo.", "galeria"],
      ["Pregunta sin respuesta correcta", "¿Qué valoras más en una conversación: el humor, la profundidad, la espontaneidad o la capacidad de debatir? Se aceptan combinaciones y argumentos extensos.", "reto"],
      ["Vale por una pausa", "Cupón por un café, una charla o un rato agradable. Canjeable cuando coincidan las ganas y el tiempo. No caduca ni exige explicaciones.", "cupon"],
      ["Una Navidad especial", "Cata, espero que esta Navidad te regale tranquilidad, alegría y momentos que te hagan sentir querida. Me alegra haber coincidido contigo y poder compartir esta pequeña complicidad. Que disfrutes mucho estas fechas.", "especial"],
      ["El futuro hipotético", "En algún universo alternativo probablemente tenemos una historia bastante interesante. En este, por ahora, me parece suficiente disfrutar las coincidencias y dejar que cada cosa encuentre su propio ritmo.", "carta"],
      ["Música para una escena", "Toda película tiene una escena que se queda en la memoria por su música. Elige una canción que te gustaría que sonara en una escena importante de tu vida.", "reto"],
      ["Una posibilidad entre muchas", "La vida tiene una cantidad absurda de caminos posibles. No sé cuáles nos tocarán, pero me parece bonito que nuestros caminos se hayan cruzado. Lo demás no necesita resolverse hoy.", "texto"],
      ["Una fotografía con intención", "Aquí va una imagen de un momento, lugar o detalle que te guste. Que sea una pequeña pausa visual dentro de esta colección de posibilidades.", "foto"],
      ["El guion todavía está abierto", "Tres preguntas: ¿qué experiencia te gustaría vivir el próximo año?, ¿qué lugar te gustaría conocer?, ¿qué habilidad te gustaría aprender? El siguiente capítulo también se escribe fuera de estas páginas.", "reto"],
      ["Sin adelantar capítulos", "No todas las historias necesitan tener un destino definido desde el principio. Algunas simplemente merecen disfrutarse mientras se escriben. Me gusta coincidir contigo y descubrir poco a poco quién eres.", "carta"],
      ["Continuará...", "No sé qué capítulos vendrán después, ni creo que tengamos que decidirlo ahora. Solo quería que supieras que disfruto coincidir contigo, que admiro varias cosas de ti y que me parece bonito tenerte en mi presente. Lo demás, si algún día llega, tendrá su propio momento. Feliz Año Nuevo, Cata.", "especial"]
    ]
  };

  // El día 25 (Navidad) es el gran regalo navideño. El día 24
  // conserva una sorpresa normal para que el efecto de medianoche
  // llegue al comenzar el 25 de diciembre.
  Object.keys(contenido).forEach(clave => {
    [contenido[clave][23], contenido[clave][24]] =
      [contenido[clave][24], contenido[clave][23]];
  });

  /* -------------------------------------------------------
     3. PREPARAR PERSONA Y PORTADA
  ------------------------------------------------------- */

  document.body.classList.add(persona.tema);
  document.title = `${persona.titulo} | Diciembre 2026`;

  const edition = document.getElementById("edition");
  const mainTitle = document.getElementById("main-title");
  const subtitle = document.getElementById("subtitle");
  const welcome = document.getElementById("welcome");

  if (edition) edition.textContent = persona.edicion;
  if (mainTitle) mainTitle.textContent = persona.titulo;
  if (subtitle) subtitle.textContent = persona.subtitulo;

  if (welcome && !welcome.querySelector(".cover-art")) {
    const portada = document.createElement("div");
    portada.className = "cover-art";

    const simbolo = document.createElement("span");
    simbolo.className = "cover-symbol";
    simbolo.textContent = persona.simbolo;

    const detalle = document.createElement("span");
    detalle.className = "cover-detail";
    detalle.textContent = persona.detalle;

    portada.append(simbolo, detalle);
    welcome.insertBefore(portada, welcome.firstChild);
  }

  /* -------------------------------------------------------
     4. ACCESO DE DEMOSTRACIÓN
  ------------------------------------------------------- */

  const password = document.getElementById("password");
  const enterButton = document.getElementById("enter-button");
  const welcomeScreen = document.getElementById("welcome");
  const calendarScreen = document.getElementById("calendar-screen");

  if (password) {
    password.disabled = true;
    password.placeholder = "Acceso privado en preparación";
  }

  const loginLabel = document.querySelector(".login label");
  if (loginLabel) {
    loginLabel.textContent = "Tu sorpresa está lista";
  }

  const loginMessage = document.getElementById("login-message");
  if (loginMessage) {
    loginMessage.textContent = "Esta es una vista previa; el acceso privado se configurará antes de compartir.";
  }

  if (enterButton) {
    enterButton.textContent = "Abrir mi calendario";
    enterButton.addEventListener("click", () => {
      if (welcomeScreen) welcomeScreen.hidden = true;
      if (calendarScreen) calendarScreen.hidden = false;

      const calendarTitle = document.getElementById("calendar-title");
      const calendarSubtitle = document.getElementById("calendar-subtitle");

      if (calendarTitle) {
        calendarTitle.textContent = `Diciembre de ${persona.apodo}`;
      }
      if (calendarSubtitle) {
        calendarSubtitle.textContent = `${persona.detalle} · 31 días especiales`;
      }

      revisarCelebracionPorFecha();
    });
  }

  /* -------------------------------------------------------
     5. MÚSICA AMBIENTAL
  ------------------------------------------------------- */

  const musicButton = document.getElementById("music-button");
  const musicStatus = document.getElementById("music-status");
  const musicContainer = document.getElementById("music-player-container");
  let musicaActiva = false;

  if (musicButton && musicContainer) {
    musicButton.addEventListener("click", () => {
      if (musicaActiva) {
        musicContainer.replaceChildren();
        musicaActiva = false;
        musicButton.textContent = "♫ Activar música";
        if (musicStatus) musicStatus.textContent = "La música está detenida. Puedes volver a escucharla cuando quieras.";
        return;
      }

      const reproductor = document.createElement("iframe");
      reproductor.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(persona.soundtrack)}?autoplay=1&controls=1&rel=0`;
      reproductor.width = "100%";
      reproductor.height = "180";
      reproductor.title = `Soundtrack de ${persona.apodo}`;
      reproductor.allow = "autoplay; encrypted-media; picture-in-picture";
      reproductor.allowFullscreen = true;
      reproductor.loading = "lazy";
      reproductor.style.border = "0";
      reproductor.style.borderRadius = "12px";

      musicContainer.replaceChildren(reproductor);
      musicaActiva = true;
      musicButton.textContent = "♫ Detener música";
      if (musicStatus) musicStatus.textContent = "Tu soundtrack está sonando.";
    });
  }

  /* -------------------------------------------------------
     6. MODAL Y RENDERIZADO DE REGALOS
  ------------------------------------------------------- */

  const modal = document.getElementById("surprise-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modalDay = document.getElementById("modal-day");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  function crearElemento(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function renderizarRegalo(dia) {
    const datos = contenido[destinataria][dia - 1];
    if (!datos || !modalBody) return;

    const [titulo, texto, tipo] = datos;
    if (modalTitle) modalTitle.textContent = titulo;
    modalBody.replaceChildren();

    if (tipo === "carta") {
      modalBody.appendChild(crearElemento("div", "gift-letter", texto));
    } else if (tipo === "texto") {
      modalBody.appendChild(crearElemento("p", "gift-text", texto));
    } else if (tipo === "reto") {
      const caja = crearElemento("div", "gift-coupon");
      caja.appendChild(crearElemento("h3", "", "✦ Misión del día"));
      caja.appendChild(crearElemento("p", "", texto));
      caja.appendChild(crearElemento("small", "", "No hay respuestas incorrectas."));
      modalBody.appendChild(caja);
    } else if (tipo === "cupon") {
      const caja = crearElemento("div", "gift-coupon");
      caja.appendChild(crearElemento("h3", "", "VALE ESPECIAL"));
      caja.appendChild(crearElemento("p", "", texto));
      caja.appendChild(crearElemento("small", "", "Canjeable cuando quieras; solo debemos coordinarlo."));
      modalBody.appendChild(caja);
    } else if (tipo === "foto") {
      const caja = crearElemento("div", "gift-photo-placeholder");
      caja.appendChild(crearElemento("div", "photo-placeholder-icon", "▧"));
      caja.appendChild(crearElemento("p", "gift-text", texto));
      caja.appendChild(crearElemento("small", "", "ESPACIO RESERVADO PARA UNA FOTOGRAFÍA REAL"));
      modalBody.appendChild(caja);
    } else if (tipo === "galeria") {
      const caja = crearElemento("div", "gift-gallery-placeholder");
      caja.appendChild(crearElemento("p", "gift-text", texto));
      const mosaico = crearElemento("div", "gallery-placeholder-grid");
      for (let i = 1; i <= 3; i++) {
        const marco = crearElemento("div", "gallery-placeholder-item", `Foto ${i}`);
        mosaico.appendChild(marco);
      }
      caja.appendChild(mosaico);
      caja.appendChild(crearElemento("small", "", "Las imágenes se añadirán cuando elijas las fotografías."));
      modalBody.appendChild(caja);
    } else if (tipo === "cancion") {
      modalBody.appendChild(crearElemento("p", "gift-text", texto));
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(persona.soundtrack)}?rel=0`;
      iframe.title = `Canción para ${persona.apodo}`;
      iframe.className = "gift-media";
      iframe.height = "152";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      modalBody.appendChild(iframe);
    } else if (tipo === "lista") {
      const lista = crearElemento("div", "gift-letter");
      texto.split("\n").forEach(linea => {
        lista.appendChild(crearElemento("p", "gift-text", linea));
      });
      modalBody.appendChild(lista);
    } else if (tipo === "especial") {
      const caja = crearElemento("div", "gift-letter special-letter");
      caja.textContent = texto;
      modalBody.appendChild(caja);
    }

    // Pequeño pie de página consistente en todas las sorpresas.
    modalBody.appendChild(crearElemento("p", "gift-signature", `Con cariño · ${persona.apodo}`));
  }

  function abrirSorpresa(dia) {
    if (!modal || !modalBody) return;

    if (modalDay) {
      modalDay.textContent = `DÍA ${dia} · DICIEMBRE 2026`;
    }

    renderizarRegalo(dia);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function cerrarSorpresa() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", cerrarSorpresa);
  }

  if (modal) {
    modal.addEventListener("click", evento => {
      if (evento.target === modal) cerrarSorpresa();
    });
  }

  document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && modal && !modal.hidden) cerrarSorpresa();
  });

  /* -------------------------------------------------------
     7. EFECTOS ESPECIALES: NAVIDAD Y AÑO NUEVO
  ------------------------------------------------------- */

  const estilosEspeciales = document.createElement("style");
  estilosEspeciales.textContent = `
    .door.door-special {
      position: relative;
      overflow: visible;
      border: 1px solid var(--primary, #d7a9a0);
      box-shadow: 0 0 0 2px rgba(255,255,255,.08), 0 0 18px rgba(220,180,130,.22);
    }
    .door.door-special::after {
      content: "✦";
      position: absolute;
      top: -9px;
      right: -6px;
      font-size: 15px;
      color: var(--primary, #f0c6cf);
      text-shadow: 0 0 10px currentColor;
    }
    .gift-photo-placeholder, .gift-gallery-placeholder {
      padding: 18px;
      margin: 12px 0;
      text-align: center;
      border: 1px dashed var(--secondary, #d7a9a0);
      border-radius: 16px;
      background: rgba(255,255,255,.045);
    }
    .photo-placeholder-icon {
      font-size: 42px;
      opacity: .8;
      margin-bottom: 8px;
    }
    .gift-photo-placeholder small, .gift-gallery-placeholder small {
      display: block;
      margin-top: 12px;
      font-size: 10px;
      letter-spacing: .12em;
      opacity: .7;
    }
    .gallery-placeholder-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 14px;
    }
    .gallery-placeholder-item {
      aspect-ratio: 1 / 1.15;
      display: grid;
      place-items: center;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,.2);
      background: linear-gradient(145deg, rgba(255,255,255,.13), rgba(255,255,255,.025));
      font-size: 12px;
    }
    .gift-signature {
      text-align: right;
      opacity: .7;
      font-size: 12px;
      margin-top: 18px;
      font-style: italic;
    }
    .celebration-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: grid;
      place-items: center;
      padding: 22px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 35%, rgba(93,60,91,.94), rgba(13,10,20,.98) 68%);
      color: #fff8ef;
      animation: celebrationFade .8s ease both;
    }
    .celebration-overlay.new-year {
      background: radial-gradient(circle at 50% 35%, rgba(40,55,91,.94), rgba(8,10,24,.99) 70%);
    }
    .celebration-card {
      position: relative;
      z-index: 2;
      width: min(560px, 100%);
      padding: 34px 24px;
      text-align: center;
      border: 1px solid rgba(255,255,255,.28);
      border-radius: 24px;
      background: rgba(255,255,255,.09);
      box-shadow: 0 25px 90px rgba(0,0,0,.35);
      backdrop-filter: blur(14px);
      animation: celebrationRise 1s cubic-bezier(.2,.8,.2,1) both;
    }
    .celebration-kicker {
      margin: 0 0 14px;
      letter-spacing: .24em;
      font-size: 10px;
      text-transform: uppercase;
      opacity: .8;
    }
    .celebration-title {
      margin: 0 0 16px;
      font-family: Georgia, serif;
      font-size: clamp(36px, 10vw, 66px);
      line-height: 1;
      font-weight: 400;
    }
    .celebration-message {
      max-width: 420px;
      margin: 0 auto 22px;
      line-height: 1.7;
      font-size: 15px;
      color: rgba(255,248,239,.92);
    }
    .celebration-close {
      padding: 12px 22px;
      border: 1px solid rgba(255,255,255,.55);
      border-radius: 999px;
      background: rgba(255,255,255,.12);
      color: #fff8ef;
      cursor: pointer;
      font: inherit;
    }
    .celebration-close:hover { background: rgba(255,255,255,.22); }
    .celebration-sparkle {
      position: absolute;
      color: #f5d9a8;
      opacity: 0;
      pointer-events: none;
      animation: sparkleFloat 3.5s ease-in-out infinite;
    }
    .celebration-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    @keyframes celebrationFade { from {opacity:0} to {opacity:1} }
    @keyframes celebrationRise {
      from {opacity:0; transform:translateY(24px) scale(.96)}
      to {opacity:1; transform:translateY(0) scale(1)}
    }
    @keyframes sparkleFloat {
      0%,100% {opacity:0; transform:translateY(12px) scale(.6) rotate(0deg)}
      45% {opacity:.9}
      70% {opacity:.5; transform:translateY(-22px) scale(1.1) rotate(45deg)}
    }
    @media (prefers-reduced-motion: reduce) {
      .celebration-overlay, .celebration-card, .celebration-sparkle { animation: none !important; }
    }
  `;
  document.head.appendChild(estilosEspeciales);

  let celebracionActiva = false;
  let animacionFuegos = null;

  function crearFuegosArtificiales(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    let ancho = canvas.width = window.innerWidth * devicePixelRatio;
    let alto = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const particulas = [];
    const colores = ["#f7d794", "#f5b7c8", "#d8c4ff", "#ffffff", "#a9d8ff", "#f3a683"];

    function lanzarCohete() {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight * (0.18 + Math.random() * 0.42);
      const color = colores[Math.floor(Math.random() * colores.length)];
      for (let i = 0; i < 58; i++) {
        const angulo = (Math.PI * 2 * i) / 58;
        const velocidad = 1.2 + Math.random() * 3.3;
        particulas.push({
          x, y,
          vx: Math.cos(angulo) * velocidad,
          vy: Math.sin(angulo) * velocidad,
          vida: 70 + Math.random() * 35,
          maxVida: 105,
          color,
          radio: 1 + Math.random() * 2
        });
      }
    }

    let cuadros = 0;
    function dibujar() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      cuadros++;

      if (cuadros % 38 === 0) lanzarCohete();

      for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.018;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.vida--;

        ctx.globalAlpha = Math.max(0, p.vida / p.maxVida);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fill();

        if (p.vida <= 0) particulas.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      animacionFuegos = requestAnimationFrame(dibujar);
    }

    lanzarCohete();
    dibujar();

    return () => {
      if (animacionFuegos) cancelAnimationFrame(animacionFuegos);
      animacionFuegos = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }

  function mostrarCelebracion(tipo) {
    if (celebracionActiva) return;
    celebracionActiva = true;

    const navidad = tipo === "navidad";
    const overlay = crearElemento(
      "section",
      `celebration-overlay${navidad ? "" : " new-year"}`
    );
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", navidad ? "Celebración de Navidad" : "Celebración de Año Nuevo");

    const canvas = document.createElement("canvas");
    canvas.className = "celebration-canvas";
    overlay.appendChild(canvas);

    const card = crearElemento("div", "celebration-card");
    const kicker = crearElemento("p", "celebration-kicker",
      navidad ? "25 DE DICIEMBRE · 00:00" : "1 DE ENERO · 00:00");
    const title = crearElemento("h2", "celebration-title",
      navidad ? "Feliz Navidad" : "Feliz Año Nuevo");
    const message = crearElemento("p", "celebration-message",
      navidad
        ? persona.saludoNavidad
        : persona.saludoAnio);
    const extra = crearElemento("p", "celebration-message",
      navidad
        ? "Que esta noche esté llena de calma, cariño y momentos que merezcan quedarse en la memoria."
        : "Un nuevo capítulo empieza. Gracias por haber formado parte de este año y por todo lo bonito que todavía puede venir.");
    const cerrar = crearElemento("button", "celebration-close",
      navidad ? "Guardar este momento" : "Comenzar el nuevo capítulo");
    cerrar.type = "button";

    card.append(kicker, title, message, extra, cerrar);
    overlay.appendChild(card);

    // Destellos decorativos en posiciones variadas.
    for (let i = 0; i < 18; i++) {
      const estrella = crearElemento("span", "celebration-sparkle", i % 2 ? "✦" : "✧");
      estrella.style.left = `${Math.random() * 96 + 2}%`;
      estrella.style.top = `${Math.random() * 92 + 4}%`;
      estrella.style.animationDelay = `${Math.random() * 2.5}s`;
      estrella.style.fontSize = `${10 + Math.random() * 18}px`;
      overlay.appendChild(estrella);
    }

    document.body.appendChild(overlay);
    const detenerFuegos = crearFuegosArtificiales(canvas);

    function cerrarOverlay() {
      detenerFuegos();
      overlay.remove();
      document.body.style.overflow = "";
      celebracionActiva = false;
    }

    cerrar.addEventListener("click", cerrarOverlay);
    overlay.addEventListener("keydown", e => {
      if (e.key === "Escape") cerrar();
    });
    document.body.style.overflow = "hidden";
  }

  function fechaBogota() {
    const partes = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).formatToParts(new Date());

    return {
      anio: Number(partes.find(p => p.type === "year").value),
      mes: Number(partes.find(p => p.type === "month").value),
      dia: Number(partes.find(p => p.type === "day").value)
    };
  }

  function revisarCelebracionPorFecha() {
    // La celebración se muestra cuando la persona ya entró al calendario.
    if (calendarScreen && calendarScreen.hidden) return;

    const fecha = fechaBogota();

    if (demoEspecial === "navidad") {
      mostrarUnaVez("demo-navidad", () => mostrarCelebracion("navidad"));
      return;
    }
    if (demoEspecial === "ano-nuevo") {
      mostrarUnaVez("demo-ano-nuevo", () => mostrarCelebracion("ano-nuevo"));
      return;
    }

    // Si la persona entra el 25 de diciembre o el 1 de enero,
    // verá el saludo aunque no tuviera la página abierta justo a medianoche.
    if (fecha.mes === 12 && fecha.dia === 25) {
      mostrarUnaVez("navidad", () => mostrarCelebracion("navidad"));
    } else if (fecha.mes === 1 && fecha.dia === 1) {
      mostrarUnaVez("ano-nuevo", () => mostrarCelebracion("ano-nuevo"));
    }
  }

  const celebracionesVistas = new Set();

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
      // Si el navegador bloquea sessionStorage, se usa el control en memoria.
    }

    celebracionesVistas.add(clave);
    accion();
  }

  // Detecta el cambio de fecha aunque el calendario permanezca abierto.
  revisarCelebracionPorFecha();
  window.setInterval(revisarCelebracionPorFecha, 15000);

  /* -------------------------------------------------------
     8. CREAR LAS 31 PUERTAS Y CONTROLAR FECHAS
  ------------------------------------------------------- */

  const calendar = document.getElementById("calendar");

  function diaDisponible(dia) {
    if (MODO_PRUEBA) return true;

    const fecha = fechaBogota();

    // Antes de diciembre de 2026, no se abre ninguna puerta.
    if (fecha.anio < 2026) return false;
    if (fecha.anio === 2026 && fecha.mes < 12) return false;

    // Durante diciembre de 2026, solo se abren los días alcanzados.
    if (fecha.anio === 2026 && fecha.mes === 12) {
      return dia <= fecha.dia;
    }

    // Desde enero de 2027 el calendario queda como recuerdo abierto.
    return fecha.anio > 2026 || (fecha.anio === 2026 && fecha.mes > 12);
  }

  if (calendar) {
    calendar.replaceChildren();

    for (let dia = 1; dia <= 31; dia++) {
      const puerta = document.createElement("button");
      puerta.className = "door";
      puerta.type = "button";
      puerta.textContent = String(dia);
      puerta.setAttribute("aria-label", `Abrir regalo del día ${dia}`);

      if (dia === 25 || dia === 31) {
        puerta.classList.add("door-special");
        puerta.setAttribute("aria-label", dia === 25
          ? "Regalo especial de Navidad, día 25"
          : "Regalo especial de cierre, día 31");
      }

      const disponible = diaDisponible(dia);
      puerta.disabled = !disponible;

      if (disponible) {
        puerta.addEventListener("click", () => abrirSorpresa(dia));
      }

      calendar.appendChild(puerta);
    }
  }

  /* -------------------------------------------------------
     9. ACCESO DIRECTO PARA PROBAR EFECTOS
  ------------------------------------------------------- */

  // Los enlaces de prueba son:
  // ?para=milena&demo=navidad
  // ?para=laura&demo=ano-nuevo
  // Cambia el valor de "para" para probar cada calendario.

})();

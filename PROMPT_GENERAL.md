# Prompt general — Proyecto 2: Menú de restaurante

Front I — CESDE / Comfama. Docente: Jorge Albeiro Muriel.

Este documento organiza el trabajo de cuatro compañeros a partir de la guía «Grupo Front I - DOM Traversing (guía para estudiantes)». La guía propone equipos de dos o tres: trabajar con cuatro es una adaptación solicitada por el equipo y debe validarse con el docente. Los nombres de los integrantes se completan antes de entregar.

## 1. Cómo usar este documento

1. Todos leen las reglas y el contrato antes de programar.
2. Cada compañero copia el **prompt compartido** y, a continuación, el **prompt de su parte** en su conversación con la IA.
3. Adjunta los archivos actuales del repositorio: la IA no conoce automáticamente lo hecho por los demás.
4. Se trabaja por etapas y se prueba cada cambio antes de continuar. Nadie integra código que no pueda explicar.
5. Cada entrega se propone mediante un pull request hacia `develop`; la versión probada pasa a `main`.

Estado de esta guía: define el alcance y el contrato de integración. La versión actual implementa el CRUD y los pedidos en `script.js`; la matriz completa de pruebas manuales y las evidencias siguen pendientes. Esta nota no afirma que la aplicación ya haya superado todas las pruebas.

## 2. Alcance y criterios de aceptación

La página administra un menú de restaurante. Cada plato muestra nombre, precio y botones para editar, eliminar y pedir.

| Operación | Resultado esperado |
|---|---|
| Crear | El formulario agrega un plato válido; ignora nombres vacíos o con solo espacios. |
| Leer | La lista muestra el nombre y precio de cada plato. |
| Editar | El botón de una tarjeta reemplaza sus datos visibles por campos; Guardar actualiza solo ese plato. |
| Eliminar | El botón elimina únicamente su tarjeta. |
| Pedir | El botón obtiene el plato mediante `closest` y sus datos mediante `tarjeta.querySelector`; añade una línea a la lista del pedido. |

Obligatorio según la guía: HTML, CSS y JavaScript puro; CRUD por fila; acción Pedir; traversing; delegación; comentarios en español; texto del usuario con `textContent`; primera fila, última fila y lista vacía sin errores en consola; presentación y evidencia de IA.

Decisiones de integración del equipo: editar nombre **y** precio, permitir cancelar la edición, validar precio positivo con máximo dos decimales, y añadir una línea independiente por cada clic en Pedir. Estas decisiones concretan el comportamiento, no son requisitos adicionales atribuidos al PDF.

El pedido conserva una copia del nombre y precio al momento de pedir. Editar o eliminar después un plato del menú no modifica líneas ya pedidas. No se requiere carrito con cantidades, pagos, backend, inicio de sesión, base de datos, persistencia, filtros ni total del pedido. Si sobra tiempo, una mejora se acuerda entre todos y se prueba antes de integrarla.

## 3. Prompt compartido para todas las conversaciones

```text
Somos cuatro estudiantes de desarrollo de software de nivel básico. Trabajamos en el Proyecto 2: Menú de restaurante de Front I, para investigar y demostrar DOM Traversing.

Actúa como tutor: ayúdanos a entender antes de escribir código. Explica con lenguaje sencillo, comentarios en español y cambios pequeños que podamos defender en clase. Antes de cualquier código, explica en tres líneas qué harás. Responde únicamente la etapa y la parte que te asignaré después de este prompt.

La aplicación usa solamente index.html, style.css y script.js, sin librerías, frameworks, paquetes, transpilers ni backend. HTML enlaza style.css y carga script.js con defer; JavaScript clásico, sin imports. Los archivos de documentación y evidencia son auxiliares.

El menú contiene platos con nombre y precio. Debe permitir crear, mostrar, editar inline, guardar, cancelar y eliminar cada plato. Pedir añade una línea a una lista de pedido. Cada clic crea una nueva línea; es una copia de los datos al momento de pedir. No implementes funciones de otros proyectos ni persistencia sin acuerdo del equipo.

Cumple el contrato DOM y de funciones que adjunto. No renombres selectores, funciones ni archivos unilateralmente. Si falta un archivo o existe una incompatibilidad, indícala y propone un cambio mínimo antes de modificar el contrato.

Usa un solo listener click delegado en #menu-app para todas las acciones. No uses listeners por tarjeta, atributos onclick ni listeners dentro de crearPlato o del renderizado. El compañero 3 integra el único router de clic y un listener submit separado en #form-plato. Este submit permite crear con Enter y no constituye un listener por botón.

Desde evento.target busca el botón con closest('button[data-action]'), comprueba que pertenece a #menu-app y, para acciones de plato, encuentra su tarjeta con closest('.plato'). Desde esa tarjeta usa querySelector para encontrar nombre, precio y campos de edición. Comprueba los resultados antes de usarlos. Los clics en texto, espacios o elementos anidados de un botón no deben romper la página.

Crea nodos con document.createElement y escribe texto del usuario con textContent o value. Nunca insertes ese texto con innerHTML. Ignora nombres vacíos tras trim; acepta precio finito mayor que cero y con máximo dos decimales. Representa importes internamente con enteros en centavos. Evita parseFloat como única validación porque acepta entradas parcialmente inválidas. Valida tanto creación como edición y no cambies datos cuando la entrada sea inválida.

Mantén comentarios en español en las líneas clave de traversing y delegación. No generes pruebas aprobadas, capturas, citas, aportes personales ni errores de IA ficticios. Distingue lo implementado de lo pendiente.

Para cada etapa entrega: explicación de tres líneas, archivos o fragmentos que cambian, cómo probarlos y una explicación breve de closest, querySelector y delegación donde corresponda. Si el problema es un error, entrega el cambio mínimo y su causa. Todos debemos poder explicar cada línea.
```

## 4. Contrato de integración

### Archivos y propiedad

| Archivo o área | Responsable principal | Acuerdo |
|---|---|---|
| `index.html`, `style.css` | Compañero 1 | Estructura y diseño; no implementa lógica ni eventos. |
| Región CRUD de `script.js` | Compañero 2 | Funciones de platos y validaciones; no registra eventos. |
| Región pedido e integración de `script.js` | Compañero 3 | Pedido, único router click, submit e inicio. |
| `docs/`, `docs/evidencias/` y revisión | Compañero 4 | Pruebas manuales, evidencia real y guion de presentación. |

Los compañeros 2 y 3 comparten `script.js`: antes de editar se acuerdan regiones `// REGIÓN COMPAÑERO 2: validación compartida y CRUD.` y `// REGIÓN COMPAÑERO 3: pedido, único listener delegado y arranque.`. Primero se integra el CRUD; después el compañero 3 actualiza su rama desde `develop` e integra el router. Si trabajan a la vez, entregan fragmentos delimitados y resuelven juntos cualquier conflicto. No sobrescribir el archivo completo con una respuesta de IA.

### Selectores estables

| Selector o atributo | Contrato |
|---|---|
| `#menu-app` | Contenedor estable de formulario, menú, pedido y mensaje. Nunca se reemplaza al renderizar. |
| `#form-plato` | Formulario de creación. |
| `#nombre-plato` | Entrada de nombre con label asociado. |
| `#precio-plato` | Entrada de precio con label asociado; `type="number"`, `min="0.01"`, `step="0.01"`. La validación JS sigue siendo necesaria. |
| `#lista-platos` | Lista de tarjetas de menú. |
| `#lista-pedido` | Lista de líneas pedidas. |
| `#mensaje` | Mensajes de validación y estado; usar `aria-live="polite"`. |
| `.plato[data-id]` | Tarjeta raíz de un plato con identificador único estable. |
| `.plato__nombre` | Nombre visible. |
| `.plato__precio[data-precio-centavos]` | Precio visible formateado y dato numérico canónico en centavos. |
| `.plato__editar-nombre` | Entrada temporal para editar el nombre. |
| `.plato__editar-precio` | Entrada temporal para editar el precio. |
| `button[data-action]` | Botón con acción `editar`, `guardar`, `cancelar`, `eliminar` o `pedir`. |

Todos los botones de acción llevan `type="button"`. El botón de creación lleva `type="submit"` y no necesita `data-action`. No repetir IDs dentro de tarjetas. Las líneas del pedido no llevan `.plato` ni botones de acciones del menú, para evitar que el router las confunda.

### Funciones públicas dentro de script.js

| Función | Responsabilidad y resultado |
|---|---|
| `crearPlato(nombre, precioCentavos)` | Recibe datos ya validados; crea, agrega y devuelve la tarjeta. Genera un `data-id` único. |
| `iniciarEdicion(tarjeta)` | Activa los campos de esa tarjeta y coloca sus valores actuales; si ya está en edición, no duplica campos. |
| `guardarEdicion(tarjeta)` | Valida los campos; si son válidos actualiza nombre, precio y atributo, cierra edición y devuelve `true`; si falla mantiene la edición y devuelve `false`. |
| `cancelarEdicion(tarjeta)` | Retira los campos temporales y conserva los datos originales. |
| `eliminarPlato(tarjeta)` | Quita únicamente esa tarjeta; comprueba si el menú queda vacío. |
| `agregarAlPedido(tarjeta)` | Lee nombre y precio con búsquedas locales y añade una línea con esos valores; no modifica la tarjeta. |
| `inicializarApp()` | Registra una sola vez los eventos, conecta formulario y acciones e inicia la página; se llama una vez al final del script. |

Los ayudantes de validación y formato se acuerdan entre compañeros 2 y 3 antes de integrarlos. No declarar dos funciones con el mismo nombre. `precioCentavos` siempre es un entero positivo seguro; por ejemplo, `125050` representa `1250.50`. Para mostrar dinero se puede usar `Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 })`; la elección de COP es una convención del equipo. Para llenar un campo usar el número decimal sin símbolo ni separadores de miles.

El formulario limpia los campos solo después de crear correctamente. Mientras una tarjeta está en edición, Pedir queda deshabilitado hasta guardar o cancelar; así nunca se piden cambios sin guardar. El estado vacío debe ser un mensaje distinguible, no una tarjeta `.plato`; debe desaparecer al crear y reaparecer al eliminar el último plato.

### Flujo delegado esperado

```text
Clic dentro de #menu-app
→ verificar que evento.target es un Element
→ evento.target.closest('button[data-action]')
→ comprobar botón y pertenencia al contenedor
→ boton.closest('.plato') y comprobar tarjeta
→ escoger función según boton.dataset.action
→ la función busca datos con tarjeta.querySelector(...)
```

Esto es un contrato de comportamiento, no un segundo router para pegar junto al existente. El listener del formulario usa `preventDefault()`, valida, llama `crearPlato` y limpia únicamente al tener éxito.

## 5. Cuatro partes y prompts individuales

### Compañero 1 — Estructura, estilos y accesibilidad

**Rama:** `trabajo/estructura-estilos`. **Entrega:** `index.html` y `style.css` compatibles con el contrato. **Dependencia:** acordar selectores antes de que comience el CRUD.

Tareas: construir encabezado, formulario con labels, secciones de menú y pedido, mensaje de estado; enlazar los dos archivos; aplicar diseño adaptable, foco visible y botones legibles. Dar al compañero 2 una descripción de la tarjeta esperada, sin dejar tarjetas estáticas que dupliquen los datos creados por JS. Comprobar en pantalla pequeña y con teclado.

```text
Después del prompt compartido, mi parte es COMPAÑERO 1: HTML y CSS.
Trabaja únicamente index.html y style.css. Respeta todos los IDs, clases y atributos del contrato adjunto y carga script.js con defer. Usa etiquetas semánticas, labels, listas válidas y foco visible. Toda la interfaz debe quedar dentro de #menu-app para la delegación. No añadas onclick, listeners ni JavaScript inline. El formulario necesita nombre, precio y botón submit; las acciones de tarjetas serán type=button cuando JS las cree.
Primero explica la estructura y un árbol sencillo de su DOM. Después entrega esta etapa y una lista de comprobación visual y por teclado. No implementes CRUD ni el pedido. Señala cómo deben verse las clases de tarjetas y campos de edición que generará el compañero 2. No cambies el contrato sin consultarlo.
```

### Compañero 2 — Crear, leer, editar y eliminar

**Rama:** `trabajo/crud-platos`. **Entrega:** región `// REGIÓN COMPAÑERO 2: validación compartida y CRUD.` de `script.js`. **Dependencia:** HTML y contrato de selectores.

Tareas: implementar las cinco funciones de CRUD del contrato; construir nodos seguros; generar identificadores; validar nombre y precio en creación y edición; mantener vacío coherente; guardar/cancelar sin perder originales; comentar búsquedas locales y traversing. Entregar ejemplos de invocación manual para probar sin instalar listeners.

```text
Después del prompt compartido, mi parte es COMPAÑERO 2: CRUD de platos.
Trabaja solo en la región // REGIÓN COMPAÑERO 2: validación compartida y CRUD. de script.js. Implementa crearPlato(nombre, precioCentavos), iniciarEdicion(tarjeta), guardarEdicion(tarjeta), cancelarEdicion(tarjeta) y eliminarPlato(tarjeta) según el contrato. Propón y documenta ayudantes de validación y formato para que el compañero 3 los reutilice. No registres eventos, no llames inicializarApp y no implementes agregarAlPedido.
Construye con createElement, textContent y value. Los datos canónicos del precio se guardan en .plato__precio.dataset.precioCentavos. Evita IDs repetidos; limita toda edición a la tarjeta recibida mediante querySelector. Conserva los datos originales hasta Guardar y permite Cancelar. No dupliques campos al editar dos veces. Pedir queda deshabilitado durante la edición.
Entrega una etapa a la vez: crear/leer; después eliminar; después editar/guardar/cancelar. Para cada etapa indica invocaciones manuales temporales y pruebas para la primera tarjeta, la última y el menú vacío. No presentes esas invocaciones como listeners adicionales ni las dejes ejecutándose en la versión final.
```

### Compañero 3 — Pedido, delegación e integración

**Rama:** `trabajo/pedidos-integracion`. **Entrega:** región `// REGIÓN COMPAÑERO 3: pedido, único listener delegado y arranque.` de `script.js`, integrando el CRUD ya revisado. **Dependencia:** HTML y funciones del compañero 2.

Tareas: implementar `agregarAlPedido`; conectar el único listener click en `#menu-app`; conectar el submit del formulario; usar `closest` desde el botón y `querySelector` desde la tarjeta; proteger resultados nulos; manejar clics sobre elementos anidados; inicializar una vez; revisar que no haya eventos duplicados.

```text
Después del prompt compartido, mi parte es COMPAÑERO 3: acción Pedir, delegación e integración.
Lee primero los archivos actuales y las funciones del compañero 2. Trabaja en // REGIÓN COMPAÑERO 3: pedido, único listener delegado y arranque. de script.js. Implementa agregarAlPedido(tarjeta) e inicializarApp(). Registra exactamente un listener click en #menu-app para las acciones editar, guardar, cancelar, eliminar y pedir. Desde evento.target usa closest('button[data-action]') y luego closest('.plato'); verifica resultados y pertenencia al contenedor. Dentro de agregarAlPedido usa tarjeta.querySelector para nombre y precio. Crea una línea por cada clic, como copia independiente; editar o eliminar después el plato no altera el pedido anterior.
Registra además un listener submit en #form-plato con preventDefault para admitir Enter; reutiliza la validación acordada, convierte a centavos y llama crearPlato. No agregues listeners en las tarjetas ni reconstruyas #menu-app. Llama inicializarApp una vez. No dupliques ni reemplaces las funciones del compañero 2 sin coordinarlo.
Explica el recorrido DOM con una tarjeta real y señala las líneas concretas de closest y querySelector. Prueba crear y usar inmediatamente una tarjeta nueva, clic en un elemento dentro del botón, acciones de primera/última tarjeta y listas vacías. Entrega solo esta etapa y los cambios mínimos necesarios para integrarla.
```

### Compañero 4 — Pruebas, evidencia de IA y presentación

**Rama:** `trabajo/pruebas-presentacion`. **Entrega:** registros en `docs/` y capturas reales en `docs/evidencias/`. **Dependencia:** puede preparar la matriz y guion desde el inicio; ejecuta pruebas cuando haya una versión integrada.

Tareas: responder con palabras propias qué es traversing, cómo funciona y cuándo se aplica; preparar matriz de pruebas, registrar resultados reales, reunir tres capturas de prompts y un error real de IA corregido; preparar siete diapositivas y ensayar cinco minutos. Revisar que todos puedan explicar cada línea.

```text
Después del prompt compartido, mi parte es COMPAÑERO 4: pruebas, evidencia y presentación.
No reescribas el código de los demás. Prepara una matriz manual con pasos, resultado esperado, resultado observado, estado, responsable y evidencia. Déjala PENDIENTE hasta que yo ejecute cada caso y te entregue el resultado. Incluye CRUD, Pedir, clic anidado, datos inválidos, primera tarjeta, última tarjeta, menú vacío, pedido vacío, teclado y consola.
Ayúdame a redactar con mis palabras qué es traversing, cómo funciona y cuándo se aplica; usa un árbol genealógico y el DOM real de nuestro HTML. Distingue Element de Node: los recorridos Element evitan nodos de texto y comentarios; closest y querySelector pueden devolver null, mientras children devuelve una colección que puede estar vacía.
Prepara el contenido de siete diapositivas para cinco minutos según la guía. Señala dónde adjuntar tres capturas de prompts reales y un error real de IA que corregimos, con causa, cambio y verificación. Nunca inventes capturas, errores, pruebas aprobadas ni aportes de compañeros. Si no hemos identificado un error real, marca esa evidencia como pendiente y ayúdanos a revisar críticamente el código.
Al terminar, dame preguntas para que cada integrante explique una línea real de su código y una lista de pendientes para entregar.
```

## 6. Plan de trabajo y colaboración

La guía organiza una sesión completa de 120 minutos, incluyendo exposiciones de la clase. El equipo prepara una demo de cinco minutos; no son 30 minutos de exposición por equipo.

| Bloque | Minutos | Trabajo de los cuatro |
|---|---:|---|
| Introducción y elección | 5 | Confirmar Proyecto 2, integrantes y contrato. |
| Investigar con IA | 15 | Todos responden las tres preguntas; cada uno explica un ejemplo. |
| Construir por etapas | 45 | 1 entrega HTML/CSS; 2 CRUD; 3 pedido/router; 4 prepara pruebas y las ejecuta sobre cada etapa integrada. Reservar el cierre del bloque para resolver integración. |
| Preparar presentación | 15 | 4 coordina; todos aportan capturas, líneas reales y una explicación. |
| Exposiciones | 30 | Bloque de la clase; cada equipo tiene cinco minutos. |
| Cierre | 10 | Preguntas y retroalimentación. |

Orden de integración: estructura → crear/leer → eliminar/editar → pedido y delegación → pruebas completas → documentación y ensayo. Se puede investigar, diseñar y preparar evidencias en paralelo, pero el router final depende del contrato y las funciones de CRUD.

Ramas acordadas: `main`, `develop`, `trabajo/estructura-estilos`, `trabajo/crud-platos`, `trabajo/pedidos-integracion`, `trabajo/pruebas-presentacion`. Son nombres de trabajo sin referencias a IA. Cada persona utiliza su propia identidad Git; quien integre conserva la autoría real de los commits. No agregar coautores ficticios ni atribución de autoría a IA. La evidencia académica del uso de IA se registra por separado porque la guía la solicita.

Antes de abrir un pull request: actualizar desde `develop`, revisar archivos cambiados y probar la parte propia. Otro compañero revisa selectores, eventos y comportamiento. Solo se integra a `main` cuando la matriz está ejecutada y los pendientes importantes están resueltos. Ante conflicto en `script.js`, comparar regiones y funciones; no aceptar automáticamente todo un lado.

## 7. Pruebas manuales mínimas

Usar las herramientas del navegador y dejar la consola abierta. Cada fila se registra con fecha, responsable, observado, estado y ruta de captura si aplica. Estado inicial de todos los casos: **PENDIENTE**.

| Caso | Pasos | Resultado esperado |
|---|---|---|
| Inicio vacío | Abrir la página sin datos. | Menú y pedido vacíos se entienden; sin errores. |
| Crear | Añadir «Sopa» y «12500.50». | Una tarjeta con nombre y precio correctos. |
| Nombre vacío | Enviar vacío y luego solo espacios. | No se crea tarjeta; mensaje comprensible. |
| Precio inválido | Probar vacío, cero, negativo, texto y más de dos decimales. | No se crea ni actualiza; no quedan datos parciales. |
| Lectura | Crear dos platos con nombres distintos. | Cada tarjeta conserva sus datos. |
| Editar primera | Cambiar nombre y precio de la primera y guardar. | Solo cambia esa tarjeta. |
| Edición inválida | Borrar nombre o poner precio inválido al editar. | Mantiene edición y datos originales sin guardar. |
| Cancelar | Cambiar campos y cancelar. | Recupera los valores originales; permite pedir. |
| Editar repetido | Pulsar Editar de nuevo si está disponible. | No duplica campos ni eventos. |
| Eliminar última | Eliminar la última de varias tarjetas. | Las demás permanecen intactas. |
| Eliminar todas | Eliminar hasta no tener platos y crear otro. | Aparece estado vacío; luego desaparece; nueva tarjeta funciona. |
| Pedir primera/última | Pedir el primer y último plato. | Añade datos del plato correcto en ambos casos. |
| Pedir repetido | Pedir dos veces el mismo plato. | Dos líneas independientes del pedido. |
| Copia del pedido | Pedir, luego editar o eliminar ese plato. | La línea ya pedida conserva sus datos. |
| Tarjeta dinámica | Crear un plato nuevo y editar/pedir/eliminar sin recargar. | Acciones funcionan gracias a la delegación. |
| Clic anidado | Si el botón tiene span o icono, pulsarlo. | closest identifica el botón y la tarjeta correctos. |
| Clic fuera de botón | Pulsar título, tarjeta o fondo. | Sin cambios indebidos ni errores. |
| Texto como texto | Crear nombre `<b>Sopa</b>`. | Se muestra literalmente, sin interpretar HTML. |
| Teclado y pantalla | Tabular, enviar con Enter y probar ancho móvil. | Labels, foco y controles utilizables; contenido legible. |
| Revisión de eventos | Revisar script y repetir acciones. | Un router click en contenedor y un submit; sin acciones duplicadas. |
| Consola | Revisar durante toda la secuencia anterior. | Sin excepciones sin resolver. |

No hace falta instalar una biblioteca de pruebas. Si el navegador impide introducir un dato por las restricciones nativas del input, registrar ese bloqueo y comprobar además la validación de la función correspondiente; no afirmar una ruta probada que no se ejecutó.

## 8. Evidencia real del uso de IA

Guardar tres capturas legibles de prompts realmente utilizados: una de comprensión, una de construcción por etapas y una de revisión o depuración. Registrar autor, herramienta, fecha, propósito, resumen de la respuesta y qué aceptaron o cambiaron.

Para el error de IA, guardar el fragmento real sugerido, explicar qué falló, adjuntar el cambio hecho por el equipo y describir cómo comprobaron la corrección. No provocar un fallo para fingir que la IA lo produjo, ni presentar un ejemplo hipotético como evidencia real. Mientras no exista, marcar **pendiente**.

No publicar contraseñas, tokens, llaves SSH, datos privados ni conversaciones personales en las capturas. La evidencia debe concentrarse en este proyecto.

Prompt de depuración reutilizable:

```text
Esto esperaba: [comportamiento esperado].
Esto pasó: [comportamiento observado].
Error exacto en consola: [mensaje o indicar que no aparece error].
Pasos para reproducir: [pasos].
Código actual relevante: [fragmento y contexto].
Explícame la causa en lenguaje sencillo y dame solo las líneas que cambian. Respeta el contrato y no añadas listeners por botón. Indica cómo verificar la corrección sin afirmar que ya la probaste.
```

## 9. Presentación de siete diapositivas — cinco minutos

| # | Contenido | Quién expone | Tiempo sugerido |
|---|---|---|---:|
| 1 | Portada: equipo, cuatro integrantes, Proyecto 2. | 1 | 15 s |
| 2 | Problema: administrar platos y formar un pedido; imagen de la página real. | 1 | 25 s |
| 3 | Qué es traversing y cómo funciona: árbol DOM real con padre, hijos y hermanos. | 2 | 45 s |
| 4 | closest y querySelector: líneas reales y recorrido botón → tarjeta → datos; delegación y versiones Element. | 3 | 45 s |
| 5 | Demo: crear, leer, editar, eliminar, pedir y al menos un caso límite. Los demás casos quedan registrados en pruebas. | 2 y 3 | 100 s |
| 6 | IA: tres prompts reales, error real y corrección comprobada. | 4 | 45 s |
| 7 | Aprendizajes: dificultad, solución y qué harían distinto. | 4 | 25 s |

Total sugerido: 300 segundos. Ensayar con cronómetro y tener capturas de respaldo de la aplicación, sin sustituir la demo en vivo exigida. Todos deben contestar preguntas sobre cualquier parte del proyecto.

Repaso conceptual: `parentElement` sube al padre; `closest` busca el elemento actual o un ancestro que coincida; `children`, `firstElementChild` y `lastElementChild` bajan; `querySelector` busca un descendiente; `nextElementSibling` y `previousElementSibling` recorren hermanos. Las variantes Element evitan nodos de texto y comentarios. No afirmar que todos devuelven null: `children` devuelve una colección, posiblemente vacía.

## 10. Lista final para entregar

- [ ] Cuatro nombres completados y tamaño del equipo validado con el docente.
- [ ] `index.html`, `style.css` y `script.js` funcionan juntos sin dependencias externas.
- [ ] CRUD, Pedir y contrato comprobados en la versión integrada.
- [ ] Un listener click delegado; ningún onclick ni listener por tarjeta.
- [ ] Texto del usuario seguro y comentarios clave en español.
- [ ] Pruebas de primera, última y lista vacía ejecutadas sin errores de consola.
- [ ] Tres capturas de prompts reales y un error real de IA corregido.
- [ ] Presentación de siete diapositivas ensayada en cinco minutos.
- [ ] Cada integrante explica qué es traversing, cómo funciona, cuándo se aplica y líneas reales del código.
- [ ] README indica ejecución, integrantes y estado real del proyecto; enlaces del repositorio verificados antes de compartir.


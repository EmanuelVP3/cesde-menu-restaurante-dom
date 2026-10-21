# Guion de presentación — Menú de restaurante

Estado: **guion por completar y ensayar**, no presentación terminada. Preparar siete diapositivas y una exposición de cinco minutos con demo en vivo. Sustituir “compañero” por los nombres reales.

| Diapositiva | Responsable | Tiempo | Contenido y apoyo visual |
|---|---|---|---|
| 1. Portada | Compañero 1 | 15 s | Nombre del equipo, cuatro integrantes, Front I y Proyecto 2: Menú de restaurante. |
| 2. El problema | Compañero 1 | 25 s | Explicar que necesitamos administrar platos y agregarlos a un pedido. Mostrar una captura real de la interfaz terminada. |
| 3. El concepto | Compañero 2 | 45 s | Responder con palabras propias qué es traversing, cómo funciona y cuándo se aplica; mostrar un árbol del DOM de nuestro HTML. |
| 4. Propiedades usadas | Compañero 3 | 45 s | Enseñar la delegación de clic, las líneas reales que suben con `closest` y bajan con `querySelector`, y explicar por qué actúan sobre el plato correcto. |
| 5. Demo en vivo | Compañero 3 | 100 s | Crear, leer, editar, pedir y eliminar; demostrar un caso límite y la delegación en una tarjeta nueva. |
| 6. Cómo usamos la IA | Compañero 4 | 40 s | Mostrar tres prompts usados y el error real corregido por el equipo, con las capturas registradas. |
| 7. Aprendizajes | Compañero 4 | 30 s | Contar una dificultad real, cómo la resolvimos y qué mejoraríamos. |

Total: **300 segundos / 5 minutos**. Ensayar con cronómetro, con todos presentes y usando el mismo navegador que emplearán en clase.

## 3. Explicación del árbol

Completar el dibujo usando la estructura final. Punto de partida del contrato:

```text
#menu-app
├── #form-plato
├── #lista-platos
│   ├── .plato[data-id]
│   │   ├── .plato__nombre
│   │   ├── .plato__precio
│   │   └── button[data-action="pedir"]
│   │       └── span (si el diseño lo incluye)
│   └── .plato[data-id]
├── #lista-pedido
└── #mensaje
```

Colorear padre, hijos y hermanos. Explicar: desde el elemento pulsado buscamos el botón; desde el botón subimos a su tarjeta y desde esa tarjeta buscamos sus datos. No buscamos otra vez todos los nombres desde `document`.

Para preparar preguntas, repasar también `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `nextElementSibling` y `previousElementSibling`. Las propiedades de hermanos o padre pueden devolver `null`; `children` devuelve una colección que puede estar vacía. Las variantes `Element` evitan confundir elementos con nodos de texto o comentarios.

## 4. Líneas reales del proyecto

La diapositiva final debe mostrar el código que efectivamente quedó integrado. Completar antes de exponer:

| Concepto | Archivo y línea real | Explicación propia |
|---|---|---|
| Delegación: un listener de clic en el contenedor | `script.js:345` | Un único listener atiende las acciones de las tarjetas creadas ahora o después. |
| Encontrar el botón incluso al pulsar su hijo | `script.js:351` | `closest` localiza el botón desde el elemento que recibió el clic. |
| Subir a la tarjeta con `closest('.plato')` | `script.js:357` | La acción queda limitada a la tarjeta del botón pulsado. |
| Buscar nombre y precio dentro de la tarjeta con `querySelector` | `script.js:290-291` | Las búsquedas parten de la tarjeta, no del documento completo. |
| Mostrar texto del usuario con `textContent` | `script.js:125` | El nombre se trata como texto, no como HTML. |

## 5. Recorrido de la demo

1. Mostrar el menú y explicar qué representa una tarjeta.
2. Crear un plato con nombre y precio; señalar que aparece sin recargar.
3. Editar ese plato dentro de su tarjeta y guardar.
4. Pulsar Pedir y mostrar la línea agregada al pedido con los datos correctos.
5. Eliminar solo ese plato del menú; explicar que el pedido conserva la copia tomada al pedirlo.
6. Probar la primera o última tarjeta y el estado vacío. Mostrar que se puede volver a crear un plato.
7. Mostrar la consola sin errores y mencionar que el checklist completo está en `docs/PRUEBAS.md`.

Preparar datos breves y conocer cómo volver al estado inicial. Tener una captura o video propio como respaldo si falla el equipo de proyección, pero conservar la demo en vivo como parte de la exposición.

## Lista antes de presentar

- [ ] Cambiar los cuatro nombres y completar todos los campos pendientes.
- [ ] Preparar las siete diapositivas con poco texto y evidencia real.
- [ ] Verificar que las líneas citadas correspondan al código final.
- [ ] Completar `docs/EVIDENCIA_IA.md` sin inventar errores ni capturas.
- [ ] Ejecutar y registrar las pruebas de `docs/PRUEBAS.md`.
- [ ] Confirmar que todos pueden explicar qué es traversing, cómo funciona y cuándo se usa.
- [ ] Confirmar que cada integrante puede explicar una línea de `script.js` aunque no la haya escrito.
- [ ] Ensayar la exposición completa en cinco minutos.

Nota de organización: la guía menciona equipos de dos o tres. Este reparto adapta la actividad a los cuatro integrantes solicitados; confirmar con el docente que acepta ese tamaño de equipo.

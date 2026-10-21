# Cómo explicar el código al profesor

Guía de preparación, no evidencia de una exposición ya realizada. Abrir los archivos y seguir los comentarios en español.

## Recorrido de una acción

«El usuario pulsa Pedir. El clic llega al contenedor. Desde el elemento pulsado, closest encuentra el botón y después su tarjeta. Dentro de esa tarjeta querySelector busca nombre y precio. Creamos un li con textContent y lo añadimos al pedido. El mismo listener sirve para tarjetas creadas después».

## Referencias de script.js

| Tema | Línea actual | Explicación |
| --- | --- | --- |
| Validación de precios | `script.js:48` | Se valida el texto y se guardan centavos enteros seguros. |
| Crear y leer | `script.js:121` | Se crea una tarjeta y se agrega a la lista y al estado. |
| Edición | `script.js:161` | querySelector busca los datos dentro de la tarjeta recibida. |
| Guardar | `script.js:205` | Primero se valida; luego se actualizan datos y nodos visibles. |
| Cancelar | `script.js:255` | Se recuperan los originales conservados en menuData. |
| Eliminar | `script.js:286` | Se retira la tarjeta del DOM y su registro del estado. |
| Pedir | `script.js:300` | Se copia el nombre y precio a un li independiente. |
| Delegación | `script.js:370` | Un listener del contenedor atiende botones presentes y futuros. |
| Subir al botón | `script.js:376` | closest admite un clic en el botón o en uno de sus hijos. |
| Subir a tarjeta | `script.js:382` | Se localiza la tarjeta que contiene el botón pulsado. |

## HTML y CSS

- HTML define los contenedores y sus IDs; los labels relacionan cada campo con su nombre.
- defer hace que el script se ejecute después de leer el HTML.
- aria-live anuncia los mensajes que cambian sin recargar la página.
- CSS usa variables para colores y Grid para distribuir columnas; las media queries adaptan la pantalla.
- Los avisos de lista vacía se ocultan con :not(:empty) cuando la lista tiene contenido.
- El plato decorativo de portada está hecho con CSS, no es un producto de la lista.

## Preguntas para ensayar

1. ¿Qué cambia si usamos document.querySelector para obtener el primer nombre en vez de buscar dentro de la tarjeta?
2. ¿Por qué crear una tarjeta nueva no necesita registrar nuevos listeners?
3. ¿Qué hace closest cuando se pulsa un hijo del botón? ¿Qué devuelve si no encuentra coincidencia?
4. ¿Por qué usamos textContent para el nombre escrito por el usuario?
5. ¿Por qué se conservan originales para Cancelar y centavos enteros para precios?
6. ¿Qué diferencia existe entre estado en memoria y persistencia? Al recargar, este ejercicio comienza de nuevo.

Cada integrante debe responder con sus palabras y mostrar la línea correspondiente. Las referencias cambian si se agregan líneas; comprobarlas antes de preparar las diapositivas.

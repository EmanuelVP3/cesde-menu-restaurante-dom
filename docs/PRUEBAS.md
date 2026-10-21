# Pruebas manuales — Proyecto 2: Menú de restaurante

Estado inicial: **pendiente de ejecución**. Esta lista no certifica que el proyecto ya funcione. Cada compañero debe registrar el resultado real después de integrar `index.html`, `style.css` y `script.js`.

## Preparación

1. Abrir `index.html` en un navegador y abrir la consola de desarrollo.
2. Usar datos de prueba: Arepa / 5000.00; Sopa / 12500.50; Arepa / 7000.00.
3. Volver al estado inicial cuando un caso lo necesite. No borrar evidencia de errores antes de registrarla.
4. Revisar el resultado visual y la consola después de cada caso.

## Registro de ejecución

Marcar `[x]` solo después de probar. Registrar fecha, responsable y observación en la tabla final.

| Hecho | Caso | Acción y resultado esperado |
|---|---|---|
| [ ] | Crear y leer | Agregar un plato válido. Aparece una tarjeta con su nombre y precio; los campos quedan listos para otro registro. |
| [ ] | Nombre vacío | Intentar guardar vacío o solo espacios. No se crea una tarjeta y se muestra una indicación comprensible. |
| [ ] | Precio inválido | Probar vacío, cero, negativo, texto y más de dos decimales. No se guarda; el mensaje explica cómo corregirlo. |
| [ ] | Precio decimal | Guardar 12500.50. Se conserva el valor en centavos sin pérdida y se muestra con formato consistente. |
| [ ] | Editar primera | Editar nombre y precio de la primera tarjeta. Aparecen campos dentro de esa tarjeta; Guardar cambia solo esa tarjeta. |
| [ ] | Editar última | Repetir con la última tarjeta. No cambia otra tarjeta ni se produce un error en consola. |
| [ ] | Edición inválida | Guardar un nombre vacío o un precio inválido durante la edición. Se conservan los datos válidos anteriores y se permite corregir. |
| [ ] | Cancelar edición | Cambiar los campos y pulsar Cancelar. Se restauran el nombre y precio anteriores. |
| [ ] | Eliminar primera | Eliminar la primera tarjeta. Desaparece solo ese plato y siguen funcionando los demás. |
| [ ] | Eliminar última | Eliminar la última tarjeta. No hay error ni referencia a un elemento inexistente. |
| [ ] | Lista vacía | Eliminar todos los platos. La aplicación informa el estado vacío, no falla y permite crear otro plato. |
| [ ] | Única tarjeta | Crear un único plato; editar, pedir y eliminarlo. Funciona siendo a la vez primero y último. |
| [ ] | Delegación dinámica | Crear un plato después de cargar la página. Sus botones funcionan sin registrar listeners nuevos por tarjeta. |
| [ ] | Clic en hijo | Hacer clic sobre un `span` dentro de Pedir o Editar. `closest('[data-action]')` encuentra el botón y se ejecuta la acción correcta. Si no existe ese hijo, añadirlo durante la prueba y conservar el diseño acordado. |
| [ ] | Clic sin acción | Pulsar el espacio vacío del contenedor y el texto de una tarjeta. No ocurre una acción accidental ni un error. |
| [ ] | Pedir plato correcto | Con dos platos llamados Arepa y precios distintos, pulsar Pedir en cada uno. Se agrega el precio de la tarjeta pulsada, sin buscar por nombre. |
| [ ] | Repetir pedido | Pulsar Pedir dos veces. Según el contrato, se agregan dos líneas independientes; no se confunde con una edición o un borrado. |
| [ ] | Pedido como copia | Pedir un plato y luego editarlo o eliminarlo del menú. La línea ya pedida conserva el nombre y precio que tenía al pedirlo. Un pedido nuevo usa los datos actualizados. |
| [ ] | Texto seguro | Crear y editar un nombre como `<img src=x onerror=alert(1)>`. Se ve literalmente como texto; no se crea una imagen ni se ejecuta código. |
| [ ] | Teclado | Recorrer campos y botones con Tab y activarlos con teclado. Los campos tienen etiquetas y el foco es visible. |
| [ ] | Pantalla estrecha | Revisar a unos 375 px de ancho. Formulario, tarjetas, pedido y botones se pueden usar sin solapamientos. |
| [ ] | Consola | Completar el recorrido anterior sin errores nuevos en la consola. Si aparecen, registrar y corregir antes de entregar. |

## Revisión del código

- [ ] Solo HTML, CSS y JavaScript puro: no hay librerías ni frameworks.
- [ ] Los tres archivos de la aplicación se llaman `index.html`, `style.css` y `script.js` y están conectados correctamente.
- [ ] Existe un solo listener delegado de clic en `#menu-app`; no hay listeners por botón ni atributos `onclick`.
- [ ] El envío de `#form-plato` se gestiona como evento `submit` separado, según el contrato compartido.
- [ ] Desde el botón se sube con `closest('.plato')` y desde la tarjeta se baja con `tarjeta.querySelector(...)`.
- [ ] El texto escrito por usuarios se coloca con `textContent`, nunca mediante `innerHTML`.
- [ ] Hay comentarios en español en las líneas clave, y cada integrante puede explicarlas.

## Resultados reales

| Fecha | Responsable | Caso | Resultado: pasó / falló / pendiente | Evidencia y corrección |
|---|---|---|---|---|
| Por completar | Por completar | Por completar | Pendiente | Por completar |

No escribir “todo pasó” sin ejecutar los casos. Si cambió el código después de una corrección, repetir los casos afectados.

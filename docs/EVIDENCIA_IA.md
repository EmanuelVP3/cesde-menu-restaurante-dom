# Evidencia real de uso de IA

Registro del 20 de octubre de 2026. Responsable de esta conversación: Emanuel. Herramienta: Codex. Los textos siguientes sí fueron utilizados en esta conversación; las capturas todavía deben tomarse de la conversación original. Este registro escrito no sustituye las capturas exigidas por la guía.

## Prompt 1 — Construcción de la parte de Emanuel

> yo debo de realizar el punto 1 ayudame realizandolo

Contexto: la parte 1 correspondía a HTML, CSS y accesibilidad. La IA preparó la estructura y los estilos conservando los selectores del contrato. Referencia comprobable: commit `d2c4f53`; mejora posterior `aa9d5fd`.

Captura pendiente: `docs/evidencias/prompt-01-construccion.png`. Capturar el mensaje real y la respuesta relevante. No se enlaza una imagen inexistente.

## Prompt 2 — Revisión del trabajo integrado

> puedes hacer pull en develop y revisar los cambios del compañero

La revisión encontró selectores incompatibles con el HTML, estructura de tabla diferente del contrato y validación incompleta. Los ajustes del CRUD quedaron en `56c2b5a`; la corrección posterior de pedido y precios quedó en `42723a8`. Esta secuencia consta en el historial Git.

Captura pendiente: `docs/evidencias/prompt-02-revision.png`.

## Prompt 3 — Comprensión para exponer

> sabes y me gustaria que agregaras en las lineas del codigo comentarios para entender ahora al momento de explicarle al profesor

La IA agregó comentarios sobre estado, centavos, CRUD, textContent, closest, querySelector y delegación. Cada estudiante debe leerlos, probar el código y explicar con sus palabras lo que entendió; tener comentarios no acredita por sí solo comprensión.

Captura pendiente: `docs/evidencias/prompt-03-explicacion.png`.

## Error técnico corregido y atribución pendiente

Problema real encontrado en `56c2b5a`:

```js
if (!Number.isInteger(numero * 100)) {
  // Rechazaba importes válidos como 0.29 y 1.10.
}
```

La precisión binaria de JavaScript hace que algunos productos no sean enteros exactos. La corrección en `42723a8` valida el texto decimal, separa pesos y decimales y comprueba que el resultado en centavos sea un entero seguro. La revisión de esta sesión verificó los dos valores y ocho casos adicionales: ver `evidencias/revision-tecnica.json`.

**No está confirmado que este fragmento lo haya generado una IA.** Para cumplir la evidencia de «error de IA corregido», el compañero debe aportar su conversación original que lo demuestre, más una captura del error y la corrección. Mientras tanto, esta evidencia queda pendiente; no atribuirle a la IA código sin comprobar su origen.

## Archivos a reunir en evidencias/

- Tres capturas reales de los prompts anteriores y respuestas relevantes.
- Captura de un error de IA con origen confirmado y su corrección.
- Captura de la interfaz y del recorrido CRUD/pedido.
- Resultados de pruebas manuales con responsable y fecha.

Ocultar información ajena al proyecto en las capturas. No recrear conversaciones como si fueran capturas originales.

## Comprensión individual por completar

| Integrante | Tema para explicar | Estado |
| --- | --- | --- |
| Emanuel | HTML, CSS, labels, defer y diseño adaptable | Ensayo pendiente |
| Compañero CRUD | Crear, editar, cancelar y eliminar una tarjeta | Nombre y ensayo pendientes |
| Compañero integración | closest, querySelector, delegación y copia del pedido | Nombre y ensayo pendientes |
| Compañero revisión | Pruebas, evidencia real y presentación | Nombre y ensayo pendientes |
